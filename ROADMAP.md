# THE HIDDEN FILES ROADMAP


## Completed: Static Playable Alpha

- Recruitment, application, interview, and Identity Engine
- Persistent employee number and returning employee resume
- Office 3-B employee dashboard
- Rank, clearance, promotion, and personnel records
- Owl Mail, Daily Prophet, and Notice Board
- World Day progression
- CASE-000 through CASE-005
- First Personnel Continuity story arc
- Assigned department versus recommended department separation
- Continuity Liaison career assignment
- Day 10+ rotating daily work orders
- Daily news and notices
- Service Points and permanent duty history
- Automated progression and save-preservation test
- Versioned save snapshots with checksum validation
- Downloadable and restorable employee archives
- Optional account and cloud-save client foundation
- Supabase database schema with per-user Row Level Security


## Next Story Content

- Second Personnel Continuity arc
- Identity of MOM-000117
- Sealed compatibility condition
- CASE-ZERO and the origin of Room 4-7
- Additional NPC relationships
- Department-specific case chains
- Training and qualification records
- Promotion and disciplinary events


## Public Alpha Infrastructure

The current localStorage save system is suitable only for the static prototype.

Foundation now implemented:

- Versioned local save schema without renaming existing keys
- Validated save snapshots and archive transfer
- Supabase Auth client integration in disabled-by-default local mode
- Per-user cloud save and restore adapter
- Row Level Security SQL denying anonymous save access
- Automated local, cloud, and full-progression regression tests

Before a public account-based release, complete:

- Provision and configure the production Supabase project
- Activate email authentication and approved redirect URLs
- Apply and verify the supplied RLS database schema
- Perform hosted cross-device account testing
- Input validation and authorization enforcement
- Secret and environment configuration
- Audit logging
- Backup and migration strategy
- Privacy policy and account deletion flow


## Persistent Online Ministry

- Shared Ministry world clock
- Server-generated daily events
- Department populations and transfers
- Player-to-player cooperation
- Shared investigations
- Ministry-wide emergency events
- NPC relationship state
- Owl Mail delivery service
- Daily Prophet publishing pipeline
- Notice Board administration
- Live career, promotion, and disciplinary systems


## Long-Term Portal Structure

```text
BRITISH MINISTRY OF MAGIC PORTAL
├── My Office
├── Employee Profile
├── Owl Mail
├── Daily Prophet
├── Notice Board
├── Personnel / Career
├── Departments
├── Training
├── Colleagues
├── Ministry Events
└── THE HIDDEN FILES
    ├── CASE-000 ... CASE-005
    ├── CASE-ZERO
    └── Future classified files
```
