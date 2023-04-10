import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './Page1.css';
import './DataLoading.css';

const DataLoadingPage = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setCsvFile(file);

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const transformedData = result.data.map((row) => ({
          DateAsOf: parseInt(row.DateAsOf),
          FutureExpiryDate: parseInt(row.FutureExpiryDate),
          OptionType: row.OptionType,
          StrikePrice: parseFloat(row.StrikePrice),
          CurrentPrice: parseFloat(row.CurrentPrice),
          ImpliedVol: parseFloat(row.ImpliedVol),
        }));
        setJsonData(transformedData);
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8080/loadmarketdatajson?market_data_list=your_market_data_list', {
        data: jsonData,
      });
      const data = response.data;
      setServerResponse(data);
      if (response.status === 200) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error);
      setServerResponse({ error: 'An error occurred while sending the request.' });
      setIsSuccess(false);
    }
  };

  const columns = [
    {
      dataField: 'DateAsOf',
      text: 'Date As Of',
    },
    {
      dataField: 'FutureExpiryDate',
      text: 'Future Expiry Date',
    },
    {
      dataField: 'OptionType',
      text: 'Option Type',
    },
    {
      dataField: 'StrikePrice',
      text: 'Strike Price',
    },
    {
      dataField: 'CurrentPrice',
      text: 'Current Price',
    },
    {
      dataField: 'ImpliedVol',
      text: 'Implied Volatility',
    },
  ];

  const pageSize = 20;
  const totalPages = Math.ceil(jsonData ? jsonData.length / pageSize : 0);

  const paginationButtons = totalPages > 1 ? [...Array(totalPages).keys()].map((num) => (
    <button
      key={num + 1}
      id={num + 1}
      onClick={handleClick}
      className={currentPage === num + 1 ? 'active' : ''}
    >
      {num + 1}
    </button>
  )) : null;

  function handleClick(event) {
    setCurrentPage(parseInt(event.target.id));
  }

  const paginationOptions = {
    sizePerPage: pageSize,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
	classes: "table-bordered",
  };

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const currentData = jsonData ? jsonData.slice(startIdx, endIdx) : [];



  return  (
    <div className="page-style">
      <h2 className="dat-uploading-banner-styling">Data Uploading page</h2>
      <p className="upload_instruction_success_styling1">Welcome to Data uploading page. Here users can upload option pricing data. Note that only CSV format files are allowed.</p>
<p className="upload_instruction_success_styling2">If the provided data is inserted successfully into the database, the data is shown in tabular format. Otherwise error response from server is shown.</p>
<div>
<h3>CSV to JSON</h3>
<form onSubmit={handleSubmit}>
<input type="file" onChange={handleFileUpload} />
<br />
<br />
<button type="submit" disabled={!jsonData}>
Upload Option Pricing Data
</button>
</form>
{jsonData && isSuccess && (
<div>
<h4>JSON Response</h4>
<BootstrapTable
           keyField="DateAsOf"
           data={currentData}
           columns={columns}
           pagination={paginationFactory(paginationOptions)}
           headerClasses="table-header-text"
           rowClasses="table-cell-text verdana-font"
           classes="table-bordered table-striped table-hover"
		   bordered
         />
<div className="pagination">
{paginationButtons}
</div>
</div>
)}
{serverResponse && (
<div>
<h4>Server Response</h4>
{isSuccess ? (
<pre>Given market data is uploaded successfully to the database.</pre>
) : (
<pre>{serverResponse.error}</pre>
)}
</div>
)}
</div>
</div>
);
};


export default DataLoadingPage;
