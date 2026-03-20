# The Executive Edge Score — Leap Academy Quiz Funnel

A fully personalised quiz funnel for Leap Academy by Ilana Golan. Built in React + Vite, deployed via GitHub → Replit.

---

## 🚀 Quick Start (Local)

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── data/
│   └── quizData.js        ← ALL CUSTOMISABLE CONTENT IS HERE
├── pages/
│   ├── LandingPage.jsx    ← Quiz entry / landing page
│   ├── LandingPage.css
│   ├── QuizPage.jsx       ← Interactive quiz flow
│   ├── QuizPage.css
│   ├── ResultsPage.jsx    ← Full personalised thank you page
│   └── ResultsPage.css
├── App.jsx                ← Routing
├── index.css              ← Global design system
└── main.jsx               ← Entry point
```

---

## ✏️ How to Customise

### 1. Add Your VSL Videos

In `src/data/quizData.js`, find each tier and update `vslUrl`:

```js
basic_branding: {
  vslUrl: 'https://www.youtube.com/embed/YOUR_YOUTUBE_VIDEO_ID',
  ...
}
```

**Tiers and their IDs:**
| Tier ID | Income Range | Audience |
|---------|-------------|----------|
| `basic_branding` | Under $70K – $99K | Brand Builders |
| `confidence_boost` | $100K – $160K | Confidence Catalysts |
| `leadership_dev` | $160K – $260K | Leadership Accelerators |
| `executive_presence` | $260K – $450K | Executive Presence |
| `authority_building` | $450K – $750K | Authority Architects |
| `portfolio_career` | $750K – $1M | Portfolio Architects |
| `scaling_business` | $1M+ | Scale Strategists |

### 2. Add Podcast/YouTube Episode IDs

In `src/data/quizData.js`, each tier has `podcastEpisodes` with a `youtubeId` field:

```js
podcastEpisodes: [
  {
    title: "Episode Title",
    description: "Episode description",
    youtubeId: "dQw4w9WgXcQ",  // ← Replace with real YouTube video ID
    tags: ["Tag1", "Tag2"]
  }
]
```

### 3. Add Testimonial Videos

In `ResultsPage.jsx`, find Section 8 (video testimonials) and replace the placeholder comment with your iframe:

```jsx
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  title="Testimonial 1"
  frameBorder="0"
  allowFullScreen
  style={{ width: '100%', height: '220px', borderRadius: '8px' }}
/>
```

### 4. Update the Book Call URL

In `ResultsPage.jsx`, update:
```js
const BOOK_CALL_URL = 'https://www.leapacademy.com/strategy-call';
```

### 5. Add Ilana's Signature Image

Place a signature PNG at `/public/ilana-signature.png`. If not present, it falls back gracefully.

### 6. Customise Colours Per Tier

Each tier has a `color` field in `quizData.js`:
```js
confidence_boost: {
  color: '#4a7fb5',  // ← Change this
}
```

---

## 🐙 GitHub Setup

### First time (create repo):

```bash
cd executive-edge-score
git init
git add .
git commit -m "Initial commit: Executive Edge Score quiz funnel"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/executive-edge-score.git
git push -u origin main
```

### Future updates:
```bash
git add .
git commit -m "Your update message"
git push
```

---

## 🔁 Replit Deployment

1. Go to [replit.com](https://replit.com) and click **+ Create Repl**
2. Select **Import from GitHub**
3. Paste your GitHub repo URL
4. Replit will auto-detect it as a Node.js project
5. In the **Shell**, run:
   ```bash
   npm install
   npm run dev -- --host 0.0.0.0
   ```
6. Or set the **Run** command in `.replit` file (see below)

### `.replit` file (create in root):
```
run = "npm run dev -- --host 0.0.0.0 --port 3000"
```

For production build on Replit:
```
run = "npm run build && npx serve dist --listen 3000"
```

---

## 📊 Quiz Flow

```
Landing Page
    ↓
Question 1 (Growth Area) → Personalised Feedback
    ↓
Name Collection (personalises all subsequent questions)
    ↓
Questions 2–7 → Personalised Feedback after each answer
    ↓
Email Collection
    ↓
Phone Collection (skippable)
    ↓
Results Page (personalised based on income band)
```

### Results Page Sections:
1. **Score Dashboard** — Overall score + 4 sub-scores + answer recap
2. **VSL / Free Training** — Tier-specific video (swap YouTube URL per tier)
3. **CTA #1** — Detailed strategy call sell under the VSL
4. **Letter from Ilana** — Dynamically generated from quiz answers
5. **90-Day Action Plan** — 3 specific steps based on tier
6. **CTA #2** — Banner CTA
7. **Recommended Podcasts** — 3 curated episodes per tier
8. **Testimonial Videos** — 3 video upload slots
9. **Social Proof Bar** — Stats and press logos
10. **Final CTA** — Full closing CTA section

---

## 🎨 Design System

All colours, fonts, and spacing variables are in `src/index.css`:

```css
--gold: #c9a84c;
--ink: #0a0a0f;
--cream: #faf8f3;
--font-display: 'Playfair Display', Georgia, serif;
--font-body: 'DM Sans', system-ui, sans-serif;
```

---

## 📬 Email/CRM Integration

Currently the form collects email and phone. To send to a CRM (Mailchimp, HubSpot, ActiveCampaign, etc.):

In `QuizPage.jsx`, find `handlePhoneSubmit` and add a `fetch()` call to your CRM's API before `navigate('/results')`.

Example:
```js
const handlePhoneSubmit = async () => {
  // Send to CRM
  await fetch('https://your-api.com/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emailInput, phone: phoneInput, tier, firstName })
  });
  // Then proceed
  onComplete({ firstName, answers, email: emailInput, phone: phoneInput, ...results });
  navigate('/results');
};
```

---

## 🔧 Tech Stack

- **React 18** + **React Router v6**
- **Vite** (fast dev + build)
- **Framer Motion** (available, use if needed for extra animations)
- **Pure CSS** (no Tailwind — fully custom design system)
- **No backend required** — pure frontend

---

Built for **Leap Academy** · [leapacademy.com](https://www.leapacademy.com)
