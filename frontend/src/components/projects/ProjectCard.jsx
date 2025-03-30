import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RatingStars from '../testimonials/RatingStars';

const ProjectCard = ({ project }) => {
  return (
    <Card className="h-100 border-0 shadow-sm">
      <div className="overflow-hidden" style={{ height: '200px' }}>
        <Card.Img 
          variant="top" 
          src={project.image} 
          alt={project.title} 
          className="img-fluid h-100 w-100 object-fit-cover" 
        />
      </div>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="mb-0">{project.title}</Card.Title>
          <div className="d-flex align-items-center">
            <RatingStars rating={project.average_rating} size={14} />
            <span className="ms-1 small">({project.average_rating.toFixed(1)})</span>
          </div>
        </div>
        <Card.Subtitle className="mb-3 text-muted">Client: {project.client}</Card.Subtitle>
        <Card.Text>
          {project.description.substring(0, 100)}...
        </Card.Text>
        <Button as={Link} to={`/projects/${project.slug}`} variant="outline-primary">
          View Case Study
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;