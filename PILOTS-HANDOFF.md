# Pilot pages and Guillaume — handoff for Maurus

Review: https://vimo33.github.io/bildspur-case-study/pilots/
German: https://vimo33.github.io/bildspur-case-study/pilots/de/

This is an independent review package. It does not change Netlify or recover the main website's canonical source. MiDeyah already has write access to this repository.

## Included

RTW: an authored fictional freight-workflow illustration. No client, shipment, supplier or price records were copied.

MPS: an authored Kenya interface study, inspired by the supplied Evi network views. The food, climate and debt categories explain the research approach. Colours identify research areas; nodes, connections and categories are illustrative. No country-risk ratings, forecasts or actual findings are represented.

Evi / Earth Voice Index: the three screenshots supplied by Vikas, retaining their illustrative-sample-data qualifications, with a system / variables / detail gallery and full-size image links. The accompanying multi-agent UI explains independent research, cross-checking, evidence and expert judgement. It is a method illustration, not a live research run.

Museum: a reserved entry and a short preview-to-follow page. Maurus will supply the approved material. No institution, purpose or result is invented.

Guillaume: edited portrait matching the existing cool outdoor team photographs. Bio is based on Vikas's supplied expertise: management consulting, forecasting, geopolitical and sovereign-risk analysis, decision-support and intelligence, LLM and multi-agent pipelines, AI and data engineering. He is listed as Guillaume because a surname was not supplied; no LinkedIn is invented.

## Edit and rebuild

Edit `pilot-update/content.json` and `pilot-update/guillaume-profile.json`. The native HTML renderers are `renderer.py` and `pilot_ui.py`. Styles and enhancement code are `docs/pilot-assets/pilots.css` and `pilots.js`.

Use Python 3.10+ and Node 22+. No packages, API keys or external services are needed:

```
npm run build:pages
```

This preserves and rebuilds the existing Bildspur pages, then builds all ten pilot-review routes with the GitHub project base path. `npm run build:pilots` rebuilds only pilots. Generated integration fragments are in `pilot-update/fragments/` and use the main site's root paths.

For a standalone root-hosted pilot export, run `python pilot-update/build.py` with no base. Do not use that root-hosted output for GitHub project Pages without rebuilding with the base path.

## Integrate into the latest FTR website

1. Start from the canonical current website repository, connect it to GitHub if needed, and share that repository/branch with Vikas. Do not replace it with the downloaded published HTML used as a local reference.
2. Adapt `fragments/projects-pilots-en.html` and `-de.html` as a Pilots subgroup inside the existing Projects board, after Bildspur. Copy `pilot-overlays-en.html` / `-de.html` into the existing `case-overlay`. The published controller enumerates `data-case-open` triggers and matching `data-sector` articles at initial load; all articles must exist before that initialization. Keep the native overlay focus, inert, Escape and scroll handling. Supported links are `#projects/rtw`, `#projects/museum`, `#projects/mps`, `#projects/evi`.
3. Copy `docs/pilot-assets/` to the site's public root. Load `pilots.css` and `pilots.js`. The JavaScript only enhances research tabs, sample-variable selection and the Evi screenshot gallery; it never connects to a pilot app, AI service or operational system.
4. Add the Guillaume team fragment before the network tile. Use the edited image, supplied bio and descriptive expertise label. Update the intro to Five perspectives / Fünf Perspektiven, and add the corresponding canonical translation keys. This handoff has static EN/DE strings, not the owner's translation-store source. Keep the team carousel dynamic for five members plus the network tile, and check its new width and mobile progression.
5. Retain the previously approved Tim portrait, replacing the placeholder and old coming-soon alt text in both languages. The main website source still needs this update.
6. Verify the five-row Projects board, each overlay, close/focus return, DE language switching, research/gallery keyboard arrows, 360px layout and team progression before deploying the main website. The standalone review is checked independently; native main-site integration must be checked against the canonical source.

`docs/pilots/review.css` supplies document-level styles for the independent review only. Do not load it in the main site: native sector/team styles should remain authoritative. Review pages carry noindex/nofollow; this is search guidance, not access control.

## Public-content boundary

Only project purpose, pilot status, broad method and illustrative interface views belong in this public package. Client research, private source repositories, prompts, source documents, contacts, pricing, forecasts and operational records are excluded. Any later real findings or client-specific content needs explicit publication approval before it is added. Do not treat a password, a hidden route or noindex as confidentiality protection.

## Legacy cleanup

The blank Guillaume-bio review note is replaced by the supplied bio. Museum's reserved entry should be replaced when Maurus provides approved content. Existing Bildspur routes, recordings and handoff remain current and are preserved. No stale branch, worktree or production configuration is removed by this update.
