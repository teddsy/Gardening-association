-- Member Posts – optional database setup (run in the Supabase SQL editor). No credentials here.
-- Create your own project, then paste its address and public key into member-posts.html.
-- Never put a service-role key in the website.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) between 3 and 120),
  category text not null check (category in ('Harvest','Question','Tip','Swap','Pests','Show & Tell')),
  body text not null,
  photo_path text,               -- path inside storage bucket 'post-photos'
  status text not null default 'pending' check (status in ('pending','approved','hidden')),
  likes int not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);
create or replace function public.is_admin() returns boolean language sql stable security definer as
$$ select coalesce((select is_admin from public.profiles where id = auth.uid()), false) $$;

alter table public.profiles enable row level security;
alter table public.posts    enable row level security;
alter table public.comments enable row level security;

create policy "profiles readable by members" on public.profiles for select to authenticated using (true);
create policy "own profile insert" on public.profiles for insert to authenticated with check (id = auth.uid() and is_admin = false);
create policy "own profile update" on public.profiles for update to authenticated using (id = auth.uid()) with check (is_admin = (select is_admin from public.profiles where id = auth.uid()));

create policy "read approved or own or admin" on public.posts for select to authenticated
  using (status = 'approved' or author_id = auth.uid() or public.is_admin());
create policy "members create pending posts" on public.posts for insert to authenticated
  with check (author_id = auth.uid() and status = 'pending');
create policy "admin moderates" on public.posts for update to authenticated using (public.is_admin());
create policy "author or admin deletes" on public.posts for delete to authenticated using (author_id = auth.uid() or public.is_admin());

create policy "read comments" on public.comments for select to authenticated using (true);
create policy "add own comments" on public.comments for insert to authenticated with check (author_id = auth.uid());
create policy "delete own or admin" on public.comments for delete to authenticated using (author_id = auth.uid() or public.is_admin());

-- Storage bucket for photos
insert into storage.buckets (id, name, public) values ('post-photos','post-photos', true) on conflict do nothing;
create policy "members upload to own folder" on storage.objects for insert to authenticated
  with check (bucket_id = 'post-photos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "public read photos" on storage.objects for select using (bucket_id = 'post-photos');
create policy "owner or admin delete photos" on storage.objects for delete to authenticated
  using (bucket_id = 'post-photos' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));
-- Make a committee member admin: update public.profiles set is_admin = true where display_name = '...';
