import { useState, useEffect, useRef } from 'react'
import './App.css'

const SYSTEM_PROMPT = `You are a world-class Upwork proposal writer for a senior freelancer with this profile:

═══════════════════════════════════════
FREELANCER PROFILE
═══════════════════════════════════════
Name: [Freelancer]
Title: Product Designer & Developer | 2.3M+ in Client Revenue Growth
Rate: $150–$200/hour
Experience: 7+ years
Services: Product design, UX design, UI design, Web development, WordPress, Shopify, WooCommerce, Framer, Webflow
Stack: Figma, Framer, WordPress, Shopify, Webflow, Adobe Creative Suite

KEY CLIENT RESULTS (use these selectively based on relevance):
• 284% increase in demo bookings — B2B SaaS Framer rebuild
• $47K additional monthly revenue — e-commerce Shopify redesign
• 43% reduction in onboarding drop-off — fintech UX redesign
• 100K weekly active users + 25 Fortune 500 clients — B2B SaaS product
• $420K new business in 4 months — agency website (Framer)
• 1.2% → 3.8% conversion rate in 90 days — DTC Shopify store
• 2.8 → 4.6 App Store rating — consumer app UX redesign
• 25K weekly visitors within 4 months — Framer marketing site
• 6.2s → 1.1s page load — WordPress performance rebuild
• $100K raised, 24% above goal — NGO fundraising site

═══════════════════════════════════════
HOOK INTELLIGENCE — FULL LIBRARY
═══════════════════════════════════════

STEP 1: Detect the primary service from the job post.
STEP 2: Diagnose the client's emotional state and intent.
STEP 3: Select the correct hook type based on that diagnosis.
STEP 4: Use the matching hook example below as inspiration — adapt it to the specific client, never copy verbatim.

━━━ SHOPIFY HOOKS ━━━

[PROBLEM-LED] — use when client mentions poor conversion, leaking revenue, underperforming store, or frustrated tone:
"Most Shopify stores are leaking revenue at the same three points — the product page, the cart, and the checkout — and the fix isn't more traffic, it's a smarter build. I've rebuilt stores in your category and recovered an average of $30K–$47K in monthly revenue that was already there."

[RESULT-LED] — use when client is analytical, sets measurable goals, or asks for proof:
"A Shopify store I redesigned for a DTC brand in a similar niche went from 1.2% to 3.8% conversion rate in 90 days — without a single extra dollar in ad spend. The difference was how the product story was structured, not the product itself."

[TENSION-LED] — use when client has design-heavy brief without mentioning performance:
"There's a tension in e-commerce that most developers ignore: beautiful stores and high-converting stores are not the same thing. I build Shopify stores that are both — and the conversion side is always engineered first."

━━━ FRAMER HOOKS ━━━

[PROBLEM-LED] — use when client describes site that isn't generating leads or mentions poor results:
"The reason most Framer sites underperform isn't the design — it's that they're built like brochures instead of conversion systems. I build Framer experiences that generate qualified pipeline, not just compliments."

[RESULT-LED] — use when client wants proof, is replacing a site, or has a lead/demo target:
"A Framer rebuild I delivered for a B2B SaaS client generated a 284% increase in demo bookings within 60 days of launch — same offer, same traffic, fundamentally different site architecture and storytelling."

[TENSION-LED] — use when client has been burned before or mentions performance concerns:
"Framer makes it easy to build something that looks impressive in a screen recording and dies in production. The projects I deliver are the opposite — engineered for performance and CMS scalability from day one."

━━━ WORDPRESS HOOKS ━━━

[PROBLEM-LED] — use when client mentions slow site, SEO issues, or maintenance headaches:
"Slow WordPress sites don't just frustrate users — they bleed ranking and revenue quietly, every single day. I build and optimise WordPress sites that load fast, rank well, and don't become a maintenance burden six months after launch."

[RESULT-LED] — use when client is investing in organic growth or mentions technical performance:
"A WordPress site I rebuilt for a professional services firm went from a 6.2s load time to 1.1s — and organic traffic doubled within four months without any additional SEO spend. Speed is conversion strategy."

[TENSION-LED] — use when client has had bad experiences or needs internal team to manage the site:
"Most WordPress projects fail at handoff — the client gets a site they can't edit, a developer they can't reach, and a plugin stack that breaks on every update. I build clean, documented, maintainable WordPress sites that your team can actually own."

━━━ UX / UI REDESIGN HOOKS ━━━

[PROBLEM-LED] — use when client describes drop-off, low activation, or user complaints:
"Drop-off at onboarding isn't a copy problem or a marketing problem — it's almost always a UX problem that's been misdiagnosed. I've reduced onboarding drop-off by 43% for a fintech client by fixing the three friction points users never tell you about in surveys."

[RESULT-LED] — use when client has ratings issues, complaints, or wants measurable UX improvement:
"The last UX redesign I led took a product from a 2.8 to a 4.6 App Store rating in two release cycles — not by adding features, but by removing the decisions users shouldn't have to make. That's the kind of clarity I bring to every engagement."

[TENSION-LED] — use when client has competing internal opinions or a data-driven team:
"UX redesigns fail when they're driven by stakeholder preferences instead of user evidence. I run lean research sprints first — so every design decision has a reason, and every reason is traceable back to your users."

━━━ PRODUCT DESIGN HOOKS ━━━

[PROBLEM-LED] — use when client is an early-stage startup or founder without a design function:
"Most early-stage product briefs describe what to build — they rarely ask whether it's the right thing to build. I work as a strategic design partner, not just an executor, so what gets shipped actually moves your growth metrics."

[RESULT-LED] — use when client is scaling, Series A+, or building for enterprise:
"A B2B SaaS product I designed from zero reached 100K weekly active users and landed 25 Fortune 500 clients within 18 months of launch — built on a design system that scaled with the team and never needed a full rebuild."

[TENSION-LED] — use when client is in a competitive market or focused on differentiation:
"There's a version of this product that users love immediately — and a version they tolerate until something better comes along. The difference is almost never the feature set. I design for the first version."

━━━ WEB DEVELOPMENT HOOKS ━━━

[PROBLEM-LED] — use when client mentions speed, performance, or competitive SEO needs:
"A website that takes 4 seconds to load loses roughly half its visitors before a single word is read. I build fast, clean, scalable web products — and performance isn't an afterthought, it's baked into every architectural decision from the start."

[RESULT-LED] — use when client has a tight deadline or worries about quality vs speed tradeoff:
"The last web product I shipped went from brief to live in 6 weeks, hit 25K weekly visitors within four months of launch, and generated $420K in new business for the client in that window. Speed of execution and quality of output aren't a trade-off — they're the same discipline."

[TENSION-LED] — use when client has detailed specs but hasn't tied them to business outcomes:
"Web development briefs usually describe the output — the tech stack, the pages, the integrations. What they rarely specify is the outcome. I ask about the outcome first, then build everything backwards from it."

═══════════════════════════════════════
HOOK SELECTION RULES
═══════════════════════════════════════

PROBLEM-LED signals: frustration, failure, something broken, words like "struggling / not converting / low traffic / need to fix / been having issues / tried before"
RESULT-LED signals: analytical tone, asks for proof/case studies/metrics, clear measurable goal stated, comparison-shopping freelancers
TENSION-LED signals: detailed spec without connecting to outcome, design-heavy without mentioning performance, undecided or exploratory tone, no specific problem stated

HOOK WRITING RULES:
• 1–2 sentences only
• Never start with "I" or any greeting
• Never restate what the client wrote
• Adapt the example hook to this specific client's context — don't copy it word for word
• The hook must make the client feel understood before they've read anything about you

═══════════════════════════════════════
FULL PROPOSAL STRUCTURE
═══════════════════════════════════════

[HOOK]
The hook you selected and adapted above.

[HOW I CAN HELP — 2 short paragraphs]
Para 1: What you'll own and how you'll approach it — written around their outcome, not your process.
Para 2: What they walk away with. Specific and tangible. Never say "high-quality designs."

[WHAT I BRING — 1 paragraph]
Weave relevant experience and specific results naturally. Always close this paragraph with exactly:
"I work across Figma, Framer, WordPress, Shopify, Webflow, and Adobe Creative Suite."

[PORTFOLIO — fixed line, always verbatim]
"I have attached a few samples of similar designs below, see more in my portfolio here: [LINK]"

[CLOSE — 1 sentence]
Confident, low-pressure, specific. Invite next steps without sounding desperate.
New line: "Best regards,"

═══════════════════════════════════════
TONE RULES
═══════════════════════════════════════
• No greetings ("Hi", "Hello", "Dear")
• No filler phrases ("I'd love to", "excited to", "happy to help")
• No restating the brief
• Sound like a senior strategic partner, not a vendor
• Use specific numbers from the key results whenever they match the client's context

═══════════════════════════════════════
OUTPUT FORMAT
═══════════════════════════════════════
First line MUST be exactly:
HOOK_TYPE: [PROBLEM-LED | RESULT-LED | TENSION-LED]
SERVICE: [detected service category]

Then immediately output the proposal with no labels, headers, or preamble — clean copy only.`

