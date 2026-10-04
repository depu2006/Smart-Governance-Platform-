import React from 'react';
import { KpiCard } from '../components/KpiCard.jsx';

export const GovernanceCommandView = ({ onNavigateTab }) => {
  return (
    <div className="governance-command-view" style={{ color: '#ffffff' }}>
      <div style={{ marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
        <h2 style={{ fontSize: '1.75rem', color: '#38bdf8', marginBottom: '6px' }}>
          CivicPulse Nexus — Final Integrated Platform
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          All 4 Milestones Integrated: Smart Governance, Citizen Services & Public Administration Core
        </p>
      </div>

      {/* 5 Master Milestone Integrated Cards matching Reference Diagram */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div 
          onClick={() => onNavigateTab('citizens')}
          style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #38bdf8', cursor: 'pointer' }}
        >
          <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>MILESTONE 1</div>
          <h3 style={{ fontSize: '1.1rem', margin: '6px 0 8px 0' }}>Citizen Management</h3>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            • <strong>2.4M</strong> Citizens Registered<br />
            • <strong>12.4K</strong> Grievances / month<br />
            • <strong>94%</strong> Resolution Rate
          </p>
        </div>

        <div 
          onClick={() => onNavigateTab('services')}
          style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #2dd4bf', cursor: 'pointer' }}
        >
          <div style={{ fontSize: '0.8rem', color: '#2dd4bf', fontWeight: 700 }}>MILESTONE 2</div>
          <h3 style={{ fontSize: '1.1rem', margin: '6px 0 8px 0' }}>Certificate Management</h3>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            • <strong>847K</strong> Certificates Issued<br />
            • <strong>24.7K</strong> Applications / month<br />
            • <strong>2.4 Days</strong> Avg Approval SLA
          </p>
        </div>

        <div 
          onClick={() => onNavigateTab('budget')}
          style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #facc15', cursor: 'pointer' }}
        >
          <div style={{ fontSize: '0.8rem', color: '#facc15', fontWeight: 700 }}>MILESTONE 3</div>
          <h3 style={{ fontSize: '1.1rem', margin: '6px 0 8px 0' }}>Welfare & Budget</h3>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            • <strong>247K</strong> Beneficiaries Covered<br />
            • <strong>$24.7M</strong> Disbursed Funds<br />
            • <strong>87%</strong> Budget Utilized
          </p>
        </div>

        <div 
          onClick={() => onNavigateTab('dashboard')}
          style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #fb923c', cursor: 'pointer' }}
        >
          <div style={{ fontSize: '0.8rem', color: '#fb923c', fontWeight: 700 }}>MILESTONE 4</div>
          <h3 style={{ fontSize: '1.1rem', margin: '6px 0 8px 0' }}>Governance Analytics</h3>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            • <strong>4.7/5</strong> Public SAT Rating<br />
            • <strong>94%</strong> Service SLA Compliance<br />
            • <strong>$12.4M</strong> Revenue Collected
          </p>
        </div>

        <div 
          style={{ backgroundColor: '#1e293b', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #a855f7' }}
        >
          <div style={{ fontSize: '0.8rem', color: '#a855f7', fontWeight: 700 }}>COMMAND CORE</div>
          <h3 style={{ fontSize: '1.1rem', margin: '6px 0 8px 0' }}>Governance Command</h3>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            • All 4 Milestones Integrated<br />
            • Keycloak RBAC Authorization<br />
            • Kafka Immutable Audit Logs
          </p>
        </div>
      </div>

      {/* Validation Screens Framework Card */}
      <div className="governance-kpi-box" style={{ marginBottom: '28px' }}>
        <h3 style={{ color: '#38bdf8', marginBottom: '14px' }}>
          🛡️ Validation Screens Framework & System Integrity
        </h3>
        <ul className="kpi-bullet-list" style={{ gap: '12px' }}>
          <li>
            <strong>Citizen Data Validation:</strong> Strict input validation on citizen registration, identity numbers (Aadhaar/SSN), mobile, and ward assignments.
          </li>
          <li>
            <strong>Application Workflow Tracking:</strong> Real-time stage tracking (Submitted ➔ Officer Review ➔ SLA Check ➔ Sanctioned / Certificate Generated).
          </li>
          <li>
            <strong>Service SLA Monitoring:</strong> Automatic timer monitoring with color-coded warning badges for approaching or exceeded SLA deadlines.
          </li>
          <li>
            <strong>Keycloak RBAC Security:</strong> Role-Based Access Control enforcing distinct views for Citizens, Officers, Department Commissioners, and Municipal Admins.
          </li>
          <li>
            <strong>Kafka Event Ordering & Audit Logging:</strong> All critical approvals and financial disbursements produce immutable event logs for compliance auditing.
          </li>
        </ul>
      </div>

      {/* Technology Stack & Integration Overview */}
      <div className="data-table-card">
        <h4>CivicPulse Nexus Technical Architecture</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '14px', fontSize: '0.9rem', color: '#cbd5e1' }}>
          <div style={{ background: '#0d131f', padding: '12px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <strong style={{ color: '#38bdf8' }}>Frontend UI:</strong><br />
            React, Vite, JSX, CSS3 Responsive Grid, Interactive SVG Data Visualizations
          </div>
          <div style={{ background: '#0d131f', padding: '12px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <strong style={{ color: '#2dd4bf' }}>Backend Framework:</strong><br />
            Java 21, Spring Boot 3.4.13, RESTful Controllers, Lombok, Maven Wrapper
          </div>
          <div style={{ background: '#0d131f', padding: '12px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <strong style={{ color: '#facc15' }}>Database Layer:</strong><br />
            MongoDB Atlas Cloud (NoSQL `ward_analytics`) + H2/PostgreSQL In-Memory (`civicpulse_db`)
          </div>
          <div style={{ background: '#0d131f', padding: '12px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <strong style={{ color: '#a855f7' }}>Security & Messaging:</strong><br />
            Keycloak RBAC, Apache Kafka Event Ordering, CORS WebConfig, Immutable Audit Trail
          </div>
        </div>
      </div>
    </div>
  );
};
