# Handoff for Maurus and his agent

Review: https://vimo33.github.io/bildspur-case-study/
English: /case-studies/bildspur/
German: /de/fallstudien/bildspur/

## Connect the canonical website to GitHub

Please connect the existing Netlify production project to its canonical GitHub source repository, preserving the current live EN/DE website and Netlify build settings. Share the repository URL, production branch, deployed commit SHA and repository access with Vikas so future changes can start from a safe fetch/pull of the latest version.

If the project already has a GitHub connection, share that existing repository and access. Do not create a duplicate source of truth or overwrite newer collaborator work with an older local snapshot.

## Integrate the case study

This package is an independent case-study implementation, not a recovered checkout of the main website. Run npm run build:production (Node 22+, no dependencies), then adapt docs/case-studies/bildspur/ and docs/de/fallstudien/bildspur/ into the latest source. Copy the referenced case-assets, fonts, logo and favicon. The standalone CSS has document-level rules; scope it if embedding in an existing overlay. Link the existing Bildspur OS project entry to the case study. Review noindex rules can remain until the production publication decision.

## Tim Fuchs portrait

Use docs/team/tim-fuchs.png as the Tim Fuchs portrait asset (normally public/team/tim-fuchs.png in the main repo). Replace the placeholder source and set the image alt text to Tim Fuchs in both languages. Remove the old portrait-coming-soon translation from that image.

## Media qualifications

The lighting room is a demonstration layout in the current engine, with hardware sockets disabled. It does not claim a physical installation. Inventory and Structure Builder are fresh recordings. The OS still is an earlier read-only snapshot. The two finished social films are from the July 2026 campaign; their exact Instagram publication order is not verified. Original Bildspur × Samsbird website credits are retained.

## Review-only footer

Run `npm run build:production` for integration to omit the review-files footer link. The `/handoff/` route belongs only to the separate review site and should be omitted from the main production copy. This flag leaves the actual case-study content unchanged.

## Get the files

Repository: https://github.com/vimo33/bildspur-case-study

Use Code → Download ZIP or clone this repository. All recordings, images and the edited Tim portrait are included under docs/. No production credentials or engine configuration are included.

## Pilot pages and Guillaume

The 18 November update is described in [PILOTS-HANDOFF.md](PILOTS-HANDOFF.md), with a separate [pilot preview](https://vimo33.github.io/bildspur-case-study/pilots/). Its fragments are intended for the latest canonical homepage; the standalone review stylesheet should not be embedded in that homepage.
