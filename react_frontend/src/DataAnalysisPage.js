import React from 'react';
import DateDropdown from './DateDropdown';
import OptionPricingDataTable from './OptionPricingDataTable'
import './DataAnalysis.css';

const DataAnalysisPage = ({ selectedDate, setSelectedDate }) => (
  <div className="page-style" style={{ overflow: 'auto' }}>
    <h2 className="dat-analysis-banner-styling">Option Pricing Analysis Page</h2>
    <div>
      <h3>Unique Dates Dropdown</h3>
      <DateDropdown selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div>
    {selectedDate && (
      <div>
        <OptionPricingDataTable selectedDate={selectedDate} />
      </div>
    )}

  </div>
);

export default DataAnalysisPage;
