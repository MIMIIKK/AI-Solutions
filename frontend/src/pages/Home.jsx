import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLightbulb, FaRobot, FaChartLine, FaUsers } from 'react-icons/fa';
import { getFeaturedServices } from '../api/services';
import { getFeaturedProjects } from '../api/projects';
import { getFeaturedPosts } from '../api/blog';
import { getUpcomingEvents } from '../api/events';

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, projectsData, postsData, eventsData] = await Promise.all([
          getFeaturedServices(),
          getFeaturedProjects(),
          getFeaturedPosts(),
          getUpcomingEvents()
        ]);
        
        setServices(servicesData.results || []);
        setProjects(projectsData.results || []);
        setPosts(postsData.results || []);
        setEvents(eventsData.results || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Hero Section */}
<section className="hero-section position-relative" style={{ 
    minHeight: '100vh', 
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/hero-bg.jpg)', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  }}>
  <Container className="text-center text-white">
    <Row className="justify-content-center">
      <Col lg={10}>
        <h1 className="display-2 fw-bold mb-4">AI-Powered Solutions for Digital Innovation</h1>
        <p className="lead fs-4 mb-5">We leverage artificial intelligence to assist various industries with software solutions that rapidly and proactively address digital challenges.</p>
        <div className="d-flex justify-content-center gap-3">
          <Button as={Link} to="/services" variant="primary" size="lg" className="px-4 py-3 fw-bold">
            Explore Our Services
          </Button>
          <Button as={Link} to="/contact" variant="outline-light" size="lg" className="px-4 py-3 fw-bold">
            Schedule a Demo
          </Button>
        </div>
      </Col>
    </Row>
  </Container>
  <div className="position-absolute bottom-0 w-100">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  </div>
</section>
      {/* Features Section */}
      <section className="section-padding">
        <Container>
          <div className="section-title">
            <h2>Why Choose Us</h2>
            <p className="lead">Our AI-powered solutions give you a competitive edge</p>
          </div>
          
          <Row>
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div className="mb-4">
                  <FaRobot className="text-primary" size={50} />
                </div>
                <Card.Body>
                  <Card.Title>AI-Powered Virtual Assistant</Card.Title>
                  <Card.Text>
                    Our intelligent virtual assistant responds to user inquiries and provides accurate solutions instantly.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div className="mb-4">
                  <FaLightbulb className="text-primary" size={50} />
                </div>
                <Card.Body>
                  <Card.Title>Innovative Prototyping</Card.Title>
                  <Card.Text>
                    We provide affordable AI-based prototyping solutions to speed up your product development lifecycle.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div className="mb-4">
                  <FaChartLine className="text-primary" size={50} />
                </div>
                <Card.Body>
                  <Card.Title>Proactive Solutions</Card.Title>
                  <Card.Text>
                    We identify and address potential issues before they impact your digital employee experience.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div className="mb-4">
                  <FaUsers className="text-primary" size={50} />
                </div>
                <Card.Body>
                  <Card.Title>People-Focused</Card.Title>
                  <Card.Text>
                    Our solutions prioritize supporting people at work, enhancing productivity and satisfaction.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="bg-light-gray section-padding">
        <Container>
          <div className="section-title">
            <h2>Our Services</h2>
            <p className="lead">Innovative AI solutions tailored for your business needs</p>
          </div>
          
          <Row>
            {loading ? (
              <Col className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </Col>
            ) : (
              services.map(service => (
                <Col key={service.id} lg={4} md={6} className="mb-4">
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
                      <Card.Title>{service.title}</Card.Title>
                      <Card.Text>
                        {service.description.substring(0, 120)}...
                      </Card.Text>
                      <Button as={Link} to={`/services/${service.slug}`} variant="outline-primary">
                        Learn More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
          
          <div className="text-center mt-5">
            <Button as={Link} to="/services" variant="primary" size="lg">View All Services</Button>
          </div>
        </Container>
      </section>

      {/* Project Showcase */}
      <section className="section-padding">
        <Container>
          <div className="section-title">
            <h2>Our Projects</h2>
            <p className="lead">See how we've helped businesses transform with AI</p>
          </div>
          
          <Row>
            {loading ? (
              <Col className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </Col>
            ) : (
              projects.map(project => (
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
                      <Card.Title>{project.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Client: {project.client}</Card.Subtitle>
                      <Card.Text>
                        {project.description.substring(0, 100)}...
                      </Card.Text>
                      <Button as={Link} to={`/projects/${project.slug}`} variant="outline-primary">
                        View Project
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
          
          <div className="text-center mt-5">
            <Button as={Link} to="/projects" variant="primary" size="lg">View All Projects</Button>
          </div>
        </Container>
      </section>

      {/* Events Section */}
      {events.length > 0 && (
        <section className="bg-light-gray section-padding">
          <Container>
            <div className="section-title">
              <h2>Upcoming Events</h2>
              <p className="lead">Join us at our upcoming events and demos</p>
            </div>
            
            <Carousel>
              {events.map(event => (
                <Carousel.Item key={event.id}>
                  <Row className="align-items-center">
                    <Col md={6}>
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="img-fluid rounded shadow-sm" 
                      />
                    </Col>
                    <Col md={6} className="p-4">
                      <h3>{event.title}</h3>
                      <p className="text-muted">
                        <strong>Date:</strong> {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
                      </p>
                      <p className="text-muted">
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p>{event.description.substring(0, 150)}...</p>
                      <div className="mt-4">
                        <Button as={Link} to={`/events/${event.slug}`} variant="outline-primary" className="me-3">
                          Event Details
                        </Button>
                        {event.registration_url && (
                          <Button as="a" href={event.registration_url} variant="primary" target="_blank">
                            Register Now
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </Container>
        </section>
      )}

      {/* Call to Action */}
      <section className="section-padding bg-primary text-white">
        <Container className="text-center">
          <h2 className="mb-4">Ready to Transform Your Business with AI?</h2>
          <p className="lead mb-5">
            Schedule a personalized demo today and discover how our AI-powered solutions can help your business grow.
          </p>
          <Button as={Link} to="/contact" variant="light" size="lg">
            Get Started
          </Button>
        </Container>
      </section>

      {/* Blog Section */}
      {posts.length > 0 && (
        <section className="section-padding">
          <Container>
            <div className="section-title">
              <h2>Latest Articles</h2>
              <p className="lead">Insights and updates from our blog</p>
            </div>
            
            <Row>
              {posts.map(post => (
                <Col key={post.id} lg={4} md={6} className="mb-4">
                  <Card className="h-100 border-0 shadow-sm">
                    <div className="overflow-hidden" style={{ height: '200px' }}>
                      <Card.Img 
                        variant="top" 
                        src={post.image} 
                        alt={post.title} 
                        className="img-fluid h-100 w-100 object-fit-cover" 
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {new Date(post.published_at || post.created_at).toLocaleDateString()}
                      </Card.Subtitle>
                      <Card.Text>
                        {post.summary.substring(0, 100)}...
                      </Card.Text>
                      <Button as={Link} to={`/blog/${post.slug}`} variant="outline-primary">
                        Read More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            
            <div className="text-center mt-5">
              <Button as={Link} to="/blog" variant="primary" size="lg">View All Articles</Button>
            </div>
          </Container>
        </section>
      )}
    </>
  );
};

export default HomePage;