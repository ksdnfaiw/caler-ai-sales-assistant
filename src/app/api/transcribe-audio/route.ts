import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import fs from 'fs';
import os from 'os';
import path from 'path';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  let tempFilePath = '';
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    tempFilePath = path.join(os.tmpdir(), `upload_${Date.now()}_${file.name || 'audio.mp3'}`);
    fs.writeFileSync(tempFilePath, buffer);

    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: "whisper-large-v3-turbo",
    });

    fs.unlinkSync(tempFilePath);

    return NextResponse.json({ text: transcription.text });
  } catch (error) {
    console.error("Transcription error:", error);
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}
