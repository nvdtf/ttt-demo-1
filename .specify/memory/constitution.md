<!-- Sync Impact Report
Version change: N/A → 1.0.0
Modified principles: N/A (initial creation)
Added sections:
  - Core Principles (6 principles)
  - Technology Constraints
  - Review & Escalation Process
  - Governance
Removed sections: None (initial creation)
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ compatible
    (Constitution Check section is dynamically filled per-feature)
  - .specify/templates/spec-template.md ✅ compatible
  - .specify/templates/tasks-template.md ✅ compatible
  - .specify/templates/commands/ — no command files found ✅
Follow-up TODOs: None
-->

# TTT Demo Constitution

## Core Principles

### I. Human Authority

Humans decide WHAT to build and WHY at spec altitude; agents own
HOW to implement. Agents MUST NOT override, reinterpret, or expand
scope beyond what the spec states. Implementation decisions
(algorithm choice, code structure, naming) belong to the agent;
product decisions (features, priorities, acceptance criteria)
belong to humans.

### II. Escalation Discipline

Workers MUST escalate only when one of the following conditions is
met and MUST NOT escalate for any other reason:

- **(a)** A spec ambiguity forces a decision that could materially
  affect the deliverable.
- **(b)** A constitutional principle conflicts with another
  principle or with a spec requirement.
- **(c)** An acceptance criterion is technically unachievable
  within the stated constraints.

All other uncertainties MUST be resolved by the worker using
reasonable judgment.

### III. Deployable Probe First

The first milestone of every feature MUST be a deployable probe: a
minimal, end-to-end working slice that can be opened in a browser
and visually verified. No feature plan is valid until it defines
this probe milestone. The probe validates assumptions before
further investment.

### IV. Static Simplicity

The project MUST remain a static site using vanilla JavaScript
with no build step and no backend. Specifically:

- No bundlers, transpilers, or compile-to-JS languages.
- No server-side logic or API endpoints.
- All state MUST be managed client-side.
- Files MUST be directly servable by any static file server.

### V. Requirement Provenance

Every requirement MUST carry provenance: who decided it and at
what weighted percentage of confidence or priority. Requirements
without provenance MUST NOT be treated as ratified. This ensures
traceability and enables informed re-prioritization.

### VI. Spec-Bounded Review

The reviewer MUST arbitrate only against the spec. If the spec is
silent on a style or implementation choice, that decision belongs
to the worker. Reviewers MUST NOT block merges based on preferences
not encoded in the spec or this constitution.

## Technology Constraints

- **Languages**: HTML, CSS, vanilla JavaScript (ES6+).
- **Hosting**: Any static file server (no SSR, no serverless
  functions).
- **Dependencies**: Zero runtime dependencies; no npm, no CDN
  libraries unless explicitly approved in the spec.
- **Browser support**: Modern evergreen browsers (latest two major
  versions).
- **File structure**: Flat or shallow directory layout; no
  generated or compiled output directories.

## Review & Escalation Process

- Every PR MUST include a reviewer check against the spec's
  acceptance criteria.
- Reviewers MUST cite the specific spec section when requesting
  changes.
- Workers MUST document any escalation with the triggering
  condition (a, b, or c from Principle II) and the specific
  blocker.
- Escalations MUST be resolved before the affected task resumes.

## Governance

This constitution is the highest-authority document for the
project. All specs, plans, tasks, and reviews MUST comply with
these principles.

- **Amendments** require explicit human approval and MUST be
  documented with a version bump, rationale, and migration plan
  for any in-flight work.
- **Versioning** follows semantic versioning: MAJOR for principle
  removals or redefinitions, MINOR for new principles or material
  expansions, PATCH for clarifications and wording fixes.
- **Compliance review**: Each PR review MUST include a constitution
  compliance check. Violations MUST be resolved before merge.

**Version**: 1.0.0 | **Ratified**: 2026-06-10 | **Last Amended**: 2026-06-10