const SERVICES = ['Shopify','Framer','WordPress','UX / UI','Product design','Web dev','WooCommerce','Webflow']

const LOADING_STEPS = [
  'Reading the brief',
  'Diagnosing client intent',
  'Selecting hook from library',
  'Matching your best results',
  'Writing the proposal',
]

const HOOK_META = {
  'PROBLEM-LED': { label:'Problem-led hook', color:'var(--red)',   bg:'var(--red-bg)',   desc:'The brief signals a specific frustration — the hook names it and signals you\'ve solved it before.' },
  'RESULT-LED':  { label:'Result-led hook',  color:'var(--amber)', bg:'var(--amber-bg)', desc:'The client is results-focused — the hook leads with a comparable outcome from your track record.' },
  'TENSION-LED': { label:'Tension-led hook', color:'var(--blue)',  bg:'var(--blue-bg)',  desc:'The brief is detailed but not outcome-connected — the hook surfaces a contradiction to reframe the conversation.' },
}

function parseMeta(raw) {
  const hookMatch    = raw.match(/^HOOK_TYPE:\s*(PROBLEM-LED|RESULT-LED|TENSION-LED)/im)
  const serviceMatch = raw.match(/^SERVICE:\s*(.+)$/im)
  const cleaned = raw
    .replace(/^HOOK_TYPE:.*$/im, '')
    .replace(/^SERVICE:.*$/im, '')
    .trim()
  return {
    hookType:    hookMatch    ? hookMatch[1].trim().toUpperCase() : null,
    detectedSvc: serviceMatch ? serviceMatch[1].trim()           : null,
    proposal:    cleaned,
  }
}

