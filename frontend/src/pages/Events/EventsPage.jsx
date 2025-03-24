// frontend/src/pages/Events/EventsPage.jsx
import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import eventService from '../../services/eventService';
import EventCard from '../../components/gallery/EventCard';

const EventsPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const [upcomingData, pastData] = await Promise.all([
          eventService.getUpcomingEvents(),
          eventService.getPastEvents()
        ]);
        
        setUpcomingEvents(upcomingData.results || upcomingData);
        setPastEvents(pastData.results || pastData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="py-5">
      <div className="container">
        <header className="text-center mb-5">
          <h1 className="display-4">Events & Showcase</h1>
          <p className="lead">
            Join us at our upcoming events or browse through our past promotional showcases.
          </p>
        </header>
        
        {/* Tabs */}
        <div className="mb-4">
          <ul className="nav nav-pills justify-content-center">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => handleTabChange('upcoming')}
              >
                Upcoming Events
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'past' ? 'active' : ''}`}
                onClick={() => handleTabChange('past')}
              >
                Past Events
              </button>
            </li>
          </ul>
        </div>
        
        {/* Events List */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="tab-content">
            <div className={`tab-pane fade ${activeTab === 'upcoming' ? 'show active' : ''}`}>
              {upcomingEvents.length === 0 ? (
                <div className="alert alert-info text-center" role="alert">
                  No upcoming events scheduled at the moment. Check back soon!
                </div>
              ) : (
                <div className="row">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="col-lg-4 col-md-6 mb-4">
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className={`tab-pane fade ${activeTab === 'past' ? 'show active' : ''}`}>
              {pastEvents.length === 0 ? (
                <div className="alert alert-info text-center" role="alert">
                  No past events to display.
                </div>
              ) : (
                <div className="row">
                  {pastEvents.map(event => (
                    <div key={event.id} className="col-lg-4 col-md-6 mb-4">
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;