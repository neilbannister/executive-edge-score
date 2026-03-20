// ─── QUIZ QUESTIONS ──────────────────────────────────────────────────────────

export const QUESTIONS = [
  {
    id: 'growth_area',
    question: 'Which area do you feel you need the most growth in to elevate your career?',
    subtitle: 'Be honest — this shapes your entire Edge Score.',
    options: [
      { value: 'A', label: 'Building a personal brand', icon: '🏛️', trait: 'brand' },
      { value: 'B', label: 'Boosting my confidence', icon: '💎', trait: 'confidence' },
      { value: 'C', label: 'Developing leadership skills', icon: '⚡', trait: 'leadership' },
      { value: 'D', label: 'Establishing authority in my field', icon: '🎯', trait: 'authority' },
    ],
    feedback: {
      A: "Brand-building is the single highest-leverage move a senior professional can make — yet most never do it intentionally.",
      B: "Confidence is the hidden currency of every boardroom. The leaders you admire? They built it deliberately, not naturally.",
      C: "Leadership at the top looks nothing like what most people were taught. The gap between good managers and transformational leaders is almost always strategic, not technical.",
      D: "Authority compounds faster than almost any other career asset. Once you're known, doors open without you knocking.",
    }
  },
  {
    id: 'market_position',
    question: 'How do you currently position yourself in the job market?',
    subtitle: 'Think about how decision-makers at top firms would perceive you right now.',
    options: [
      { value: 'A', label: "I'm just starting to build my brand", icon: '🌱', trait: 'brand' },
      { value: 'B', label: 'I have some visibility but need to enhance it', icon: '📡', trait: 'confidence' },
      { value: 'C', label: "I'm recognized as a leader", icon: '🏆', trait: 'leadership' },
      { value: 'D', label: "I'm a well-known authority in my industry", icon: '👑', trait: 'authority' },
    ],
    feedback: {
      A: "Starting fresh is actually an advantage — you get to build your brand with intention, not by accident.",
      B: "Being partially visible is often the most frustrating position — you know your value but the right people don't see it yet. This is exactly the gap Leap Academy closes.",
      C: "Recognized leadership is powerful — the next step is turning recognition into magnetic pull, where opportunities seek you out.",
      D: "Known authorities generate 3–5x more inbound opportunities than equally talented professionals. The question is whether your authority is converting into income.",
    }
  },
  {
    id: 'development_interest',
    question: 'What type of professional development are you most interested in?',
    subtitle: "There's no wrong answer — this tells us what's holding you back most.",
    options: [
      { value: 'A', label: 'Brand-building strategies', icon: '🎨', trait: 'brand' },
      { value: 'B', label: 'Confidence and personal development', icon: '🔥', trait: 'confidence' },
      { value: 'C', label: 'Leadership and management training', icon: '🧭', trait: 'leadership' },
      { value: 'D', label: 'Authority building through speaking and writing', icon: '🎤', trait: 'authority' },
    ],
    feedback: {
      A: "The professionals commanding the highest salaries and most exciting roles at Google, JPMorgan and McKinsey are almost always the ones with the strongest personal brands.",
      B: "Personal development at the executive level isn't soft — it's the hardest, most high-leverage work you'll ever do. The leaders who invest here see the fastest results.",
      C: "The difference between a $200K leader and a $500K leader is almost never technical skill. It's strategic leadership presence — and it can be built systematically.",
      D: "Speaking and writing authority is the fastest path to becoming the person everyone recommends. Ilana's clients have used this to land board seats, speaking stages, and advisory roles.",
    }
  },
  {
    id: 'aspiration',
    question: 'What is your biggest career aspiration for the next 1–2 years?',
    subtitle: 'Think bigger than your current role allows.',
    options: [
      { value: 'A', label: 'Establish a recognizable personal brand', icon: '✨', trait: 'brand' },
      { value: 'B', label: 'Increase my income and visibility', icon: '📈', trait: 'confidence' },
      { value: 'C', label: 'Step into a leadership role', icon: '🚀', trait: 'leadership' },
      { value: 'D', label: 'Scale my business or career significantly', icon: '⚡', trait: 'authority' },
    ],
    feedback: {
      A: "Building a recognizable personal brand in the next 12–24 months is not only achievable — Leap Academy clients have done exactly this, generating $50K–$150K income jumps as a result.",
      B: "Income and visibility are directly linked — Leap clients in your position have seen salary jumps of $50K–$150K within months of implementing the right strategies.",
      C: "Stepping into leadership is a science, not luck. The exact pathway — from visibility to credibility to opportunity — is what Leap Academy maps out for you.",
      D: "Scaling a career or business is almost always a brand problem before it's a strategy problem. Once you're known for the right thing, scale becomes inevitable.",
    }
  },
  {
    id: 'network',
    question: 'Which best describes your current professional network?',
    subtitle: 'Your network is your real net worth — where are you?',
    options: [
      { value: 'A', label: 'Limited connections; still building my network', icon: '🌐', trait: 'brand' },
      { value: 'B', label: 'Some connections, but I want to expand', icon: '🤝', trait: 'confidence' },
      { value: 'C', label: 'A strong network in my industry', icon: '💼', trait: 'leadership' },
      { value: 'D', label: 'An extensive network with influential contacts', icon: '👥', trait: 'authority' },
    ],
    feedback: {
      A: "Network is the most underrated career asset. Leap Academy gives you access to 100K+ curated professional connections — and a systematic way to activate them.",
      B: "An expanding network is exponentially more powerful than most people realise — one strategic connection in finance or tech can change your trajectory completely.",
      C: "A strong industry network is a powerful foundation. The next step is building cross-functional and cross-industry reach that creates optionality others don't have.",
      D: "An influential network is a force multiplier. The question is whether you're systematically converting that network into income, opportunities, and legacy.",
    }
  },
  {
    id: 'opportunity_response',
    question: 'How do you typically respond to new opportunities?',
    subtitle: 'Honest self-reflection here is where breakthrough begins.',
    options: [
      { value: 'A', label: 'I hesitate and often miss out', icon: '⏸️', trait: 'confidence' },
      { value: 'B', label: 'I consider them but need more confidence', icon: '🤔', trait: 'confidence' },
      { value: 'C', label: 'I seize them when they align with my goals', icon: '🎯', trait: 'leadership' },
      { value: 'D', label: 'I actively pursue multiple opportunities', icon: '⚡', trait: 'authority' },
    ],
    feedback: {
      A: "Hesitation at the senior level almost always comes from one thing: not having a clear, compelling narrative about your value. That's fixable — and fast.",
      B: "Needing more confidence before acting is incredibly common at the highest levels. The executives you admire don't feel more certain — they've just built the habits and frameworks that let them act anyway.",
      C: "Goal-aligned opportunity selection is a sign of strategic maturity. The next level is creating a pipeline of inbound opportunities so you're always choosing, never waiting.",
      D: "Actively pursuing multiple opportunities is a power move — the question is whether your brand is strong enough to convert them at the rate your talent deserves.",
    }
  },
  {
    id: 'income',
    question: 'What is your current or most recent annual income?',
    subtitle: 'This helps us calibrate your personalised Edge Score and next-level strategy.',
    options: [
      { value: 'A', label: 'Less than $70K', icon: null, tier: 'basic_branding' },
      { value: 'B', label: '$70K – $99K', icon: null, tier: 'basic_branding' },
      { value: 'C', label: '$100K – $160K', icon: null, tier: 'confidence_boost' },
      { value: 'D', label: '$160K – $260K', icon: null, tier: 'leadership_dev' },
      { value: 'E', label: '$260K – $450K', icon: null, tier: 'executive_presence' },
      { value: 'F', label: '$450K – $750K', icon: null, tier: 'authority_building' },
      { value: 'G', label: '$750K – $1M', icon: null, tier: 'portfolio_career' },
      { value: 'H', label: 'Over $1M', icon: null, tier: 'scaling_business' },
    ],
    feedback: {
      A: "Your income is the starting point, not the ceiling. Leap Academy clients in similar positions have doubled or tripled their income within 12–18 months using the exact strategies we'll outline for you.",
      B: "The $70K–$100K range is where the right brand investment creates the most dramatic leaps. Small strategic moves here create massive income jumps.",
      C: "Breaking through the $160K ceiling is one of the most common inflection points Leap clients face. It's a visibility problem, not a talent problem.",
      D: "At this income level, the gap between where you are and where you could be is almost always a personal brand and authority problem — not a skills problem.",
      E: "At $260K+, you're already in the top percentile of earners — but the leaders in your peer group earning $1M+ are almost always better branded, not better skilled.",
      F: "At this level, every conversation is about legacy, impact, and scale. Your brand needs to reflect the leader you're becoming, not the one you've been.",
      G: "The portfolio career — multiple income streams, advisory roles, speaking, investing — is the next natural evolution at your income level. Leap Academy has built this exact path for dozens of clients.",
      H: "Scaling beyond $1M is a brand architecture and leverage problem. The question isn't whether you can do it — it's whether your market positioning reflects your actual capability.",
    }
  }
];

