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
    const bodyParams = await req.json();
    const { message, to, pdfBase64, mediaUrl: existingMediaUrl } = bodyParams;

    if (!client) {
      console.warn("Twilio credentials not found, simulating WhatsApp send.");
      return NextResponse.json({ success: true, simulated: true });
    }

    if (!to) return NextResponse.json({ error: 'Recipient number required' }, { status: 400 });

    let finalMediaUrl = existingMediaUrl;
    if (pdfBase64) {
      // Upload the PDF base64 to Cloudinary
      const uploadRes = await cloudinary.uploader.upload(pdfBase64, { 
        resource_type: "auto",
        folder: "scaler_ai_sales_assistant"
      });
      finalMediaUrl = uploadRes.secure_url;
    }

    const messagePayload: any = {
      body: message,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${to}`
    };

    if (finalMediaUrl) {
      messagePayload.mediaUrl = [finalMediaUrl];
    }

    const messageResponse = await client.messages.create(messagePayload);

    return NextResponse.json({ success: true, sid: messageResponse.sid, mediaUrl });
  } catch (error: any) {
    console.error("Twilio/Cloudinary API error:", error);
    return NextResponse.json({ error: error.message || 'Failed to send WhatsApp message' }, { status: 500 });
  }
}
