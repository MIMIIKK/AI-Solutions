// frontend/src/components/testimonials/TestimonialSlider.jsx
import { useState, useEffect } from 'react';
import StarRating from './StarRating';

const TestimonialSlider = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex(current => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials]);
  
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center">
        <p>No testimonials available yet.</p>
      </div>
    );
  }
  
  return (
    <div className="testimonial-carousel">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="position-relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                style={{ 
                  display: index === activeIndex ? 'block' : 'none',
                  transition: 'opacity 0.5s ease-in-out'
                }}
              >
                <div className="card text-center shadow-sm p-4">
                  {testimonial.photo && (
                    <div className="mx-auto mb-3">
                      <img 
                        src={testimonial.photo} 
                        alt={testimonial.name} 
                        className="rounded-circle" 
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <StarRating rating={testimonial.rating} />
                  </div>
                  
                  <p className="lead mb-4">"{testimonial.testimonial_text}"</p>
                  
                  <div className="text-center">
                    <h5 className="mb-0">{testimonial.name}</h5>
                    <p className="text-muted">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              className="carousel-control-prev" 
              onClick={() => setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)}
              style={{ width: '40px' }}
            >
              <span className="carousel-control-prev-icon bg-primary rounded" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            
            <button 
              className="carousel-control-next" 
              onClick={() => setActiveIndex((activeIndex + 1) % testimonials.length)}
              style={{ width: '40px' }}
            >
              <span className="carousel-control-next-icon bg-primary rounded" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          
          <div className="carousel-indicators position-relative mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`${index === activeIndex ? 'active bg-primary' : 'bg-secondary'}`}
                style={{ 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%',
                  display: 'inline-block',
                  margin: '0 5px',
                  border: 'none'
                }}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;