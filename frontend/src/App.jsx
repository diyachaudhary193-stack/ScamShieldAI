
import React, { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import ScanImage from "./components/ScanImage";
import ScanLink from "./components/ScanLink";
import ScanMessage from "./components/ScanMessage";
import ScanHistory from "./components/ScanHistory";
import ScanFile from "./components/ScanFile";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [showLinkBox, setShowLinkBox] = useState(false);
  const fileInput = useRef(null);

  const recentScans = [
    { name: "Suspicious email", type: "Message", date: "Today, 10:30 AM", status: "Safe" },
    { name: "Unknown website", type: "Link", date: "Today, 09:15 AM", status: "Suspicious" },
    { name: "Document upload", type: "File", date: "Yesterday", status: "Safe" },
    { name: "WhatsApp message", type: "Message", date: "Yesterday", status: "Safe" },
  ];

  const alerts = [
    { title: "Suspicious link detected", time: "10 minutes ago" },
    { title: "New security update available", time: "2 hours ago" },
    { title: "Stay alert against fake offers", time: "Yesterday" },
  ];

  function handleFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const allowed = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "text/plain",
    ];

    if (!allowed.includes(file.type)) {
      alert("Please select JPG, PNG, PDF or TXT file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be under 10 MB.");
      event.target.value = "";
      return;
    }

    if (file.type === "text/plain") {
      const reader = new FileReader();

      reader.onload = () => {
        const text = String(reader.result).toLowerCase();
        const words = [
          "urgent",
          "password",
          "otp",
          "click here",
          "winner",
          "verify account",
        ];

        const found = words.filter((word) => text.includes(word));

        alert(
          found.length
            ? `Demo scan: suspicious keywords found: ${found.join(", ")}. This is not a verified security verdict.`
            : "Demo scan: no matching suspicious keywords found. This is not a verified security verdict."
        );
      };

      reader.readAsText(file);
    } else {
      alert(
        "File selected successfully. Image/PDF analysis requires backend OCR and detection engine integration."
      );
    }

    event.target.value = "";
  }

  function scanMessage() {
    if (!message.trim()) {
      alert("Please enter a message first.");
      return;
    }

    const words = [
      "otp",
      "password",
      "urgent",
      "winner",
      "bank details",
      "click here",
    ];

    const found = words.filter((word) =>
      message.toLowerCase().includes(word)
    );

    alert(
      found.length
        ? `Demo warning: suspicious keywords found: ${found.join(", ")}.`
        : "No matching suspicious keywords found in this demo check."
    );

    setShowMessageBox(false);
    setMessage("");
  }

  function scanLink() {
    if (!url.trim()) {
      alert("Please enter a URL first.");
      return;
    }

    try {
      const parsed = new URL(url);

      if (!["http:", "https:"].includes(parsed.protocol)) {
        alert("Please enter a valid HTTP or HTTPS link.");
        return;
      }

      alert(
        "Link received. Connect the backend URL reputation checker for a real security verdict."
      );

      setShowLinkBox(false);
      setUrl("");
    } catch {
      alert("Please enter a valid URL, including https://");
    }
  }

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="main-content">

        {/* TOPBAR */}
        <header className="topbar">
          <div>
            <h1>{activePage}</h1>
            <p>Welcome back! Stay safe with ScamShield AI.</p>
          </div>

          <div className="topbar-right">
            <span className="notification">🔔</span>

            <div className="profile">
              <div className="profile-avatar">U</div>
              <div>
                <strong>User</strong>
                <small>Student Account</small>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD */}
        {activePage === "Dashboard" ? (
          <>
            {/* WELCOME BANNER */}
            <section className="welcome-banner">
              <div>
                <span className="welcome-tag">
                  YOUR DIGITAL SAFETY PARTNER
                </span>

                <h2>Welcome to ScamShield AI 🛡️</h2>

                <p>
                  Detect suspicious messages, links and files.
                  Stay one step ahead of online scams.
                </p>

                <button onClick={() => setActivePage("Scan Message")}>
                  Start Scanning →
                </button>
              </div>

              <div className="welcome-shield">🛡️</div>
            </section>

            {/* STATISTICS */}
            <section className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">🔍</span>
                <p>Total Scans</p>
                <h2>128</h2>
                <small>All scan types</small>
              </div>

              <div className="stat-card">
                <span className="stat-icon">🛡️</span>
                <p>Safe Items</p>
                <h2>96</h2>
                <small>Demo dashboard data</small>
              </div>

              <div className="stat-card">
                <span className="stat-icon">⚠️</span>
                <p>Suspicious Items</p>
                <h2>32</h2>
                <small>Demo dashboard data</small>
              </div>

              <div className="stat-card">
                <span className="stat-icon">📁</span>
                <p>Files Uploaded</p>
                <h2>18</h2>
                <small>Demo dashboard data</small>
              </div>
            </section>

            {/* DASHBOARD GRID */}
            <section className="dashboard-grid">

              {/* RECENT SCANS */}
              <div className="panel recent-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Recent Scans</h3>
                    <p>Your latest scanning activity</p>
                  </div>

                  <button
                    className="text-button"
                    onClick={() => setActivePage("History")}
                  >
                    View All →
                  </button>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>ITEM</th>
                        <th>TYPE</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentScans.map((scan, index) => (
                        <tr key={index}>
                          <td>{scan.name}</td>
                          <td>{scan.type}</td>
                          <td>{scan.date}</td>
                          <td>
                            <span
                              className={`status ${
                                scan.status === "Safe"
                                  ? "safe"
                                  : "warning"
                              }`}
                            >
                              {scan.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="demo-note">
                  Sample dashboard entries — connect the database for real history.
                </p>
              </div>

              {/* QUICK SCAN */}
              <div className="panel quick-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Quick Scan</h3>
                    <p>Choose what you want to scan</p>
                  </div>
                </div>

                <button
                  className="scan-option"
                  onClick={() => setActivePage("Scan Image")}
                >
                  <span>🖼️</span>
                  <div>
                    <strong>Scan Image</strong>
                    <small>Check suspicious images</small>
                  </div>
                  <b>›</b>
                </button>

                <button
                  className="scan-option"
                  onClick={() => setShowLinkBox(true)}
                >
                  <span>🔗</span>
                  <div>
                    <strong>Scan Link</strong>
                    <small>Check suspicious URLs</small>
                  </div>
                  <b>›</b>
                </button>

                <button
                  className="scan-option"
                  onClick={() => setShowMessageBox(true)}
                >
                  <span>💬</span>
                  <div>
                    <strong>Scan Message</strong>
                    <small>Check suspicious text</small>
                  </div>
                  <b>›</b>
                </button>

                <button
                  className="scan-option"
                  onClick={() => fileInput.current.click()}
                >
                  <span>📁</span>
                  <div>
                    <strong>Upload File</strong>
                    <small>JPG, PNG, PDF or TXT · Max 10 MB</small>
                  </div>
                  <b>›</b>
                </button>

                <input
                  ref={fileInput}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf,.txt"
                  hidden
                  onChange={handleFile}
                />
              </div>

              {/* SCAM OVERVIEW */}
              <div className="panel overview-panel">
                <h3>Scam Detection Overview</h3>
                <p>Sample scan distribution</p>

                <div className="chart-content">
                  <div className="donut-chart">
                    <div className="donut-hole">
                      <strong>128</strong>
                      <small>Total Scans</small>
                    </div>
                  </div>

                  <div className="chart-legend">
                    <span>
                      <i className="legend-safe"></i>
                      Safe <b>96</b>
                    </span>

                    <span>
                      <i className="legend-risk"></i>
                      Suspicious <b>32</b>
                    </span>
                  </div>
                </div>
              </div>

              {/* LATEST ALERTS */}
              <div className="panel alerts-panel">
                <h3>Latest Alerts</h3>
                <p>Security updates and notifications</p>

                {alerts.map((alert, index) => (
                  <div className="alert-item" key={index}>
                    <span>⚠️</span>
                    <div>
                      <strong>{alert.title}</strong>
                      <small>{alert.time}</small>
                    </div>
                  </div>
                ))}
              </div>

              {/* SAFETY TIPS */}
              <div className="panel tips-panel">
                <h3>Safety Tips</h3>

                <div className="tip-item">
                  ✓ Never share your OTP or password.
                </div>

                <div className="tip-item">
                  ✓ Verify links before clicking.
                </div>

                <div className="tip-item">
                  ✓ Avoid unknown attachments.
                </div>

                <div className="tip-item">
                  ✓ Check the sender before replying.
                </div>
              </div>

            </section>

            {/* MESSAGE MODAL */}
            {showMessageBox && (
              <div className="modal-backdrop">
                <div className="scan-modal">
                  <button
                    className="modal-close"
                    onClick={() => setShowMessageBox(false)}
                  >
                    ×
                  </button>

                  <h2>Scan Message</h2>
                  <p>Paste a message for a basic demo keyword check.</p>

                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Paste your suspicious message here..."
                  />

                  <button
                    className="primary-button"
                    onClick={scanMessage}
                  >
                    Check Message
                  </button>
                </div>
              </div>
            )}

            {/* LINK MODAL */}
            {showLinkBox && (
              <div className="modal-backdrop">
                <div className="scan-modal">
                  <button
                    className="modal-close"
                    onClick={() => setShowLinkBox(false)}
                  >
                    ×
                  </button>

                  <h2>Scan Link</h2>
                  <p>Enter a URL to prepare it for backend checking.</p>

                  <input
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="https://example.com"
                  />

                  <button
                    className="primary-button"
                    onClick={scanLink}
                  >
                    Check Link
                  </button>
                </div>
              </div>
            )}
          </>
      ) : activePage === "Scan Image" ? (
  <ScanImage />
) : activePage === "Scan Link" ? (
  <ScanLink />

  ) : activePage === "Scan Message" ? (
  <ScanMessage />
  ) : activePage === "History" ? (
  <ScanHistory />
  ) : activePage === "Scan File" ? (
  <ScanFile />
  ) : (
          <section className="placeholder-panel">
            <h2>{activePage}</h2>
            <p>This section will be developed in the next steps.</p>

            <button onClick={() => setActivePage("Dashboard")}>
              Back to Dashboard
            </button>
          </section>
        )}

        <footer className="page-footer">
          ScamShield AI · Your safety matters. Never upload OTPs,
          passwords or confidential information.
        </footer>

      </main>
    </div>
  );
}

export default App;
