// frontend/src/pages/Home/FeaturedSolutions.jsx
import { Link } from 'react-router-dom';
import SolutionCard from '../../components/solutions/SolutionCard';

const FeaturedSolutions = ({ solutions }) => {
  if (!solutions || solutions.length === 0) {
    return (
      <div className="text-center">
        <p>No solutions found. Check back soon!</p>
      </div>
    );
  }
  
  return (
    <div className="row">
      {solutions.map(solution => (
        <div key={solution.id} className="col-md-4 mb-4">
          <SolutionCard solution={solution} />
        </div>
      ))}
    </div>
  );
};

export default FeaturedSolutions;