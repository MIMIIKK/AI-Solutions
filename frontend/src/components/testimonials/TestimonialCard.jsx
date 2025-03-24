// frontend/src/components/testimonials/TestimonialCard.jsx
import StarRating from './StarRating';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <div className="mb-3">
          <StarRating rating={testimonial.rating} />
        </div>
        
        <p className="card-text testimonial-text">"{testimonial.testimonial_text}"</p>
        
        <div className="d-flex align-items-center mt-3">
          {testimonial.photo && (
            <div className="me-3">
              <img 
                src={testimonial.photo} 
                alt={testimonial.name} 
                className="rounded-circle"
                width="60"
                height="60"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          
          <div>
            <h5 className="card-title mb-0">{testimonial.name}</h5>
            <p className="card-subtitle text-muted mb-0">
              {testimonial.position}, {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;