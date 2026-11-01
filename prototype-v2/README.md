# Holdwell prototype v2: credit-union referral model

This is a copy of `prototype/`, updated after the 30 Oct 2026 product sprint. The original `prototype/` folder is unchanged.

Open `prototype-v2/index.html`. The top strip moves through every flow. Each screen's context panel shows:

- **Phase:** MVP Drop 1, MVP Drop 2, Phase 1 or Phase 2/later.
- **Backlog IDs:** from the doc "GaimControl feature backlog — after the 30 Oct review".
- **Open questions:** decisions still to make.

These are the future flows, not a build order.

## The model in one paragraph

GaimControl does not lend. Northbank Credit Union (fictional) defers an applicant instead of declining them and sends a referral link. On Holdwell, Sam links every bank account, takes the quizzes and invites a sponsor (Joanna, her sister). Sam then self-excludes everywhere on day one: GAMSTOP, betting shops, bingo and arcades, plus Gamban. After that she gets a controlled card (Stripe Issuing, TBC) and a Griffin bills account. Joanna approves top-ups and new payees, and Anna runs the CBT. After 60 days, two Holdwell reviewers sign a completion report and Northbank calls Sam back. Lending decisions stay with Northbank.

## What changed from v1

| Flow | v2 |
|---|---|
| §04 Auth (mobile) | WE5 explains the credit-union call-back instead of a loan offer. AU2 uses a referral code and adds a consent tick for sharing the outcome. |
| §05 Onboarding | Starts with the deferral email, then consent, linking every account (B9), quizzes, PGSI result and the sponsor invite. |
| §15 Sponsor | The invite comes first; Joanna isn't named before it. Declaration, approvals, Gamban confirmation. No loan or KYC. |
| §09 Self-exclusion | **New.** SE1–11. Replaces Loan + SECCI. |
| §07 Card | Holdwell merchant list, no cash, sponsor-approved top-ups and payees, blocked attempt, frozen state. |
| §06 Banking | Bills account and card pot; linked accounts are read-only. |
| §08 Anna | Adds the PGSI profile (AN9) and Brain Gym (AN10). |
| §10 Programme | **New.** PG1–8. Replaces Repayment + Relapse Hold. |
| §11 Safeguarding | Relapse Hold removed; replaced by a call-back from a person. |
| §12 Profile | No loan, Algbra or TrueLayer. Leaving early is explained. |
| §16 Off-boarding | OB1–6: leave early, other options, exactly what Northbank is told, cool-off, closed. |
| §17 Credit union portal | **New, web.** CU1–7: refer, link, members, member view, completion report, pilot results. |
| §13 Ops console | Rebuilt as OP1–9: today, referral matching, evidence, weekly review, merchant list, completion sign-off (4-eyes), vulnerability, audit. |

The loan and repayment flows were removed from v2 (they remain in v1).

## Not done yet

The web member flows (auth, onboarding, banking, cards, Anna, safeguarding, profile, sponsor, off-boarding) still show v1 content. They will be updated in a second pass once the mobile flows are agreed.

All people, organisations, reference numbers and figures are fictional.
