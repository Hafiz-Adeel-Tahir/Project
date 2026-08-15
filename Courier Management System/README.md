# Courier Management System — Demo

React courier operations demo with an admin dashboard, rider simulation, public tracking portal, Supabase schema, Realtime-ready data model, private proof-of-delivery storage, and report exports.

## Setup

1. Create a Supabase project.
2. Run `supabase/migrations/001_courier_schema.sql` in the Supabase SQL editor.
3. Copy `.env.example` to `.env.local` and add the project URL and anon key.
4. Run `npm install` and `npm run dev`.

Without Supabase environment values, the interface runs in demo mode with seeded Lahore courier records, allowing the full workflow to be presented immediately.

## Security and Realtime

- Roles are stored in `public.users` and linked to `auth.users`.
- Public tracking uses the restricted `track_parcel(text)` RPC and does not expose phone numbers or private parcel fields.
- `parcels` and `parcel_status_history` are enabled for Realtime.
- Proof files use the private `proof-of-delivery` Storage bucket.
- Delivered parcels are locked by a database trigger; only admins can correct them.

## Cloudflare deployment

Set the Supabase environment variables in the hosting project, run the existing production build, and deploy the generated `dist` output.

The demonstration uses in-app navigation between Admin Operations and Public Tracking. The data model supports mapping these views to `/admin` and `/track` in the connected Supabase build.
