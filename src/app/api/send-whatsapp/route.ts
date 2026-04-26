import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

export async function POST(req: Request) {
  try {
    const { message, to, pdfBase64 } = await req.json();

    if (!client) {
      console.warn("Twilio credentials not found, simulating WhatsApp send.");
      return NextResponse.json({ success: true, simulated: true });
    }

    if (!to) return NextResponse.json({ error: 'Recipient number required' }, { status: 400 });

    let mediaUrl = undefined;
    if (pdfBase64) {
      // Upload the PDF base64 to Cloudinary
      const uploadRes = await cloudinary.uploader.upload(pdfBase64, { 
        resource_type: "auto",
        folder: "scaler_ai_sales_assistant"
      });
      mediaUrl = uploadRes.secure_url;
    }

    const messagePayload: any = {
      body: mediaUrl ? `${message}\n\n📄 View your Sales Brief: ${mediaUrl}` : message,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${to}`
    };

    // Twilio WhatsApp supports mediaUrl for sending documents directly, but appending the link to the text is also very reliable.
    if (mediaUrl) {
      messagePayload.mediaUrl = [mediaUrl];
    }

    const messageResponse = await client.messages.create(messagePayload);

    return NextResponse.json({ success: true, sid: messageResponse.sid, mediaUrl });
  } catch (error: any) {
    console.error("Twilio/Cloudinary API error:", error);
    return NextResponse.json({ error: error.message || 'Failed to send WhatsApp message' }, { status: 500 });
  }
}
