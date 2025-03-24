// frontend/src/components/testimonials/StarRating.jsx
const StarRating = ({ rating, size = 'md' }) => {
    const stars = [1, 2, 3, 4, 5];
    
    // Size classes for the stars
    const sizeClass = {
      sm: 'fs-6',
      md: 'fs-5',
      lg: 'fs-4',
      xl: 'fs-3'
    };
    
    return (
      <div className="star-rating">
        {stars.map((star) => (
          <span 
            key={star}
            className={`${sizeClass[size]}`}
            style={{ color: star <= rating ? '#FFD700' : '#e4e5e9' }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };
  
  export default StarRating;