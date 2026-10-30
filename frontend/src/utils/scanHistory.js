
const HISTORY_KEY = "scamShieldScanHistory";

export function getScanHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveScan(type, item, result) {
  const history = getScanHistory();

  const newScan = {
    id: Date.now(),
    type,
    item,
    result,
    date: new Date().toLocaleString(),
  };

  const updatedHistory = [newScan, ...history];

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));

  window.dispatchEvent(new Event("scan-history-updated"));
}
