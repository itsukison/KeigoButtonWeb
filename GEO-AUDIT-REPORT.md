# GEO + SEO Final Audit — KeigoButton

Audit date: 2026-08-19  
Primary site: https://keigobutton.com  
Business type: SaaS / desktop and mobile writing utility

## Executive summary

The repository-side SEO and GEO foundation is complete for the current desktop push. The four Japanese and English workflow pages are statically rendered, internally linked, self-canonical, paired with reciprocal language annotations, included in the sitemap and LLM discovery files, and supported by valid structured data.

The conservative overall GEO score is **55/100**. This is not because the new pages are weak: their citability scores are 80–84/100 and the post-deployment technical score is estimated at 89/100. The overall score is held down primarily by minimal third-party brand authority and a production deployment that does not yet contain these changes.

## Score breakdown

| Category | Score | Weight | Weighted score |
|---|---:|---:|---:|
| AI citability | 74/100 | 25% | 18.5 |
| Brand authority | 9/100 | 20% | 1.8 |
| Content E-E-A-T | 60/100 | 20% | 12.0 |
| Technical GEO | 89/100 | 15% | 13.4 |
| Schema and structured data | 78/100 | 10% | 7.8 |
| Platform optimization | 18/100 | 10% | 1.8 |
| **Overall** |  |  | **55/100** |

## What is complete locally

- Four focused workflow pages:
  - `/mac/reply-assistant`
  - `/en/mac/reply-assistant`
  - `/mac/custom-rewrite-prompts`
  - `/en/mac/custom-rewrite-prompts`
- Direct footer links from the Japanese and English homepages.
- Three unique topical internal links from every workflow page.
- Self-referencing canonical URLs.
- Reciprocal Japanese/English `hreflang` plus Japanese `x-default`.
- Static HTML containing headings, body copy, links, FAQ answers, metadata, and JSON-LD.
- Organization, WebSite, SoftwareApplication, Article, FAQPage, and BreadcrumbList schema.
- Sitemap generated from content registries: 44 unique URLs.
- `llms.txt` and `llms-full.txt` generated from visible pages.
- Explicit access for major search and AI crawlers in `robots.txt`.
- Security headers, English/Chinese `Content-Language` headers, Google/Bing verification hooks, and IndexNow submission tooling.
- More accurate landing-page wording about review-before-insert, Accessibility setup, field compatibility, and the Copy fallback.
- All landing FAQ answers server-rendered with semantic `<details>` elements.
- Core7 company-site sources updated from the old Vercel hostname to `keigobutton.com` and expanded to describe both Mac and iPhone.
- Mac repository README aligned with the official product definition and canonical site.

## Verification results

- `npm run build` in `web/`: passed, 62 routes generated.
- `npx tsc --noEmit --incremental false`: passed.
- `git diff --check`: passed.
- Core7 site `npm run build`: passed.
- Generated sitemap URL count: 44.
- New workflow-page citability: 80–84/100.
- AI crawler access: 100/100.
- New-page JSON-LD syntax and type validity: 100%.

## Remaining limitations

### Production is still on the older deployment

At audit time, all four new workflow URLs return 404 in production and the live sitemap contains 40 rather than 44 URLs. Search submission must wait until both the product site and updated Core7 site have been deployed.

### Brand authority is the largest GEO weakness

Positive third-party evidence exists in the App Store and IDEAVALU, but no meaningful exact-brand YouTube presence, Reddit discussion, independent Mac review, or complete LinkedIn company presence was found. This cannot be fixed honestly with schema or generated articles.

### First-party evidence is still limited

The new pages contain concrete examples and transparent limitations, but they do not yet include a dated app-compatibility test matrix, a real workflow recording, or a published benchmark methodology. These are better future additions than generic articles.

### Known low-severity language limitation

Localized routes server-render their content inside a correct `lang="en"` or `lang="zh-Hans"` wrapper and now emit the matching `Content-Language` header. The top-level `<html>` attribute remains Japanese until client hydration because of the current mixed prefixed/unprefixed route architecture. Correcting that would require a broad multiple-root-layout migration and is not justified for this release.

## Manual owner checklist

Do these in order:

1. Deploy the `web` changes and the `Core7landing` changes.
2. Verify that the four workflow URLs return 200 and `https://keigobutton.com/sitemap.xml` contains 44 `<loc>` entries.
3. Add `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` to the web deployment environment if using HTML verification instead of DNS.
4. In Google Search Console, submit `https://keigobutton.com/sitemap.xml` and request indexing for `/`, `/en`, and the four new workflow pages.
5. In Bing Webmaster Tools, verify or import the site and submit the same sitemap.
6. From `web/`, run `npm run seo:indexnow` after the IndexNow key file is live.
7. In App Store Connect, change support, privacy, and marketing URLs from `keigobutton.vercel.app` to the corresponding `keigobutton.com` URLs.
8. In the Vercel domain settings, make sure `www.keigobutton.com` permanently redirects to the apex domain. It returned a temporary 307 during the audit.
9. Update the public GitHub repository description, homepage, and topics to point to `https://keigobutton.com/`.
10. Ask IDEAVALU to add the Mac release and canonical product URL to its existing product coverage.
11. Publish real demonstrations and seek independent Mac-app reviews. Do not create Wikipedia or manufactured community mentions at the current authority level.

## Monitoring

Review monthly:

- indexed status of all six desktop entry pages;
- impressions and clicks by page, query, and language;
- download clicks, app launches, Accessibility grants, first rewrites, and repeated use within seven days;
- correct KeigoButton mentions and citations in Google AI surfaces, ChatGPT Search, Perplexity, and Bing Copilot;
- third-party links and mentions;
- Core Web Vitals once sufficient field data exists.

