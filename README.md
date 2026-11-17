# Bildspur case-study review

Independent English/German case study for Follow the Rabbit, prepared 17 November 2026. This project is a separate review site. It does not contain the authoring source for the current FTR homepage.

Repository: https://github.com/vimo33/bildspur-case-study

Preview: https://vimo33.github.io/bildspur-case-study/

Maurus (MiDeyah) is the intended collaborator. This repository contains only this independent case study and review assets, not the canonical source of the main FTR website.

## Edit and build

Requires Node 22+. No dependencies. Edit `content.json`, then run `npm run build:pages` for this GitHub Pages review. Complete static output is in `docs/`. Serve that directory with any static HTTP server. The English page is `/case-studies/bildspur/` (also the review site's root); German is `/de/fallstudien/bildspur/`.

Styles and media are in `docs/case-assets/`. Native video players provide pause, seek, fullscreen and separate full-recording links. Files load only when played. No tracking or app connections are required by the page. Each silent video includes an expandable descriptive text alternative. Use `npm run build:production` to omit the review-only footer link when integrating into the main website.

## Integration

See HANDOFF.md. Copy the case-study routes, assets, fonts and FTR logo into the canonical website only after checking Maurus's latest source. Retain the current live site and its build settings. Review pages deliberately use noindex/nofollow.

## Evidence

The lighting clip runs the current installed engine in an isolated no-hardware harness. The demonstration layout combines a saved 16-tube mapping with four floor and four wall tubes added only to the isolated copy. It is labelled a demonstration, not evidence of a physical installation. The clip shows Flow, Pulse Rain, Aurora Field and camera orbits.

Inventory is a fresh screen recording of collection scrolling, an item detail, discovery and the map. The Structure Builder recording selects the Cat 16 hanging-mask preset and orbits the model. The OS still is an earlier read-only interface snapshot, not current operational truth. The website image is the public site captured 17 November 2026, retaining original project credits.

The two vertical films are completed July 2026 alpha-campaign reels from the lab and product sequence. They are not represented as the latest Instagram posts. Tim's portrait is the supplied photo cropped and background-edited to match the team's existing outdoor portraits.

## Legacy cleanup

The old LED portfolio clip and directional social reference board are superseded in this review package. They remain in the original local preview for provenance. Older website snapshots and collaborator work are preserved. No production DNS or Netlify changes are part of this handoff.

## Verification

All five MP4s were probed for browser-compatible H.264 / yuv420p playback. Both generated languages have six sections, five players and local assets. Independent Codex CLI review raised descriptive alternatives and production-footer integration; both were addressed.
