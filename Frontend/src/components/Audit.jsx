import React from "react";

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const auditSummary = {
  title: "Q3 Audit: Engineering Dept",
  dateRange: "1 - 15 Jul",
  auditors: ["A. Rao", "S. Iqbal"],
};

const auditRows = [
  {
    id: "AF-003",
    assetName: "Dell Laptop",
    expectedLocation: "Desk E12",
    status: "Verified",
  },
  {
    id: "AF-9921",
    assetName: "Office Chair",
    expectedLocation: "Desk E14",
    status: "Missing",
  },
  {
    id: "AF-9838",
    assetName: "Monitor",
    expectedLocation: "Desk E15",
    status: "Damaged",
  },
];

const flaggedCount = auditRows.filter(
  (row) => row.status === "Missing" || row.status === "Damaged"
).length;

// ---------------------------------------------------------------------------
// Status Badge
// ---------------------------------------------------------------------------

function StatusBadge({ status }) {
  const styles = {
    Verified: "text-emerald-700 border-emerald-300 bg-emerald-50",
    Missing: "text-rose-700 border-rose-300 bg-rose-50",
    Damaged: "text-amber-700 border-amber-300 bg-amber-50",
  };

  const badgeClass =
    styles[status] || "text-neutral-600 border-neutral-300 bg-neutral-50";

  return (
    <span
      className={`inline-block rounded-full border px-4 py-1 text-xs font-medium tracking-wide ${badgeClass}`}
    >
      {status}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Audit Summary Card
// ---------------------------------------------------------------------------

function AuditSummaryCard() {
  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-6 py-4 shadow-sm">
      <p className="text-sm text-neutral-800">
        {auditSummary.title} - {auditSummary.dateRange}
      </p>
      <p className="mt-1 text-sm text-neutral-500">
        Auditors: {auditSummary.auditors.join(", ")}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Audit Verification Table
// ---------------------------------------------------------------------------

function AuditVerificationTable() {
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-neutral-200 shadow-sm">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            <th className="px-6 py-3 text-sm font-medium text-neutral-600">
              Asset
            </th>
            <th className="px-6 py-3 text-sm font-medium text-neutral-600">
              Expected Location
            </th>
            <th className="px-6 py-3 text-sm font-medium text-neutral-600">
              Verification
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {auditRows.map((row, index) => (
            <tr
              key={row.id}
              className={`${
                index !== auditRows.length - 1
                  ? "border-b border-neutral-100"
                  : ""
              } hover:bg-neutral-50 transition-colors`}
            >
              <td className="px-6 py-4 text-sm text-neutral-800">
                {row.id} {row.assetName}
              </td>
              <td className="px-6 py-4 text-sm text-neutral-500">
                {row.expectedLocation}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Discrepancy Alert
// ---------------------------------------------------------------------------

function DiscrepancyAlert() {
  return (
    <div className="mt-8 rounded-lg border border-amber-300 bg-amber-50 px-6 py-4 shadow-sm">
      <p className="text-sm font-medium text-amber-800">
        {flaggedCount} assets flagged - discrepancy report generated automatically
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Close Audit Cycle Button
// ---------------------------------------------------------------------------

function CloseAuditCycleButton() {
  const handleCloseAuditCycle = () => {
    // Placeholder handler - wire up to actual close-audit-cycle logic
    console.log("Audit cycle closed");
  };

  return (
    <button
      type="button"
      onClick={handleCloseAuditCycle}
      className="mt-6 rounded-md border border-emerald-600 bg-emerald-700 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-emerald-800 hover:border-emerald-700 active:scale-95"
    >
      Close audit cycle
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main Audit Dashboard Content
// ---------------------------------------------------------------------------

export default function Audit() {
  return (
    <div className="min-h-screen w-full bg-white px-8 py-8">
      <h1 className="mb-6 text-sm text-neutral-500">
        Screen 8 &nbsp; Asset Audit &nbsp; (audit cycle, checklist, auto-generated discrepancy report):
      </h1>

      <AuditSummaryCard />
      <AuditVerificationTable />
      <DiscrepancyAlert />
      <CloseAuditCycleButton />
    </div>
  );
}
