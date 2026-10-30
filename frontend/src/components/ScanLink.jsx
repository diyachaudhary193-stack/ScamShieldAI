
import React, { useState } from "react";
import { saveScan } from "../utils/scanHistory";
import "./ScanLink.css";

function ScanLink() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  function handleScan() {
    setResult("");

    if (!url.trim()) {
      setResult("Please enter a website URL.");
      return;
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(url.trim());
    } catch {
      setResult(
        "Invalid URL. Please enter a complete URL, such as https://example.com"
      );
      return;
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      setResult("Only HTTP and HTTPS links are supported.");
      return;
    }

    setLoading(true);

    // Real URL reputation API will be connected later.
    setTimeout(() => {
      setLoading(false);

      const scanResult =
        "URL format is valid. ScamShield AI's real link detection engine is not connected yet. No security verdict has been generated.";

      setResult(scanResult);

      saveScan(
        "Scan Link",
        parsedUrl.href.slice(0, 100),
        "Pending Analysis"
      );
    }, 800);
  }

  return (
    <div className="scan-link-page">
      <div className="link-heading">
        <div>
          <span className="link-label">WEBSITE SECURITY</span>
          <h2>Scan Link</h2>
          <p>Check suspicious website links before opening them.</p>
        </div>
        <div className="link-shield">🔗</div>
      </div>

      <div className="link-banner">
        <span>🛡️</span>
        <div>
          <h3>Stay Safe Online</h3>
          <p>
            Check a website URL before sharing personal information
            or entering your account details.
          </p>
        </div>
      </div>

      <div className="link-scan-card">
        <h3>Enter Website URL</h3>
        <p>Paste the complete link you want to check.</p>

        <div className="url-input-area">
          <span>🔗</span>
          <input
            type="url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
              setResult("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleScan();
            }}
            placeholder="https://example.com"
          />
        </div>

        <button
          className="link-scan-button"
          onClick={handleScan}
          disabled={loading}
        >
          {loading ? "Checking URL..." : "🛡️ Check Website"}
        </button>

        {result && (
          <div className="link-result">
            <strong>Scan Information</strong>
            <p>{result}</p>
          </div>
        )}
      </div>

      <div className="link-warning">
        <span>⚠️</span>
        <p>
          Never enter your password, OTP, banking details or personal
          information on an unverified website. URL format validation
          does not prove that a website is safe.
        </p>
      </div>
    </div>
  );
}

export default ScanLink;
