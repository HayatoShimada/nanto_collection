# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NANTO Collection (なんコレ) — a single-page website for a community fashion show event held on 2027/03/14 in Nanto City, Toyama, Japan. The site is currently in the planning/pre-development phase (no application code yet).

## Tech Stack (Planned)

- **Framework:** Next.js
- **Hosting:** Vercel
- **Payments:** Stripe (for donations/sponsorships)
- **Animations:** TBD

## Critical Constraints (from DESIGN.md)

- **No inline CSS.** All styling must be in separate CSS files so colors, fonts, and layout can be adjusted later by the client.
- **All display text must be defined as constants**, not hardcoded in components — content will be revised later.
- **Mobile-first layout** with centered content and side margins on desktop (reference: tsuchiya-randoseru.jp style).
- Details are not finalized — build a flexible framework that allows full design changes later.

## Content & Design References

- `HP_CONTENT.md` — all page copy/text content (Japanese)
- `design1.jpg`, `design2.jpg` — client-provided design drafts
- The site is a single page with sections: Hero, About, Application, Donations, Committee Members, FAQ (accordion), Contact

## Language

All user-facing content is in Japanese. Code, comments, and commit messages should be in English.