// ─── RESULT TIERS ─────────────────────────────────────────────────────────────

export const RESULT_TIERS = {
  basic_branding: {
    id: 'basic_branding',
    label: 'Brand Builder',
    incomeRange: 'Under $70K – $99K',
    tagline: 'Your talent is invisible — and that\'s the only thing holding you back.',
    color: '#c9a84c',
    heroMessage: "Your Executive Edge Score reveals something important: your skills and ambition are significantly outpacing how the world sees you. This is fixable — and fast.",
    vslUrl: 'https://www.youtube.com/embed/YOUR_VSL_BRAND_BUILDER',
    podcastEpisodes: [
      {
        title: "How to Build a Personal Brand from Zero",
        description: "Ilana breaks down the exact first steps high-performers take to get visible — even when starting from scratch.",
        youtubeId: "PODCAST_EP_BRAND_1",
        tags: ["Personal Brand", "Visibility"]
      },
      {
        title: "The 5 Steps to Reinvent and Leap Your Career",
        description: "How to reposition yourself as the expert you already are — and get the market to notice.",
        youtubeId: "PODCAST_EP_BRAND_2",
        tags: ["Career Reinvention", "Brand"]
      },
      {
        title: "Why Smart People Stay Stuck (And How to Break Free)",
        description: "The real reason talented professionals stay invisible — and the systematic fix.",
        youtubeId: "PODCAST_EP_BRAND_3",
        tags: ["Career Strategy", "Mindset"]
      }
    ],
    ilanaLetter: (name, answers) => `Dear ${name},

I want to be direct with you — because that's what you deserve after taking the time to be honest in this assessment.

Your answers reveal a pattern I've seen hundreds of times in my years coaching professionals across Google, JPMorgan, and some of the world's most competitive industries: extraordinary talent trapped inside invisible packaging.

You've told me that ${getAnswerInsight(answers, 'growth_area')}. And your network is ${getAnswerInsight(answers, 'network')}. When new opportunities appear, ${getAnswerInsight(answers, 'opportunity_response')}.

Here's the hard truth: in the markets you want to compete in — finance, tech, global business — your brand is your entry ticket. It doesn't matter how good you are if no one knows it. And right now, the world doesn't know it nearly well enough.

The good news? Brand is the most buildable thing in your career toolkit. It's not luck. It's not connections you don't have. It's a systematic process — one I've used to help thousands of professionals double or triple their income within 12–18 months.

Your Executive Edge Score shows me exactly where to start with you. And I'd love to show you what's possible in a private strategy call.

With belief in your potential,

Ilana Golan
Founder, Leap Academy`,
    actionPlan: [
      {
        title: "Define Your 'Known For' Statement",
        detail: "Within the next 7 days, write a single sentence that captures exactly what you want to be known for in your industry. Not your job title — your expertise and impact. This becomes the foundation of everything.",
        urgency: "Week 1"
      },
      {
        title: "Claim Your LinkedIn Authority",
        detail: "Your LinkedIn profile needs to position you as the expert you are, not as a job description. Rewrite your headline, about section, and banner to reflect where you're going — not just where you've been.",
        urgency: "Week 2"
      },
      {
        title: "Create One Piece of Visible Expertise",
        detail: "Publish one LinkedIn post, article, or speak up in one meeting or industry forum this week. Show your thinking. Authority is built in public, one contribution at a time.",
        urgency: "Week 3"
      }
    ]
  },

  confidence_boost: {
    id: 'confidence_boost',
    label: 'Confidence Catalyst',
    incomeRange: '$100K – $160K',
    tagline: 'You\'re already performing at a high level — your confidence just hasn\'t caught up yet.',
    color: '#4a7fb5',
    heroMessage: "Your Executive Edge Score shows a significant confidence gap — not a skills gap. The difference between where you are and where you want to be is almost entirely between your ears.",
    vslUrl: 'https://www.youtube.com/embed/YOUR_VSL_CONFIDENCE',
    podcastEpisodes: [
      {
        title: "Building Unshakeable Confidence as an Executive",
        description: "The specific mindset shifts and daily habits that turn high-performers into confident leaders.",
        youtubeId: "PODCAST_EP_CONF_1",
        tags: ["Confidence", "Mindset"]
      },
      {
        title: "How to Negotiate Your Worth with Certainty",
        description: "Ilana reveals the negotiation frameworks her clients use to secure $50K–$150K salary jumps.",
        youtubeId: "PODCAST_EP_CONF_2",
        tags: ["Negotiation", "Income"]
      },
      {
        title: "Overcoming Imposter Syndrome at the Top",
        description: "Why the most successful people struggle most with imposter syndrome — and how to break the cycle.",
        youtubeId: "PODCAST_EP_CONF_3",
        tags: ["Imposter Syndrome", "Leadership"]
      }
    ],
    ilanaLetter: (name, answers) => `Dear ${name},

I've worked with thousands of professionals, and I can tell you with certainty: confidence is not a personality trait. It's a skill. And your scores tell me it's the one skill that, if you built it deliberately, would unlock everything else.

You've shared that you ${getAnswerInsight(answers, 'development_interest')}. When opportunities arise, you ${getAnswerInsight(answers, 'opportunity_response')}. And your aspiration is to ${getAnswerInsight(answers, 'aspiration')}.

At $100K–$160K, you're already performing at a high level — that income doesn't come to people who aren't talented. But here's what I see clearly: you're leaving significant money, recognition, and impact on the table because your internal narrative hasn't caught up with your external results.

The executives earning $300K, $500K, $1M+ in your field are not more talented than you. In many cases, they're not even smarter. But they've built the unshakeable confidence to ask for more, pitch bigger, and position themselves as the obvious choice — even in the world's most competitive rooms.

This is exactly what we do at Leap Academy. Not through hollow affirmations, but through systematic identity work, strategic positioning, and a community of people who will push you to see what you're truly capable of.

Your next level is closer than you think.

With genuine belief,

Ilana Golan
Founder, Leap Academy`,
    actionPlan: [
      {
        title: "Audit Your Internal Story",
        detail: "Write down the three beliefs about yourself that are holding you back professionally. Then, for each one, write the counter-evidence — the proof that the belief isn't universally true. Do this before the end of this week.",
        urgency: "This Week"
      },
      {
        title: "Request One Overdue Opportunity",
        detail: "Identify one opportunity you've been hesitating on — a conversation, a raise request, a promotion conversation, a pitch — and schedule it within the next 14 days. Preparation creates confidence; waiting destroys it.",
        urgency: "Next 2 Weeks"
      },
      {
        title: "Build Your Evidence File",
        detail: "Create a running document of every win, compliment, and positive outcome in your career. Reference it before every high-stakes meeting. Confidence is rebuilt on evidence, and you have more than you think.",
        urgency: "Ongoing"
      }
    ]
  },

  leadership_dev: {
    id: 'leadership_dev',
    label: 'Leadership Accelerator',
    incomeRange: '$160K – $260K',
    tagline: 'You\'re a strong performer — now it\'s time to become an undeniable leader.',
    color: '#2d5a8b',
    heroMessage: "At your income level, the leap from high-performer to true executive leader is closer than you think — but it requires a different set of moves than what got you here.",
    vslUrl: 'https://www.youtube.com/embed/YOUR_VSL_LEADERSHIP',
    podcastEpisodes: [
      {
        title: "The Invisible Qualities of Transformational Leaders",
        description: "What separates the C-suite from the Director level — and how to develop these qualities deliberately.",
        youtubeId: "PODCAST_EP_LEAD_1",
        tags: ["Leadership", "C-Suite"]
      },
      {
        title: "How to Get a $50K–$150K Promotion in Your Current Company",
        description: "The exact internal positioning strategy Leap clients use to secure massive promotions without job-hopping.",
        youtubeId: "PODCAST_EP_LEAD_2",
        tags: ["Promotion", "Salary"]
      },
      {
        title: "Building Executive Presence That Commands Rooms",
        description: "From communication to body language to strategic visibility — the full executive presence playbook.",
        youtubeId: "PODCAST_EP_LEAD_3",
        tags: ["Executive Presence", "Communication"]
      }
    ],
    ilanaLetter: (name, answers) => `Dear ${name},

At $160K–$260K, you're in the arena where the game changes completely.

You've proven you can execute. Now the question is whether you can lead — not just a team, but a narrative. The leaders who break into the $300K–$500K tier aren't just better managers. They're people who have mastered the art of being seen as essential, not just excellent.

Your quiz tells me that you want to ${getAnswerInsight(answers, 'aspiration')}, and that you ${getAnswerInsight(answers, 'opportunity_response')}. You've also indicated that ${getAnswerInsight(answers, 'growth_area')} is where you know you need to grow.

Here's what I've learned coaching professionals at exactly your level: the ceiling you're hitting isn't about performance. Every senior leader in your company can see you perform. The gap is strategic visibility — being in the right conversations, associated with the right outcomes, and positioned as the next obvious choice before the opportunity is announced.

At Leap Academy, we've helped dozens of professionals in your exact position — at Google, JPMorgan, McKinsey, major tech scale-ups — make this exact leap in under 12 months. The strategy call I'm inviting you to isn't a sales call. It's a 45-minute map of exactly what your next move is.

You're closer than you think.

Ilana Golan
Founder, Leap Academy`,
    actionPlan: [
      {
        title: "Identify Your 'Signature Problem'",
        detail: "Every transformational leader is known for solving a specific, high-stakes problem. What is the one problem in your organisation or industry that you're uniquely positioned to solve? Define it explicitly and start being vocal about your perspective on it.",
        urgency: "This Week"
      },
      {
        title: "Map Your Visibility Gaps",
        detail: "Who are the 5 most influential decision-makers in your career trajectory who don't know you well enough? Create a 30-day plan to have meaningful contact with each of them — not networking, but adding genuine value.",
        urgency: "Next 30 Days"
      },
      {
        title: "Build Your 'Executive POV'",
        detail: "Start sharing strategic opinions on industry trends on LinkedIn once a week. Executives don't just execute — they lead thought. This single habit has helped Leap clients secure speaking invitations, board seats, and C-suite opportunities.",
        urgency: "Starting Now"
      }
    ]
  },

  executive_presence: {
    id: 'executive_presence',
    label: 'Executive Presence',
    incomeRange: '$260K – $450K',
    tagline: 'You\'re in the elite tier — but your presence isn\'t yet matching your performance.',
    color: '#8b5e2d',
    heroMessage: "Your Executive Edge Score reveals that while your accomplishments are substantial, your executive presence and market positioning aren't yet reflecting the full weight of your impact.",
    vslUrl: 'https://www.youtube.com/embed/YOUR_VSL_EXECUTIVE',
    podcastEpisodes: [
      {
        title: "How to Position Yourself for the C-Suite",
        description: "The boardroom-ready branding and presence strategies that separate the VP from the CEO.",
        youtubeId: "PODCAST_EP_EXEC_1",
        tags: ["C-Suite", "Executive Brand"]
      },
      {
        title: "Building a $500K+ Career in Finance and Tech",
        description: "How Leap clients at elite firms have broken income ceilings that looked impenetrable.",
        youtubeId: "PODCAST_EP_EXEC_2",
        tags: ["Income Growth", "Finance/Tech"]
      },
      {
        title: "The Power of a Portfolio Career: Multiple Streams at the Top",
        description: "Advisory boards, speaking, consulting — building income and influence beyond your job title.",
        youtubeId: "PODCAST_EP_EXEC_3",
        tags: ["Portfolio Career", "Advisory"]
      }
    ],
    ilanaLetter: (name, answers) => `Dear ${name},

You've earned your way into a rarified professional tier. At $260K–$450K, you're performing at a level most professionals never reach — and that's worth acknowledging.

But your quiz answers tell me something important: you know you're not done. You've indicated that ${getAnswerInsight(answers, 'growth_area')} is the area where you need to grow, and that your aspiration is to ${getAnswerInsight(answers, 'aspiration')}.

At your income level, the gap between where you are and where the top 0.1% operate isn't technical. It's architectural. It's about how deliberately you've built your market positioning, your external brand, and your reputation in rooms you're not in.

I've coached professionals at Google, JPMorgan, Goldman Sachs, and leading tech companies at your exact level. The ones who make the next leap — to C-suite, to founding their own firm, to becoming a known industry voice — almost always do three things differently. They build strategic external visibility. They cultivate a network of peers who elevate them. And they invest in becoming the name that gets mentioned when the conversation turns to who can lead the next big thing.

That's what we map out in your strategy call. I'll look at your specific situation — your industry, your company, your goals — and give you the exact three moves that will have the most impact in the next 90 days.

This is your moment.

Ilana Golan
Founder, Leap Academy`,
    actionPlan: [
      {
        title: "Audit Your Board-Level Brand",
        detail: "Google yourself right now. What comes up? At your income level, the people making decisions about your next opportunity are searching for you before they call. Your digital presence must tell the story of a transformational executive — not just a high-performing professional.",
        urgency: "Today"
      },
      {
        title: "Pursue One External Platform",
        detail: "Conference speaking, a Forbes/HBR contributor slot, a podcast appearance, or a board advisory role — pick one and pursue it within 60 days. External validation compounds. The first platform is always the hardest; after that, they multiply.",
        urgency: "Next 60 Days"
      },
      {
        title: "Architect Your Cross-Industry Network",
        detail: "At your level, the most valuable connections are cross-industry — investors, board members, operators from adjacent sectors. Identify 3 non-obvious, high-influence people to build relationships with over the next quarter.",
        urgency: "This Quarter"
      }
    ]
  },

  authority_building: {
    id: 'authority_building',
    label: 'Authority Architect',
    incomeRange: '$450K – $750K',
    tagline: 'At your level, you\'re not building a career anymore — you\'re building a legacy.',
    color: '#2d7a5a',
    heroMessage: "Your Executive Edge Score shows you're operating at a level where the rules change completely. Authority, not effort, is the currency that unlocks your next level.",
    vslUrl: 'https://www.youtube.com/embed/YOUR_VSL_AUTHORITY',
    podcastEpisodes: [
      {
        title: "From Executive to Industry Icon: Building Lasting Authority",
        description: "How the world's most influential business leaders systematically built their reputations.",
        youtubeId: "PODCAST_EP_AUTH_1",
        tags: ["Authority", "Legacy"]
      },
      {
        title: "The Portfolio Career Playbook for Seven-Figure Earners",
        description: "Advisory boards, speaking fees, equity stakes — the exact architecture of a portfolio career.",
        youtubeId: "PODCAST_EP_AUTH_2",
        tags: ["Portfolio Career", "7-Figure"]
      },
      {
        title: "How to Build a Personal Brand That Outlasts Your Job Title",
        description: "The executives who remain influential long after they leave a company — and what they did differently.",
        youtubeId: "PODCAST_EP_AUTH_3",
        tags: ["Personal Brand", "Legacy"]
      }
    ],
    ilanaLetter: (name, answers) => `Dear ${name},

At $450K–$750K, you've achieved something that 99% of professionals never will. The question isn't whether you're successful — it's whether you're as influential as you deserve to be.

Your answers reveal something telling: you chose ${getAnswerInsight(answers, 'growth_area')} as your primary growth area. For someone at your income level, this tells me that the gap between your internal value and your external authority is significant — and that gap is costing you.

Not in money — you're doing well financially. In impact. In legacy. In the doors that remain closed even to people at your level.

The executives I've worked with who earn $1M+ in total compensation share one common trait: they've built an authority that operates independently of their job title. Their name opens doors. Their perspective shapes industries. Their network doesn't just support them — it actively creates opportunities for them.

Building this level of authority is what I specialize in for professionals at your stage. It's not about more hustle. It's about architectural decisions — where you speak, what you write, which boards you join, how you position your unique intellectual capital in the market.

In your strategy call, I'll show you exactly what authority architecture looks like for your specific profile, industry, and goals. This is the most valuable 45 minutes you'll invest this year.

Ilana Golan
Founder, Leap Academy`,
    actionPlan: [
      {
        title: "Write Your Intellectual Capital Inventory",
        detail: "List the 5 insights, frameworks, or perspectives you have that most people in your field don't. These are the seeds of your intellectual authority. One of them could become a keynote, a book, a methodology, or a course that generates income and influence for decades.",
        urgency: "This Weekend"
      },
      {
        title: "Pursue Your First or Next Board Seat",
        detail: "Advisory and board positions are the highest-leverage authority signals available to professionals at your level. Identify 3 companies — startup or established — where your expertise would be genuinely valuable, and reach out with a specific value proposition.",
        urgency: "Next 90 Days"
      },
      {
        title: "Build a Signature Speaking Platform",
        detail: "One keynote speech at the right conference can generate more opportunities than a year of LinkedIn posting. Define your signature talk — the one idea only you can deliver from your unique vantage point — and pitch it to 5 relevant events.",
        urgency: "Next Quarter"
      }
    ]
  },

  portfolio_career: {
    id: 'portfolio_career',
    label: 'Portfolio Architect',
    incomeRange: '$750K – $1M',
    tagline: 'Your next chapter isn\'t a bigger job — it\'s a more powerful portfolio.',
    color: '#7a2d8b',
    heroMessage: "At your level, the conventional career ladder has run its course. Your Executive Edge Score reveals enormous untapped potential in building a portfolio of income, influence, and impact.",
    vslUrl: 'https://www.youtube.com/embed/YOUR_VSL_PORTFOLIO',
    podcastEpisodes: [
      {
        title: "The Portfolio Career: Multiple 7-Figure Income Streams",
        description: "How top executives build consulting, advisory, and investing income alongside — or instead of — a corporate role.",
        youtubeId: "PODCAST_EP_PORT_1",
        tags: ["Portfolio Career", "Income Streams"]
      },
      {
        title: "Building a Thought Leadership Empire",
        description: "From keynotes to books to courses — how the world's highest-earning professionals monetize their expertise.",
        youtubeId: "PODCAST_EP_PORT_2",
        tags: ["Thought Leadership", "Monetization"]
      },
      {
        title: "Exit Strategies and What Comes Next for Top Executives",
        description: "How to position yourself now for maximum optionality when the time comes to make your next big move.",
        youtubeId: "PODCAST_EP_PORT_3",
        tags: ["Strategy", "Executive Transition"]
      }
    ],
    ilanaLetter: (name, answers) => `Dear ${name},

You've built something genuinely impressive. At $750K–$1M in income, you're in a category that most people never reach — and the decisions you make in the next 12–24 months will determine whether this is your ceiling or your launchpad.

Your quiz tells me you want to ${getAnswerInsight(answers, 'aspiration')}, and that you see ${getAnswerInsight(answers, 'growth_area')} as your frontier. At your level, these aren't career goals — they're legacy decisions.

I work with a small number of professionals at your tier through Leap Academy's Millionaires Club program. The pattern I see consistently: at $750K–$1M, the greatest opportunities aren't in climbing higher within a single organisation. They're in architecting a portfolio — advisory mandates, equity participation, consulting retainers, speaking fees, board compensation — that creates both higher income and far greater freedom.

The executives I've helped build this architecture have created $3M–$10M+ in total compensation within 24–36 months. Not through risk, but through strategic repositioning of expertise they already had.

Your strategy call with my team will map the specific portfolio architecture that fits your expertise, network, and goals. At your level, this conversation is the most valuable 45 minutes you'll invest.

Ilana Golan
Founder, Leap Academy`,
    actionPlan: [
      {
        title: "Map Your Portfolio Blueprint",
        detail: "List every possible income stream your expertise could generate: consulting, advisory, board seats, speaking, investing, angel participation, course/IP licensing. Rate each on potential impact and ease of entry. You'll find 2–3 that you could activate within 90 days.",
        urgency: "This Week"
      },
      {
        title: "Identify Your First Equity or Advisory Position",
        detail: "At your level, exchanging expertise for equity is one of the highest-return decisions available. Identify 3 companies — ideally Series A–C — where your operational knowledge would be genuinely valuable, and approach them with a specific proposal.",
        urgency: "Next 60 Days"
      },
      {
        title: "Build Your Personal Brand Infrastructure",
        detail: "A professional website, a refined LinkedIn presence, and a clearly articulated expertise narrative are the foundation of a portfolio career. These aren't vanity — they're the mechanism by which opportunities find you while you sleep.",
        urgency: "Next 30 Days"
      }
    ]
  },

  scaling_business: {
    id: 'scaling_business',
    label: 'Scale Strategist',
    incomeRange: '$1M+',
    tagline: 'You\'ve built the income. Now it\'s time to build the empire.',
    color: '#8b2d4a',
    heroMessage: "Your Executive Edge Score reveals that at $1M+, your greatest leverage isn't more performance — it's more architecture. Brand, systems, and strategic positioning are your highest-yield investments now.",
    vslUrl: 'https://www.youtube.com/embed/YOUR_VSL_SCALE',
    podcastEpisodes: [
      {
        title: "Scaling Personal Businesses Beyond $3M",
        description: "The systems, team structures, and positioning shifts that take businesses from $1M to $3M–$10M.",
        youtubeId: "PODCAST_EP_SCALE_1",
        tags: ["Scale", "Business Growth"]
      },
      {
        title: "Building a Global Personal Brand at Scale",
        description: "How to build an internationally recognised brand that generates inbound opportunities at a global level.",
        youtubeId: "PODCAST_EP_SCALE_2",
        tags: ["Global Brand", "Scale"]
      },
      {
        title: "From Founder to Industry Icon: The Final Leap",
        description: "The positioning and legacy strategies that turn successful founders into enduring industry icons.",
        youtubeId: "PODCAST_EP_SCALE_3",
        tags: ["Legacy", "Founder Brand"]
      }
    ],
    ilanaLetter: (name, answers) => `Dear ${name},

At $1M+ in annual income, you've done something extraordinary. You're in a category that fewer than 1% of professionals ever reach — and the fact that you took this quiz tells me you're not done.

You've indicated that ${getAnswerInsight(answers, 'growth_area')} is where you want to grow. At your level, this growth isn't about skill acquisition — it's about leverage. How do you make your expertise, reputation, and network generate value at a scale that no longer requires your constant presence?

This is the question I work on with the most senior professionals I coach in Leap Academy's Millionaires Club. The answer almost always involves three components: systematised brand architecture, a portfolio of passive and semi-passive income streams, and a public platform that generates inbound at a global scale.

The professionals I've helped at your tier — founders, C-suite executives, top-tier consultants — have used these strategies to build total compensation packages of $5M–$20M+ while actually reducing the hours they work. That's not a promise; it's a pattern.

Your strategy call will be frank, specific, and focused entirely on the 2–3 moves that will have the most leverage for your exact situation. No generic advice. No wasted time.

I look forward to the conversation.

Ilana Golan
Founder, Leap Academy`,
    actionPlan: [
      {
        title: "Audit Your Brand Architecture",
        detail: "At $1M+, your personal brand should be doing significant business development work for you. Is your public presence — website, LinkedIn, speaking profile, published content — generating inbound opportunities at the level your expertise deserves? If not, this is the highest-priority fix.",
        urgency: "Today"
      },
      {
        title: "Build Your Content-to-Revenue System",
        detail: "The highest-earning professionals at your level have a systematic process for converting their intellectual capital into income. Whether it's a book, a course, a newsletter, or a speaking platform — identify the one content asset that would have the highest leverage for your specific audience.",
        urgency: "Next Quarter"
      },
      {
        title: "Create Your Legacy Positioning Statement",
        detail: "In 10 years, what do you want to be known for having built, changed, or created? Write it down today. Everything you do strategically from this point forward should connect back to this statement. Legacy is built backwards from the end, not forwards from today.",
        urgency: "This Weekend"
      }
    ]
  }
};

