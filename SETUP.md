# FlyttGo · Setup & Deployment Runbook

Step-by-step to flip the site from synthetic-fallback (dev / preview)
to fully real (production). Every step is independent — set env vars
progressively as accounts come online. The site keeps working at every
intermediate state.

---

## 0. What's already done

The Supabase migration `0009_sandbox_artefacts_status.sql` has been
applied to the live project. Three new tables exist:

  - `public.sandbox_workspaces`  — `/sandbox` provisioning · 7-day TTL
  - `public.ai_artefacts`        — AI artefact provenance log · SHA-256 hash
  - `public.status_events`       — append-only telemetry feed · `status_latest` view

All three are RLS-gated (anon read, service-role write). No migration
work is required to bring up the data layer.

---

## 1. Required env vars (local + production)

Copy `.env.example` to `.env.local` and fill in what you have. Site
works at every intermediate state.

### 1a. Site origin (always required)

```
NEXT_PUBLIC_SITE_URL=https://flyttgo.tech
```

### 1b. Supabase (already provisioned)

```
NEXT_PUBLIC_SUPABASE_URL=https://ewzjsxsttsgflhcwjekc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_FV8-TVio7AKDa13Ecx9OKg_PiBqv1cH
SUPABASE_SERVICE_ROLE_KEY=<from Supabase dashboard → Project Settings → API>
```

The first two are already populated in `.env.example`. The
service-role key is the only thing you need to copy in. **Server only —
must never reach the browser.**

When set, these flip on:
  - real sandbox workspace persistence (`/sandbox` survives across browsers)
  - AI artefact provenance (`/governance/ai/artefacts` shows real entries)
  - real-time status feed (`/status` reads from `status_latest`)

Until set, every surface keeps working via synthetic fallback paths.

### 1c. Anthropic (the only paid item)

```
ANTHROPIC_API_KEY=sk-ant-api03-...
```

Cost: ~$0.04–0.07 per artefact at default Claude Sonnet 4.6 + prompt
caching. Set a daily spend cap in the Anthropic dashboard for
cost-overrun protection.

When set, `/ask-flyttgo` streams real Claude responses instead of
template-procedural synthetic ones. Falls back automatically if the
API call fails (hit a rate limit, network error) — no 500s reach the
user.

### 1d. Analytics (free)

Pick one provider — both wired, both env-gated:

**Plausible** (privacy-first, EU-hosted by default):
```
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=flyttgo.tech
```

**PostHog** (1M events/month free tier, full product analytics):
```
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com
```

Both can run together — they don't conflict.

### 1e. Sentry (free tier — 5k errors / month)

```
NEXT_PUBLIC_SENTRY_DSN=https://<key>@<host>.ingest.sentry.io/<projectId>
```

Uses Sentry's lazy-loader script. No `@sentry/nextjs` install needed
for basic error monitoring. Loader runs only on first error, so zero
Lighthouse impact.

### 1f. Status probe (for external uptime monitors)

```
STATUS_PROBE_TOKEN=<random 32+ char string>
```

When set, external uptime monitors (UptimeRobot, Better Stack,
Pingdom) can POST to `/api/status/probe` and insert rows into
`status_events`. The `/status` page will then show real uptime
data instead of the seed baseline.

See section 4 for monitor configuration.

### 1g. Resend (transactional email — already wired)

```
RESEND_API_KEY=re_...
CONTACT_NOTIFICATION_FROM="FlyttGo Platform <platforms@flyttgo.tech>"
CONTACT_NOTIFICATION_TO=platforms@flyttgo.tech
```

When set, `/api/contact` notifies on every deployment-lead intake.

---

## 2. Local development

```
cp .env.example .env.local
# fill in keys you have

npm install
npm run dev          # localhost:3000
```

The site works without any env vars set — every feature has a
synthetic fallback. Add keys progressively to flip features on.

---

## 3. Production deployment (Vercel-recommended)

### 3a. First-time

1. Push to a Git remote.
2. In Vercel, import the repo.
3. Add the env vars from `.env.example` to the project's Environment
   Variables (mark the `NEXT_PUBLIC_*` ones as available in Production
   AND Preview AND Development; service-role + secrets only in
   Production).
4. Deploy.

Vercel auto-detects Next.js 14, runs `npm run build`, and ships.

### 3b. Per-environment recommendations

