"use client";

import { useState, useRef } from "react";
import { Bolt, FileText, FileUp, MessageSquare, Download, ZoomIn, Loader2, Check } from "lucide-react";

export default function Home() {
  const [leadName, setLeadName] = useState("");
  const [leadRole, setLeadRole] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [transcript, setTranscript] = useState("");
  
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const [nudge, setNudge] = useState("");
  const [pdfContent, setPdfContent] = useState<any>(null);
  
  const [isGeneratingNudge, setIsGeneratingNudge] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const [nudgeApproved, setNudgeApproved] = useState(false);

  const pdfRef = useRef<HTMLDivElement>(null);

  const handleGenerateNudge = async () => {
    if (!leadName || !transcript) return alert("Please provide lead name and transcript.");
    
    setIsGeneratingNudge(true);
    try {
      const res = await fetch("/api/generate-nudge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadName, leadRole, transcript })
      });
      const data = await res.json();
      if (data.nudge) setNudge(data.nudge);
    } catch (err) {
      console.error(err);
      alert("Failed to generate nudge.");
    } finally {
      setIsGeneratingNudge(false);
    }
  };

  const handleGeneratePdf = async () => {
    if (!leadName || !transcript) return alert("Please provide lead name and transcript.");
    
    setIsGeneratingPdf(true);
    try {
      const res = await fetch("/api/generate-pdf-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadName, leadRole, transcript })
      });
      const data = await res.json();
      if (data.content) setPdfContent(data.content);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF content.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAudio(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/transcribe-audio", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      if (res.ok && data.text) {
        setTranscript(data.text);
      } else {
        alert(data.error || "Failed to transcribe audio.");
      }
    } catch (err) {
      console.error("Audio upload error:", err);
      alert("An error occurred during audio upload.");
    } finally {
      setIsUploadingAudio(false);
      // Reset input value so same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  const downloadPdf = async () => {
    if (typeof window !== "undefined" && pdfRef.current) {
      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: 1,
        filename: `Sales_Brief_${leadName.replace(/\s+/g, "_")}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
      };
      html2pdf().set(opt).from(pdfRef.current).save();
    }
  };

  const approveAndSendWhatsApp = async () => {
    if (!nudge || !leadPhone) {
      return alert("Please generate a nudge and provide a WhatsApp number.");
    }
    setIsSending(true);
    try {
      let pdfBase64 = null;
      if (typeof window !== "undefined" && pdfRef.current) {
        const html2pdf = (await import("html2pdf.js")).default;
        const opt = {
          margin: 1,
          filename: `Sales_Brief.pdf`,
          image: { type: 'jpeg' as const, quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
        };
        pdfBase64 = await html2pdf().set(opt).from(pdfRef.current).outputPdf('datauristring');
      }

      const res = await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: nudge, to: leadPhone, pdfBase64 })
      });
      const data = await res.json();
      if (res.ok) {
        setNudgeApproved(true);
        alert("WhatsApp message sent successfully!");
        setTimeout(() => setNudgeApproved(false), 2000);
      } else {
        alert(`Failed to send WhatsApp message: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error sending WhatsApp message.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="flex-grow max-w-[1200px] w-full mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="font-h1 text-[32px] font-semibold text-primary">Sales Assistant</h1>
        <p className="font-body-md text-[16px] text-[#46464a] mt-1">Nurture leads with AI-powered context and materials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: INPUT */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          <section className="apple-card apple-shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-[#0058bc]">person</span>
              <h2 className="font-h3 text-[20px] font-semibold">Lead Profile</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="font-label-caps text-[12px] font-semibold uppercase tracking-wider text-[#46464a] mb-2 block">FULL NAME</label>
                <input 
                  value={leadName}
                  onChange={e => setLeadName(e.target.value)}
                  className="w-full bg-[#f3f3f5] border border-[#c7c6ca] rounded-lg px-4 py-3 font-body-md focus:border-[#0058bc] focus:ring-4 focus:ring-[#0058bc]/10 transition-all focus:outline-none" 
                  placeholder="e.g. Jonathan Ive" 
                  type="text"
                />
              </div>
              <div>
                <label className="font-label-caps text-[12px] font-semibold uppercase tracking-wider text-[#46464a] mb-2 block">COMPANY & ROLE</label>
                <input 
                  value={leadRole}
                  onChange={e => setLeadRole(e.target.value)}
                  className="w-full bg-[#f3f3f5] border border-[#c7c6ca] rounded-lg px-4 py-3 font-body-md focus:border-[#0058bc] focus:ring-4 focus:ring-[#0058bc]/10 transition-all focus:outline-none" 
                  placeholder="Design VP at Apple" 
                  type="text"
                />
              </div>
              <div>
                <label className="font-label-caps text-[12px] font-semibold uppercase tracking-wider text-[#46464a] mb-2 block">WHATSAPP NUMBER</label>
                <input 
                  value={leadPhone}
                  onChange={e => setLeadPhone(e.target.value)}
                  className="w-full bg-[#f3f3f5] border border-[#c7c6ca] rounded-lg px-4 py-3 font-body-md focus:border-[#0058bc] focus:ring-4 focus:ring-[#0058bc]/10 transition-all focus:outline-none" 
                  placeholder="e.g. +14155238886" 
                  type="tel"
                />
              </div>
            </div>
          </section>

          <section className="apple-card apple-shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-[#0058bc]">description</span>
              <h2 className="font-h3 text-[20px] font-semibold">Call Transcript</h2>
            </div>
            <textarea 
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
              className="w-full h-40 bg-[#f3f3f5] border border-[#c7c6ca] rounded-lg px-4 py-3 font-body-md focus:border-[#0058bc] focus:ring-4 focus:ring-[#0058bc]/10 transition-all resize-none focus:outline-none" 
              placeholder="Paste call notes or full transcript here..."
            />
          </section>

          <section className="apple-card apple-shadow p-6 border-dashed border-2 border-[#c7c6ca] relative overflow-hidden">
            <input 
              type="file" 
              accept="audio/*" 
              onChange={handleAudioUpload}
              disabled={isUploadingAudio}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10" 
            />
            <div className="flex flex-col items-center justify-center py-4 text-center hover:bg-[#f3f3f5] transition-colors rounded-xl group">
              {isUploadingAudio ? (
                <>
                  <Loader2 className="w-8 h-8 text-[#0058bc] animate-spin mb-2" />
                  <h3 className="font-body-lg text-[18px] font-medium text-[#0058bc]">Transcribing Audio...</h3>
                  <p className="font-body-sm text-[14px] text-[#46464a]">This may take a few seconds</p>
                </>
              ) : (
                <>
                  <FileUp className="w-8 h-8 text-[#77767b] group-hover:text-[#0058bc] transition-colors mb-2" />
                  <h3 className="font-body-lg text-[18px] font-medium">Upload Call Audio</h3>
                  <p className="font-body-sm text-[14px] text-[#46464a]">MP3, WAV, or M4A (Max 25MB)</p>
                </>
              )}
            </div>
          </section>

          <div className="flex flex-col gap-3 mt-2">
            <button 
              onClick={handleGenerateNudge}
              disabled={isGeneratingNudge}
              className="bg-[#0058bc] text-white font-button text-[15px] font-medium py-4 rounded-xl shadow-md active:scale-[0.98] transition-all hover:bg-[#0058bc]/90 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isGeneratingNudge ? <Loader2 className="w-5 h-5 animate-spin" /> : <Bolt className="w-5 h-5" />}
              Generate Nudge
            </button>
            <button 
              onClick={handleGeneratePdf}
              disabled={isGeneratingPdf}
              className="bg-[#e2e2e4] text-[#030304] font-button text-[15px] font-medium py-4 rounded-xl active:scale-[0.98] transition-all hover:bg-[#e2e2e4]/80 flex items-center justify-center gap-2 border border-[#c7c6ca]/50 disabled:opacity-70"
            >
              {isGeneratingPdf ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
              Generate PDF
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: OUTPUT */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Pre-Call Nudge */}
          <section className="apple-card apple-shadow p-8 bg-blue-50/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-[#009a3b]" />
                <h2 className="font-h3 text-[20px] font-semibold">Pre-Call Nudge</h2>
              </div>
              <span className="text-[14px] text-[#46464a] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#009a3b] animate-pulse"></span>
                AI Generated context
              </span>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="w-full bg-white p-6 rounded-2xl rounded-tl-none apple-shadow border border-blue-100 min-h-[150px] flex flex-col justify-center">
                {isGeneratingNudge ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" /> Generating nudge...
                  </div>
                ) : nudge ? (
                  <>
                    <textarea 
                      value={nudge}
                      onChange={e => setNudge(e.target.value)}
                      className="font-body-md text-[#1a1c1d] w-full bg-transparent border-none focus:outline-none resize-none min-h-[250px]"
                    />
                    <span className="block mt-2 text-[10px] text-[#46464a] text-right">
                      {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </>
                ) : (
                  <p className="font-body-md text-gray-400 italic">No nudge generated yet. Fill the inputs and click "Generate Nudge".</p>
                )}
              </div>
            </div>
          </section>

          {/* PDF Preview */}
          <section className="apple-card apple-shadow overflow-hidden flex flex-col max-h-[600px]">
            <div className="p-6 border-b border-[#c7c6ca] flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#ba1a1a]">picture_as_pdf</span>
                <h2 className="font-h3 text-[20px] font-semibold">Sales Brief Preview</h2>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-[#f3f3f5] rounded-lg"><ZoomIn className="w-5 h-5 text-[#46464a]" /></button>
                <button onClick={downloadPdf} disabled={!pdfContent} className="p-2 hover:bg-[#f3f3f5] rounded-lg disabled:opacity-50"><Download className="w-5 h-5 text-[#46464a]" /></button>
              </div>
            </div>
            
            <div className="p-12 bg-[#e2e2e4] overflow-y-auto min-h-[400px]">
              <div ref={pdfRef} className="bg-white mx-auto shadow-2xl p-10 min-h-[600px] w-full max-w-[500px] flex flex-col gap-6 font-sans">
                {isGeneratingPdf ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <p>Generating personalized brief...</p>
                  </div>
                ) : pdfContent ? (
                  <>
                    <div className="border-b-4 border-[#0058bc] w-16 mb-4"></div>
                    <h1 className="text-2xl font-bold text-[#030304] tracking-tight">Executive Summary for {leadName}</h1>
                    <p className="text-sm text-[#46464a] leading-relaxed whitespace-pre-wrap">{pdfContent.intro}</p>
                    
                    <h2 className="text-lg font-semibold mt-4">Key Insights & ROI Alignment</h2>
                    <p className="text-sm text-[#46464a] leading-relaxed whitespace-pre-wrap">{pdfContent.roi}</p>

                    <h2 className="text-lg font-semibold mt-4">Next 90 Days Plan</h2>
                    <p className="text-sm text-[#46464a] leading-relaxed whitespace-pre-wrap">{pdfContent.plan}</p>

                    <div className="mt-auto pt-8 border-t border-[#c7c6ca]">
                      <p className="text-[10px] text-[#46464a]">Confidential Brief • Scaler AI Intelligence</p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 italic">
                    PDF content will appear here.
                  </div>
                )}
              </div>
            </div>
          </section>

          <div className="flex items-center justify-end gap-3 mt-2">
            <button className="px-6 py-3 font-button text-[15px] font-medium text-[#46464a] hover:text-[#030304] transition-colors">Skip</button>
            <button className="px-8 py-3 apple-card font-button text-[15px] font-medium text-[#030304] hover:bg-[#f3f3f5] transition-all active:scale-95">Edit Content</button>
            <button 
              onClick={approveAndSendWhatsApp}
              disabled={!nudge || nudgeApproved || isSending}
              className="px-10 py-3 bg-[#0058bc] text-white font-button text-[15px] font-medium rounded-full shadow-lg hover:shadow-blue-500/20 hover:bg-[#0058bc]/90 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : nudgeApproved ? <Check className="w-5 h-5" /> : null}
              {isSending ? "Sending..." : nudgeApproved ? "Sent!" : "Approve & Send"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
