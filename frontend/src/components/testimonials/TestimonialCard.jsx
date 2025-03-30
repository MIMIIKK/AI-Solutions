import React from 'react';
import { Card } from 'react-bootstrap';
import RatingStars from './RatingStars';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialCard = ({ testimonial }) => {
  return (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body className="p-4">
        <div className="mb-3 text-primary opacity-50">
          <FaQuoteLeft size={24} />
        </div>
        
        <Card.Text className="mb-4">
          {testimonial.comment}
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {testimonial.photo ? (
              <img 
                src={testimonial.photo} 
                alt={testimonial.name} 
                className="rounded-circle me-3"
                width="50"
                height="50"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div 
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                style={{ width: '50px', height: '50px' }}
              >
                {testimonial.name.charAt(0).toUpperCase()}
              </div>
            )}
            
            <div>
              <h6 className="mb-0">{testimonial.name}</h6>
              {(testimonial.position || testimonial.company) && (
                <p className="text-muted small mb-0">
                  {testimonial.position}
                  {testimonial.position && testimonial.company && ', '}
                  {testimonial.company}
                </p>
              )}
            </div>
          </div>
          
          <RatingStars rating={testimonial.rating} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default TestimonialCard;