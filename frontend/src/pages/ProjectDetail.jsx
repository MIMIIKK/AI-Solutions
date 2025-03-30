import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Carousel } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug } from '../api/projects';
import RatingStars from '../components/testimonials/RatingStars';
import TestimonialCard from '../components/testimonials/TestimonialCard';
import TestimonialForm from '../components/testimonials/TestimonialForm';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testimonialSuccess, setTestimonialSuccess] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const projectData = await getProjectBySlug(slug);
        setProject(projectData);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Failed to load project details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  const handleTestimonialSubmit = () => {
    setShowTestimonialForm(false);
    setTestimonialSuccess(true);
    
    // Hide the success message after 5 seconds
    setTimeout(() => {
      setTestimonialSuccess(false);
    }, 5000);
  };

  if (loading) {
    return (
      <Container className="py-5 mt-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading project details...</p>
        </div>
      </Container>
    );
  }

  if (error || !project) {
    return (
      <Container className="py-5 mt-5">
        <Alert variant="danger">
          {error || 'Project not found'}
        </Alert>
        <div className="text-center mt-4">
          <Button as={Link} to="/projects" variant="primary">
            Back to Projects
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* Project Hero */}
      <section 
        className="py-5 text-white position-relative" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px'
        }}
      >
        <Container className="py-5 mt-5">
          <Row className="justify-content-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">{project.title}</h1>
              <div className="d-flex align-items-center mb-3">
                <RatingStars rating={project.average_rating} size={24} />
                <span className="ms-2 text-white">({project.average_rating.toFixed(1)})</span>
              </div>
              <p className="lead mb-4">Client: {project.client}</p>
              <p className="lead mb-0">Completed: {new Date(project.completed_date).toLocaleDateString()}</p>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Project Details */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={8}>
              <div className="mb-5">
                <h2 className="mb-4">Overview</h2>
                <p className="lead">{project.description}</p>
              </div>
              
              <div className="mb-5">
                <h2 className="mb-4">The Challenge</h2>
                <p>{project.challenge}</p>
              </div>
              
              <div className="mb-5">
                <h2 className="mb-4">Our Solution</h2>
                <p>{project.solution}</p>
              </div>
              
              <div className="mb-5">
                <h2 className="mb-4">Results</h2>
                <p>{project.results}</p>
              </div>
            </Col>
            
            <Col lg={4}>
              <div className="bg-light p-4 rounded mb-4">
                <h4 className="mb-4">Interested in a Similar Solution?</h4>
                <p>We can help your business achieve similar results. Contact us to discuss your project.</p>
                <Button as={Link} to="/contact" variant="primary" className="w-100">
                  Contact Us
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Project Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="py-5 bg-light">
          <Container>
            <h2 className="mb-4">Project Gallery</h2>
            
            <Carousel className="project-gallery mb-5">
              {project.images.map(image => (
                <Carousel.Item key={image.id}>
                  <img 
                    src={image.image} 
                    alt={image.caption || project.title} 
                    className="d-block w-100 rounded"
                    style={{ height: '500px', objectFit: 'cover' }}
                  />
                  {image.caption && (
                    <Carousel.Caption>
                      <div className="bg-dark bg-opacity-50 p-3 rounded">
                        <p className="mb-0">{image.caption}</p>
                      </div>
                    </Carousel.Caption>
                  )}
                </Carousel.Item>
              ))}
            </Carousel>
          </Container>
        </section>
      )}
      
      {/* Testimonials Section */}
      <section className="py-5">
        <Container>
          <h2 className="mb-4">Client Feedback</h2>
          
          {testimonialSuccess && (
            <Alert variant="success" className="mb-4">
              Thank you for your feedback! Your testimonial has been submitted for review.
            </Alert>
          )}
          
          {project.testimonials.length > 0 ? (
            <Row className="g-4 mb-5">
              {project.testimonials.map(testimonial => (
                <Col key={testimonial.id} lg={4} md={6}>
                  <TestimonialCard testimonial={testimonial} />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="mb-5">No testimonials yet. Be the first to leave feedback!</p>
          )}
          
          {showTestimonialForm ? (
            <TestimonialForm 
              contentType="project" 
              objectId={project.id}
              onSubmitSuccess={handleTestimonialSubmit}
            />
          ) : (
            <div className="text-center">
              <Button 
                variant="outline-primary" 
                onClick={() => setShowTestimonialForm(true)}
              >
                Leave Your Feedback
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default ProjectDetailPage;