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

Guidelines:
- heroMessage: 2-3 sentences. Directly addresses the person by name. Specific to their scores and tier. Reveals an insight about their pattern. Should feel like a personal diagnosis, not a generic statement.
- ilanaLetter: 4-6 paragraphs separated by \\n\\n. Opens with "Dear {name}," and closes with "Ilana Golan\\nFounder, Leap Academy". References their specific quiz answers throughout. Feels personally written by Ilana, not templated. Should feel like she studied their answers carefully. Include specific observations about their answer combinations.
- opportunityCost: Object with headline (string, compelling and specific to their situation), financialGap (string like "$120K+"), timeframe (string like "over the next 3 years"), closingLine (string, italic-worthy closing that creates urgency), milestones (array of exactly 4 objects each with icon (single emoji), title (short string), description (1-2 sentences specific to their tier and answers)).
- actionPlan: Array of exactly 3 objects each with title (string, specific action), detail (2-3 sentences, highly specific and actionable — reference their specific answers where relevant), urgency (string like "This Week", "Next 30 Days", etc).

Match the tone and quality of the reference content provided. Be MORE specific to this person's answers than the reference — never generic. Every sentence should feel like it was written for THIS person.`;

// ─── Personalization Endpoint ───────────────────────────────────────────────

app.post('/api/personalize', async (req, res) => {
  try {
    const { firstName, answers, answerLabels, tier, overallScore, subScores, tierContext } = req.body;

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
