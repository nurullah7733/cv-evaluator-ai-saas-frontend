# CV Evaluator — Frontend

A resume review app for job seekers who want to understand what to improve before applying. Upload a CV, add a job description, and get feedback on skills, ATS readiness, and job fit.

## What you can do

- Upload PDF, DOCX, or TXT resumes up to 5 MB.
- Add a target job description to get feedback for a specific role.
- Set your region, industry, experience level, and desired salary.
- Choose a candidate or hiring-manager perspective.
- Read results through scorecards, charts, and detailed reports.
- Browse, search, open, and delete saved resumes.
- Review suggested changes, edit improvements, and run another analysis.
- Compare analysis versions to see score changes and added or missing skills.
- Open original uploaded files and export analysis reports as PDF.
- Sign up and sign in with Clerk.
- Subscribe through Stripe and manage billing from the app.
- Choose monthly ($14.99) or yearly ($99.00) Pro billing.

## AI feedback

- **Resume scoring:** an overall score plus structure, language, keywords, and experience scores.
- **Job matching:** job-fit score, keyword matching, and skill alignment against the job description.
- **ATS analysis:** exact, partial, and stem keyword coverage, weighted missing terms, and three priority actions.
- **Skill gaps:** missing skills ranked by severity, with suggestions for closing the gaps.
- **Resume improvements:** rewritten summaries, stronger experience bullets, clearer project descriptions, grouped skills, and section ordering.
- **Section review:** education, certifications, awards, and suggestions for useful missing sections.
- **Interview outlook:** an estimated interview probability with supporting reasoning.
- **Salary insights:** estimated regional salary ranges, confidence, desired-salary context, and percentile comparisons.
- **Career planning:** possible career paths, progression steps, certifications, and course suggestions.
- **Market context:** estimated regional demand, competition, hiring timing, demand drivers, and rising skills.
- **Recruiter pitch:** short talking points highlighting the candidate's background.
- **Hiring-manager view:** a concise summary, potential red flags, and must-have skill coverage.
- **Role shortlist:** suggested roles and their requirements.

Some insights require Pro. Scores, salary figures, market trends, and interview probabilities are AI estimates rather than verified hiring outcomes or live market data.

## AI providers

Gemini is currently enabled in the provider selector. OpenAI, DeepSeek, and Mistral are shown as unavailable. AI requests run through the backend; no model API key is needed in the browser.

## Setup

Install Node.js LTS and Git, then set up the [backend](https://github.com/nurullah7733/cv-evaluator-ai-saas-backend). The frontend runs at `http://localhost:3000`; the backend uses `http://localhost:4000`.

### Accounts and credentials

| Service | What you need |
| --- | --- |
| [Clerk](https://dashboard.clerk.com/) | Create an application. Copy its **Publishable Key** from API keys. Use the same Clerk application as the backend. |
| [Stripe](https://dashboard.stripe.com/) | Use the backend's Stripe account. Create recurring USD prices: **$14.99/month** and **$99.00/year**. Copy their `price_...` IDs, not product IDs. |
| Backend | Its API URL. MongoDB, Gemini, and Cloudinary accounts are configured on the backend only. |

### Run locally

```sh
git clone https://github.com/nurullah7733/cv-evaluator-ai-saas-frontend.git
cd cv-evaluator-ai-saas-frontend
npm install
cp .env.example .env
```

Set these values in `.env` before starting:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
VITE_API_URL=http://localhost:4000
VITE_STRIPE_PRICE_MONTHLY=price_your_monthly_price_id
VITE_STRIPE_PRICE_YEARLY=price_your_yearly_price_id
```

Use the same Stripe Price IDs and test/live mode as the backend. Then run:

```sh
npm run dev
```

Open `http://localhost:3000`, sign in, and upload a text-based resume. Restart Vite after changing `.env`.

Everything prefixed with `VITE_` is exposed to the browser. Never put database passwords, Clerk secret keys, Gemini keys, Cloudinary secrets, or Stripe secret keys here.

### Production

Set the deployed API URL and production Clerk/Stripe values, then run `npm run build`. Deploy `dist/` and configure your host to serve `index.html` for React Router routes. Set the backend's `FRONTEND_URL` to your frontend origin and configure the production domain in Clerk. Vite environment values are included at build time, so rebuild after changing them.

## Tech

React, Vite, Tailwind CSS, Radix UI, Redux Toolkit / RTK Query, Recharts, and Clerk.
