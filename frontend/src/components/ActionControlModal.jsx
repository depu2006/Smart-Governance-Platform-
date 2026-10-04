import React, { useState } from 'react';

const AVAILABLE_OFFICERS = [
  { id: 'OFF-101', name: 'Officer Rajesh Kumar', role: 'Superintending Engineer', ward: 'Ward 1' },
  { id: 'OFF-102', name: 'Officer Priya Sharma', role: 'Chief Sanitation Inspector', ward: 'Ward 2' },
  { id: 'OFF-103', name: 'Officer Amit Patel', role: 'Public Works Executive', ward: 'Ward 3' },
  { id: 'OFF-104', name: 'Officer Sunita Gupta', role: 'Health Services Officer', ward: 'Ward 4' },
  { id: 'OFF-105', name: 'Officer Vikram Singh', role: 'Revenue Collection Officer', ward: 'Ward 5' },
];

export function ActionControlModal({ item, actionType, onClose, onShowToast, onActionComplete }) {
  const [selectedOfficer, setSelectedOfficer] = useState(AVAILABLE_OFFICERS[0].id);
  const [escalationReason, setEscalationReason] = useState('SLA Deadline Approaching');
  const [approvalNote, setApprovalNote] = useState('Sanctioned following municipal inspection.');

  if (!item || !actionType) return null;

  const handleExecuteAction = (e) => {
    e.preventDefault();
    const actor = 'civilpulse@gmail.com (Municipal Admin)';

    if (actionType === 'view') {
      onClose();
      return;
    }

    if (actionType === 'approve') {
      if (onShowToast) {
        onShowToast(`✓ Approved & Sanctioned! Item #${item.id || item.trackingNumber} • Signed by ${actor}`, 'success');
      }
      onActionComplete?.({ ...item, status: 'APPROVED' }, 'approve', { assignedOfficer: item.assignedOfficer });
      return;
    }

    if (actionType === 'escalate') {
      if (onShowToast) {
        onShowToast(`⚡ Escalated to Chief Commissioner! Reason: "${escalationReason}" • Item #${item.id || item.trackingNumber}`, 'warning');
      }
      onActionComplete?.({ ...item, status: 'OVERDUE' }, 'escalate');
      return;
    }

    if (actionType === 'reassign') {
      const officerObj = AVAILABLE_OFFICERS.find((o) => o.id === selectedOfficer);
      if (onShowToast) {
        onShowToast(`👤 Reassigned to ${officerObj?.name} (${officerObj?.role}) • Item #${item.id || item.trackingNumber}`, 'success');
      }
      onActionComplete?.({ ...item, assignedOfficer: `${officerObj?.name} (${officerObj?.role})`, status: item.status === 'OVERDUE' ? 'IN_PROGRESS' : item.status }, 'reassign', { assignedOfficer: `${officerObj?.name} (${officerObj?.role})` });
      return;
    }

    if (actionType === 'audit') {
      if (onShowToast) {
        onShowToast(`📜 Kafka Audit Log Downloaded for Item #${item.id || item.trackingNumber}`, 'info');
      }
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        <div className="modal-header">
          <h3>
            {actionType === 'view' && `👁️ Details & Status: #${item.id || item.trackingNumber || 'REQ-2024-001'}`}
            {actionType === 'approve' && `✓ Sanction & Approve Request: #${item.id || item.trackingNumber || 'REQ-2024-001'}`}
            {actionType === 'escalate' && `⚡ Escalate SLA & Priority: #${item.id || item.trackingNumber || 'REQ-2024-001'}`}
            {actionType === 'reassign' && `👤 Reassign to Available Officers: #${item.id || item.trackingNumber || 'REQ-2024-001'}`}
            {actionType === 'audit' && `📜 Immutable Kafka Audit Trail: #${item.id || item.trackingNumber || 'REQ-2024-001'}`}
          </h3>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleExecuteAction}>
          <div className="modal-body" style={{ gap: '14px' }}>
            {/* Quick Context Summary */}
            <div
              style={{
                background: 'var(--panel-bg)',
                border: '1px solid var(--border-color)',
                padding: '12px 16px',
                borderRadius: '10px',
                fontSize: '0.88rem',
                color: 'var(--ink)',
              }}
            >
              <div><strong>Title / Service:</strong> {item.title || item.category || item.department || 'Municipal Workflow Request'}</div>
              <div><strong>Ward / Location:</strong> {item.ward || 'Ward 1 (Central Commercial)'}</div>
              <div><strong>Current Status:</strong> <span className="status-pill good">{item.status || 'PENDING_REVIEW'}</span></div>
              <div><strong>Assigned Officer:</strong> {item.assignedOfficer || 'Officer Rajesh Kumar'}</div>
            </div>

            {/* VIEW DETAILS */}
            {actionType === 'view' && (
              <div style={{ fontSize: '0.88rem', color: 'var(--ink)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div><strong>Applicant / Citizen:</strong> Citizen #84920 (Verified via Aadhaar/SSN)</div>
                <div><strong>Submission Date:</strong> {new Date().toLocaleDateString()} (SLA 94% Compliant)</div>
                <div><strong>SLA Resolution Deadline:</strong> 48 Hours Remaining</div>
                <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                  <strong>Keycloak RBAC Signature:</strong> Verified Keycloak Authorization (`civilpulse@gmail.com`)
                </div>
              </div>
            )}

            {/* APPROVE */}
            {actionType === 'approve' && (
              <>
                <div className="modal-field">
                  <label>Sanction / Approval Note:</label>
                  <textarea
                    rows={3}
                    value={approvalNote}
                    onChange={(e) => setApprovalNote(e.target.value)}
                    placeholder="Enter approval sanction details..."
                    required
                  />
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--accent-teal)', fontWeight: '600' }}>
                  ✓ Approving will auto-generate certificate receipt & notify applicant via SMS/Email.
                </div>
              </>
            )}

            {/* ESCALATE */}
            {actionType === 'escalate' && (
              <>
                <div className="modal-field">
                  <label>Escalation Target Level:</label>
                  <select required>
                    <option value="COMMISSIONER">Superintending Department Commissioner</option>
                    <option value="MAYOR">Chief Municipal Executive / Mayor Office</option>
                    <option value="SLA_EMERGENCY">SLA Rapid Emergency Response Unit</option>
                  </select>
                </div>
                <div className="modal-field">
                  <label>Escalation Reason:</label>
                  <input
                    type="text"
                    value={escalationReason}
                    onChange={(e) => setEscalationReason(e.target.value)}
                    placeholder="Provide reason for SLA escalation..."
                    required
                  />
                </div>
              </>
            )}

            {/* REASSIGN TO OFFICERS */}
            {actionType === 'reassign' && (
              <>
                <div className="modal-field">
                  <label>Select Available Officer:</label>
                  <select
                    value={selectedOfficer}
                    onChange={(e) => setSelectedOfficer(e.target.value)}
                    required
                  >
                    {AVAILABLE_OFFICERS.map((off) => (
                      <option key={off.id} value={off.id}>
                        {off.name} ({off.role} — {off.ward})
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(234, 179, 8, 0.3)', fontSize: '0.82rem', color: 'var(--ink)' }}>
                  👤 Reassigning sends instant notification to the officer's mobile dashboard and updates workload dispatch balance.
                </div>
              </>
            )}

            {/* AUDIT LOG */}
            {actionType === 'audit' && (
              <div style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>
                <div style={{ fontWeight: '700', marginBottom: '8px', color: 'var(--accent-teal)' }}>
                  📜 Immutable Kafka Event Log Ledger (Topic: `governance.audit.v1`):
                </div>
                <div
                  style={{
                    background: '#090d16',
                    color: '#38bdf8',
                    padding: '12px',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    lineHeight: '1.5',
                    maxHeight: '180px',
                    overflowY: 'auto',
                    border: '1px solid #1e293b',
                  }}
                >
                  [EVENT 1001] {new Date().toISOString()} | ACTOR: civilpulse@gmail.com | ROLE: COMMISSIONER_ADMIN | STATUS: INITIATED<br />
                  [EVENT 1002] {new Date().toISOString()} | KEYCLOAK_JWT: VALID | RBAC_VERIFIED: TRUE<br />
                  [EVENT 1003] {new Date().toISOString()} | MONGODB_DOC_ID: ward_analytics_684f1 | SYNC_OK<br />
                  [EVENT 1004] {new Date().toISOString()} | HASH_SIG: 0x8f9a2b1c4e7d3f2a1b9c0e5d
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer" style={{ marginTop: '16px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ background: actionType === 'escalate' ? '#ef4444' : 'var(--button-dark)' }}>
              {actionType === 'view' && 'Close'}
              {actionType === 'approve' && 'Confirm Sanction & Approve'}
              {actionType === 'escalate' && 'Confirm SLA Escalation'}
              {actionType === 'reassign' && 'Confirm Reassignment'}
              {actionType === 'audit' && 'Close Audit Trail'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
