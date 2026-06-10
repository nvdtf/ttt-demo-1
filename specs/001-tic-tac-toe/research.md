# Research: Tic-Tac-Toe Game

**Feature**: 001-tic-tac-toe | **Date**: 2026-06-10

## Overview

No NEEDS CLARIFICATION items were present in the Technical Context — the constitution and spec fully constrain the technology stack. This research focuses on resolving the deferred probe dimensions (D2–D7) with reasonable defaults and documenting best practices for the chosen approach.

## Deferred Probe Decisions

These dimensions are explicitly deferred to the probe (per spec). The implementation will use reasonable defaults; the deployed probe will validate these choices visually before further investment (per Constitution Principle III).

### D2 — Mark Rendering

- **Decision**: Plain text characters styled with CSS (option a)
- **Rationale**: Simplest approach, zero dependencies, works across all browsers, easy to style with font-size/color. Meets FR-012 (visual distinction) via CSS color differentiation alone.
- **Alternatives considered**:
  - Inline SVG: More visual polish but adds complexity for a probe; can be upgraded later if feedback warrants it.
  - CSS-only shapes: Brittle across viewport sizes; pseudo-element centering adds unnecessary CSS complexity.

### D3 — Result Announcement Method

- **Decision**: Inline text replacing turn indicator (option a)
- **Rationale**: Simplest to implement — reuse the existing turn-indicator element to show the result. No overlay logic, no layout shifts, no dismiss handling. Meets FR-007 (display result) directly.
- **Alternatives considered**:
  - Modal overlay: Requires overlay markup, z-index management, close button — overengineered for a probe.
  - Slide-in banner: Requires CSS animation and layout push — unnecessary complexity.

### D5 — Board Visual Style

- **Decision**: Minimal hairline grid (option a)
- **Rationale**: Fastest to implement with CSS borders. Clean, readable, and responsive. The probe exists to test gameplay flow, not visual polish.
- **Alternatives considered**:
  - Bold retro: More opinionated; styling can be layered on after probe feedback.
  - Card-based cells: Adds box-shadow/padding complexity with no gameplay benefit.

### D6 — Color Palette

- **Decision**: Classic two-tone — blue X, red O, white background (option b)
- **Rationale**: Provides clear visual distinction between marks (FR-012) with good contrast ratios. More informative than monochrome while avoiding the complexity of a full dark theme.
- **Alternatives considered**:
  - Monochrome: Meets FR-012 less clearly — relies on shape alone for mark distinction.
  - Dark theme: Requires more deliberate contrast work; better suited as an enhancement after probe validation.

### D7 — Cell Hover & Placement Feel

- **Decision**: Subtle background tint on hover (option b)
- **Rationale**: Provides affordance that cells are clickable without the complexity of rendering ghost marks. Simple CSS `:hover` rule — one line of CSS.
- **Alternatives considered**:
  - No hover: Functional but provides no interactivity cue; feels unresponsive.
  - Ghost preview: Requires JS to render the current player's mark on hover and remove on mouseout — disproportionate complexity for a probe.

## Best Practices for Vanilla JS Static Game

### State Management

- Use a single array (length 9) to represent the board, indexed 0–8 (left-to-right, top-to-bottom).
- Track current player as a string (`'X'` or `'O'`), toggled after each valid move.
- Track game-over state with a boolean flag to gate click handling.

### Win Detection

- Predefine the 8 winning combinations as an array of index triples.
- After each move, check only the combinations that include the placed cell (optimization is unnecessary for 8 checks, but the precomputed array is the standard pattern).

### DOM Strategy

- Query cells once on load; attach a single click handler to the board container (event delegation) rather than 9 individual handlers.
- Update cell text content and classes on each move; avoid `innerHTML` for security and simplicity.

### Responsive Layout

- Use CSS Grid for the 3×3 board (`grid-template-columns: repeat(3, 1fr)`).
- Set board `max-width` with percentage-based or `vmin`-based sizing for mobile-first scaling.
- Ensure minimum touch target size of 44×44px (WCAG) on mobile viewports.

### Winning Highlight

- When a win is detected, add a CSS class to the three winning cells. Keep highlight logic in CSS (e.g., background-color change), triggered by the class — no JS animation needed.