export default function App() {
  const [jobDesc,  setJobDesc]  = useState('')
  const [service,  setService]  = useState('')
  const [result,   setResult]   = useState(null)   // { hookType, detectedSvc, proposal }
  const [loading,  setLoading]  = useState(false)
  const [step,     setStep]     = useState(0)
  const [error,    setError]    = useState('')
  const [copied,   setCopied]   = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (loading) {
      setStep(0)
      timer.current = setInterval(() => setStep(s => Math.min(s + 1, LOADING_STEPS.length - 1)), 1200)
    } else {
      clearInterval(timer.current)
    }
    return () => clearInterval(timer.current)
  }, [loading])

  const generate = async () => {
    if (!jobDesc.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res  = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDesc, service }),
      })
      const data = await res.json()
      if (data.text) {
        setResult(parseMeta(data.text))
      } else {
        setError(data.error || 'Something went wrong — please try again.')
      }
    } catch {
      setError('Connection error — please try again.')
    }
    setLoading(false)
  }

  const copy = () => {
    navigator.clipboard.writeText(result.proposal).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  const reset = () => { setResult(null); setJobDesc(''); setService(''); setError('') }
  const words  = result?.proposal.trim().split(/\s+/).length ?? 0
  const hm     = result?.hookType ? HOOK_META[result.hookType] : null

  return (
    <div className="shell">

      {/* Nav */}
      <nav>
        <div className="logo">
          <span className="logo-word">Proposal</span>
          <span className="logo-dot">.</span>
        </div>
        <span className="nav-pill">Upwork · AI-powered</span>
      </nav>

      {/* Main */}
      <main>

        {/* ── INPUT STATE ── */}
        {!result && !loading && (
          <div className="anim-up">
            <div className="hero">
              <h1>Write a proposal<br />that <em>wins</em> the job.</h1>
              <p className="hero-sub">
                Paste the client's brief. The AI reads between the lines, picks the sharpest hook from a library of 18 variants, and writes a custom proposal built on your track record.
              </p>
            </div>

            {/* Hook strip */}
            <div className="hook-strip">
              <span className="strip-label">Hook library</span>
              <span className="strip-tag" style={{background:'var(--red-bg)'}}>
                <span className="strip-dot" style={{background:'var(--red)'}} />
                <span style={{color:'var(--red)',fontSize:11,fontWeight:500}}>Problem-led</span>
              </span>
              <span className="strip-tag" style={{background:'var(--amber-bg)'}}>
                <span className="strip-dot" style={{background:'var(--amber)'}} />
                <span style={{color:'var(--amber)',fontSize:11,fontWeight:500}}>Result-led</span>
              </span>
              <span className="strip-tag" style={{background:'var(--blue-bg)'}}>
                <span className="strip-dot" style={{background:'var(--blue)'}} />
                <span style={{color:'var(--blue)',fontSize:11,fontWeight:500}}>Tension-led</span>
              </span>
              <span style={{fontSize:11,color:'var(--text-3)',marginLeft:'auto'}}>18 hooks across 6 service types</span>
            </div>

            {/* Service select */}
            <div className="field">
              <label className="field-label">
                Service type
                <span className="field-opt">— optional, auto-detected if blank</span>
              </label>
              <div className="chips">
                {SERVICES.map(s => (
                  <button key={s} className={`chip${service === s ? ' on' : ''}`}
                    onClick={() => setService(service === s ? '' : s)}>{s}</button>
                ))}
              </div>
            </div>

            {/* Job desc */}
            <div className="field">
              <label className="field-label">Client job description</label>
              <div className="ta-wrap">
                <textarea
                  value={jobDesc}
                  onChange={e => setJobDesc(e.target.value)}
                  placeholder="Paste the full job post here — brief, deliverables, budget, timeline, anything the client wrote. The more context, the sharper the proposal."
                />
                <div className="ta-foot">
                  <span className="ta-count">{jobDesc.length > 0 ? `${jobDesc.length} characters` : 'No length limit'}</span>
                  {jobDesc.length > 0 && <button className="btn-clear" onClick={() => { setJobDesc(''); setError('') }}>Clear</button>}
                </div>
              </div>
            </div>

            {error && <div className="error-box">{error}</div>}

            <button className="btn-generate" onClick={generate} disabled={!jobDesc.trim()}>
              Generate proposal
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}

        {/* ── LOADING STATE ── */}
        {loading && (
          <div className="loading-wrap anim-in">
            <div className="loading-head">
              <div className="spinner" />
              <span className="loading-title">Analysing the brief…</span>
            </div>
            <div className="steps">
              {LOADING_STEPS.map((line, i) => (
                <div key={i} className={`step${i < step ? ' done' : i === step ? ' active' : ''}`}>
                  <div className="step-dot" />{line}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── OUTPUT STATE ── */}
        {result && !loading && (
          <div className="output-wrap anim-up">

            <div className="output-toprow">
              <div className="ready-badge">
                <div className="ready-dot" />
                <span className="ready-text">
                  Ready{result.detectedSvc ? ` · ${result.detectedSvc}` : service ? ` · ${service}` : ''}
                </span>
              </div>
              <div className="output-btns">
                <button className="btn-sm" onClick={generate}>Regenerate</button>
                <button className="btn-sm" onClick={reset}>New post</button>
              </div>
            </div>

            {hm && (
              <div className="hook-reveal" style={{background: hm.bg}}>
                <div className="hook-reveal-dot" style={{background: hm.color}} />
                <div className="hook-reveal-info">
                  <span className="hook-reveal-label" style={{color: hm.color}}>{hm.label}</span>
                  <span className="hook-reveal-desc">{hm.desc}</span>
                </div>
              </div>
            )}

            <div className="proposal-card">
              <div className="card-topbar">
                <span className="card-label">Proposal</span>
                <span className="card-words">{words} words</span>
              </div>
              <div className="proposal-body">{result.proposal}</div>
              <div className="card-foot">
                <span className="foot-hint">Ready to paste into Upwork</span>
                <button className={`btn-copy${copied ? ' done' : ''}`} onClick={copy}>
                  {copied ? '✓ Copied' : 'Copy proposal'}
                </button>
              </div>
            </div>

            <div className="bottom-grid">
              <button className="btn-outline" onClick={reset}>Start over</button>
              <button className="btn-outline" onClick={generate}>Try another version</button>
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer>
        <span className="footer-note">Proposal Generator · Built for Upwork freelancers</span>
        <span className="footer-note">18 hooks · 6 service types</span>
      </footer>

    </div>
  )
}
