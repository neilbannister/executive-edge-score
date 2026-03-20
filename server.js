import express from 'express';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '1mb' }));

// ─── OpenAI Client ──────────────────────────────────────────────────────────

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ─── System Prompt ──────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a ghostwriter for Ilana Golan, founder of Leap Academy. You write in her voice: direct, warm but not soft, data-driven, confident, with strategic specificity. You reference her background (F-16 commander, tech executive, Leap Academy founder). You reference firms like Google, JPMorgan, McKinsey naturally. You never use filler or generic advice.

You are writing personalized results for someone who just completed the Executive Edge Score quiz. You must return valid JSON with exactly these four keys: heroMessage, ilanaLetter, opportunityCost, actionPlan.

CRITICAL: The person's job role is one of your most important inputs. Use it to deeply tailor ALL content:
- If they are a junior/early-career professional: focus on building visibility, getting noticed, accelerating to the next level fast
- If they are mid-management: focus on breaking through to senior leadership, executive presence, strategic thinking vs tactical execution
- If they are senior management/VP: focus on C-suite readiness, board visibility, building authority at scale, thought leadership
- If they are C-suite/executive: focus on legacy, industry influence, scaling impact beyond their org, portfolio career, speaking/media
- If they are a business owner/entrepreneur/founder/freelancer/consultant/self-employed: This is EXTREMELY IMPORTANT — these people are NOT looking to climb a corporate ladder or step into a leadership role. They ALREADY lead their own business. NEVER use language like "step into a leadership role", "get promoted", "salary increase", "career ladder", "next role", "hiring managers", "recruiters", or "corporate" for these people. Instead focus ENTIRELY on: growing their business revenue, attracting premium clients, building market authority, scaling beyond founder-dependency, attracting investors/partners/talent, becoming the recognized expert in their market, generating inbound leads through personal brand, and building a business that works without them.
- Use their specific job title language — mirror their world. A "Head of Product" gets different advice than a "Founder & CEO" even at similar income levels. An "Entrepreneur" gets completely different framing than a "VP of Engineering" — one is building a business, the other is climbing within one.

ABSOLUTE RULE FOR ENTREPRENEURS/FOUNDERS/BUSINESS OWNERS: Do NOT reference promotions, salary negotiations, job searches, career ladders, stepping into roles, getting hired, or corporate advancement. These people own their business — talk about business growth, market positioning, revenue, client attraction, scaling, and building authority as a founder.

Guidelines:
- heroMessage: 2-3 sentences. Directly addresses the person by name. Specific to their scores, tier, AND job role. Reveals an insight about their pattern. Should feel like a personal diagnosis, not a generic statement. Reference their role naturally.
- ilanaLetter: 4-6 paragraphs separated by \\n\\n. Opens with "Dear {name}," and closes with "Ilana Golan\\nFounder, Leap Academy". References their specific quiz answers AND job role throughout. Feels personally written by Ilana. Should feel like she knows exactly what challenges someone in their role faces. Include specific observations about how their role context intersects with their quiz answers.
- opportunityCost: Object with headline (string, compelling and specific to their role + situation), financialGap (string like "$120K+"), timeframe (string like "over the next 3 years"), closingLine (string, italic-worthy closing that creates urgency), milestones (array of exactly 4 objects each with icon (single emoji), title (short string), description (1-2 sentences specific to their tier, role, and answers)). The opportunity cost should reflect what someone at THEIR career level and role is leaving on the table.
- actionPlan: Array of exactly 3 objects each with title (string, specific action tailored to their role), detail (2-3 sentences, highly specific and actionable — reference their job role, specific answers, and what someone in their position should do differently), urgency (string like "This Week", "Next 30 Days", etc).

Match the tone and quality of the reference content provided. Be MORE specific to this person's answers and role than the reference — never generic. Every sentence should feel like it was written for THIS person in THIS role.

