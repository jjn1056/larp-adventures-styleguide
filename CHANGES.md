# Changelog — poc-refinement branch

## Summary

This branch is a comprehensive overhaul of the LARP Adventures style guide, touching 60 files with roughly 4,200 additions and 6,700 deletions. The major themes are:

1. **Theme consolidation** — Stripped 8 themes down to 2 (PHB + Tavern at Night), eliminating ~5,000 lines of unused CSS.
2. **Terminology and content cleanup** — Renamed "coalition" to "faction" throughout, removed forums entirely, separated Rules and Lore into distinct hubs.
3. **Standardized navigation and accessibility** — Consistent public navbar, breadcrumbs, and WCAG compliance (skip links, labels, aria attributes) across all 44 pages.
4. **Landing page redesign** — Restructured hero section, added inline ticket purchase, Choose Your Path showcase, brand iconography, and streamlined the new-player funnel (What is LARP → Start Your Journey).
5. **Onboarding funnel refinement** — Simplified join wizard (removed redundant faction step), added character builder success panel with join prompt, chained the two flows together.
6. **Character builder improvements** — Updated to real 4-path system (Warrior/Rogue/Mage/Healer), added accessibility/accommodations step, added success panel with character summary.
7. **Portal sidebar overhaul** — Collapsible sections with localStorage persistence, overflow-y fix, standardized across all portal pages.
8. **Public guest checkout** — New 4-step wizard (Tickets → Your Info → Payment → Confirm) allowing unauthenticated ticket purchase with post-payment account creation prompt.

---

## Detailed Changes

### Theming

- **Stripped themes to PHB + Tavern only.** Removed 8 theme CSS files: arcane, base, dungeon, fey, frost, highcontrast, traveller, whitebox (~5,000 lines deleted).
- **Set PHB as default theme** (`data-theme="phb"`) across all 42 pages.
- **Updated theme switcher** (`js/theme-switcher.js`) to only offer PHB and Tavern options.

### Terminology and Content

- **Renamed "coalition" to "faction"** throughout all HTML files and UI copy.
- **Removed forums entirely.** Deleted `portal/forum-index.html` and `portal/forum-thread.html` (~615 lines). Updated all sidebar and navigation references.
- **Created `public/lore-hub.html`** as a dedicated Lore/World landing page.
- **Made `public/hub.html` Rules-only** — separated Rules and Lore content into their respective hubs.

### Navigation and Accessibility

- **Standardized public site navbar** across all public pages: Home | Events | Rules | Lore | News | FAQ | Player Portal button.
- **Added breadcrumbs** to all public pages for consistent wayfinding.
- **WCAG accessibility pass** across all 44 pages: skip-to-content links, `id="main-content"` on primary content, `aria-label` on inputs, `aria-hidden="true"` on decorative icons, associated labels on all form controls.
- **Added `js/sidebar-collapse.js`** — Persists collapsed/expanded state of portal sidebar sections to localStorage.
- **Fixed portal sidebar overflow** — Added `overflow-y: auto` to all portal sidebars.
- **Standardized portal sidebars** with collapsible Play, Events, and Community sections.

### Landing Page (`public/landing.html`)

- Restructured hero section: image on left, copy on right, two CTA buttons (What is LARP + Start Your Journey) with custom SVG glyphs.
- Added shield+sword brand icon to navbar across all pages.
- Expanded Next Adventure section with inline ticket pricing card, event image, simplified bullet highlights, and prominent "View full schedule" link.
- Added Choose Your Path section showcasing the 4 character paths with stats.
- Merged "What is LARP" and "New to LARP" sections into one cohesive block.
- Simplified "How to Get Started" to 3 steps: Create Account → Register for Event → Join the Adventure.
- Added placeholder images to What is LARP cards and Rites of Spring event card.

### Intro Page (`public/intro.html`)

- Standardized navbar, breadcrumbs, and footer to match landing page.
- Removed redundant "Join Our Community" section.
- Restyled bottom CTA as callout box with image placeholder.
- Added "Build Your Character" button to CTA section.

### Join Wizard (`public/join.html`)

- Replaced custom header with standard public navbar and breadcrumbs.
- Removed faction selection step (now handled in character builder).
- Kept mentor matching step.
- Removed back button from step 1 (entry point — nowhere to go back to).
- Chained wizard completion to character builder on success.

### Character Builder (`public/character-builder.html`)

- Updated to real 4-path system: Warrior (3 AP), Rogue (2 AP), Mage (spellbook), Healer (2 AP).
- Added Step 5: Accessibility & Accommodations (mobility, hearing, vision, dietary needs, emergency contact).
- Added success panel with character summary and "Join to Save" prompt.
- Synced navbar with standard public navigation.
- Fixed path card grid to keep all 4 cards on one row.
- Replaced "View Character Sheet" button with inline character summary on success panel.

### Public Guest Checkout (`public/checkout.html`) — NEW

- 4-step wizard: Tickets → Your Info → Payment → Confirm.
- Standard public navbar with breadcrumbs (Home > Events > Rites of Spring > Checkout).
- **Step 1 (Tickets):** Full ticket selection UI — 4 ticket types (Full Weekend $85, Saturday Day $45, Youth $25, PWYW $10+), 3 add-ons (T-Shirt, Meal Tickets, Scholarship Fund), promo code field, live order summary sidebar.
- **Step 2 (Your Info):** Guest contact form (first name, last name, email, phone) with "Already have an account? Sign in" prompt.
- **Step 3 (Payment):** Placeholder payment form (card/PayPal radio, card number, expiry, CVC) with "Pay $XX.XX" button showing live total.
- **Step 4 (Confirm):** Success confirmation with order recap and two account creation paths:
  - **Secure My Registration** — Low-friction password-only signup framed as protecting the purchase.
  - **Become a Player** — Full join wizard path with benefit checklist (booking management, character creation, faction selection, mentor matching, Player Portal access).
- Continue button lives in sticky order summary sidebar (always visible), adapts per step.
- Updated `public/event-detail.html` and `public/landing.html` Buy Tickets links to point to new public checkout instead of portal checkout.
- Portal checkout (`portal/checkout.html`) left untouched for logged-in users.

### Portal Pages

- **Dashboard (`portal/dashboard.html`):** Added event type filter UI to digest section.
- **Faction group (`portal/group.html`):** Added event attendance display to member list.
- **All portal pages with sidebar:** Standardized collapsible sidebar sections, added sidebar-collapse.js, fixed overflow scrolling.
- **Placeholder images** added throughout portal pages (character, feed, lore, marketplace, notifications, profile, settings, spellbook, wiki, world).

### Documentation

- **Added `DESIGN-NOTES.md`** with implementation notes for converting the style guide into a production application.
- **Added `public/quickstart.html`** — Quick Start Guide page template for new players.
