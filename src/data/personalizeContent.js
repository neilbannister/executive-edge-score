// ─── DEEP PERSONALIZATION LAYER ──────────────────────────────────────────────
// Takes the static tier content + user's answers + scores and produces
// deeply personalized hero messages, opportunity cost, and action plans.
// This runs client-side as the fallback when AI personalization isn't available.

const SCORE_NAMES = {
  brand: 'Brand Power',
  confidence: 'Confidence Index',
  leadership: 'Leadership Presence',
  authority: 'Opportunity Radar',
};

// ─── ENTREPRENEUR / BUSINESS OWNER DETECTION ────────────────────────────────

const ENTREPRENEUR_KEYWORDS = [
  'entrepreneur', 'founder', 'co-founder', 'cofounder',
  'business owner', 'owner', 'ceo', 'chief executive',
  'self-employed', 'freelancer', 'consultant', 'solopreneur',
  'startup', 'managing director', 'proprietor', 'partner',
  'principal', 'creator', 'indie', 'bootstrapp',
];

function isEntrepreneur(jobRole) {
  if (!jobRole) return false;
  const lower = jobRole.toLowerCase().trim();
  return ENTREPRENEUR_KEYWORDS.some(kw => lower.includes(kw));
}

// ─── CORPORATE PHRASES ──────────────────────────────────────────────────────

const GROWTH_CONTEXT = {
  A: { area: 'personal brand', doing: 'building a brand that positions you as the obvious choice', need: 'brand visibility', fix: 'strategic brand architecture' },
  B: { area: 'confidence', doing: 'developing the unshakeable confidence to pursue what you deserve', need: 'executive confidence', fix: 'confidence-building frameworks' },
  C: { area: 'leadership presence', doing: 'developing the strategic leadership presence that commands rooms', need: 'leadership development', fix: 'leadership presence training' },
  D: { area: 'authority in your field', doing: 'establishing the authority that makes opportunities come to you', need: 'authority building', fix: 'authority positioning strategy' },
};

const ASPIRATION_PHRASES = {
  A: 'establishing a recognizable personal brand',
  B: 'increasing your income and visibility significantly',
  C: 'stepping into a true leadership role',
  D: 'scaling your career or business to the next level',
};

// Entrepreneur-specific aspiration overrides
const ASPIRATION_PHRASES_ENTREPRENEUR = {
  A: 'building a brand that becomes your business\'s biggest growth engine',
  B: 'growing your revenue and market visibility significantly',
  C: 'becoming the recognized leader in your market',
  D: 'scaling your business to the next level',
};

const NETWORK_PHRASES = {
  A: "you're still in the early stages of building your professional network",
  B: 'you have some connections but need to expand strategically',
  C: 'you have a strong industry network to leverage',
  D: 'you have an extensive, influential network',
};

const OPPORTUNITY_PHRASES = {
  A: 'you tend to hesitate when opportunities arise — and you know it',
  B: 'you see opportunities but hold back, waiting for more confidence',
  C: 'you seize opportunities when they align with your goals',
  D: 'you actively pursue multiple opportunities simultaneously',
};

const DEV_INTEREST_PHRASES = {
  A: 'brand-building strategies',
  B: 'confidence and personal development',
  C: 'leadership and management training',
  D: 'authority building through speaking and writing',
};

function getWeakestAndStrongest(subScores) {
  const entries = Object.entries(subScores);
  entries.sort((a, b) => a[1] - b[1]);
  return {
    weakest: { key: entries[0][0], name: SCORE_NAMES[entries[0][0]], score: entries[0][1] },
    secondWeakest: { key: entries[1][0], name: SCORE_NAMES[entries[1][0]], score: entries[1][1] },
    secondStrongest: { key: entries[2][0], name: SCORE_NAMES[entries[2][0]], score: entries[2][1] },
    strongest: { key: entries[3][0], name: SCORE_NAMES[entries[3][0]], score: entries[3][1] },
  };
}

