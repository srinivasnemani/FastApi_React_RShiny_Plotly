import React, { useState } from 'react';
import './App.css';
import DataLoadingPage from './DataLoading';
import DataAnalysisPage from './DataAnalysisPage';

function App() {
  const [selectedPage, setSelectedPage] = useState('page1');
  const [selectedDate, setSelectedDate] = useState('');

  const handleRadioButtonChange = (event) => {
    setSelectedPage(event.target.value);
  };

  return (
    <div className="App">
      <div className="left-pane">
      <h3>Select a Web Page:</h3>
        <div>
          <input
            type="radio"
            id="page1"
            name="page"
            value="page1"
            checked={selectedPage === 'page1'}
            onChange={handleRadioButtonChange}
          />
          <label htmlFor="page1">Option Data Uploading Page</label>
        </div>
        <div>
          <input
            type="radio"
            id="page2"
            name="page"
            value="page2"
            checked={selectedPage === 'page2'}
            onChange={handleRadioButtonChange}
          />
          <label htmlFor="page2">Option Data Analysis Page</label>
        </div>
      </div>
      <div className="content">
      {selectedPage === 'page1' && <DataLoadingPage />}
      {selectedPage === 'page2' && (
        <DataAnalysisPage selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      )}
    </div>
    </div>
  );
}

export default App;



// import React, { useState } from "react";

// function App() {
//   const [param, setParam] = useState("default");
//   const [submitClicked, setSubmitClicked] = useState(false);

//   const handleChange = (event) => {
//     setParam(event.target.value);
//   };

//   const handleSubmit = () => {
//     setSubmitClicked(true);
//   };

//   return (
//     <div>
//       <h2>React App</h2>
//       <label>
//         Enter a value to pass to the Shiny app:
//         <input type="text" value={param} onChange={handleChange} />
//       </label>
//       <button onClick={handleSubmit}>Submit</button>
//       {submitClicked && (
//         <div>
//           <h3>Shiny App hosted on the local host</h3>
//           <iframe
//             id="shiny-iframe"
//             src={`http://127.0.0.1:7319/?url_exampleParam=${param}`}
//             title="Shiny App"
//             style={{ width: "100%", height: "200px", border: "none" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
