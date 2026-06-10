# Tasks: Tic-Tac-Toe Game

**Input**: Design documents from `/specs/001-tic-tac-toe/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not included — spec calls for manual browser testing only (no test framework).

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Flat layout at repository root per plan.md — three source files total:

```
index.html    # Game markup
style.css     # All styles (mobile-first responsive)
game.js       # Game logic and DOM interaction
```

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the three source files with initial structure

- [ ] T001 Create index.html with HTML5 boilerplate, viewport meta tag, links to style.css and game.js (defer), game container div, 3x3 grid of cell divs (data-index 0-8), status display element showing "Player X's turn", and a restart button in index.html
- [ ] T002 [P] Create style.css with CSS reset (box-sizing, margin), mobile-first base styles, CSS Grid board layout (grid-template-columns: repeat(3, 1fr)), cell styling with hairline borders, minimum 44x44px touch targets, board max-width using vmin-based sizing for responsive scaling, and centered page layout in style.css
- [ ] T003 [P] Create game.js with DOMContentLoaded listener, DOM element references (board container, all cells via querySelectorAll, status element, restart button), and placeholder initialization call in game.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core game state and reset logic that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Implement game state variables (board: Array(9).fill(null), currentPlayer: 'X', gameOver: false) and WINNING_COMBOS constant (8 triples: 3 rows, 3 columns, 2 diagonals) in game.js
- [ ] T005 Implement resetGame() function that fills board array with null, sets currentPlayer to 'X', sets gameOver to false, clears all cell textContent and CSS classes, and updates status display to "Player X's turn" in game.js

**Checkpoint**: Foundation ready — state management and reset infrastructure in place

---

## Phase 3: User Story 1 — Play a Complete Game Against Another Player (Priority: P1) MVP

**Goal**: Two players alternate placing X and O on the board. The game detects wins (8 possible lines) and draws, displays the result, and prevents further moves.

**Independent Test**: Open index.html, two players click cells taking turns, verify win/draw detection and result display per quickstart.md Scenarios 1, 2, and 5.

### Implementation for User Story 1

- [ ] T006 [US1] Implement handleCellClick(event) using event delegation on the board container: extract cell from event target, read data-index, validate target is a cell, cell is empty (board[index] === null), and gameOver is false in game.js
- [ ] T007 [US1] Implement mark placement inside handleCellClick: set board[index] to currentPlayer, update cell textContent to currentPlayer value in game.js
- [ ] T008 [US1] Implement checkWin() function that iterates WINNING_COMBOS, checks if all three indices in any combo match currentPlayer, and returns the winning combo array (or null) in game.js
- [ ] T009 [US1] Implement checkDraw() function that returns true when every board element is non-null and checkWin() returns null in game.js
- [ ] T010 [US1] Implement post-move game flow inside handleCellClick: call checkWin() — if win, update status to "Player [X/O] wins!", set gameOver to true; else call checkDraw() — if draw, update status to "It's a draw!", set gameOver to true; else toggle currentPlayer ('X'<->'O') and update status to "Player [X/O]'s turn" in game.js

**Checkpoint**: Core game is fully playable — win and draw detection working, moves prevented after game ends

---

## Phase 4: User Story 2 — Restart the Game (Priority: P2)

**Goal**: A restart button resets the board at any time (mid-game or after completion) without page reload.

**Independent Test**: Play a few moves or complete a game, click restart, verify board clears and turn resets to X per quickstart.md Scenarios 3 and 4.

### Implementation for User Story 2

- [ ] T011 [US2] Attach click event listener to restart button that calls resetGame() in game.js

**Checkpoint**: Game is replayable without page reload

---

## Phase 5: User Story 3 — Visual Feedback on Game State (Priority: P3)

**Goal**: Clear visual cues — distinct X/O colors (blue/red), winning cell highlight, and hover affordance on cells.

**Independent Test**: Win a game and verify winning cells are highlighted; observe X marks are blue and O marks are red; hover over cells and see background tint per quickstart.md Scenario 7.

### Implementation for User Story 3

- [ ] T012 [P] [US3] Add .cell-x class (color: #3b82f6 / blue, font-weight bold) and .cell-o class (color: #ef4444 / red, font-weight bold) with appropriate font sizing in style.css
- [ ] T013 [US3] Apply .cell-x or .cell-o class to cell element when placing a mark in the handleCellClick function in game.js
- [ ] T014 [P] [US3] Add .cell-winner class with background-color highlight (e.g., #bbf7d0 / light green) in style.css
- [ ] T015 [US3] Apply .cell-winner class to the three winning cells when checkWin() returns a winning combo — iterate the combo indices and add the class in game.js
- [ ] T016 [P] [US3] Add cell hover effect: .cell:hover background tint (e.g., #f3f4f6) only when cursor is pointer; set cursor: pointer on empty cells in style.css

**Checkpoint**: All visual feedback in place — marks are color-coded, wins highlighted, hover cues active

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and responsive refinements

- [ ] T017 Validate all quickstart.md scenarios (Scenarios 1–7) in a browser, including mobile viewport at 320px width per quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 completion
- **US2 (Phase 4)**: Depends on Phase 2 (resetGame) — independent of US1
- **US3 (Phase 5)**: CSS tasks (T012, T014, T016) depend on Phase 1 only; JS tasks (T013, T015) depend on US1 implementation
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Foundational (Phase 2) — no dependency on other stories
- **User Story 2 (P2)**: Depends on Foundational (Phase 2) — resetGame() is already in Phase 2, so US2 is a single wiring task
- **User Story 3 (P3)**: CSS tasks are independent; JS tasks depend on US1 handleCellClick and checkWin existing

### Within Each User Story

- Sequential within game.js (same file — cannot parallelize)
- CSS tasks in US3 can run in parallel with each other and ahead of JS tasks

### Parallel Opportunities

- **Phase 1**: T002 and T003 can run in parallel (different files); T001 should go first (HTML references CSS/JS)
- **Phase 2**: T004 before T005 (resetGame uses state variables) — sequential
- **Phase 3**: All sequential (same file, each builds on previous)
- **Phase 4**: Single task
- **Phase 5**: T012, T014, T016 can all run in parallel (different CSS concerns); T013 depends on T012 existing; T015 depends on T014 existing

---

## Parallel Example: User Story 3

```text
# CSS tasks — all in style.css but independent selectors, can be written together:
T012: Add .cell-x and .cell-o color classes in style.css
T014: Add .cell-winner highlight class in style.css
T016: Add cell hover effect in style.css

# Then JS tasks — sequential, same file:
T013: Apply mark classes in game.js (needs T012)
T015: Apply winner class in game.js (needs T014)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (create 3 files)
2. Complete Phase 2: Foundational (state + reset)
3. Complete Phase 3: User Story 1 (core gameplay)
4. **STOP AND VALIDATE**: Test via quickstart.md Scenarios 1, 2, 5
5. Playable probe ready for feedback

### Incremental Delivery

1. Setup + Foundational → files created, state managed
2. Add US1 → core game playable (MVP!)
3. Add US2 → restart without reload
4. Add US3 → visual polish (colors, highlights, hover)
5. Polish → full validation pass
6. Each story adds value without breaking previous stories

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- All game logic lives in game.js; all styling in style.css; all markup in index.html
- No test framework — validation is manual per quickstart.md
- Research.md decisions baked into tasks: plain text marks, inline status text, hairline grid, blue/red palette, hover tint
- Commit after each phase completion
