
import React, { useState } from "react";
import { saveScan } from "../utils/scanHistory";
import "./ScanFile.css";

function ScanFile() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function handleFile(event) {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "text/plain",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only PDF and TXT files are supported.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10 MB.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
    setResult(null);
  }

  async function scanFile() {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      if (file.type === "text/plain") {
        const text = await file.text();

        const keywords = [
          "otp",
          "password",
          "urgent",
          "winner",
          "bank details",
          "click here",
          "verify account",
          "claim prize",
          "account blocked",
          "send money",
        ];

        const found = keywords.filter((word) =>
          text.toLowerCase().includes(word)
        );

        const status =
          found.length > 0 ? "Suspicious" : "No Warning";

        setResult({
          type: found.length > 0 ? "warning" : "info",
          title:
            found.length > 0
              ? "Suspicious Indicators Found"
              : "No Matching Keywords Found",
          description:
            found.length > 0
              ? `Detected keywords: ${found.join(", ")}`
              : "No listed suspicious keywords were found. This does not guarantee the file is safe.",
        });

        saveScan("Scan File", file.name, status);
      } else {
        setResult({
          type: "info",
          title: "PDF Uploaded Successfully",
          description:
            "PDF text extraction is not connected yet. No security analysis has been performed.",
        });

        saveScan("Scan File", file.name, "Pending Analysis");
      }
    } catch (error) {
      setResult({
        type: "error",
        title: "File Reading Failed",
        description: "Unable to read this file.",
      });
    } finally {
      setLoading(false);
    }
  }

  function clearFile() {
    setFile(null);
    setResult(null);
  }

  return (
    <div className="scan-file-page">
      <div className="file-heading">
        <div>
          <span>FILE SECURITY</span>
          <h2>Scan File</h2>
          <p>Check PDF and text files for suspicious indicators.</p>
        </div>
        <div className="file-icon">📂</div>
      </div>

      <div className="file-banner">
        <span>🛡️</span>
        <div>
          <h3>Protect Your Documents</h3>
          <p>
            Check supported files for common suspicious words
            before trusting their contents.
          </p>
        </div>
      </div>

      <div className="file-card">
        <h3>Upload Your File</h3>
        <p>Select a PDF or TXT file from your device.</p>

        <input
          type="file"
          accept=".pdf,.txt,application/pdf,text/plain"
          onChange={handleFile}
        />

        {file && (
          <div className="selected-file">
            <span>📄</span>
            <div>
              <strong>{file.name}</strong>
              <small>
                {(file.size / 1024).toFixed(1)} KB
              </small>
            </div>
          </div>
        )}

        <div className="file-actions">
          <button
            className="file-scan-button"
            onClick={scanFile}
            disabled={!file || loading}
          >
            {loading ? "Scanning..." : "🛡️ Scan File"}
          </button>

          <button
            className="file-clear-button"
            onClick={clearFile}
          >
            Clear
          </button>
        </div>

        {result && (
          <div className={`file-result ${result.type}`}>
            <h4>{result.title}</h4>
            <p>{result.description}</p>
          </div>
        )}
      </div>

      <div className="file-warning">
        ⚠️ Never upload files containing confidential information,
        passwords, OTPs or private financial documents.
      </div>
    </div>
  );
}

export default ScanFile;
