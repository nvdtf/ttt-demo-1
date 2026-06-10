# Data Model: Tic-Tac-Toe Game

**Feature**: 001-tic-tac-toe | **Date**: 2026-06-10

## Overview

All game state lives in-memory as JavaScript variables. There is no persistent storage, no serialization, and no backend. State resets on page reload (per spec assumptions).

## Entities

### Board

Represents the 3×3 game grid.

| Field | Type | Description |
|-------|------|-------------|
| `board` | `Array<string \| null>` (length 9) | Each element is `'X'`, `'O'`, or `null` (empty). Indexed 0–8, left-to-right, top-to-bottom. |

**Index mapping**:
```
 0 | 1 | 2
-----------
 3 | 4 | 5
-----------
 6 | 7 | 8
```

**Validation rules**:
- A cell can only be set if its current value is `null` (FR-004).
- A cell can only be set if the game is not over (FR-008).

### Current Player

Tracks whose turn it is.

| Field | Type | Description |
|-------|------|-------------|
| `currentPlayer` | `string` | Either `'X'` or `'O'`. Initialized to `'X'` (FR-002). |

**State transitions**:
- After a valid move: toggles from `'X'` → `'O'` or `'O'` → `'X'`.
- On restart: resets to `'X'`.

### Game Over Flag

Indicates whether the game has ended.

| Field | Type | Description |
|-------|------|-------------|
| `gameOver` | `boolean` | `false` during active play; `true` after a win or draw is detected. |

**State transitions**:
- Set to `true` when a win condition (FR-005) or draw condition (FR-006) is detected.
- On restart: resets to `false`.

### Winning Combinations

Static lookup table for win detection.

| Field | Type | Description |
|-------|------|-------------|
| `WINNING_COMBOS` | `Array<[number, number, number]>` (length 8) | Constant. Each element is a triple of board indices that form a winning line. |

**Values**:
```javascript
[
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
  [0, 4, 8], [2, 4, 6]              // diagonals
]
```

## State Transitions

```
[Initial Load / Restart]
        │
        ▼
  ┌─────────────┐
  │  PLAYING     │  board: all null, currentPlayer: 'X', gameOver: false
  │              │
  │  on click:   │
  │  - validate  │──► (occupied cell or gameOver → ignore)
  │  - place mark│
  │  - check win │──► WIN detected → gameOver: true, highlight winning cells
  │  - check draw│──► DRAW detected (9 moves, no win) → gameOver: true
  │  - toggle    │
  │    player    │
  └──────┬───────┘
         │ (restart button clicked)
         ▼
  [Reset to Initial State]
```

## Relationships

- **Board ↔ Current Player**: The mark placed in a cell matches `currentPlayer` at the time of the click.
- **Board ↔ Winning Combinations**: Win detection cross-references board values against the 8 combinations.
- **Game Over ↔ Board**: `gameOver` is derived from board state (win or all cells filled) but stored as a separate flag for efficient click gating.
