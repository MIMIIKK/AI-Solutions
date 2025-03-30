import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUsers, FaLightbulb, FaGlobe, FaBullseye } from 'react-icons/fa';

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Jane Smith',
      position: 'CEO & Founder',
      bio: 'Jane has over 15 years of experience in AI and software development, with a passion for using technology to solve business challenges.',
      image: '/images/member1.jpg',
    },
    {
      id: 2,
      name: 'John Anderson',
      position: 'CTO',
      bio: 'John leads our technical team, bringing expertise in machine learning, cloud architecture, and scalable software solutions.',
      image: '/images/member2.jpg',
    },
    {
      id: 3,
      name: 'Emily Chen',
      position: 'Head of AI Research',
      bio: 'Emily specializes in natural language processing and developing virtual assistants that provide exceptional user experiences.',
      image: '/images/member3.avif',
    },
    {
      id: 4,
      name: 'Michael Roberts',
      position: 'Client Solutions Director',
      bio: 'Michael works closely with clients to understand their needs and ensure our AI solutions deliver measurable business value.',
      image: '/images/member4.png',
    }
  ];

  return (
    <>
      {/* About Hero */}
      <section 
        className="py-5 text-white position-relative" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/about-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px'
        }}
      >
        <Container className="py-5 mt-5">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">About AI-Solution</h1>
              <p className="lead">
                We're on a mission to transform businesses through cutting-edge AI technology.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Our Story */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img 
                src="/images/our-story.webp" 
                alt="AI-Solution Office" 
                className="img-fluid rounded shadow-sm"
              />
            </Col>
            <Col lg={6}>
              <h2 className="mb-4">Our Story</h2>
              <p>
                AI-Solution was founded in 2020 with a vision to make artificial intelligence accessible and practical for businesses of all sizes. What started as a small team of AI enthusiasts has grown into a thriving company serving clients across multiple industries.
              </p>
              <p>
                Our journey began when our founders recognized that many businesses were struggling to implement AI solutions that could actually drive tangible results. They saw an opportunity to bridge the gap between cutting-edge AI research and practical business applications.
              </p>
              <p>
                Today, we're proud to be at the forefront of AI innovation, helping companies leverage virtual assistants, automated solutions, and data-driven insights to transform their operations and enhance the digital employee experience.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Our Values */}
      <section className="py-5 bg-light">
        <Container>
          <div className="section-title text-center mb-5">
            <h2>Our Values</h2>
            <p className="lead">The principles that guide everything we do</p>
          </div>
          
          <Row>
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div className="mb-4 text-primary">
                  <FaUsers size={50} />
                </div>
                <Card.Body>
                  <Card.Title>People First</Card.Title>
                  <Card.Text>
                    We believe technology should enhance human potential, not replace it. Our solutions focus on supporting people at work.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div className="mb-4 text-primary">
                  <FaLightbulb size={50} />
                </div>
                <Card.Body>
                  <Card.Title>Innovation</Card.Title>
                  <Card.Text>
                    We're constantly exploring new ideas and technologies to stay at the cutting edge of AI advancement.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div className="mb-4 text-primary">
                  <FaGlobe size={50} />
                </div>
                <Card.Body>
                  <Card.Title>Global Impact</Card.Title>
                  <Card.Text>
                    We aim to create solutions that can scale globally and make a positive difference worldwide.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div className="mb-4 text-primary">
                  <FaBullseye size={50} />
                </div>
                <Card.Body>
                  <Card.Title>Results-Driven</Card.Title>
                  <Card.Text>
                    We measure our success by the tangible results and value we deliver to our clients.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Our Team */}
      <section className="py-5">
        <Container>
          <div className="section-title text-center mb-5">
            <h2>Our Leadership Team</h2>
            <p className="lead">The experts behind AI-Solution</p>
          </div>
          
          <Row>
            {teamMembers.map(member => (
              <Col key={member.id} lg={3} md={6} className="mb-4">
                <Card className="h-100 border-0 shadow-sm text-center">
                  <div className="overflow-hidden" style={{ height: '250px' }}>
                    <Card.Img 
                      variant="top" 
                      src={member.image} 
                      alt={member.name} 
                      className="img-fluid h-100 w-100 object-fit-cover" 
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{member.name}</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">{member.position}</Card.Subtitle>
                    <Card.Text>
                      {member.bio}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      {/* Call to Action */}
      <section className="py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="mb-4">Join Our Journey</h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Ready to experience how AI can transform your business? Get in touch with our team today.
          </p>
          <Button as={Link} to="/contact" variant="light" size="lg">
            Contact Us
          </Button>
        </Container>
      </section>
    </>
  );
};

export default AboutPage;