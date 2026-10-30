
import React, { useState } from "react";
import { saveScan } from "../utils/scanHistory";
import "./ScanMessage.css";

function ScanMessage() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  function handleScan() {
    if (!message.trim()) {
      setResult({
        type: "error",
        title: "Message Required",
        description: "Please paste a message before scanning.",
      });
      return;
    }

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

    const lowerMessage = message.toLowerCase();

    const found = keywords.filter((word) =>
      lowerMessage.includes(word)
    );

    const isSuspicious = found.length > 0;

    if (isSuspicious) {
      setResult({
        type: "warning",
        title: "Suspicious Indicators Found",
        description: `The following keywords were detected: ${found.join(", ")}`,
      });

      saveScan(
        "Scan Message",
        message.trim().slice(0, 100),
        "Suspicious"
      );
    } else {
      setResult({
        type: "info",
        title: "No Matching Keywords Found",
        description:
          "This demo did not find the listed suspicious keywords. This does not guarantee that the message is safe.",
      });

      saveScan(
        "Scan Message",
        message.trim().slice(0, 100),
        "No Warning"
      );
    }
  }

  function clearMessage() {
    setMessage("");
    setResult(null);
  }

  return (
    <div className="scan-message-page">
      <div className="message-heading">
        <div>
          <span className="message-label">MESSAGE SECURITY</span>
          <h2>Scan Message</h2>
          <p>Check suspicious SMS, WhatsApp messages and emails.</p>
        </div>
        <div className="message-icon">💬</div>
      </div>

      <div className="message-banner">
        <span>🛡️</span>
        <div>
          <h3>Think Before You Trust</h3>
          <p>
            Identify common suspicious words and warning signs
            before responding to an unknown message.
          </p>
        </div>
      </div>

      <div className="message-card">
        <h3>Paste Your Message</h3>
        <p>Copy and paste the message you want to check.</p>

        <textarea
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            setResult(null);
          }}
          placeholder="Paste your suspicious SMS, WhatsApp message or email here..."
        />

        <div className="message-actions">
          <button
            className="message-scan-button"
            onClick={handleScan}
          >
            🛡️ Scan Message
          </button>

          <button
            className="message-clear-button"
            onClick={clearMessage}
          >
            Clear
          </button>
        </div>

        {result && (
          <div className={`message-result ${result.type}`}>
            <h4>{result.title}</h4>
            <p>{result.description}</p>
          </div>
        )}
      </div>

      <div className="message-warning">
        <span>⚠️</span>
        <p>
          Never paste real OTPs, passwords, bank details or other
          confidential information. This is a basic keyword demo,
          not a verified scam detection system.
        </p>
      </div>
    </div>
  );
}

export default ScanMessage;
