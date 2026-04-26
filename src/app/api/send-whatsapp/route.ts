import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!client) {
      console.warn("Twilio credentials not found, simulating WhatsApp send.");
      return NextResponse.json({ success: true, simulated: true });
    }

    // In a real application, the 'to' number would come from the lead's profile.
    // Here we use a generic placeholder or a verified Twilio number.
    const messageResponse = await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: 'whatsapp:+1234567890' // Replace with target number
    });

    return NextResponse.json({ success: true, sid: messageResponse.sid });
  } catch (error: any) {
    console.error("Twilio API error:", error);
    return NextResponse.json({ error: error.message || 'Failed to send WhatsApp message' }, { status: 500 });
  }
}