export function buildPersonalizedContent(tierData, firstName, answers, subScores, overallScore, jobRole) {
  const { weakest, strongest, secondWeakest } = getWeakestAndStrongest(subScores);
  const growth = GROWTH_CONTEXT[answers.growth_area] || GROWTH_CONTEXT.A;
  const isEntrepreneurUser = isEntrepreneur(jobRole);
  const aspiration = isEntrepreneurUser
    ? (ASPIRATION_PHRASES_ENTREPRENEUR[answers.aspiration] || ASPIRATION_PHRASES_ENTREPRENEUR.D)
    : (ASPIRATION_PHRASES[answers.aspiration] || ASPIRATION_PHRASES.A);
  const network = NETWORK_PHRASES[answers.network] || NETWORK_PHRASES.A;
  const opportunity = OPPORTUNITY_PHRASES[answers.opportunity_response] || OPPORTUNITY_PHRASES.A;
  const devInterest = DEV_INTEREST_PHRASES[answers.development_interest] || DEV_INTEREST_PHRASES.A;

  // ── PERSONALIZED HERO MESSAGE ────────────────────────────────────────────
  let heroMessage;

  if (isEntrepreneurUser) {
    heroMessage = buildEntrepreneurHeroMessage(firstName, overallScore, weakest, secondWeakest, strongest, growth, aspiration, devInterest, jobRole);
  } else {
    heroMessage = buildCorporateHeroMessage(firstName, overallScore, weakest, secondWeakest, strongest, growth, aspiration, devInterest);
  }

  // ── PERSONALIZED OPPORTUNITY COST ────────────────────────────────────────
  const staticOppCost = tierData.opportunityCost;

  const personalizedHeadline = (() => {
    if (isEntrepreneurUser) {
      switch (answers.growth_area) {
        case 'A': return `what an invisible brand is costing your business`;
        case 'B': return `what held-back confidence is costing your business growth`;
        case 'C': return `what underdeveloped leadership is costing your business`;
        case 'D': return `what unestablished authority is costing your market position`;
        default: return `what's holding your business back from its next growth phase`;
      }
    }
    switch (answers.growth_area) {
      case 'A': return `what an invisible brand is costing you`;
      case 'B': return `what held-back confidence is costing you`;
      case 'C': return `what underdeveloped leadership is costing you`;
      case 'D': return `what unestablished authority is costing you`;
      default: return staticOppCost.headline;
    }
  })();

  const personalizedClosingLine = isEntrepreneurUser
    ? `${firstName}, you told us ${opportunity}. Your goal is ${aspiration}, but your ${weakest.name} score of ${weakest.score} and your focus on ${growth.area} tell us exactly where the gap is. Every week without a clear strategy is another week of revenue and opportunities slipping through the cracks.`
    : `${firstName}, you told us ${opportunity}. Your aspiration is ${aspiration}, but your ${weakest.name} score of ${weakest.score} and your focus on ${growth.area} tell us exactly where the gap is. Every week without a clear strategy is another week of compound opportunity loss.`;

  // Personalize milestone descriptions based on weakest score + role
  const personalizedMilestones = isEntrepreneurUser
    ? buildEntrepreneurMilestones(staticOppCost.milestones, weakest, growth)
    : staticOppCost.milestones.map((m, i) => {
        if (i === 0) {
          return { ...m, description: `${m.description} With your ${weakest.name} at ${weakest.score}, this is your most urgent gap to close.` };
        }
        return m;
      });

  const opportunityCost = {
    ...staticOppCost,
    headline: personalizedHeadline,
    closingLine: personalizedClosingLine,
    milestones: personalizedMilestones,
  };

  // ── PERSONALIZED ACTION PLAN ─────────────────────────────────────────────
  let actionPlan;
  if (isEntrepreneurUser) {
    actionPlan = buildEntrepreneurActionPlan(firstName, weakest, strongest, growth, aspiration, network, answers);
  } else {
    actionPlan = tierData.actionPlan.map((step, i) => {
      if (i === 0) {
        return {
          ...step,
          detail: `${step.detail}\n\nThis is especially critical for you, ${firstName} — you identified ${growth.area} as your biggest growth area, and your ${weakest.name} score of ${weakest.score} confirms this is where the highest leverage sits right now.`,
        };
      }
      if (i === 1) {
        return {
          ...step,
          detail: `${step.detail}\n\nGiven that ${network} and your goal is ${aspiration}, this step will have outsized impact for your specific situation.`,
        };
      }
      if (i === 2) {
        return {
          ...step,
          detail: `${step.detail}\n\nWith your ${strongest.name} already at ${strongest.score}, you have a genuine foundation to build on — this step is how you convert that strength into unstoppable momentum.`,
        };
      }
      return step;
    });
  }

  return { heroMessage, opportunityCost, actionPlan };
}

