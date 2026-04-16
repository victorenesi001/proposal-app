# Proposal Generator

AI-powered Upwork proposal generator with a library of 18 hooks across 6 service types. Reads the job post, detects the service, diagnoses client intent, and picks the right hook strategy automatically.

## Hook library

| Service | Problem-led | Result-led | Tension-led |
|---|---|---|---|
| Shopify | ✓ | ✓ | ✓ |
| Framer | ✓ | ✓ | ✓ |
| WordPress | ✓ | ✓ | ✓ |
| UX / UI | ✓ | ✓ | ✓ |
| Product design | ✓ | ✓ | ✓ |
| Web development | ✓ | ✓ | ✓ |

---

## Local setup

```bash
# 1. Install
npm install

# 2. Add your API key
cp .env.example .env
# Edit .env → set ANTHROPIC_API_KEY=sk-ant-...

# 3. Build and run
npm run build
npm start
# → http://localhost:3001
```

For development with hot reload, run both in separate terminals:
```bash
npm run dev:server   # Express on :3001
npm run dev:client   # Vite on :5173, proxies /api to :3001
```

---

## Deploy to Render

1. Push this repo to GitHub.

2. Go to [render.com](https://render.com) → **New → Web Service** → connect your repo.

3. Set these values:

   | Setting | Value |
   |---|---|
   | Environment | Node |
   | Build command | `npm install && npm run build` |
   | Start command | `npm start` |

4. Add environment variable:

   | Key | Value |
   |---|---|
   | `ANTHROPIC_API_KEY` | `sk-ant-your-key-here` |

5. Click **Create Web Service** — live in ~2 minutes.

---

## Architecture

- **Frontend**: React + Vite, dark editorial theme (Instrument Serif + Sans)
- **Backend**: Express.js serving both the API and the built React app
- **AI**: Anthropic Claude Sonnet — API key lives only on the server, never in the browser
- **Hook intelligence**: All 18 hooks embedded in the system prompt as typed examples; AI adapts the best match to the specific client
