// frontend/src/pages/Events/EventDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import eventService from '../../services/eventService';

const EventDetailPage = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);
  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await eventService.getEventBySlug(slug);
        setEvent(data);
        if (data.photos && data.photos.length > 0) {
          setActivePhoto(data.photos[0].image);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [slug]);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
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
        <Link to="/events" className="btn btn-primary">
          Back to Events
        </Link>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          Event not found.
        </div>
        <Link to="/events" className="btn btn-primary">
          Back to Events
        </Link>
      </div>
    );
  }
  
  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {/* Event Header */}
            <h1 className="mb-3">{event.title}</h1>
            <div className="badge bg-primary mb-3">
              {event.event_type === 'upcoming' ? 'Upcoming Event' : 'Past Event'}
            </div>
            
            {/* Event Featured Image */}
            <img 
              src={event.featured_image} 
              alt={event.title} 
              className="img-fluid rounded mb-4"
            />
            
            {/* Event Details */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Event Details</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-calendar-event me-2"></i>
                    <strong>Date & Time:</strong> {formatDate(event.date)}
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-geo-alt me-2"></i>
                    <strong>Location:</strong> {event.location}
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Event Description */}
            <div className="mb-5">
              <h3>About this Event</h3>
              <div dangerouslySetInnerHTML={{ __html: event.description.replace(/\n/g, '<br>') }}></div>
            </div>
            
            {/* Photo Gallery */}
            {event.photos && event.photos.length > 0 && (
              <div className="mb-5">
                <h3 className="mb-4">Event Gallery</h3>
                
                {/* Main Photo Display */}
                <div className="mb-3 text-center">
                  <img 
                    src={activePhoto || event.photos[0].image} 
                    alt="Event" 
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: '500px' }}
                  />
                  {activePhoto && event.photos.find(p => p.image === activePhoto)?.caption && (
                    <p className="text-muted mt-2">
                      {event.photos.find(p => p.image === activePhoto).caption}
                    </p>
                  )}
                </div>
                
                {/* Thumbnails */}
                <div className="row">
                  {event.photos.map((photo, index) => (
                    <div key={index} className="col-md-3 col-6 mb-3">
                      <img 
                        src={photo.image}
                        alt={photo.caption || `Photo ${index + 1}`} 
                        className={`img-thumbnail cursor-pointer ${activePhoto === photo.image ? 'border-primary' : ''}`}
                        style={{ objectFit: 'cover', height: '100px' }}
                        onClick={() => setActivePhoto(photo.image)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Call to Action for Upcoming Events */}
            {event.event_type === 'upcoming' && (
              <div className="card bg-light mb-4">
                <div className="card-body text-center">
                  <h4 className="card-title">Interested in attending?</h4>
                  <p className="card-text">
                    Contact us to register for this event or request more information.
                  </p>
                  <Link to="/contact" className="btn btn-primary">
                    Contact Us
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <div className="col-lg-4">
            {/* Sidebar */}
            <div className="card mb-4 sticky-top" style={{ top: '20px' }}>
              <div className="card-body">
                <h5 className="card-title">Event Summary</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Type
                    <span className="badge bg-primary rounded-pill">
                      {event.event_type === 'upcoming' ? 'Upcoming' : 'Past'}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Date
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Time
                    <span>{new Date(event.date).toLocaleTimeString()}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Location
                    <span>{event.location}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Share Event */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Share This Event</h5>
                <div className="d-flex">
                  <a href="#" className="btn btn-outline-primary me-2">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="btn btn-outline-primary me-2">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="#" className="btn btn-outline-primary me-2">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a href="#" className="btn btn-outline-primary">
                    <i className="bi bi-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Related Info */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Related Information</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <Link to="/contact">Request More Information</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/events">View All Events</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/solutions">Explore Our Solutions</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-5">
          <Link to="/events" className="btn btn-primary">
            Back to All Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;