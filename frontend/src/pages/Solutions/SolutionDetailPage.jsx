// frontend/src/pages/Solutions/SolutionDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import solutionService from '../../services/solutionService';
import TestimonialCard from '../../components/testimonials/TestimonialCard';

const SolutionDetailPage = () => {
  const { slug } = useParams();
  const [solution, setSolution] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchSolutionData = async () => {
      try {
        setLoading(true);
        const [solutionData, testimonialsData] = await Promise.all([
          solutionService.getSolutionBySlug(slug),
          solutionService.getSolutionTestimonials(slug)
        ]);
        
        setSolution(solutionData);
        setTestimonials(testimonialsData.results || testimonialsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching solution data:', err);
        setError('Failed to load solution details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchSolutionData();
  }, [slug]);
  
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/solutions" className="btn btn-primary">
          Back to Solutions
        </Link>
      </div>
    );
  }
  
  if (!solution) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          Solution not found.
        </div>
        <Link to="/solutions" className="btn btn-primary">
          Back to Solutions
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold">{solution.title}</h1>
              <p className="lead">{solution.short_description}</p>
            </div>
            <div className="col-lg-6">
              <img 
                src={solution.image} 
                alt={solution.title} 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Solution Details */}
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <h2 className="mb-4">Overview</h2>
            <div dangerouslySetInnerHTML={{ __html: solution.description.replace(/\n/g, '<br>') }}></div>
            
            <h2 className="mt-5 mb-4">Key Features</h2>
            <div dangerouslySetInnerHTML={{ __html: solution.key_features.replace(/\n/g, '<br>') }}></div>
            
            <h2 className="mt-5 mb-4">Benefits</h2>
            <div dangerouslySetInnerHTML={{ __html: solution.benefits.replace(/\n/g, '<br>') }}></div>
            
            {solution.features && solution.features.length > 0 && (
              <div className="mt-5">
                <h2 className="mb-4">Features</h2>
                <div className="row">
                  {solution.features.map(feature => (
                    <div key={feature.id} className="col-md-6 mb-4">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">{feature.title}</h5>
                          <p className="card-text">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Technologies Used</h5>
                <p className="card-text">{solution.technologies}</p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Interested in this solution?</h5>
                <p className="card-text">Contact us today to schedule a demo or learn more about our AI-powered solutions.</p>
                <Link to="/contact" className="btn btn-primary w-100">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Case Studies */}
      {solution.case_studies && solution.case_studies.length > 0 && (
        <div className="bg-light py-5">
          <div className="container">
            <h2 className="text-center mb-5">Case Studies</h2>
            <div className="row">
              {solution.case_studies.map(caseStudy => (
                <div key={caseStudy.id} className="col-lg-6 mb-4">
                  <div className="card h-100">
                    {caseStudy.image && (
                      <img 
                        src={caseStudy.image} 
                        className="card-img-top" 
                        alt={caseStudy.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{caseStudy.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {caseStudy.client_name} - {caseStudy.industry}
                      </h6>
                      
                      <h6 className="mt-3">Challenge</h6>
                      <p className="card-text">{caseStudy.challenge}</p>
                      
                      <h6>Solution</h6>
                      <p className="card-text">{caseStudy.solution_approach}</p>
                      
                      <h6>Results</h6>
                      <p className="card-text">{caseStudy.results}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <div className="py-5">
          <div className="container">
            <h2 className="text-center mb-5">What Clients Say About This Solution</h2>
            <div className="row">
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="col-lg-4 mb-4">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Call to Action */}
      <div className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="mb-4">Ready to implement this solution?</h2>
          <p className="lead mb-4">
            Contact us today to schedule a demo or discuss your specific requirements.
          </p>
          <Link to="/contact" className="btn btn-light btn-lg">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SolutionDetailPage;