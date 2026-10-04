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
import { getFilteredGovernanceData } from './wardDataStore.js';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filters, setFilters] = useState({
    dateRange: 'ALL',
    department: 'ALL',
    ward: 'ALL',
    category: 'ALL',
  });

  // Initialize with initial dynamic calculation for default filters
  const initialData = getFilteredGovernanceData({ dateRange: 'ALL', department: 'ALL', ward: 'ALL' });

  const [execData, setExecData] = useState(initialData);
  const [serviceData, setServiceData] = useState(initialData.serviceData);
  const [grievanceData, setGrievanceData] = useState(initialData.grievanceData);
  const [revenueData, setRevenueData] = useState(initialData.revenueData);
  const [budgetData, setBudgetData] = useState(initialData.budgetData);
  const [deptData, setDeptData] = useState(initialData.deptData);
  const [satisfactionData, setSatisfactionData] = useState(initialData.satisfactionData);
  const [loading, setLoading] = useState(false);

  // Immediately update dynamic state when filters change, then sync with backend
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
  };

  const handleExportPdf = () => {
    setActiveTab('reports');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'citizens', label: 'Citizens' },
    { id: 'services', label: 'Services' },
    { id: 'grievances', label: 'Grievances' },
    { id: 'permits', label: 'Permits' },
    { id: 'budget', label: 'Budget' },
    { id: 'reports', label: 'Reports' },
    { id: 'command', label: 'Governance Command' },
  ];

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2 className="logo">CivicPulse Nexus</h2>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={activeTab === item.id ? 'active' : ''}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="main-content">
        <header className="app-header">
          <div className="header-left">
            <span className="brand-title">CivicPulse Nexus</span>
          </div>
          <div className="header-center">
            <span className="milestone-badge">Final Integrated Platform</span>
          </div>
          <div className="header-right">
            <span className="user-role">Municipal Admin | Logout</span>
          </div>
        </header>

        <div className="dashboard-content">
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
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
                />
              )}
              {activeTab === 'citizens' && <CitizenSatisfactionView data={satisfactionData} />}
              {activeTab === 'services' && <ServiceMetricsView data={serviceData} />}
              {activeTab === 'grievances' && <GrievanceAnalyticsView data={grievanceData} />}
              {activeTab === 'permits' && <DepartmentPerformanceView data={deptData} />}
              {activeTab === 'budget' && (
                <>
                  <BudgetUtilizationView data={budgetData} />
                  <div style={{ marginTop: '20px' }}>
                    <RevenueTrackingView data={revenueData} />
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
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
