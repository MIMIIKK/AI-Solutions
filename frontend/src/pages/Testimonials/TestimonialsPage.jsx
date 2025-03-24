// frontend/src/pages/Testimonials/TestimonialsPage.jsx
import React, { useEffect, useState } from 'react';
import testimonialService from '../../services/testimonialService';
import TestimonialCard from '../../components/testimonials/TestimonialCard';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await testimonialService.getAllTestimonials();
        setTestimonials(data.results || data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);
  
  return (
    <div className="py-5">
      <div className="container">
        <header className="text-center mb-5">
          <h1 className="display-4">Client Testimonials</h1>
          <p className="lead">
            Discover what our clients have to say about our AI-powered software solutions.
          </p>
        </header>
        
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
        ) : testimonials.length === 0 ? (
          <div className="alert alert-info" role="alert">
            No testimonials available yet. Check back soon!
          </div>
        ) : (
          <div className="row">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="col-lg-4 col-md-6 mb-4">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsPage;