import React from 'react';

export const FilterBar = ({
  filters,
  onFilterChange,
  onExportCsv,
  onExportPdf,
}) => {
  const handleChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      dateRange: 'ALL',
      department: 'ALL',
      ward: 'ALL',
      category: 'ALL',
    });
  };

  return (
    <div className="filter-bar-container">
      <div className="filter-group">
        <label>Date Range:</label>
        <select
          value={filters.dateRange}
          onChange={(e) => handleChange('dateRange', e.target.value)}
        >
          <option value="ALL">All Time</option>
          <option value="LAST_30">Last 30 Days</option>
          <option value="LAST_90">Last 90 Days</option>
          <option value="THIS_YEAR">This Year (2024)</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Department:</label>
        <select
          value={filters.department}
          onChange={(e) => handleChange('department', e.target.value)}
        >
          <option value="ALL">All Departments</option>
          <option value="Water Supply">Water Supply</option>
          <option value="Public Works">Public Works & Roads</option>
          <option value="Sanitation">Sanitation & Waste</option>
          <option value="Health">Health & Education</option>
          <option value="Commercial">Commercial Licensing</option>
          <option value="Finance">Finance & Tax</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Ward:</label>
        <select
          value={filters.ward}
          onChange={(e) => handleChange('ward', e.target.value)}
        >
          <option value="ALL">All Wards</option>
          <option value="Ward 1">Ward 1</option>
          <option value="Ward 2">Ward 2</option>
          <option value="Ward 3">Ward 3</option>
          <option value="Ward 4">Ward 4</option>
          <option value="Ward 5">Ward 5</option>
        </select>
      </div>

      <div className="filter-actions">
        <button className="reset-btn" onClick={handleReset}>Reset Filters</button>
        {onExportCsv && <button className="export-btn csv" onClick={onExportCsv}>📄 Export CSV</button>}
        {onExportPdf && <button className="export-btn pdf" onClick={onExportPdf}>🖨️ Export PDF</button>}
      </div>
    </div>
  );
};
