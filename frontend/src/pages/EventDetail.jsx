import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, ListGroup } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { getEventBySlug } from '../api/events';
import RatingStars from '../components/testimonials/RatingStars';
import TestimonialCard from '../components/testimonials/TestimonialCard';
import TestimonialForm from '../components/testimonials/TestimonialForm';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const EventDetailPage = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testimonialSuccess, setTestimonialSuccess] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const eventData = await getEventBySlug(slug);
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to load event details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchEvent();
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

  const formatDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    return dateTime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const isEventEnded = event ? new Date(event.end_date) < new Date() : false;

  if (loading) {
    return (
      <Container className="py-5 mt-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading event details...</p>
        </div>
      </Container>
    );
  }

  if (error || !event) {
    return (
      <Container className="py-5 mt-5">
        <Alert variant="danger">
          {error || 'Event not found'}
        </Alert>
        <div className="text-center mt-4">
          <Button as={Link} to="/events" variant="primary">
            Back to Events
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* Event Hero */}
      <section 
        className="py-5 text-white position-relative" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px'
        }}
      >
        <Container className="py-5 mt-5">
          <Row className="justify-content-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">{event.title}</h1>
              {isEventEnded ? (
                <div className="bg-danger d-inline-block px-3 py-2 rounded mb-4">
                  <span className="fw-bold">Event Ended</span>
                </div>
              ) : (
                <div className="bg-success d-inline-block px-3 py-2 rounded mb-4">
                  <span className="fw-bold">Upcoming Event</span>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Event Details */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={8}>
              <div className="mb-5">
                <h2 className="mb-4">About This Event</h2>
                <p className="lead">{event.description}</p>
              </div>
              
              <div className="mb-5">
                <h2 className="mb-4">Event Details</h2>
                <ListGroup variant="flush">
                  <ListGroup.Item className="ps-0 border-0 d-flex align-items-center">
                    <FaCalendarAlt className="text-primary me-3" size={24} />
                    <div>
                      <strong>Date & Time</strong>
                      <div>
                        {formatDateTime(event.start_date)} to {formatDateTime(event.end_date)}
                      </div>
                    </div>
                  </ListGroup.Item>
                  
                  <ListGroup.Item className="ps-0 border-0 d-flex align-items-center">
                    <FaMapMarkerAlt className="text-primary me-3" size={24} />
                    <div>
                      <strong>Location</strong>
                      <div>{event.location}</div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Col>
            
            <Col lg={4}>
              <div className="bg-light p-4 rounded mb-4">
                <h4 className="mb-4">Join This Event</h4>
                {isEventEnded ? (
                  <div>
                    <p>This event has already ended. Check our upcoming events for future opportunities.</p>
                    <Button as={Link} to="/events" variant="primary" className="w-100">
                      Browse Events
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p>Interested in this event? Register now to secure your spot!</p>
                    {event.registration_url ? (
                      <Button 
                        as="a" 
                        href={event.registration_url} 
                        target="_blank" 
                        variant="primary" 
                        className="w-100"
                      >
                        Register Now
                      </Button>
                    ) : (
                      <Button as={Link} to="/contact" variant="primary" className="w-100">
                        Contact Us
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Event Gallery */}
      {event.images && event.images.length > 0 && (
        <section className="py-5 bg-light">
          <Container>
            <h2 className="mb-4">Event Gallery</h2>
            <Row className="g-4">
              {event.images.map(image => (
                <Col key={image.id} lg={4} md={6}>
                  <div className="card border-0 shadow-sm h-100">
                    <img 
                      src={image.image} 
                      alt={image.caption || event.title} 
                      className="card-img-top"
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    {image.caption && (
                      <div className="card-body">
                        <p className="card-text">{image.caption}</p>
                      </div>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}
      
      {/* Testimonials Section */}
      {isEventEnded && (
        <section className="py-5">
          <Container>
            <h2 className="mb-4">Event Feedback</h2>
            
            {testimonialSuccess && (
              <Alert variant="success" className="mb-4">
                Thank you for your feedback! Your testimonial has been submitted for review.
              </Alert>
            )}
            
            {event.testimonials.length > 0 ? (
              <Row className="g-4 mb-5">
                {event.testimonials.map(testimonial => (
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
                contentType="event" 
                objectId={event.id}
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
      )}
    </>
  );
};

export default EventDetailPage;