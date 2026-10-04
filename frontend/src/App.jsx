import { useState, useEffect } from 'react';
import './App.css';
import { FilterBar } from './components/FilterBar.jsx';
import { ExecutiveDashboardView } from './views/ExecutiveDashboard.jsx';
import { ServiceMetricsView } from './views/ServiceMetricsView.jsx';
import { GrievanceAnalyticsView } from './views/GrievanceAnalyticsView.jsx';
import { RevenueTrackingView } from './views/RevenueTrackingView.jsx';
import { BudgetUtilizationView } from './views/BudgetUtilizationView.jsx';
import { DepartmentPerformanceView } from './views/DepartmentPerformanceView.jsx';
import { CitizenSatisfactionView } from './views/CitizenSatisfactionView.jsx';
import { ReportsAnalyticsView } from './views/ReportsAnalyticsView.jsx';
import { GovernanceCommandView } from './views/GovernanceCommandView.jsx';
import { ThreeCanvas } from './components/ThreeCanvas.jsx';
import { getFilteredGovernanceData } from './wardDataStore.js';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    dateRange: 'ALL',
    department: 'ALL',
    ward: 'ALL',
    category: 'ALL',
  });

  const [themeMode, setThemeMode] = useState('dark');

  // Authentication & Session State
  const [userSession, setUserSession] = useState({
    email: 'civilpulse@gmail.com',
    name: 'Municipal Commissioner',
    role: 'KEYCLOAK_ADMIN',
  });
  const [loginEmail, setLoginEmail] = useState('civilpulse@gmail.com');
  const [loginPassword, setLoginPassword] = useState('civicpulse@123');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  // Modal and Toast State
  const [toast, setToast] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [modalForm, setModalForm] = useState({});

  // Initialize with dynamic calculation
  const initialData = getFilteredGovernanceData({ dateRange: 'ALL', department: 'ALL', ward: 'ALL' });

  const [execData, setExecData] = useState(initialData);
  const [serviceData, setServiceData] = useState(initialData.serviceData);
  const [grievanceData, setGrievanceData] = useState(initialData.grievanceData);
  const [revenueData, setRevenueData] = useState(initialData.revenueData);
  const [budgetData, setBudgetData] = useState(initialData.budgetData);
  const [deptData, setDeptData] = useState(initialData.deptData);
  const [satisfactionData, setSatisfactionData] = useState(initialData.satisfactionData);
  const [loading, setLoading] = useState(false);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  useEffect(() => {
    const dynamicFilteredData = getFilteredGovernanceData(filters);
    setExecData(dynamicFilteredData);
    setServiceData(dynamicFilteredData.serviceData);
    setGrievanceData(dynamicFilteredData.grievanceData);
    setRevenueData(dynamicFilteredData.revenueData);
    setBudgetData(dynamicFilteredData.budgetData);
    setDeptData(dynamicFilteredData.deptData);
    setSatisfactionData(dynamicFilteredData.satisfactionData);

    const queryParams = new URLSearchParams({
      department: filters.department,
      ward: filters.ward,
      dateRange: filters.dateRange,
      category: filters.category,
    }).toString();

    Promise.all([
      fetch(`http://localhost:8081/api/analytics/executive?${queryParams}`).then((r) => r.json()).catch(() => null),
      fetch(`http://localhost:8081/api/analytics/services?${queryParams}`).then((r) => r.json()).catch(() => null),
      fetch(`http://localhost:8081/api/analytics/grievances?${queryParams}`).then((r) => r.json()).catch(() => null),
      fetch(`http://localhost:8081/api/analytics/revenue?${queryParams}`).then((r) => r.json()).catch(() => null),
      fetch(`http://localhost:8081/api/analytics/budget?${queryParams}`).then((r) => r.json()).catch(() => null),
      fetch(`http://localhost:8081/api/analytics/department-performance?${queryParams}`).then((r) => r.json()).catch(() => null),
      fetch(`http://localhost:8081/api/analytics/citizen-satisfaction?${queryParams}`).then((r) => r.json()).catch(() => null),
    ])
      .then(([execRes, serviceRes, grvRes, revRes, budRes, deptRes, satRes]) => {
        if (execRes && Object.keys(execRes).length > 0) setExecData((prev) => ({ ...prev, ...execRes }));
        if (serviceRes && Object.keys(serviceRes).length > 0) setServiceData((prev) => ({ ...prev, ...serviceRes }));
        if (grvRes && Object.keys(grvRes).length > 0) setGrievanceData((prev) => ({ ...prev, ...grvRes }));
        if (revRes && Object.keys(revRes).length > 0) setRevenueData((prev) => ({ ...prev, ...revRes }));
        if (budRes && Object.keys(budRes).length > 0) setBudgetData((prev) => ({ ...prev, ...budRes }));
        if (deptRes && Object.keys(deptRes).length > 0) setDeptData((prev) => ({ ...prev, ...deptRes }));
        if (satRes && Object.keys(satRes).length > 0) setSatisfactionData((prev) => ({ ...prev, ...satRes }));
      })
      .catch((err) => console.log("Analytics backend sync status:", err))
      .finally(() => setLoading(false));
  }, [filters]);

  const handleExportCsv = () => {
    if (!execData) return;
    const csvRows = [
      ['Metric', 'Value'],
      ['Citizen Satisfaction', execData.citizenSatisfactionRating],
      ['Service SLA Met', execData.serviceSlaPercentage],
      ['Total Revenue Collected', execData.totalRevenueCollected],
      ['Total Allocated Budget', execData.totalAllocatedBudget],
      ['Total Budget Utilized', execData.totalBudgetUtilized],
      ['Budget Utilization Pct', execData.budgetUtilizationPercentage],
      ['Services Summary', `"${execData.servicesSummary}"`],
      ['Grievances Summary', `"${execData.grievancesSummary}"`],
      ['Filter Date Range', filters.dateRange],
      ['Filter Department', filters.department],
      ['Filter Ward', filters.ward],
      ['Generated On', new Date().toISOString()],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Governance_Analytics_Report_${filters.department}_${filters.ward}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📄 Governance CSV Report exported successfully!', 'success');
  };

  const handleExportPdf = () => {
    setActiveTab('reports');
    showToast('🖨️ Opening Print / PDF Report Generator...', 'info');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (activeModal === 'login') {
      if (loginEmail === 'civilpulse@gmail.com' && loginPassword === 'civicpulse@123') {
        setUserSession({
          email: 'civilpulse@gmail.com',
          name: 'Municipal Commissioner',
          role: 'KEYCLOAK_ADMIN',
        });
        showToast('🔓 Keycloak Auth Successful! Signed in as civilpulse@gmail.com', 'success');
      } else {
        showToast('❌ Invalid Login! Required: civilpulse@gmail.com & civicpulse@123', 'warning');
        return;
      }
    } else if (activeModal === 'grievance') {
      showToast(`✓ Grievance submitted! Tracking ID: #GRV-2024-${Math.floor(1000 + Math.random() * 9000)}`, 'success');
    } else if (activeModal === 'service') {
      showToast(`✓ Service Application registered! Reference ID: #APP-2024-${Math.floor(1000 + Math.random() * 9000)}`, 'success');
    } else if (activeModal === 'feedback') {
      showToast('✓ Citizen Feedback recorded! Thank you for rating.', 'success');
    } else if (activeModal === 'payment') {
      showToast(`✓ Payment recorded! Receipt #REC-${Math.floor(100000 + Math.random() * 900000)} generated.`, 'success');
    } else if (activeModal === 'budget') {
      showToast('✓ Department Budget re-allocation saved successfully!', 'success');
    } else if (activeModal === 'logout') {
      setUserSession(null);
      showToast('🔒 Municipal Admin session signed out cleanly.', 'warning');
    }
    setActiveModal(null);
    setModalForm({});
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'grievances', label: 'Citizens (M1)' },
    { id: 'services', label: 'Services (M2)' },
    { id: 'budget', label: 'Welfare (M3)' },
    { id: 'permits', label: 'Analytics (M4)' },
    { id: 'command', label: 'Command Core' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <div className="page-shell">
      {/* Floating Toast Notification */}
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Header Bar matching reference image */}
      <header className="topbar">
        <div className="brand" onClick={() => setActiveTab('dashboard')}>
          🏛️ CIVICPULSE NEXUS
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="SEARCH..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button
          className="theme-toggle-btn"
          onClick={() => setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          title="Toggle Dark/Light Mode"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            color: 'var(--ink)',
            padding: '7px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '12px',
            letterSpacing: '0.5px',
            marginLeft: '10px',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {themeMode === 'dark' ? '☀️ LIGHT MODE' : '🌙 DARK MODE'}
        </button>

        {!userSession ? (
          <button
            className="login-btn"
            onClick={() => setActiveModal('login')}
            style={{
              background: 'var(--button-dark)',
              color: 'var(--button-text)',
              border: 'none',
              padding: '7px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '12px',
              marginLeft: '8px',
              letterSpacing: '0.5px',
              transition: 'all 0.2s ease',
            }}
          >
            🔑 LOG IN
          </button>
        ) : (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginLeft: '8px',
              background: 'rgba(45, 212, 191, 0.12)',
              border: '1px solid var(--accent-teal)',
              padding: '5px 12px',
              borderRadius: '6px',
              color: 'var(--ink)',
              fontSize: '12px',
              fontWeight: '600',
            }}
          >
            <span>🛡️ civilpulse@gmail.com</span>
            <button
              onClick={() => setActiveModal('logout')}
              title="Sign Out"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#f87171',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '11px',
                marginLeft: '4px',
              }}
            >
              [EXIT]
            </button>
          </div>
        )}
      </header>

      {/* Main Hero Showcase Banner matching reference image with Three.js 3D Globe */}
      {activeTab === 'dashboard' && (
        <div className="hero-layout">
          <div className="hero-visual" style={{ position: 'relative', overflow: 'hidden', minHeight: '360px', borderRadius: '16px' }}>
            <ThreeCanvas />
          </div>
          <div className="hero-copy">
            <h1>Smart Governance, Citizen First</h1>
            <p>
              Empowering <strong>2.4M citizens</strong> across municipal administration with real-time analytics, automated certificate issuance, welfare distribution, and transparent public governance.
            </p>
            <div className="tag-row">
              <span className="tag">SLA 94% MET</span>
              <span className="tag">4.7/5 CITIZEN TRUST</span>
              <span className="tag">THREE.JS 3D GLOBE</span>
              <span className="tag">KEYCLOAK RBAC</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
              <button className="cta-button" onClick={() => setActiveTab('command')}>
                EXPLORE PLATFORM COMMAND <span>➔</span>
              </button>
              {!userSession && (
                <button
                  className="cta-button"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--ink)' }}
                  onClick={() => setActiveModal('login')}
                >
                  🔑 LOGIN ADMIN (civilpulse@gmail.com)
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Numbered Module Grid Cards matching reference image (01, 02, 03, 04) */}
      {activeTab === 'dashboard' && (
        <div className="product-grid">
          <div 
            className="product-card" 
            onClick={() => setActiveTab('grievances')}
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80')` }}
          >
            <div className="card-number">01</div>
            <div className="card-content">
              <h2>Citizen Management</h2>
              <p>M1: Grievances & 2.4M citizens. 94% resolution rate across 12.4K complaints/mo.</p>
            </div>
          </div>

          <div 
            className="product-card" 
            onClick={() => setActiveTab('services')}
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80')` }}
          >
            <div className="card-number">02</div>
            <div className="card-content">
              <h2>Certificate Management</h2>
              <p>M2: Automated services with 847K issued certificates & 2.4 days avg SLA.</p>
            </div>
          </div>

          <div 
            className="product-card" 
            onClick={() => setActiveTab('budget')}
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80')` }}
          >
            <div className="card-number">03</div>
            <div className="card-content">
              <h2>Welfare & Budget</h2>
              <p>M3: Public schemes covering 247K beneficiaries with $24.7M disbursed & 87% budget.</p>
            </div>
          </div>

          <div 
            className="product-card" 
            onClick={() => setActiveTab('permits')}
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80')` }}
          >
            <div className="card-number">04</div>
            <div className="card-content">
              <h2>Governance Analytics</h2>
              <p>M4: Real-time dashboard with 4.7/5 public SAT, 94% SLA & $12.4M revenue.</p>
            </div>
          </div>
        </div>
      )}

      {/* Main View Area */}
      <main className="dashboard-content" style={{ padding: 0 }}>
        <FilterBar
          filters={filters}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            showToast(`Filters updated: ${newFilters.department} | ${newFilters.ward} | ${newFilters.dateRange}`, 'info');
          }}
          onExportCsv={handleExportCsv}
          onExportPdf={handleExportPdf}
        />

        {loading ? (
          <div className="loading-spinner-container">
            <div className="spinner"></div>
            <p>Fetching Governance Analytics from Database...</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <ExecutiveDashboardView
                data={execData}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onExportReport={handleExportPdf}
                onShowToast={showToast}
                onOpenModal={(modal) => setActiveModal(modal)}
              />
            )}
            {activeTab === 'citizens' && (
              <CitizenSatisfactionView 
                data={satisfactionData} 
                onShowToast={showToast}
                onOpenModal={(modal) => setActiveModal(modal)}
              />
            )}
            {activeTab === 'services' && (
              <ServiceMetricsView 
                data={serviceData} 
                onShowToast={showToast}
                onOpenModal={(modal) => setActiveModal(modal)}
              />
            )}
            {activeTab === 'grievances' && (
              <GrievanceAnalyticsView 
                data={grievanceData} 
                onShowToast={showToast}
                onOpenModal={(modal) => setActiveModal(modal)}
              />
            )}
            {activeTab === 'permits' && (
              <DepartmentPerformanceView 
                data={deptData} 
                onShowToast={showToast}
              />
            )}
            {activeTab === 'budget' && (
              <>
                <BudgetUtilizationView 
                  data={budgetData} 
                  onShowToast={showToast}
                  onOpenModal={(modal) => setActiveModal(modal)}
                />
                <div style={{ marginTop: '24px' }}>
                  <RevenueTrackingView 
                    data={revenueData} 
                    onShowToast={showToast}
                    onOpenModal={(modal) => setActiveModal(modal)}
                  />
                </div>
              </>
            )}
            {activeTab === 'reports' && (
              <ReportsAnalyticsView
                data={execData}
                filters={filters}
                onExportCsv={handleExportCsv}
                onExportPdf={handleExportPdf}
              />
            )}
            {activeTab === 'command' && (
              <GovernanceCommandView
                onNavigateTab={(tab) => setActiveTab(tab)}
                onShowToast={showToast}
              />
            )}
          </>
        )}
      </main>

      {/* Global Interactive Modal Dialog */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {activeModal === 'login' && '🔑 Keycloak Admin Login'}
                {activeModal === 'grievance' && 'File New Citizen Grievance'}
                {activeModal === 'service' && 'Apply for Municipal Service'}
                {activeModal === 'feedback' && 'Submit Citizen Feedback'}
                {activeModal === 'payment' && 'Record Tax / License Payment'}
                {activeModal === 'budget' && 'Reallocate Department Budget'}
                {activeModal === 'logout' && 'Confirm Session Logout'}
              </h3>
              <button className="modal-close-btn" onClick={() => setActiveModal(null)}>×</button>
            </div>

            <form onSubmit={handleModalSubmit}>
              <div className="modal-body">
                {activeModal === 'login' && (
                  <>
                    <div className="modal-field">
                      <label>Municipal Email / ID:</label>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="civilpulse@gmail.com"
                        required
                      />
                    </div>
                    <div className="modal-field">
                      <label>Security Password:</label>
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="civicpulse@123"
                        required
                      />
                    </div>
                    <div
                      className="modal-field"
                      style={{
                        background: 'rgba(56, 189, 248, 0.08)',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                      }}
                    >
                      <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                        🔒 Keycloak OAuth 2.0 / OIDC Identity Provider
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setLoginEmail('civilpulse@gmail.com');
                          setLoginPassword('civicpulse@123');
                          showToast('⚡ Authorized Credentials Auto-filled!', 'info');
                        }}
                        style={{
                          background: 'var(--button-dark)',
                          color: 'var(--button-text)',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '11px',
                          fontWeight: '700',
                        }}
                      >
                        ⚡ Auto-Fill Authorized Admin Credentials
                      </button>
                    </div>
                  </>
                )}

                {activeModal === 'grievance' && (
                  <>
                    <div className="modal-field">
                      <label>Complaint Category:</label>
                      <select required onChange={(e) => setModalForm({ ...modalForm, category: e.target.value })}>
                        <option value="Water Leakage">Water Pipeline Leakage</option>
                        <option value="Street Light">Street Light Fault</option>
                        <option value="Potholes">Road Pothole / Repair</option>
                        <option value="Garbage">Garbage Collection Delay</option>
                      </select>
                    </div>
                    <div className="modal-field">
                      <label>Ward Location:</label>
                      <select required onChange={(e) => setModalForm({ ...modalForm, ward: e.target.value })}>
                        <option value="Ward 1">Ward 1 (Central Commercial)</option>
                        <option value="Ward 2">Ward 2 (North Tech Park)</option>
                        <option value="Ward 3">Ward 3 (East Industrial)</option>
                        <option value="Ward 4">Ward 4 (South Suburban)</option>
                        <option value="Ward 5">Ward 5 (West Growth)</option>
                      </select>
                    </div>
                    <div className="modal-field">
                      <label>Description:</label>
                      <textarea rows={3} placeholder="Describe the issue in detail..." required />
                    </div>
                  </>
                )}

                {activeModal === 'service' && (
                  <>
                    <div className="modal-field">
                      <label>Service Certificate Type:</label>
                      <select required>
                        <option value="Birth Certificate">Birth Certificate Issuance</option>
                        <option value="Trade License">Commercial Trade License</option>
                        <option value="Water Connection">New Potable Water Connection</option>
                        <option value="Building Permit">Residential Construction Permit</option>
                      </select>
                    </div>
                    <div className="modal-field">
                      <label>Applicant Full Name:</label>
                      <input type="text" placeholder="Enter citizen name..." required />
                    </div>
                    <div className="modal-field">
                      <label>Ward Location:</label>
                      <select required>
                        <option value="Ward 1">Ward 1</option>
                        <option value="Ward 2">Ward 2</option>
                        <option value="Ward 3">Ward 3</option>
                        <option value="Ward 4">Ward 4</option>
                        <option value="Ward 5">Ward 5</option>
                      </select>
                    </div>
                  </>
                )}

                {activeModal === 'feedback' && (
                  <>
                    <div className="modal-field">
                      <label>Citizen Name:</label>
                      <input type="text" placeholder="Your Name (Optional)" />
                    </div>
                    <div className="modal-field">
                      <label>Department:</label>
                      <select required>
                        <option value="Water Supply">Water Supply & Sewerage</option>
                        <option value="Public Works">Public Works & Roads</option>
                        <option value="Sanitation">Sanitation & Waste</option>
                        <option value="Health">Health & Education</option>
                      </select>
                    </div>
                    <div className="modal-field">
                      <label>Rating (1 to 5 Stars):</label>
                      <select required>
                        <option value="5">⭐⭐⭐⭐⭐ (5/5) Excellent Service</option>
                        <option value="4">⭐⭐⭐⭐ (4/5) Good Experience</option>
                        <option value="3">⭐⭐⭐ (3/5) Average Resolution</option>
                      </select>
                    </div>
                    <div className="modal-field">
                      <label>Feedback Comment:</label>
                      <textarea rows={3} placeholder="Share your experience..." required />
                    </div>
                  </>
                )}

                {activeModal === 'payment' && (
                  <>
                    <div className="modal-field">
                      <label>Payment Source:</label>
                      <select required>
                        <option value="Property Tax">Property Tax Collection</option>
                        <option value="Trade License Fee">Trade License Renewal</option>
                        <option value="Water Tariff">Water Tariff Bill</option>
                      </select>
                    </div>
                    <div className="modal-field">
                      <label>Amount ($):</label>
                      <input type="number" placeholder="Enter amount..." required min="1" />
                    </div>
                    <div className="modal-field">
                      <label>Ward:</label>
                      <select required>
                        <option value="Ward 1">Ward 1</option>
                        <option value="Ward 2">Ward 2</option>
                        <option value="Ward 3">Ward 3</option>
                        <option value="Ward 4">Ward 4</option>
                        <option value="Ward 5">Ward 5</option>
                      </select>
                    </div>
                  </>
                )}

                {activeModal === 'budget' && (
                  <>
                    <div className="modal-field">
                      <label>Department:</label>
                      <select required>
                        <option value="Public Works & Roads">Public Works & Roads</option>
                        <option value="Water Supply">Water Supply & Sewerage</option>
                        <option value="Sanitation & Waste">Sanitation & Waste</option>
                        <option value="Health & Education">Health & Education</option>
                      </select>
                    </div>
                    <div className="modal-field">
                      <label>Reallocation Amount ($):</label>
                      <input type="number" placeholder="Enter fund reallocation amount..." required min="1000" />
                    </div>
                  </>
                )}

                {activeModal === 'logout' && (
                  <p style={{ color: 'var(--ink)', fontSize: '0.95rem' }}>
                    Are you sure you want to sign out of the <strong>Municipal Admin</strong> session?
                  </p>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setActiveModal(null)}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {activeModal === 'logout' ? 'Confirm Logout' : 'Submit & Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
