import React, { useState } from "react";
import { summarizeMedicalReport } from "./pages/geminiApi";
import * as pdfjsLib from "pdfjs-dist";
import "./pages/ocr.css";

export default function PdfSummarizer() {
  const [pdfFile, setPdfFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        try {
          const typedArray = new Uint8Array(reader.result);
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          let text = "";

          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();
            text += content.items.map((item) => item.str).join(" ");
          }
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const handleSummarize = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF file.");
      return;
    }
    setLoading(true);
    try {
      const extractedText = await extractTextFromPDF(pdfFile);
      const result = await summarizeMedicalReport(extractedText);
      setSummary(result);
    } catch (error) {
      console.error("Error processing PDF:", error);
      setSummary("An error occurred while processing the PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ocr-container">
      <header className="ocr-header">
        <h1>Medical Report Summarizer</h1>
        <p className="subtitle">Upload a medical report PDF to extract and summarize key information</p>
      </header>

      <div className="upload-section">
        <div className="file-upload">
          <label htmlFor="pdf-upload" className="file-label">
            <span className="upload-icon">📄</span>
            <span>Choose PDF File</span>
          </label>
          <input
            type="file"
            id="pdf-upload"
            accept="application/pdf"
            onChange={handleFileChange}
            className="file-input"
          />
          {pdfFile && <div className="file-name">{pdfFile.name}</div>}
        </div>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Processing your medical report. Please wait...</p>
        </div>
      )}

      <button
        onClick={handleSummarize}
        className="summarize-button"
        disabled={!pdfFile || loading}
      >
        {loading ? "Processing..." : "Summarize Report"}
      </button>

      {summary && (
        <div className="results-container">
          <div className="result-section summary">
            <h2>Medical Report Summary</h2>
            <div className="summary-container">
              <div className="summary-content">
                {summary.includes("Patient:") ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        summary
                          .replace(/\*\*Patient:\*\*/g, '<div class="patient-info"><strong>Patient:</strong>')
                          .replace(/\*\*Conditions:\*\*/g, "</div><h3>Conditions:</h3>")
                          .replace(/\*\*Diagnosis:\*\*/g, '<div class="diagnosis-section"><h3>Diagnosis:</h3>')
                          .replace(
                            /\*\*Treatment Plan:\*\*/g,
                            '</div><div class="treatment-section"><h3>Treatment Plan:</h3>',
                          )
                          .replace(/\*\*Follow-up:\*\*/g, '</div><div class="followup-section"><h3>Follow-up:</h3>')
                          .replace(/\*\*Primary:\*\*/g, "<strong>Primary:</strong>")
                          .replace(/\*\*Secondary:\*\*/g, "<strong>Secondary:</strong>")
                          .replace(/\*\*Medications:\*\*/g, "<strong>Medications:</strong>")
                          .replace(/\*\*Lifestyle Changes:\*\*/g, "<strong>Lifestyle Changes:</strong>")
                          .replace(/\*\*Monitoring:\*\*/g, "<strong>Monitoring:</strong>") + "</div>",
                    }}
                  />
                ) : (
                  summary
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}