// ─── ENTREPRENEUR-SPECIFIC HERO MESSAGES ────────────────────────────────────

function buildEntrepreneurHeroMessage(firstName, overallScore, weakest, secondWeakest, strongest, growth, aspiration, devInterest, jobRole) {
  const roleLabel = jobRole || 'business leader';

  if (overallScore < 35) {
    return `${firstName}, your Executive Edge Score of ${overallScore} reveals a critical gap between your expertise as a ${roleLabel} and how the market perceives your business. Your ${weakest.name} scored just ${weakest.score}, and your ${secondWeakest.name} is at ${secondWeakest.score}. You told us ${growth.area} is where you need the most growth — and for a business owner, this directly impacts your revenue pipeline, client attraction, and ability to scale. The good news: ${growth.fix} is exactly what turns scores like yours into business breakthroughs.`;
  } else if (overallScore < 50) {
    return `${firstName}, at ${overallScore}, your Executive Edge Score shows your business is at a critical inflection point. Your ${strongest.name} (${strongest.score}) proves you have real strengths to build on — but your ${weakest.name} at just ${weakest.score} is the bottleneck holding your growth back. As a ${roleLabel} focused on ${aspiration}, the gap between where your business is and where it could be is closeable — but it requires the right strategy, not just more hustle.`;
  } else if (overallScore < 65) {
    return `${firstName}, your score of ${overallScore} shows genuine momentum — especially your ${strongest.name} at ${strongest.score}. But you identified ${growth.area} as your biggest growth frontier, and your ${weakest.name} score of ${weakest.score} confirms there's significant untapped potential. For a ${roleLabel} focused on ${aspiration}, closing this specific gap is the single highest-leverage move you can make to grow your business in the next 90 days.`;
  } else if (overallScore < 80) {
    return `${firstName}, your Executive Edge Score of ${overallScore} puts you ahead of most entrepreneurs and business owners at your level. Your ${strongest.name} (${strongest.score}) is a genuine competitive advantage for your business. But even with these strengths, your ${weakest.name} at ${weakest.score} reveals the gap that's keeping you from scaling further. As a ${roleLabel}, this kind of targeted improvement doesn't just help — it transforms your revenue, reach, and market position.`;
  } else {
    return `${firstName}, your Executive Edge Score of ${overallScore} puts you in elite territory among business owners. Your ${strongest.name} (${strongest.score}) is exceptional, and your overall profile shows an entrepreneur operating at a very high level. But even here, your ${weakest.name} (${weakest.score}) reveals room for strategic improvement — and as a ${roleLabel}, the difference between a successful business and a market-defining one is precisely this kind of intentional gap-closing.`;
  }
}

// ─── CORPORATE HERO MESSAGES (original logic) ───────────────────────────────

