import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { leadName, leadRole, transcript } = await req.json();

    const prompt = `Based on the following transcript, create content for a personalized sales document for ${leadName} (${leadRole}).

Format the output strictly as a JSON object with the following three string keys:
"intro": An introduction referencing the lead, answers to their questions, and why our solution fits them.
"roi": ROI reasoning (Why it makes financial/business sense for them).
"plan": "What I'd do in your position (next 90 days)".

Rules:
- No fluff
- Honest tone
- If unsure about specific details from the transcript, say "I'll confirm specifics"
- Output ONLY valid JSON, no markdown formatting.

Transcript: ${transcript}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      response_format: { type: "json_object" }
    });

    const contentStr = completion.choices[0]?.message?.content;
    const content = JSON.parse(contentStr || '{"intro": "", "roi": "", "plan": ""}');

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json({ error: 'Failed to generate PDF content' }, { status: 500 });
  }
}
