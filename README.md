# Portfolio Rebuild — Ajayi Abisola Enoch

## What this is

A ground-up rebuild of my personal portfolio site, moving off a static HTML setup and into a proper React app: Vite + TypeScript + React Router on the frontend, Firebase/Firestore on the backend for projects, skills, and certifications. The goal wasn't just a redesign — it was making the site actually work the way a portfolio should when a recruiter or client opens it cold, on a phone, with ten seconds of patience.

## Why I rebuilt it

The old version worked, but it was starting to show its age: content was hardcoded into HTML files, so updating a project or a skill meant editing markup by hand. There was no real content management, the contact form didn't actually send anywhere, and the whole thing read a little more like a personal blog than a hire-me page. I wanted something I could update from a CMS, that loaded fast, and that led with the work instead of burying it under personality.

## What's in it

**Content is data-driven.** Projects, skills/tools, and certifications all live in Firestore and get pulled in through a shared `useCollection` hook, ordered by an `order` field. Adding a new project doesn't mean touching code.

**Case studies open in place.** Instead of clicking into a separate page and losing your spot, project cards open a modal with the full breakdown — role, timeline, process, challenges, outcome, and a screenshot gallery — right where you are. Same pattern on the Work page and the homepage teaser grid, so it behaves the same everywhere.

**Filtering that matches how I actually categorize my work** — Redesign Concept, Restaurant, NGO website, SaaS, Portfolio — instead of showing whatever tags happen to exist in the database.

**A CV you can actually preview**, not just download blind. Clicking "Preview CV" pops open an embedded PDF viewer in a modal, with a fallback link for phones that won't render a PDF inline (looking at you, mobile Safari).

**Contact that isn't fake.** The old contact form collected a message and then quietly did nothing with it — no backend wired up, just a fake "sent!" message. I pulled it and replaced it with a direct-contact card: real `mailto:` and WhatsApp links, a CV download, and links to LinkedIn and Instagram. Nothing pretends to work that doesn't.

**One coherent closing section.** FAQ and Contact used to be two separate blocks with a hard visual seam between them. They're merged into a single section now, and the FAQ itself is ordered the way a recruiter would actually ask it — availability, stack, remote work, how I work, then how to reach me — instead of leading with personality trivia.

**Cleaned-up navigation.** Trimmed a redundant FAQ/Contact split in the nav bar down to one link, since they point at the same merged section anyway.

## Under the hood

- **React 18 + TypeScript + Vite** for the app shell and build
- **React Router v6** for routing, including a dedicated case-study route that still exists for deep-linking even though the primary flow is now the in-page modal
- **Firebase / Firestore** for content — no backend server to maintain, content updates happen straight from the database
- Component-driven structure: shared `ProjectCard`, `CertCard`, `SkillCard`, `FadeIn`, and modal components (`CaseStudyModal`, `CvPreviewModal`) reused across Home, About, and Work instead of duplicated per page
- A single design-token stylesheet (CSS custom properties for color, spacing, radius, shadow) with light/dark theme support baked in from the start

## SEO and accessibility passes

This wasn't just a visual reskin — I went back through and audited the whole thing against real SEO and UI/UX standards, not just "does it look right":

- Fixed a missing `<h1>` on the About page (every other page had one; About didn't, which meant it had no clear topic heading for search engines or screen readers)
- Turned project and certification titles from plain `<div>`s into real heading tags, so they read as structured content instead of invisible text
- Added `aria-live` regions to loading states so screen readers actually announce when content finishes loading
- Reserved image aspect ratios on certification cards to stop layout shift while images load
- Brought interaction patterns in line with each other — certification cards now get the same hover lift as project cards, instead of one feeling more "alive" than the other
- Per-route meta tags (title, description, Open Graph, Twitter Card) so sharing a link to `/work` or `/certifications` doesn't just show the homepage's generic preview

Still on the list: getting a real profile photo into the build (the current one's a placeholder gap left over from the migration), adding a favicon, resolving a domain mismatch between the sitemap and the actual live URL, and wiring shallow routing so case-study modals get real, shareable URLs without giving up the in-page modal experience.

## Status

Actively maintained — this is the site I point recruiters and clients to, so it gets iterated on continuously rather than shipped once and left alone.
