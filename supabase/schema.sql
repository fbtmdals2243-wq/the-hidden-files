-- THE HIDDEN FILES · Public Alpha save storage
-- Run this file in the Supabase SQL editor before enabling cloud-config.js.
-- Never expose a secret key or service_role key in the browser project.

create table if not exists public.ministry_player_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  employee_id text not null
    check (employee_id ~ '^MOM-[A-Z0-9-]{6,32}$'),
  schema_version integer not null
    check (schema_version >= 1),
  checksum text not null
    check (checksum ~ '^[0-9a-fA-F]{8}$'),
  snapshot jsonb not null
    check (jsonb_typeof(snapshot) = 'object')
    check (octet_length(snapshot::text) <= 2000000),
  updated_at timestamptz not null default now()
);

alter table public.ministry_player_saves
  enable row level security;

revoke all on table public.ministry_player_saves
  from anon;

grant select, insert, update, delete
  on table public.ministry_player_saves
  to authenticated;

drop policy if exists
  "Employees can read only their own save"
  on public.ministry_player_saves;

create policy
  "Employees can read only their own save"
  on public.ministry_player_saves
  for select
  to authenticated
  using (
    (select auth.uid()) = user_id
  );

drop policy if exists
  "Employees can create only their own save"
  on public.ministry_player_saves;

create policy
  "Employees can create only their own save"
  on public.ministry_player_saves
  for insert
  to authenticated
  with check (
    (select auth.uid()) = user_id
  );

drop policy if exists
  "Employees can update only their own save"
  on public.ministry_player_saves;

create policy
  "Employees can update only their own save"
  on public.ministry_player_saves
  for update
  to authenticated
  using (
    (select auth.uid()) = user_id
  )
  with check (
    (select auth.uid()) = user_id
  );

drop policy if exists
  "Employees can delete only their own save"
  on public.ministry_player_saves;

create policy
  "Employees can delete only their own save"
  on public.ministry_player_saves
  for delete
  to authenticated
  using (
    (select auth.uid()) = user_id
  );
