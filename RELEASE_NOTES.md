# THE HIDDEN FILES · 2.0.0-public-alpha.1

- Released: 2026-08-22
- Channel: Public Alpha

This version fixes the completed browser-playable Personnel Continuity story,
continuing Ministry employee simulation, records-safety layer, and installable
offline portal as one verified public-alpha candidate.

## Final narrative

- CASE-008 confirms `PROTECTIVE INTENT CORRESPONDENCE`.
- The three compatibility conditions belong to the appointment, not identity.
- The Level IV Final Board awards Principal Archive Officer, Level IV, and
  Continuity Records Handling · Grade II.
- A one-record Ω warrant opens CASE-ZERO without granting general Level V.
- MOM-000117 is restored as Rowan Mercer, first Continuity Records Liaison.
- Rowan's own personnel identity was the first deletion.
- The player is the second lawful appointee and remains a separate person.
- CASE-OMEGA connects the present-day portal with the 2048 Archive OS record.
- Office 3-B daily duties continue after the final epilogue.

## Compatibility

- Existing employee numbers, identities, ranks, clearances, reports, read
  states, relationships, training, Service Points, and World Day are retained.
- New final-arc data uses additive localStorage keys covered by the existing
  snapshot, manual archive, and optional cloud-save adapter.
- No automatic upload or remote overwrite is introduced.

## Records safety

- Save Schema Version 2 migrates existing Version 1 records without loss.
- Incoming records are compared with the current employee before replacement.
- File and cloud restores create a protected recovery checkpoint.
- The most recent restore can be undone once.
- Local deletion requires the exact employee number and preserves unrelated
  browser storage.
- Data, archive, optional cloud, recovery, and deletion behavior is public.

## Installable and offline portal

- Scoped web app manifest with 192px and 512px Ministry icons.
- Hosted install control appears only when the browser reports eligibility.
- All portal HTML, JavaScript, CSS, and install assets are pre-cached.
- Navigations use the network first and fall back to the cached portal.
- Static files load from cache and revalidate in the background.
- Cloud, cross-origin, range, and non-GET requests are never cached.
- Updates wait until existing portal tabs close.

## Accessibility and mobile

- Skip navigation and visible keyboard focus.
- Screen transitions focus the new heading.
- Live online/offline announcements.
- Reduced-motion and forced-colors support.
- 44px minimum interactive targets and mobile safe-area layout.

Automated checks do not constitute WCAG certification. A human VoiceOver or
NVDA journey remains listed in `PUBLIC_ALPHA_CHECKLIST.md`.

## Verification

Run:

```bash
node tests/run-all.js
```

For the full release gate, run:

```bash
node scripts/generate-release-integrity.js
node scripts/release-check.js
```

The release gate covers recruitment through CASE-OMEGA, post-ending service,
storage migration and recovery, optional cloud boundaries, install metadata,
offline runtime behavior, accessibility markup, JavaScript syntax, and every
deployable portal file hash.

Production cloud accounts, server-side account deletion, shared-world systems,
and hosted error reporting remain disabled until their external infrastructure
and owner-controlled security settings exist.
