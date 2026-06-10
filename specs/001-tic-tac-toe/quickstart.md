# Quickstart Validation Guide: Tic-Tac-Toe Game

**Feature**: 001-tic-tac-toe | **Date**: 2026-06-10

## Prerequisites

- A modern browser (Chrome, Firefox, Safari, or Edge — latest two major versions)
- A static file server **or** direct file access (e.g., `open index.html` / double-click)

## Setup

No build step, no install. The game consists of three files at the repository root:

```
index.html
style.css
game.js
```

### Option A: Direct file open

```bash
open index.html
# or on Linux: xdg-open index.html
```

### Option B: Local HTTP server (for full browser compatibility)

```bash
# Python 3
python3 -m http.server 8000

# Then visit http://localhost:8000
```

## Validation Scenarios

### Scenario 1: Full Game — X Wins (User Story 1, SC-002)

1. Open the game in a browser.
2. Verify: a 3×3 empty grid is displayed, and the status reads "Player X's turn" (or similar).
3. Click the top-left cell → X appears; status changes to "Player O's turn".
4. Click the center cell → O appears; status changes to "Player X's turn".
5. Click the top-center cell → X appears.
6. Click the bottom-left cell → O appears.
7. Click the top-right cell → X appears (completing the top row).
8. **Expected outcome**: Status announces X as the winner. The top row cells (0, 1, 2) are visually highlighted (FR-011). Clicking any cell does nothing (FR-008).

### Scenario 2: Draw Game (User Story 1, SC-003)

1. Play moves in this order (cell indices): X→4, O→0, X→2, O→6, X→3, O→5, X→1, O→7, X→8.
2. Final board state: `O X X / X X O / O O X` — all nine cells filled, no three-in-a-row for either player.
3. **Expected outcome**: Status announces a draw. No cells are highlighted. Further clicks are ignored.

### Scenario 3: Restart During Play (User Story 2)

1. Make 2–3 moves (place some X and O marks).
2. Click the restart button.
3. **Expected outcome**: Board clears to empty. Status resets to "Player X's turn". No result message shown.

### Scenario 4: Restart After Win (User Story 2, SC-004)

1. Complete a game (win or draw per Scenario 1 or 2).
2. Click the restart button.
3. **Expected outcome**: Board clears within 1 second. Turn resets to X. Winning highlights are removed. Game is fully playable again.

### Scenario 5: Occupied Cell Click (Edge Case)

1. Place an X in the center cell.
2. Click the center cell again (now O's turn).
3. **Expected outcome**: Nothing happens — the cell still shows X, and it remains O's turn.

### Scenario 6: Mobile Responsiveness (R13)

1. Open the game on a phone (or resize browser to 320px width).
2. **Expected outcome**: The board fits the viewport. All cells are tappable (minimum 44×44px touch targets). The game is fully playable.

### Scenario 7: Visual Distinction (FR-012, User Story 3)

1. During play, observe the X and O marks.
2. **Expected outcome**: X and O are visually distinct (different colors — blue for X, red for O per research.md decisions).

## Success Criteria Cross-Reference

| Criterion | How to verify | Scenario |
|-----------|--------------|----------|
| SC-001 | Complete a game in under 60s of active play | 1, 2 |
| SC-002 | Win with each of 8 possible lines; all detected | 1 (repeat for other lines) |
| SC-003 | Fill all 9 cells with no winner; draw announced | 2 |
| SC-004 | Restart completes within 1 second | 4 |
| SC-005 | Play multiple games without page reload | 4 |
| SC-006 | Page loads and is interactive within 2 seconds | Any (measure on broadband) |

## What This Guide Does NOT Cover

- Full implementation code (see `tasks.md` when generated)
- Automated test suites (out of scope per tech constraints — no test framework)
- Data model details (see `data-model.md`)
