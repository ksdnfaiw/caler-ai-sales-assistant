# Scaler AI Sales Assistant

A Next.js web application built for sales representatives to intelligently nurture leads with AI-powered context, dynamic PDF generation, and automated WhatsApp outreach.

## Features

- **Apple-Inspired UI**: Clean, minimal, and premium interface built with Tailwind CSS.
- **Audio Upload & Transcription**: Upload call recordings (MP3, WAV, M4A) and securely transcribe them using Groq's high-speed `whisper-large-v3-turbo` model.
- **AI Pre-Call Nudge**: Automatically generate highly personalized, human-tone WhatsApp messages based on the lead's profile and call transcript using the Groq `llama-3.1-8b-instant` model.
- **Dynamic Sales Brief Generation**: Analyzes call transcripts to produce structured Executive Summaries (Intro, ROI Alignment, 90-Day Plan) dynamically.
- **PDF Export**: Seamlessly converts the generated Sales Brief into a downloadable PDF format using `html2pdf.js`.
- **WhatsApp Integration**: Sends the approved Pre-Call Nudge directly to the lead via the Twilio Messaging API.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **AI Models**: Groq (`whisper-large-v3-turbo` & `llama-3.1-8b-instant`)
- **Messaging**: Twilio
- **PDF Generation**: `html2pdf.js`
- **Icons**: Lucide React & Google Material Symbols

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

```env
GROQ_API_KEY=your_groq_api_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

## Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
