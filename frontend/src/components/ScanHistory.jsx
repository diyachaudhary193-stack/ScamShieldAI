
import React, { useEffect, useState } from "react";
import { getScanHistory } from "../utils/scanHistory";
import "./ScanHistory.css";

function ScanHistory() {
  const [scanHistory, setScanHistory] = useState([]);

  useEffect(() => {
    const loadHistory = () => {
      setScanHistory(getScanHistory());
    };

    loadHistory();

    window.addEventListener("scan-history-updated", loadHistory);

    return () => {
      window.removeEventListener("scan-history-updated", loadHistory);
    };
  }, []);

  const suspiciousCount = scanHistory.filter(
    (scan) => scan.result === "Suspicious"
  ).length;

  const pendingCount = scanHistory.filter(
    (scan) => scan.result === "Pending Analysis"
  ).length;

  return (
    <div className="history-page">
      <div className="history-heading">
        <div>
          <h1>Scan History</h1>
          <p>View your previously scanned items.</p>
        </div>

        <span className="history-count">
          {scanHistory.length} Scans
        </span>
      </div>

      <div className="history-stats">
        <div className="history-stat">
          <h3>{scanHistory.length}</h3>
          <p>Total Scans</p>
        </div>

        <div className="history-stat">
          <h3>{suspiciousCount}</h3>
          <p>Suspicious Items</p>
        </div>

        <div className="history-stat">
          <h3>{pendingCount}</h3>
          <p>Pending Analysis</p>
        </div>
      </div>

      <div className="history-table-card">
        <h2>Recent Scans</h2>

        {scanHistory.length === 0 ? (
          <p className="history-note">
            No scans yet. Your scanned items will appear here.
          </p>
        ) : (
          <div className="history-table-wrap">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Scan Type</th>
                  <th>Scanned Item</th>
                  <th>Result</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {scanHistory.map((scan) => (
                  <tr key={scan.id}>
                    <td>{scan.type}</td>
                    <td className="history-item">{scan.item}</td>
                    <td>
                      <span
                        className={`history-status ${scan.result
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {scan.result}
                      </span>
                    </td>
                    <td>{scan.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="history-note">
        Scan records are currently stored in this browser only.
      </p>
    </div>
  );
}

export default ScanHistory;
