import posthog from "posthog-js";

import { getAttribution, hasAttribution, recordAttribution } from "@/lib/attribution";

/**
 * PostHog wiring for ChatGPT Ads attribution.
 *
 * Two events, both anonymous:
 *   - `chatgpt_ad_landing_view` — a visitor arrives from a ChatGPT ad
 *   - `app_store_click`         — a visitor taps any App Store button
 *
 * Deliberately narrow: autocapture, session replay, surveys and pageview
 * capture are all off, so nothing the visitor types on the keigo conversion
 * tools — or anywhere else — can reach PostHog. Only the six campaign
 * parameters in `lib/attribution.ts` plus the page path are sent.
 */

// Same public project token the iOS app and the keyboard-rewrite edge function
// already ship (see Japanese/supabase/functions/keyboard-rewrite/index.ts).
// Write-only and safe to expose; override per environment if the site ever
// needs to report into a different project.
const POSTHOG_KEY_DEFAULT = "phc_rkuAvbqxdVqqG5jZuySrJq8CH4NrYG97Z2B7vv7GXhJw";
const POSTHOG_HOST_DEFAULT = "https://us.i.posthog.com";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || POSTHOG_KEY_DEFAULT;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || POSTHOG_HOST_DEFAULT;

/** The ad platform that ChatGPT Ads stamps on `utm_source`. */
const CHATGPT_UTM_SOURCE = "chatgpt";

/** Hosts that count as an App Store download destination. */
const APP_STORE_HOSTS = ["apps.apple.com", "itunes.apple.com"];

let initialized = false;

const isAppStoreLink = (anchor: HTMLAnchorElement): boolean => {
  try {
    // `anchor.href` is already absolute; the base is a belt-and-braces default.
    const { hostname } = new URL(anchor.href, window.location.href);
    return APP_STORE_HOSTS.includes(hostname.toLowerCase());
  } catch {
    return false;
  }
};

/**
 * Fires `app_store_click` for a tap on any App Store link, anywhere on the
 * site. Delegated from the document rather than bound per button so the server
 * components that render most of the CTAs (SiteChrome, page sections) stay
 * server components, and so future buttons are covered without extra wiring.
 */
function handleDocumentClick(event: MouseEvent): void {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const anchor = target.closest("a[href]");
  if (!(anchor instanceof HTMLAnchorElement) || !isAppStoreLink(anchor)) return;

  posthog.capture("app_store_click", {
    ...getAttribution(),
    app_store_url: anchor.href,
    page_path: window.location.pathname,
    // Opt-in label for telling CTAs apart. Read from an author-set attribute
    // and never from the link's text, which could sit next to visitor input.
    cta: anchor.dataset.cta,
  });
}

export function initAnalytics(): void {
  if (initialized || typeof window === "undefined" || !POSTHOG_KEY) return;
  initialized = true;

  try {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      defaults: "2026-06-25",

      // --- Privacy: never collect what the visitor writes ---------------
      // Autocapture would record clicked-element text, and session replay
      // would record the page itself. Both are off, so the keigo converter,
      // checker and quiz inputs are out of reach. Client config wins over
      // project-level settings, so neither can be switched on remotely.
      autocapture: false,
      disable_session_recording: true,
      disable_surveys: true,
      capture_pageview: false,
      capture_pageleave: false,
      // Anonymous events: attribution lives on the event, not on a profile.
      person_profiles: "identified_only",
    });

    const attribution = recordAttribution(window.location.search);

    // Fire on arrival, i.e. only when this page load's URL actually carries
    // the ChatGPT source — not on later navigations reading it back out of
    // session storage.
    const arrivedFromChatGpt =
      new URLSearchParams(window.location.search).get("utm_source")?.trim().toLowerCase() ===
      CHATGPT_UTM_SOURCE;

    if (arrivedFromChatGpt && hasAttribution(attribution)) {
      posthog.capture("chatgpt_ad_landing_view", {
        ...attribution,
        landing_path: window.location.pathname,
      });
    }

    // Capture phase so the event is recorded even if a handler below stops
    // propagation. PostHog flushes its queue via sendBeacon on pagehide, so
    // the event survives the browser handing off to the App Store app.
    document.addEventListener("click", handleDocumentClick, { capture: true });
  } catch {
    // Analytics must never break the page.
  }
}
