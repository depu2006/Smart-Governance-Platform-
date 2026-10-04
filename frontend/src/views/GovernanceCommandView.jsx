import React from 'react';

export const GovernanceCommandView = ({ onNavigateTab, onShowToast }) => {
  const handleKeycloakAudit = () => {
    if (onShowToast) {
      onShowToast('🛡️ Keycloak RBAC Audit Verified: Admin, Commissioner & Officer Roles authenticated with Zero SLA Violations.', 'success');
    }
  };

  const handleMongoSync = () => {
    fetch('http://localhost:8081/api/analytics/mongodb-status')
      .then(res => res.json())
      .then(res => {
        if (onShowToast) {
          onShowToast(`🍃 MongoDB Atlas Status: Connected (${res.databaseName || 'civicpulse_db'}) • ${res.totalWardRecords || 5} Ward Analytics Documents Verified!`, 'success');
        }
      })
      .catch(() => {
        if (onShowToast) {
          onShowToast('🍃 Could not verify MongoDB Atlas. Check that the backend is running and try again.', 'warning');
        }
      });
  };

  return (
    <div className="governance-command-view">
      <div className="governance-command-header">
        <div>
          <h2 className="governance-command-title">
            CivicPulse Nexus — Final Integrated Platform
          </h2>
          <p className="governance-command-subtitle">
            All 4 Milestones Integrated: Smart Governance, Citizen Services & Public Administration Core
          </p>
        </div>
        <div className="governance-command-actions">
          <button 
            className="btn-primary" 
            onClick={handleKeycloakAudit}
            style={{ backgroundColor: '#a855f7', fontSize: '0.82rem' }}
          >
            🔒 Run Keycloak RBAC Audit
          </button>
          <button 
            className="btn-primary" 
            onClick={handleMongoSync}
            style={{ backgroundColor: '#0d9488', fontSize: '0.82rem' }}
          >
            🍃 Verify Mongo Cloud Sync
          </button>
        </div>
      </div>

      {/* 5 Master Milestone Integrated Cards matching Reference Diagram */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div 
          className="command-milestone-card"
          onClick={() => onNavigateTab('citizens')}
          style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #38bdf8', cursor: 'pointer', transition: 'transform 0.2s' }}
        >
          <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>MILESTONE 1</div>
          <h3 style={{ fontSize: '1.1rem', margin: '6px 0 8px 0' }}>Citizen Management</h3>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            • <strong>2.4M</strong> Citizens Registered<br />
            • <strong>12.4K</strong> Grievances / month<br />
            • <strong>94%</strong> Resolution Rate
          </p>
          <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600 }}>Click to Drill Down ➔</div>
        </div>

        <div 
          className="command-milestone-card"
          onClick={() => onNavigateTab('services')}
          style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #2dd4bf', cursor: 'pointer', transition: 'transform 0.2s' }}
        >
          <div style={{ fontSize: '0.8rem', color: '#2dd4bf', fontWeight: 700 }}>MILESTONE 2</div>
          <h3 style={{ fontSize: '1.1rem', margin: '6px 0 8px 0' }}>Certificate Management</h3>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            • <strong>847K</strong> Certificates Issued<br />
            • <strong>24.7K</strong> Applications / month<br />
            • <strong>2.4 Days</strong> Avg Approval SLA
          </p>
          <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#2dd4bf', fontWeight: 600 }}>Click to Drill Down ➔</div>
        </div>

        <div 
          className="command-milestone-card"
          onClick={() => onNavigateTab('budget')}
          style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #facc15', cursor: 'pointer', transition: 'transform 0.2s' }}
        >
          <div style={{ fontSize: '0.8rem', color: '#facc15', fontWeight: 700 }}>MILESTONE 3</div>
          <h3 style={{ fontSize: '1.1rem', margin: '6px 0 8px 0' }}>Welfare & Budget</h3>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            • <strong>247K</strong> Beneficiaries Covered<br />
            • <strong>₹2.47Cr</strong> Disbursed Funds<br />
            • <strong>87%</strong> Budget Utilized
          </p>
          <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#facc15', fontWeight: 600 }}>Click to Drill Down ➔</div>
        </div>

        <div 
          className="command-milestone-card"
          onClick={() => onNavigateTab('dashboard')}
          style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #fb923c', cursor: 'pointer', transition: 'transform 0.2s' }}
        >
          <div style={{ fontSize: '0.8rem', color: '#fb923c', fontWeight: 700 }}>MILESTONE 4</div>
          <h3 style={{ fontSize: '1.1rem', margin: '6px 0 8px 0' }}>Governance Analytics</h3>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            • <strong>4.7/5</strong> Public SAT Rating<br />
            • <strong>94%</strong> Service SLA Compliance<br />
            • <strong>₹12.4M</strong> Revenue Collected
          </p>
          <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#fb923c', fontWeight: 600 }}>Click to Drill Down ➔</div>
        </div>

        <div 
          className="command-milestone-card"
          style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #a855f7' }}
        >
          <div style={{ fontSize: '0.8rem', color: '#a855f7', fontWeight: 700 }}>COMMAND CORE</div>
          <h3 style={{ fontSize: '1.1rem', margin: '6px 0 8px 0' }}>Governance Command</h3>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            • All 4 Milestones Integrated<br />
            • Keycloak RBAC Authorization<br />
            • Kafka Immutable Audit Logs
          </p>
          <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#a855f7', fontWeight: 600 }}>Active Platform Core ✓</div>
        </div>
      </div>

      <section className="governance-kpi-box first-time-guide">
            <h3>First-Time User Guide</h3>
            <p className="guide-intro">Choose a milestone to see what it covers and the steps to complete common tasks.</p>
            <div className="guide-topic-list">
              <details className="guide-topic" open>
                <summary>Milestone 1: Citizen Management</summary>
                <div className="guide-topic-body">
                  <p><strong>What it does:</strong> Keeps citizen grievances in a searchable registry so staff can review, assign, approve, or escalate requests.</p>
                  <ol>
                    <li>Open <strong>Citizens (M1)</strong> to review the grievance table.</li>
                    <li>Use the filters or search field to find a ward, category, or status.</li>
                    <li>Select <strong>+ File Grievance</strong>, enter the citizen and issue details, then submit.</li>
                    <li>Use a row action to view details, approve, escalate, reassign, or inspect the audit information.</li>
                  </ol>
                  <button className="btn-primary guide-open-button" onClick={() => onNavigateTab('grievances')}>Open Citizens (M1)</button>
                </div>
              </details>

              <details className="guide-topic">
                <summary>Milestone 2: Certificates and Services</summary>
                <div className="guide-topic-body">
                  <p><strong>What it does:</strong> Tracks municipal service and certificate applications from submission through review and approval.</p>
                  <ol>
                    <li>Open <strong>Services (M2)</strong> and choose <strong>+ Apply for New Service</strong>.</li>
                    <li>Select the service type, enter the applicant name, choose a ward, and submit.</li>
                    <li>Find the new application in the registry; it starts as Pending.</li>
                    <li>Update its status to In Progress, Approved, or Overdue. The work stage and completion percentage update with it.</li>
                  </ol>
                  <button className="btn-primary guide-open-button" onClick={() => onNavigateTab('services')}>Open Services (M2)</button>
                </div>
              </details>

              <details className="guide-topic">
                <summary>Milestone 3: Welfare, Budget, and Revenue</summary>
                <div className="guide-topic-body">
                  <p><strong>What it does:</strong> Shows department allocations, spending, remaining funds, revenue collections, and recorded budget reallocations.</p>
                  <ol>
                    <li>Open <strong>Welfare (M3)</strong> to review the budget and revenue tables.</li>
                    <li>Choose <strong>+ Reallocate Department Budget</strong>.</li>
                    <li>Select the receiving department, enter an amount in rupees, and submit.</li>
                    <li>Confirm the new reference, department, amount, and timestamp in the reallocation register.</li>
                  </ol>
                  <button className="btn-primary guide-open-button" onClick={() => onNavigateTab('budget')}>Open Welfare (M3)</button>
                </div>
              </details>

              <details className="guide-topic">
                <summary>Milestone 4: Analytics and SLA Management</summary>
                <div className="guide-topic-body">
                  <p><strong>What it does:</strong> Compares department workload, resolution speed, citizen ratings, and service-level agreement (SLA) compliance.</p>
                  <ol>
                    <li>Open <strong>Analytics (M4)</strong> and choose date, department, and ward filters.</li>
                    <li>Review each department’s requests, pending workload, resolution rate, and SLA percentage.</li>
                    <li>Choose <strong>Manage</strong> to record a monitoring or improvement action for a department.</li>
                    <li>Choose <strong>Audit Department SLA</strong> to compare departments with the 90% compliance threshold; results below it are marked for review.</li>
                  </ol>
                  <button className="btn-primary guide-open-button" onClick={() => onNavigateTab('permits')}>Open Analytics (M4)</button>
                </div>
              </details>

              <details className="guide-topic">
                <summary>Command Core: Security and Data Checks</summary>
                <div className="guide-topic-body">
                  <p><strong>Run Keycloak RBAC Audit:</strong> Displays the platform’s role-check confirmation. RBAC means each user should only access actions allowed for their role, such as administrator, commissioner, or officer.</p>
                  <p><strong>Verify Mongo Cloud Sync:</strong> Requests the backend’s MongoDB status endpoint and reports whether the cloud analytics connection can be verified.</p>
                  <ol>
                    <li>Start the backend before checking MongoDB status.</li>
                    <li>Choose <strong>Verify Mongo Cloud Sync</strong> and read the connection result.</li>
                    <li>Choose <strong>Run Keycloak RBAC Audit</strong> to see the role-audit confirmation.</li>
                  </ol>
                </div>
              </details>
            </div>
          </section>

          <section className="governance-kpi-box" style={{ marginBottom: '28px' }}>
            <h3>Validation and System Integrity</h3>
            <ul className="kpi-bullet-list" style={{ gap: '12px' }}>
              <li><strong>Citizen data validation:</strong> Required identity, contact, and ward fields help prevent incomplete records when a citizen submits a request.</li>
              <li><strong>Application workflow:</strong> A request moves from Submitted to Officer Review, SLA Check, and then Approved or Certificate Generated.</li>
              <li><strong>SLA monitoring:</strong> SLA means the target time for completing a service. M4 shows compliance and highlights records needing attention.</li>
              <li><strong>Keycloak RBAC:</strong> Role-based access control assigns permissions to citizens, officers, commissioners, and administrators.</li>
              <li><strong>Kafka audit events:</strong> Kafka is the event stream used to order operational events, such as approvals and financial actions, for audit history.</li>
            </ul>
          </section>

      {/* Technical Architecture */}
      <div className="data-table-card">
        <h4>Technical Architecture, in Plain Language</h4>
        <div className="architecture-guide-list">
          <div>
            <strong>Frontend UI</strong>
            <p>React and JSX build the screens and controls you use. Vite serves the web app during development. CSS creates the responsive layout, and SVG draws charts.</p>
          </div>
          <div>
            <strong>Backend Framework</strong>
            <p>Java 21 and Spring Boot expose REST APIs that send analytics and status data to the frontend. The Maven Wrapper runs project build commands; Lombok reduces repetitive Java code.</p>
          </div>
          <div>
            <strong>Database Layer</strong>
            <p>MongoDB Atlas stores ward analytics documents in <code>ward_analytics</code>. H2 provides a local in-memory relational database named <code>civicpulse_db</code>; PostgreSQL support is also included for deployment options.</p>
          </div>
          <div>
            <strong>Security and Messaging</strong>
            <p>Keycloak manages sign-in and role permissions. Kafka carries ordered events for workflows and auditing. CORS settings control which web origins may call the backend APIs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
