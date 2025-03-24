// frontend/src/pages/Solutions/SolutionsPage.jsx
import { useState, useEffect } from 'react';
import solutionService from '../../services/solutionService';
import SolutionCard from '../../components/solutions/SolutionCard';

const SolutionsPage = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setLoading(true);
        const response = await solutionService.getAllSolutions();
        setSolutions(response.results || response);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching solutions:', err);
        setError('Failed to load solutions. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchSolutions();
  }, []);
  
  return (
    <div className="py-5">
      <div className="container">
        <h1 className="text-center mb-2">Our Solutions</h1>
        <p className="text-center mb-5 lead">
          Discover our innovative AI-powered software solutions designed to enhance the digital employee experience
        </p>
        
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : solutions.length === 0 ? (
          <div className="text-center py-5">
            <p>No solutions found.</p>
          </div>
        ) : (
          <div className="row">
            {solutions.map(solution => (
              <div key={solution.id} className="col-md-4 mb-4">
                <SolutionCard solution={solution} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionsPage;