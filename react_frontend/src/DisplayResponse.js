// DisplayResponse.js
import React, { useState, useEffect } from 'react';


const DisplayResponse = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/fetchuniqutedates/');
        const data = await response.json();
        setResponse(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>API Response</h3>
      <pre>{response ? JSON.stringify(response, null, 2) : 'Loading...'}</pre>
    </div>
  );
};

export default DisplayResponse;
