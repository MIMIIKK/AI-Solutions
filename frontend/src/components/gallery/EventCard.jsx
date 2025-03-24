// frontend/src/components/gallery/EventCard.jsx
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={event.featured_image} 
        className="card-img-top" 
        alt={event.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <div className="badge bg-primary mb-2">
          {event.event_type === 'upcoming' ? 'Upcoming Event' : 'Past Event'}
        </div>
        <h5 className="card-title">{event.title}</h5>
        <p className="text-muted mb-2">
          <i className="bi bi-calendar-event me-2"></i>
          {formatDate(event.date)}
        </p>
        <p className="text-muted mb-3">
          <i className="bi bi-geo-alt me-2"></i>
          {event.location}
        </p>
        <p className="card-text flex-grow-1">{event.description.substring(0, 120)}...</p>
        <Link to={`/events/${event.slug}`} className="btn btn-outline-primary mt-auto">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;