// ─── SCORING LOGIC ────────────────────────────────────────────────────────────

export function calculateResults(answers) {
  const incomeAnswer = answers.income;
  
  let tier = 'basic_branding';
  if (incomeAnswer === 'A') tier = 'basic_branding';
  else if (incomeAnswer === 'B') tier = 'basic_branding';
  else if (incomeAnswer === 'C') tier = 'confidence_boost';
  else if (incomeAnswer === 'D') tier = 'leadership_dev';
  else if (incomeAnswer === 'E') tier = 'executive_presence';
  else if (incomeAnswer === 'F') tier = 'authority_building';
  else if (incomeAnswer === 'G') tier = 'portfolio_career';
  else if (incomeAnswer === 'H') tier = 'scaling_business';

  // Calculate sub-scores
  const traitCounts = { brand: 0, confidence: 0, leadership: 0, authority: 0 };
  let totalTraitAnswers = 0;

  QUESTIONS.slice(0, 6).forEach(q => {
    const answer = answers[q.id];
    if (answer) {
      const option = q.options.find(o => o.value === answer);
      if (option?.trait) {
        traitCounts[option.trait]++;
        totalTraitAnswers++;
      }
    }
  });

  // Score each trait (higher = stronger)
  const brandScore = Math.round(40 + (traitCounts.brand / Math.max(totalTraitAnswers, 1)) * 40 + Math.random() * 15);
  const confidenceScore = Math.round(35 + (traitCounts.confidence / Math.max(totalTraitAnswers, 1)) * 40 + Math.random() * 15);
  const leadershipScore = Math.round(45 + (traitCounts.leadership / Math.max(totalTraitAnswers, 1)) * 35 + Math.random() * 15);
  const authorityScore = Math.round(30 + (traitCounts.authority / Math.max(totalTraitAnswers, 1)) * 40 + Math.random() * 15);

  const clamp = (n) => Math.min(95, Math.max(25, n));

  const subScores = {
    brand: clamp(brandScore),
    confidence: clamp(confidenceScore),
    leadership: clamp(leadershipScore),
    authority: clamp(authorityScore),
  };

  const overallScore = Math.round((subScores.brand + subScores.confidence + subScores.leadership + subScores.authority) / 4);

  return { tier, subScores, overallScore };
}

