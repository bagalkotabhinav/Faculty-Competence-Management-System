// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Context from '../../../Context';
// import Loading from '../../Loading';

// const FilterPaper = () => {
//   const context = useContext(Context.Context);
//   const [papers, setPapers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const authUser = context.authenticatedUser;
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   let navigate = useNavigate();


//   useEffect(() => {
//     // Fetch papers
//     context.data.getPapers()
//       .then((response) => {
//         // Filter papers by userId and date range
//         const filteredPapers = response.filter(paper => paper.User.id === authUser.id && paper.date >= startDate && paper.date <= endDate);
//         setPapers(filteredPapers);
//       })
//       .catch((error) => {
//         console.error('Error fetching papers', error);
//         navigate('/error');
//       })
//       .finally(() => setIsLoading(false));
//   }, [navigate, context.data, authUser.id, startDate, endDate]);


//   const handleStartDateChange = (event) => {
//     setStartDate(event.target.value);
//   };

//   const handleEndDateChange = (event) => {
//     setEndDate(event.target.value);
//   };

//   return (
//     isLoading ?
//       <Loading />
//       : <div className="wrap main--grid">
//         <Link to='/' className="button">Return to List</Link>
//         {/* Display Papers */}
//         {papers.map((paper) => (
//           <Link to={`/papers/${paper.id}`} className="course--module course--link" key={paper.id}>
//             <h2 className="course--label">Paper</h2>
//             <h3 className="course--title">{paper.title}</h3>
//           </Link>
//         ))}
    
        
        
        
//         {/* Display date range inputs */}
//         <div className="date-range-input">
//           <label htmlFor="start-date">Start Date:</label>
//           <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />
//           <label htmlFor="end-date">End Date:</label>
//           <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />
//         </div>
//       </div>
//   );
// }

// export default FilterPaper;

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../../../Context';
import Loading from '../../Loading';

const FilterPaper = () => {
  const context = useContext(Context.Context);
  const [papers, setPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authUser = context.authenticatedUser;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    // Fetch papers
    context.data.getPapers()
      .then((response) => {
        // Filter papers by userId and date range
        const filteredPapers = response.filter(paper => 
          paper.User.id === authUser.id && 
          paper.date >= startDate && 
          paper.date <= endDate
        );
        setPapers(filteredPapers);
      })
      .catch((error) => {
        console.error('Error fetching papers', error);
        navigate('/error');
      })
      .finally(() => setIsLoading(false));
  }, [navigate, context.data, authUser.id, startDate, endDate]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    isLoading ?
      <Loading />
      : <div className="wrap main--grid">
          {/* Header Section */}
          <div className="header">
            <Link to='/' className="button">Return to List</Link>
          </div>
          
          {/* Date Range Inputs */}
          <div className="date-range-input" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
          <label htmlFor="start-date" style={{ marginRight: '10px' }}>Start Date:</label>
          <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />
          <label htmlFor="end-date" style={{ marginRight: '10px' }}>End Date:</label>
          <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />
        </div>
          
          {/* Display Papers */}
          {papers.length > 0 ? (
            papers.map((paper) => (
              <Link to={`/papers/${paper.id}`} className="course--module course--link" key={paper.id}>
                <h2 className="course--label">Paper</h2>
                <h3 className="course--title">{paper.title}</h3>
              </Link>
            ))
          ) : (
            <p>No papers found for the selected date range.</p>
          )}
      </div>
  );
}

export default FilterPaper;