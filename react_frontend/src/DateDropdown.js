import React, { useState, useEffect } from 'react';

const DateDropdown = ({ selectedDate, setSelectedDate }) => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/fetchuniqutedates/');
        const data = await response.json();
        const parsedDates = JSON.parse(data.success);
        setDates(parsedDates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    const url1 = `http://127.0.0.1:7319/?dateToFetch=${date}`;
    const url2 = `http://127.0.0.1:7320/?dateToFetch=${date}`;
    const iframe1 = document.getElementById('shiny-iframe-1');
    const iframe2 = document.getElementById('shiny-iframe-2');
    iframe1.src = url1;
    iframe2.src = url2;
  };

  return (
    <div>
      <select name="dates" value={selectedDate} onChange={handleChange}>
        <p>Select a date in the drop down to generate option pricing plots.</p>
        <option value="">Select a date</option>
        {dates.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>
      <p>Selected date: {selectedDate}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '50%', marginRight: '1%' }}>
          <p id="url-display-1"></p>
          <iframe id="shiny-iframe-1" src="" width="100%" height="450" title="Shiny App 1"></iframe>
        </div>
        <div style={{ width: '50%', marginLeft: '1%' }}>
          <p id="url-display-2"></p>
          <iframe id="shiny-iframe-2" src="" width="100%" height="450" title="Shiny App 2"></iframe>
        </div>
      </div>
    </div>
  );
};

export default DateDropdown;
