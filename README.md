# Freelancer Portfolio (React + Vite + TypeScript)

This portfolio includes a working contact form that sends:

1. The visitor message to `pradeepshetty.m003@gmail.com`
2. An automatic acknowledgment email back to the visitor

It uses EmailJS in the browser.

## 1) Install and run

```bash
npm install
npm run dev
```

## 2) Configure EmailJS

Create a `.env` file in the project root by copying `.env.example`.

Required variables:

```dotenv
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id_here
VITE_EMAILJS_OWNER_TEMPLATE_ID=your_emailjs_owner_template_id_here
VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID=your_emailjs_auto_reply_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key_here
```

Restart the Vite server after editing `.env`.

## 3) EmailJS templates

Create two templates in EmailJS:

- Owner template (`VITE_EMAILJS_OWNER_TEMPLATE_ID`)
  - Recipient should resolve to `to_email` (passed from app as `pradeepshetty.m003@gmail.com`)
  - Suggested fields: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{reply_to}}`

- Auto-reply template (`VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID`)
  - Recipient should resolve to `to_email` (passed from app as visitor email)
  - Suggested fields: `{{to_name}}`, `{{from_name}}`, `{{message}}`

If your template uses different variable names, update them in `src/App.tsx` accordingly.

## 4) Build

```bash
npm run build
```

## 5) Vercel deployment checklist

For hosted usage, Vercel must have the same EmailJS env variables at build time.

1. Go to Vercel -> Project -> Settings -> Environment Variables.
2. Add all four variables for at least `Production` (and `Preview` if needed):

```dotenv
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id_here
VITE_EMAILJS_OWNER_TEMPLATE_ID=your_emailjs_owner_template_id_here
VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID=your_emailjs_auto_reply_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key_here
```

3. Redeploy the project (environment variable changes are applied only after rebuild).
4. In EmailJS dashboard, allow your deployed domains (for example `https://<your-project>.vercel.app` and your custom domain) in the service/template security settings.
5. Submit the contact form from the deployed site and verify:
  - Owner email arrives at `pradeepshetty.m003@gmail.com`
  - Auto-reply arrives at the visitor's email