| Variable                          | Production | Preview | Development |
|-----------------------------------|-----------|---------|-------------|
| `NEXT_PUBLIC_SITE_URL`            | flyttgo.tech | preview URL | localhost:3000 |
| `NEXT_PUBLIC_SUPABASE_URL`        | yes       | yes     | yes         |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | yes       | yes     | yes         |
| `SUPABASE_SERVICE_ROLE_KEY`       | yes       | yes     | yes (use a dev project) |
| `ANTHROPIC_API_KEY`               | yes       | optional | optional   |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`    | yes       | no      | no          |
| `NEXT_PUBLIC_SENTRY_DSN`          | yes       | yes     | no          |
| `STATUS_PROBE_TOKEN`              | yes       | no      | no          |
| `RESEND_API_KEY`                  | yes       | optional | optional   |

Setting `ANTHROPIC_API_KEY` only in Production keeps preview branches
free — preview builds use the synthetic stream.

### 3c. Cost-overrun protection

In the Anthropic dashboard:
  Settings → Limits → set a daily / monthly spend cap

Recommended starting cap: **$10 / day**. The streaming route catches
upstream failures (including rate limits / spend caps) and falls
through to the synthetic generator. No 500s reach users.

---

## 4. Wire an external uptime monitor

Configuring a free uptime monitor against the platform:

### 4a. UptimeRobot (free, 50 monitors, 5-min intervals)

1. Sign up at https://uptimerobot.com.
2. Add a new monitor:
   - Type: **HTTPS**
   - URL: `https://flyttgo.tech/api/health`
   - Monitoring interval: 5 minutes (free) or 1 minute (paid)
3. Add a webhook alert contact (optional) for outage notifications.

`/api/health` returns 200 with `{ ok: true }` when Supabase is
reachable, 503 otherwise. UptimeRobot watches both status code and
body keyword.

### 4b. Better Stack (10 monitors free tier)

Same as above but with 30-second intervals and richer dashboards.

### 4c. Push detailed telemetry into `status_events`

For per-service status (instead of just app-up/down), configure your
monitor to **POST** to `/api/status/probe` with the body:

```json
{
  "service_code":   "ST.PL.01",
  "service_name":   "Transify — Mobility API",
  "status":         "operational",
  "region":         "EU",
  "uptime_pct":     99.998,
  "p99_latency_ms": 184
}
```

Header: `Authorization: Bearer ${STATUS_PROBE_TOKEN}`.

Better Stack's "Heartbeat" feature is a clean fit. UptimeRobot's
custom-webhook plan (paid) also works.

---

## 5. Verify the live wiring

After deploying, hit each endpoint to confirm the real backend path is
live:

```
# Health check (200 if Supabase reachable)
curl https://flyttgo.tech/api/health

# Live status feed (Supabase-backed when status_events has rows)
curl https://flyttgo.tech/api/status/feed

# MCP discovery manifest
curl https://flyttgo.tech/.well-known/mcp.json

# MCP server tools/list
curl -X POST https://flyttgo.tech/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

Each should return `200 OK` with `backend: "supabase"` (where
applicable) once Supabase env vars are set.

---

## 6. Optional next steps

- **Supabase Pro ($25/mo)** when free tier limits hit
- **Plausible paid ($9/mo)** if you want EU-hosted privacy analytics
- **Sentry paid ($26/mo+)** if 5k errors/month isn't enough headroom
- **Better Stack Pro ($25/mo)** for 30-second uptime intervals

None of these are blocking — the site runs end-to-end at the free
tiers for a long time at typical marketing-site traffic.

---

## 7. Where to look if something's not working

| Symptom                                    | Where to look |
|--------------------------------------------|---------------|
| `/sandbox` provisioning hangs              | `SUPABASE_SERVICE_ROLE_KEY` set? `/api/health` returns 200? |
| AI assistant returns templated text        | `ANTHROPIC_API_KEY` set? Spend cap not exceeded? |
| `/status` shows seed numbers, not live     | Any monitor configured to POST `/api/status/probe`? |
| `/governance/ai/artefacts` is empty        | Has anyone generated an artefact yet? |
| Analytics dashboard shows nothing          | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` matches your site domain? |
| Errors disappearing                         | `NEXT_PUBLIC_SENTRY_DSN` set? Check Sentry inbox |

---

The site has a graceful-degradation posture by design: every external
dependency has a synthetic fallback. Connect them on your timeline,
not the build's.
