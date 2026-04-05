-- ============================================================
-- DESJOB GLOBAL - Supabase Database Migration
-- Run this in your Supabase SQL Editor (Project > SQL Editor > New Query)
-- ============================================================

-- ───────────────────────────────────────────
-- 1. JOBS TABLE
-- ───────────────────────────────────────────
create table if not exists public.jobs (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  company     text not null,
  location    text not null,
  type        text not null default 'Full-time',
  salary      text not null,
  category    text not null,
  tags        text[] not null default '{}',
  posted_at   timestamptz not null default now()
);

-- ───────────────────────────────────────────
-- 2. BLOG POSTS TABLE
-- ───────────────────────────────────────────
create table if not exists public.blog_posts (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  image       text not null,
  content     text[] not null default '{}',   -- array of paragraphs
  author      text not null default 'Desjob Editor',
  category    text not null,
  published_at timestamptz not null default now()
);

-- ───────────────────────────────────────────
-- 3. CONTACT MESSAGES TABLE (job seekers & employers)
-- ───────────────────────────────────────────
create table if not exists public.contact_messages (
  id           uuid primary key default gen_random_uuid(),
  type         text not null check (type in ('job_seeker', 'employer')),
  -- Shared
  email        text not null,
  phone        text,
  message      text,
  -- Job seeker fields
  name         text,
  field        text,
  experience   text,
  -- Employer fields
  company      text,
  contact      text,
  industry     text,
  positions    text,
  hiring_needs text,
  timeline     text,
  submitted_at timestamptz not null default now()
);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Public can READ jobs and blog posts.
-- Only authenticated admins can write anything.
-- ============================================================

alter table public.jobs enable row level security;
alter table public.blog_posts enable row level security;
alter table public.contact_messages enable row level security;

-- Jobs: anyone can read
create policy "Public can read jobs"
  on public.jobs for select
  using (true);

-- Jobs: only authenticated users can insert/update/delete
create policy "Admins can manage jobs"
  on public.jobs for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Blog: anyone can read
create policy "Public can read blog posts"
  on public.blog_posts for select
  using (true);

-- Blog: only authenticated users can insert/update/delete
create policy "Admins can manage blog posts"
  on public.blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Contact messages: anyone can insert (public form submissions)
create policy "Public can submit contact messages"
  on public.contact_messages for insert
  with check (true);

-- Contact messages: only authenticated users can read them
create policy "Admins can read contact messages"
  on public.contact_messages for select
  using (auth.role() = 'authenticated');

-- Contact messages: only authenticated users can delete
create policy "Admins can delete contact messages"
  on public.contact_messages for delete
  using (auth.role() = 'authenticated');


-- ============================================================
-- DISABLE PUBLIC SIGNUP
-- Run this to make sure nobody can sign up — only the admin
-- account you create manually in the dashboard can log in.
-- Go to: Supabase Dashboard > Authentication > Settings >
-- Disable "Allow new users to sign up"
-- (This is done in the UI, not SQL)
-- ============================================================