function buildCorporateHeroMessage(firstName, overallScore, weakest, secondWeakest, strongest, growth, aspiration, devInterest) {
  if (overallScore < 35) {
    return `${firstName}, your Executive Edge Score of ${overallScore} reveals a significant gap between your talent and how the world sees you. Your ${weakest.name} scored just ${weakest.score}, and your ${secondWeakest.name} is at ${secondWeakest.score}. You told us ${growth.area} is where you need the most growth — and the data confirms it. Here's what matters: this is the most fixable gap in your career. ${growth.fix} is exactly what turns scores like yours into breakthrough results.`;
  } else if (overallScore < 50) {
    return `${firstName}, at ${overallScore}, your Executive Edge Score shows you're at a critical inflection point. Your ${strongest.name} (${strongest.score}) proves you have real strengths — but your ${weakest.name} at just ${weakest.score} is the bottleneck holding everything back. You've told us your aspiration is ${aspiration}, and you're most interested in ${devInterest}. The gap between where you are and where you want to be is closeable — but it requires the right strategy, not just more effort.`;
  } else if (overallScore < 65) {
    return `${firstName}, your score of ${overallScore} shows genuine momentum — especially your ${strongest.name} at ${strongest.score}. But you identified ${growth.area} as your biggest growth frontier, and your ${weakest.name} score of ${weakest.score} confirms there's significant untapped potential. For someone focused on ${aspiration}, closing this specific gap is the single highest-leverage move you can make in the next 90 days.`;
  } else if (overallScore < 80) {
    return `${firstName}, your Executive Edge Score of ${overallScore} puts you ahead of most professionals at your level. Your ${strongest.name} (${strongest.score}) is a genuine competitive advantage. But even with these strengths, your ${weakest.name} at ${weakest.score} reveals the gap that's keeping you from the next tier. You know this — it's why you flagged ${growth.area} as your focus. At your level, this kind of targeted improvement doesn't just help. It transforms.`;
  } else {
    return `${firstName}, your Executive Edge Score of ${overallScore} puts you in elite territory. Your ${strongest.name} (${strongest.score}) is exceptional, and your overall profile shows a professional operating at a very high level. But even here, your ${weakest.name} (${weakest.score}) reveals room for strategic improvement — and you know it, which is exactly why you identified ${growth.area} as your focus. At your level, the difference between excellent and iconic is precisely this kind of intentional gap-closing.`;
  }
}

// ─── ENTREPRENEUR-SPECIFIC MILESTONES ───────────────────────────────────────

function buildEntrepreneurMilestones(staticMilestones, weakest, growth) {
  // Replace corporate milestones with business-owner milestones
  return [
    {
      icon: '🚀',
      title: 'Client & Revenue Growth',
      description: `Your ${weakest.name} score of ${weakest.score} is directly limiting your ability to attract premium clients and grow revenue. This is your most urgent gap to close.`,
    },
    {
      icon: '🧲',
      title: 'Inbound Lead Generation',
      description: 'Business owners with strong personal brands generate 3-5x more inbound leads than those without. Your brand should be your best salesperson.',
    },
    {
      icon: '🤝',
      title: 'Partner & Investor Attraction',
      description: 'Strategic partners, investors, and top talent are drawn to founders with clear market authority. Without it, you\'re always chasing instead of attracting.',
    },
    {
      icon: '📈',
      title: 'Business Valuation & Scale',
      description: 'A founder\'s personal brand directly impacts business valuation. The market pays a premium for businesses led by recognized authorities.',
    },
  ];
}

// ─── ENTREPRENEUR-SPECIFIC ACTION PLAN ──────────────────────────────────────

function buildEntrepreneurActionPlan(firstName, weakest, strongest, growth, aspiration, network, answers) {
  return [
    {
      title: "Position Your Brand as Your Business's Growth Engine",
      detail: `${firstName}, your personal brand and your business brand are inseparable as a founder. Your ${weakest.name} score of ${weakest.score} tells us this is the highest-leverage area to focus on right now. Define the unique perspective or methodology that sets you apart in your market — this becomes the foundation for attracting clients, partners, and media attention without constantly chasing them.`,
      urgency: 'This Week',
    },
    {
      title: 'Build Your Authority Content System',
      detail: `As a business owner, every piece of content you create should serve your business growth. Given that ${network} and your goal is ${aspiration}, start sharing insights from your business journey — case studies, lessons learned, market perspectives. This positions you as the go-to expert in your space and drives qualified leads to your business.`,
      urgency: 'Next 30 Days',
    },
    {
      title: 'Scale Beyond Founder-Dependency',
      detail: `With your ${strongest.name} already at ${strongest.score}, you have a genuine competitive advantage. Now build systems that let your brand and reputation generate opportunities while you focus on strategic growth. This means creating a content engine, building referral partnerships, and positioning yourself for speaking and media that amplifies your reach exponentially.`,
      urgency: 'Next 90 Days',
    },
  ];
}
