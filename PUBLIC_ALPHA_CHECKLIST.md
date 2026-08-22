# THE HIDDEN FILES · Public Alpha Checklist

- Release: `2.0.0-public-alpha.1`
- Release date: 2026-08-22
- Hosted portal: `https://fbtmdals2243-wq.github.io/the-hidden-files/portal/`


## Complete in the static public alpha

- [x] Recruitment through CASE-OMEGA is playable.
- [x] Day 24+ continuing Ministry work remains active after the epilogue.
- [x] Employee number, identity, rank, clearance, reports, qualifications,
  relationships, and World Day persist.
- [x] Save Schema Version 1 migrates losslessly to Version 2.
- [x] Archive import validates checksum and employee identity before mutation.
- [x] File and cloud restores create a one-action recovery checkpoint.
- [x] Local employee deletion preserves unrelated browser storage.
- [x] Public data and privacy behavior is documented in the portal.
- [x] The portal is install-eligible on the hosted HTTPS release.
- [x] All portal scripts and styles are available in the offline shell.
- [x] Cloud, cross-origin, range, and non-GET requests bypass offline caching.
- [x] Keyboard focus, skip navigation, reduced motion, touch targets, and mobile
  safe areas are implemented and automatically checked.
- [x] Hosted release assets match the tested source files.
- [x] Hosted metadata, content types, and all 41 portal hashes pass the
  deterministic hosted release check.
- [x] Fifteen automated suites pass from a clean clone of `main`.


## Manual release smoke test

- [x] Hosted Recruitment screen renders without portal console errors.
- [x] Hosted browser exposes the install control when installation is eligible.
- [x] Recruitment → Application moves keyboard focus to the new screen heading.
- [ ] Complete one full fresh-player journey in a separate human test profile.
- [ ] Complete a VoiceOver or NVDA journey before claiming WCAG conformance.
- [ ] Install the PWA on a user device and verify launch after fully disconnecting
  the device from the network.

Unchecked manual items do not block the tested static alpha, but they must be
completed before describing the release as accessibility-certified or as a
production native-app substitute.


## External owner action required

These items cannot be truthfully completed by repository code alone:

- [ ] Provision a production Supabase project.
- [ ] Apply `supabase/schema.sql` and verify Row Level Security with two accounts.
- [ ] Configure approved authentication redirect URLs.
- [ ] Add only a browser-safe Supabase publishable key.
- [ ] Perform real cross-device account and cloud-restore testing.
- [ ] Provide server-side cloud-account deletion and a production privacy contact.
- [ ] Choose and provision a privacy-safe hosted error-reporting service.
- [ ] Provision a backend before enabling shared players, shared events, or a
  server-authoritative Ministry world clock.

Until those actions are complete, the release intentionally stays local-first
with cloud mode disabled. It must not be advertised as a production account or
multiplayer service.
