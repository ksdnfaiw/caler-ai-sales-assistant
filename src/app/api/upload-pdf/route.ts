import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function POST(req: Request) {
  try {
    const { pdfBase64 } = await req.json();

    if (!pdfBase64) {
      return NextResponse.json({ error: 'PDF content is required' }, { status: 400 });
    }

    const uploadRes = await cloudinary.uploader.upload(pdfBase64, { 
      resource_type: "auto",
      folder: "scaler_ai_sales_assistant"
    });

    return NextResponse.json({ url: uploadRes.secure_url });
  } catch (error: any) {
    console.error("Cloudinary API error:", error);
    return NextResponse.json({ error: error.message || 'Failed to upload PDF' }, { status: 500 });
  }
}