// ─── ANSWER INSIGHT HELPER ────────────────────────────────────────────────────

function getAnswerInsight(answers, questionId) {
  const insightMap = {
    growth_area: {
      A: 'your personal brand needs the most attention',
      B: 'building confidence is your primary growth area',
      C: 'developing your leadership capabilities is front of mind',
      D: 'establishing authority in your field is your key focus',
    },
    aspiration: {
      A: 'build a recognizable personal brand in the next 1–2 years',
      B: 'significantly increase your income and visibility',
      C: 'step into a leadership role',
      D: 'scale your business or career significantly',
    },
    network: {
      A: "you're still building your professional network",
      B: 'you have some connections but want to expand significantly',
      C: 'you have a strong industry network',
      D: 'you have an extensive network with influential contacts',
    },
    opportunity_response: {
      A: 'you often hesitate and miss out on opportunities',
      B: 'you consider opportunities but hold back due to confidence',
      C: 'you seize opportunities that align with your goals',
      D: 'you actively pursue multiple opportunities simultaneously',
    },
    development_interest: {
      A: 'brand-building strategies are your primary interest',
      B: 'confidence and personal development are your focus',
      C: 'leadership and management training is what you need',
      D: 'authority building through speaking and writing excites you most',
    },
  };

  return insightMap[questionId]?.[answers[questionId]] || 'you have significant untapped potential';
}
