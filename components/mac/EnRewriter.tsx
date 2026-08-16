"use client";

import { useState } from "react";
import { MAC_DOWNLOAD_URL } from "@/lib/site";

/**
 * The free English rewriter at `/en/rewrite`.
 *
 * It is the English counterpart of `components/KeigoConverter.tsx` and calls the
 * same `web-rewrite` edge function — the `en_*` modes were added there on
 * 2026-08-17 rather than reusing the Japanese ones, whose system prompt ends with
 * 「出力は日本語にしてください」 and would answer English input in Japanese.
 *
 * **Why a tool page and not another guide.** The Japanese side's ranking pages are
 * the three tools, not the articles: a tool earns dwell time, return visits and
 * links that prose does not, and it converts because the visitor has already used
 * the product before being asked to install anything (seo-geo.md §設計方針2). English
 * had four guides and no tool, which is the same asymmetry in reverse.
 *
 * Styled with `.mac-doc` / landing tokens so it belongs to the Mac page visually.
 */

const ENDPOINT =
  process.env.NEXT_PUBLIC_WEB_REWRITE_URL ??
  "https://eercsucvxnszqletxued.supabase.co/functions/v1/web-rewrite";

const MAX_CHARS = 300;

const MODES = [
  { id: "en_natural", label: "Natural", hint: "Reads like a native speaker wrote it" },
  { id: "en_grammar", label: "Grammar", hint: "Fixes mistakes, keeps your voice" },
  { id: "en_formal", label: "Professional", hint: "Safe to send to a client or manager" },
  { id: "en_short", label: "Shorter", hint: "Same meaning, fewer words" },
] as const;

type ModeId = (typeof MODES)[number]["id"];

const SAMPLES: Record<ModeId, string> = {
  en_natural:
    "I want to ask about the schedule of next week meeting, because I have another appointment in same time.",
  en_grammar:
    "Thanks for you're feedback on the deck, i have updated the slides and its ready for review now.",
  en_formal:
    "hey, need the invoice sorted today. its already 2 weeks late and im getting asked about it",
  en_short:
    "I just wanted to quickly reach out and check whether you might possibly have had a chance to take a look at the document I sent over last week, if that is at all possible.",
};

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; candidates: string[]; remaining: number }
  | { status: "error"; message: string; capped: boolean };

export function EnRewriter() {
  const [mode, setMode] = useState<ModeId>("en_natural");
  const [text, setText] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });
  const [copied, setCopied] = useState<number | null>(null);

  const over = text.length > MAX_CHARS;
  const canSubmit = text.trim().length > 0 && !over && state.status !== "loading";

  async function submit() {
    if (!canSubmit) return;
    setState({ status: "loading" });
    setCopied(null);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), mode }),
      });
      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        setState({
          status: "error",
          // The cap is the CTA, so it gets its own sentence rather than a raw code.
          message:
            payload?.code === "rate_limited"
              ? "That's the five free rewrites for today. The Mac app has 50 a month free, with no daily cap."
              : "That didn't go through. Give it a moment and try again.",
          capped: payload?.code === "rate_limited",
        });
        return;
      }

      // **The endpoint echoes the mode it actually used, and that is load-bearing.**
      // `web-rewrite` validates with `body.mode in MODES ? body.mode : "keigo"`, so a
      // deployment that predates the `en_*` modes silently falls back to Japanese —
      // verified against production on 2026-08-17, which returned 来週の会議… for
      // English input. Showing that to an English visitor is worse than showing an
      // error, so the mismatch is caught here rather than rendered.
      if (payload?.mode && payload.mode !== mode) {
        setState({
          status: "error",
          message:
            "This tool is being updated right now and gave the wrong kind of answer. Please try again shortly.",
          capped: false,
        });
        return;
      }

      setState({
        status: "done",
        candidates: Array.isArray(payload?.candidates) ? payload.candidates : [],
        remaining: typeof payload?.remaining === "number" ? payload.remaining : 0,
      });
    } catch {
      setState({
        status: "error",
        message: "Couldn't reach the server. Check your connection and try again.",
        capped: false,
      });
    }
  }

  async function copy(value: string, index: number) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(index);
      setTimeout(() => setCopied((c) => (c === index ? null : c)), 1600);
    } catch {
      /* Clipboard blocked — the text is selectable, which is the fallback. */
    }
  }

  return (
    <div className="enrw">
      <div className="enrw__modes" role="group" aria-label="What to do with the text">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`enrw__mode${mode === m.id ? " enrw__mode--on" : ""}`}
            aria-pressed={mode === m.id}
            onClick={() => {
              setMode(m.id);
              setState({ status: "idle" });
            }}
          >
            <span className="enrw__modeLabel">{m.label}</span>
            <span className="enrw__modeHint">{m.hint}</span>
          </button>
        ))}
      </div>

      <label className="enrw__label" htmlFor="enrw-input">
        Paste what you were about to send
      </label>
      <textarea
        id="enrw-input"
        className="enrw__input"
        value={text}
        rows={5}
        maxLength={MAX_CHARS + 80}
        placeholder={SAMPLES[mode]}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="enrw__row">
        <button
          type="button"
          className="btn btn--ghost enrw__sample"
          onClick={() => {
            setText(SAMPLES[mode]);
            setState({ status: "idle" });
          }}
        >
          Use the example
        </button>
        <span className={`enrw__count${over ? " enrw__count--over" : ""}`}>
          {text.length} / {MAX_CHARS}
        </span>
      </div>

      <button
        type="button"
        className="btn btn--filled btn--lg btn--block"
        disabled={!canSubmit}
        onClick={submit}
      >
        {state.status === "loading" ? "Rewriting…" : "Rewrite"}
      </button>

      {over ? (
        <p className="enrw__note enrw__note--warn">
          The free tool takes up to {MAX_CHARS} characters. The app has no such limit.
        </p>
      ) : (
        <p className="enrw__note">
          Free, no account, 5 rewrites a day. Your text is sent for the rewrite and is not
          kept afterwards.
        </p>
      )}

      {state.status === "error" ? (
        <div className="enrw__result enrw__result--error" role="status">
          <p className="mac-doc__p">{state.message}</p>
          {state.capped ? (
            <a className="btn btn--filled" href={MAC_DOWNLOAD_URL}>
              Download for Mac
            </a>
          ) : null}
        </div>
      ) : null}

      {state.status === "done" ? (
        <div className="enrw__result" role="status" aria-live="polite">
          {state.candidates.map((candidate, index) => (
            <div key={index} className="enrw__candidate">
              <span className="enrw__candidateTag">
                {index === 0 ? "Straightforward" : "More polished"}
              </span>
              <p className="enrw__candidateText">{candidate}</p>
              <button
                type="button"
                className="btn btn--outline enrw__copy"
                onClick={() => copy(candidate, index)}
              >
                {copied === index ? "Copied" : "Copy"}
              </button>
            </div>
          ))}
          <p className="enrw__note">
            {state.remaining} of 5 free rewrites left today. In the Mac app this happens in
            the field you are already typing in — no pasting, no copying back.
          </p>
        </div>
      ) : null}
    </div>
  );
}
