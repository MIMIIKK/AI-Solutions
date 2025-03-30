import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Parse the date strings into Date objects for comparison
  const endDate = new Date(event.end_date);
  const currentDate = new Date();
  
  // Compare the dates to determine if the event is past
  const isEventEnded = endDate < currentDate;

  return (
    <Card className="h-100 border-0 shadow-sm">
      <div className="overflow-hidden position-relative" style={{ height: '200px' }}>
        <Card.Img 
          variant="top" 
          src={event.image} 
          alt={event.title} 
          className="img-fluid h-100 w-100 object-fit-cover" 
        />
        <div 
          className={`position-absolute top-0 end-0 m-3 badge ${
            isEventEnded ? 'bg-secondary' : 'bg-success'
          }`}
        >
          {isEventEnded ? 'Past Event' : 'Upcoming'}
        </div>
      </div>
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <div className="mb-3 text-muted">
          <div className="d-flex align-items-center mb-2">
            <FaCalendarAlt className="me-2" />
            <small>{formatDate(event.start_date)}</small>
          </div>
          <div className="d-flex align-items-center">
            <FaMapMarkerAlt className="me-2" />
            <small>{event.location}</small>
          </div>
        </div>
        <Card.Text>
          {event.description.substring(0, 100)}...
        </Card.Text>
        <Button as={Link} to={`/events/${event.slug}`} variant="outline-primary">
          Event Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EventCard;