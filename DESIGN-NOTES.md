# Design Notes for Application Implementation

These notes capture decisions and requirements identified during POC development that should inform the application design document.

## News System
- News items should auto-generate when events, rules changes, or lore drops are created
- Social media API posting (X, Facebook, Discord) for news items
- Manual news creation still available for custom announcements

## Admin Surface
- Requirements TBD — current admin pages (dashboard, player-list, player-dossier) are placeholder templates
- Player management (C1-C3 player tiers) already prototyped

## Tech Stack (Proposed)
- PostgreSQL for data persistence
- Docker for deployment
- Web application framework TBD

## Character System
- 4 paths: Warrior, Rogue, Mage, Healer
- 8 tiers of progression (0-7)
- Armor Points as primary defensive stat
- Cross-training between paths allowed
- Character builder wizard: 6 steps (Path, Skills, Faction, Story, Accessibility, Review)

## Portal Features
- Dashboard digest with filterable event types
- Collapsible sidebar sections with localStorage persistence
- Lore drops system (email-style reader with read/unread tracking)
- Spellbook (offline-ready skill reference)
- Faction pages with event attendance tracking
- Marketplace (curated vendor directory, not transactional)
- Mentor/mentee matching system

## Accessibility Requirements
- All pages must have skip-to-content links
- All form inputs must have labels or aria-label
- Decorative icons use aria-hidden="true"
- PHB and Tavern themes should maintain WCAG AA contrast ratios
- Reduced motion preferences respected via CSS media query
- Character builder includes accessibility accommodations step
