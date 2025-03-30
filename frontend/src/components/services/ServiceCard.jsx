import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RatingStars from '../testimonials/RatingStars';

const ServiceCard = ({ service }) => {
  return (
    <Card className="h-100 border-0 shadow-sm">
      <div className="overflow-hidden" style={{ height: '200px' }}>
        <Card.Img 
          variant="top" 
          src={service.image} 
          alt={service.title} 
          className="img-fluid h-100 w-100 object-fit-cover" 
        />
      </div>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="mb-0">{service.title}</Card.Title>
          <div className="d-flex align-items-center">
            <RatingStars rating={service.average_rating} size={14} />
            <span className="ms-1 small">({service.average_rating.toFixed(1)})</span>
          </div>
        </div>
        <Card.Text>
          {service.description.substring(0, 120)}...
        </Card.Text>
        <Button as={Link} to={`/services/${service.slug}`} variant="outline-primary">
          Learn More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;