# Scaler AI Sales Assistant

### 1. What you built
I built a Next.js sales assistant designed to automate and personalize both pre-call coaching and post-call follow-ups. The application ingests raw call audio, transcribes it instantly using Groq's Whisper API, and uses a Llama 3.1 model to generate a tailored pre-call coaching nudge for the sales rep. After the call, it structures the transcribed insights into a custom PDF Sales Brief, uploads it to Cloudinary, and prepares a pre-filled `wa.me` WhatsApp link so the rep can effortlessly review and send the personalized brief directly to the lead.

### 2. One failure you found
**Input**: A transcript where a lead vaguely said, "I want to switch to a product company but don't know AI."
**Failure**: The Llama 3.1 agent hallucinated an offer for a "12-week AI Engineering Bootcamp." The prompt lacked strict grounding constraints to our actual product catalogue, causing the agent to over-index on being "helpful" by inventing a tailored, but non-existent, product.

### 3. Scale plan
Scaling to 100,000 leads a month breaks client-side PDF generation first. Relying on `html2pdf.js` ties up the browser's UI thread, making bulk processing impossible. We must offload PDF rendering to a scalable backend service (like Puppeteer on AWS Lambda). 
Additionally, manual `wa.me` clicks for 100k leads will destroy sales rep productivity. To survive scale, we must fully transition to the automated Twilio WhatsApp API utilizing pre-approved Meta Content Templates, and build a unified approval dashboard rather than relying on individual reps' desktop WhatsApp applications.
