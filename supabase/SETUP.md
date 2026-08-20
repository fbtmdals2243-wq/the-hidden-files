# Ministry Network activation

The portal remains fully playable in local archive mode until these steps are
completed. Existing browser saves are not renamed, deleted, or uploaded
automatically.


## 1. Create the database

Create a Supabase project, open its SQL editor, and run the complete contents of
`supabase/schema.sql`.

The script creates one save row per authenticated user and enables Row Level
Security. Anonymous users receive no table access, and authenticated users can
read or change only the row matching their own `auth.uid()`.


## 2. Configure authentication

Enable email authentication in the Supabase dashboard. Set the Site URL and
approved redirect URLs to the final Ministry Portal address.

Email confirmation can remain enabled. The portal already handles the state in
which an account exists but the user must confirm their email before signing in.


## 3. Connect the static portal

Open `portal/js/cloud-config.js` and replace only these values:

```js
enabled: true,
url: "https://YOUR-PROJECT.supabase.co",
publishableKey: "YOUR-PUBLISHABLE-KEY",
```

Use a Supabase publishable key. Older projects may label this an `anon` key.

Never place a secret key or `service_role` key in this repository or any browser
file. Those keys bypass Row Level Security.


## 4. Verify before public release

1. Create two separate test accounts.
2. Save a different employee record from each account.
3. Confirm each account can restore only its own record.
4. Sign out and confirm the local employee record remains intact.
5. Test on two devices and confirm cloud restoration requires explicit approval.
6. Confirm invalid or modified archive files are rejected.


## Local safety behavior

- Cloud configuration disabled: local portal and archive transfer remain active.
- Network unavailable: local progress remains active.
- Signing in: never overwrites the local record.
- Restoring: always requires user confirmation.
- Signing out: removes cloud access from the device without deleting game data.
