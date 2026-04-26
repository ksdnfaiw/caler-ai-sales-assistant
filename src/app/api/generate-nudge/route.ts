import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { leadName, leadRole, transcript } = await req.json();

    const prompt = `Write a short WhatsApp-style message for a sales rep before a call.
    
Include:
- Who the lead is
- Why they are here (reason based on transcript)
- 2 ways to connect
- 2 objections + quick replies
- One opening line

Rules:
- Under 120 words
- Human tone
- No generic language

Input:
Lead Name: ${leadName}
Lead Role: ${leadRole}
Transcript: ${transcript}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
    });

    const nudge = completion.choices[0]?.message?.content || "Failed to generate nudge.";

    return NextResponse.json({ nudge });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json({ error: 'Failed to generate nudge' }, { status: 500 });
  }
}
