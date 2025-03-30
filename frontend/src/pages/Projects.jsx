import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProjects } from '../api/projects';
import RatingStars from '../components/testimonials/RatingStars';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getProjects();
        setProjects(response.results || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(search.toLowerCase()) ||
    project.client.toLowerCase().includes(search.toLowerCase()) ||
    project.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Projects Hero */}
      <section 
        className="py-5 text-white position-relative" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/projects-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px'
        }}
      >
        <Container className="py-5 mt-5">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">Our Projects</h1>
              <p className="lead">
                See how our AI solutions have helped businesses across different industries achieve their goals.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Projects List */}
      <section className="py-5">
        <Container>
          <Row className="mb-4">
            <Col md={6} className="mx-auto">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="shadow-sm"
                />
              </Form.Group>
            </Col>
          </Row>
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-5">
              <p className="lead">No projects found matching "{search}"</p>
              <Button variant="outline-primary" onClick={() => setSearch('')}>
                Clear Search
              </Button>
            </div>
          ) : (
            <Row>
              {filteredProjects.map(project => (
                <Col key={project.id} lg={4} md={6} className="mb-4">
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
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="mb-4">Have a Project in Mind?</h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Let us help you bring your vision to life with our AI-powered solutions.
          </p>
          <Button as={Link} to="/contact" variant="light" size="lg">
            Start a Project
          </Button>
        </Container>
      </section>
    </>
  );
};

export default ProjectsPage;