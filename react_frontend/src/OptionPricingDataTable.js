// OptionPricingDataTable.js
import React, { useState, useEffect } from 'react';
import './OptionPricingDataTable.css';

const OptionPricingDataTable = ({ selectedDate }) => {
  const [optionPricingData, setOptionPricingData] = useState(null);
  const [url, setUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetchData function executed'); // Print a message when fetchData is called
      if (selectedDate) {
        const endpoint = `http://127.0.0.1:8080/calculateoptionprices/${selectedDate}`;
        try {
          const response = await fetch(endpoint);
          const data = await response.json();
          const parsedData = JSON.parse(data.success);
          setOptionPricingData(parsedData);
          setUrl(endpoint);
        } catch (error) {
          console.error('Error fetching option pricing data:', error);
        }
      }
    };

    fetchData();
  }, [selectedDate]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = optionPricingData?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = optionPricingData ? Math.ceil(optionPricingData.length / itemsPerPage) : 0;

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((row) => Object.values(row).join(',')).join('\n');
    return `${headers}\n${rows}`;
  };

  // Function to handle download action
  const handleDownloadCSV = () => {
    const csvData = convertToCSV(optionPricingData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `option_pricing_data_${selectedDate}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="OptionPricingDataTable">
      <h3>Option Prices Info</h3>
      {optionPricingData && (
        <button className="download-btn" onClick={handleDownloadCSV}>Download CSV</button>
      )}

      {optionPricingData ? (
        <>
          <table>
            <thead>
              <tr>
                <th>DateAsOf</th>
                <th>OptionType</th>
                <th>CurrentPrice</th>
                <th>StrikePrice</th>
                <th>FutureExpiryDate</th>
                <th>ImpliedVol</th>
                <th>OptionPrice</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.DateAsOf}</td>
                  <td>{item.OptionType}</td>
                  <td>{item.CurrentPrice}</td>
                  <td>{item.StrikePrice}</td>
                  <td>{item.FutureExpiryDate}</td>
                  <td>{item.ImpliedVol}</td>
                  <td>{item.OptionPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num + 1}
                id={num + 1}
                onClick={handleClick}
                className={currentPage === num + 1 ? 'active' : ''}
              >
                {num + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default OptionPricingDataTable;