FINAL CHECK: Before returning your response, re-read the person's job role. If they are ANY type of business owner, entrepreneur, founder, freelancer, or self-employed professional, scan your ENTIRE response and remove ANY reference to: promotions, salary negotiations, stepping into roles, career ladders, hiring managers, recruiters, getting hired, or corporate advancement. Replace with business-appropriate language about revenue growth, client attraction, market authority, scaling, and founder brand building.`;

// ─── Personalization Endpoint ───────────────────────────────────────────────

app.post('/api/personalize', async (req, res) => {
  try {
    const { firstName, jobRole, answers, answerLabels, tier, overallScore, subScores, tierContext } = req.body;

    // Validate required fields
    if (!firstName || !answers || !tier || !overallScore || !subScores || !tierContext) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not set');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Build user prompt
    const userPrompt = `Generate personalized Executive Edge Score results for this quiz taker:

Name: ${firstName}
Job Role: ${jobRole || 'Not provided'}
Tier: ${tierContext.label} (${tierContext.incomeRange})
Overall Score: ${overallScore}/100
Sub-scores: Brand Power ${subScores.brand}/100, Confidence Index ${subScores.confidence}/100, Leadership Presence ${subScores.leadership}/100, Opportunity Radar ${subScores.authority}/100

Their specific quiz answers:
- Growth area they need most: ${answerLabels?.growth_area || answers.growth_area}
- Current market position: ${answerLabels?.market_position || answers.market_position}
- Professional development interest: ${answerLabels?.development_interest || answers.development_interest}
- Career aspiration (1-2 years): ${answerLabels?.aspiration || answers.aspiration}
- Professional network status: ${answerLabels?.network || answers.network}
- How they respond to opportunities: ${answerLabels?.opportunity_response || answers.opportunity_response}
- Income band: ${answerLabels?.income || answers.income}

Reference content for tone and quality benchmark (write FRESH content that is MORE personalized than this — do NOT copy):

Hero message reference: ${tierContext.heroMessage}

Letter reference: ${tierContext.ilanaLetterText}

Opportunity cost reference: ${JSON.stringify(tierContext.opportunityCost)}

Action plan reference: ${JSON.stringify(tierContext.actionPlan)}

Return only valid JSON with keys: heroMessage, ilanaLetter, opportunityCost, actionPlan.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 2500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Empty response from OpenAI');
    }

    const parsed = JSON.parse(content);

    // Validate response shape
    if (!validateResponse(parsed)) {
      console.error('Invalid AI response shape:', JSON.stringify(parsed).slice(0, 200));
      throw new Error('Invalid response shape');
    }

    res.json(parsed);
  } catch (error) {
    console.error('Personalization error:', error.message);
    res.status(500).json({ error: 'Failed to generate personalized content' });
  }
});

// ─── Response Validation ────────────────────────────────────────────────────

function validateResponse(data) {
  if (!data || typeof data !== 'object') return false;
  if (typeof data.heroMessage !== 'string' || !data.heroMessage) return false;
  if (typeof data.ilanaLetter !== 'string' || !data.ilanaLetter) return false;

  // Validate opportunityCost
  const oc = data.opportunityCost;
  if (!oc || typeof oc !== 'object') return false;
  if (!oc.headline || !oc.financialGap || !oc.timeframe || !oc.closingLine) return false;
  if (!Array.isArray(oc.milestones) || oc.milestones.length < 3) return false;
  for (const m of oc.milestones) {
    if (!m.icon || !m.title || !m.description) return false;
  }

  // Validate actionPlan
  if (!Array.isArray(data.actionPlan) || data.actionPlan.length < 2) return false;
  for (const step of data.actionPlan) {
    if (!step.title || !step.detail || !step.urgency) return false;
  }

  return true;
}

// ─── Production Static Serving ──────────────────────────────────────────────

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));

  // SPA fallback — serve index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// ─── Start Server ───────────────────────────────────────────────────────────

const PORT = process.env.NODE_ENV === 'production'
  ? (process.env.PORT || 3000)
  : 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
});
