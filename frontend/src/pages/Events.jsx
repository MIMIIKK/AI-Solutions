import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getEvents, getUpcomingEvents, getPastEvents } from '../api/events';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import EventCard from '../components/events/EventCard';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Fetch all events types in parallel
        const [allEventsRes, upcomingEventsRes, pastEventsRes] = await Promise.all([
          getEvents(),
          getUpcomingEvents(),
          getPastEvents()
        ]);
        
        // Extract results from paginated responses
        const allEvents = allEventsRes.results || allEventsRes;
        const upcoming = upcomingEventsRes.results || upcomingEventsRes;
        const past = pastEventsRes.results || pastEventsRes;
        
        setEvents(allEvents);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
        
        console.log("All events:", allEvents);
        console.log("Upcoming events:", upcoming);
        console.log("Past events:", past);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getActiveEvents = () => {
    let activeEvents;
    switch (activeTab) {
      case 'upcoming':
        activeEvents = upcomingEvents;
        break;
      case 'past':
        activeEvents = pastEvents;
        break;
      default:
        activeEvents = events;
    }

    return activeEvents.filter(event => 
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredEvents = getActiveEvents();

  return (
    <>
      {/* Events Hero */}
      <section 
        className="py-5 text-white position-relative" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/events-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px'
        }}
      >
        <Container className="py-5 mt-5">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">Events</h1>
              <p className="lead">
                Join us at our upcoming events to discover the latest in AI innovation, network with industry experts, and see our solutions in action.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Events List */}
      <section className="py-5">
        <Container>
          <Tab.Container id="events-tabs" activeKey={activeTab} onSelect={setActiveTab}>
            <Row className="mb-4">
              <Col md={6} className="mx-auto">
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Search events..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="shadow-sm"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-4">
              <Col>
                <Nav variant="pills" className="justify-content-center">
                  <Nav.Item>
                    <Nav.Link eventKey="all" onClick={() => setActiveTab('all')}>All Events</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="upcoming" onClick={() => setActiveTab('upcoming')}>Upcoming</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="past" onClick={() => setActiveTab('past')}>Past Events</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            
            <Tab.Content>
              <Tab.Pane eventKey={activeTab}>
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading events...</p>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                ) : filteredEvents.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="lead">No events found matching "{search}"</p>
                    <Button variant="outline-primary" onClick={() => setSearch('')}>
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <Row>
                    {filteredEvents.map(event => (
                      <Col key={event.id} lg={4} md={6} className="mb-4">
                        <EventCard event={event} />
                      </Col>
                    ))}
                  </Row>
                )}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="mb-4">Can't Make It to an Event?</h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Contact us to schedule a personalized demo of our AI solutions.
          </p>
          <Button as={Link} to="/contact" variant="light" size="lg">
            Request a Demo
          </Button>
        </Container>
      </section>
    </>
  );
};

export default EventsPage;