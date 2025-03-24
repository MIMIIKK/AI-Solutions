// frontend/src/components/solutions/SolutionCard.jsx
import { Link } from 'react-router-dom';

const SolutionCard = ({ solution }) => {
  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={solution.image} 
        className="card-img-top" 
        alt={solution.title} 
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{solution.title}</h5>
        <p className="card-text flex-grow-1">{solution.short_description}</p>
        <Link to={`/solutions/${solution.slug}`} className="btn btn-primary mt-auto">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default SolutionCard;