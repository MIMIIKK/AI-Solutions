// frontend/src/pages/Home/HomePage.jsx
import { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import FeaturedSolutions from './FeaturedSolutions';
import TestimonialSlider from '../../components/testimonials/TestimonialSlider';
import ArticleCard from '../../components/articles/ArticleCard';
import EventCard from '../../components/gallery/EventCard';
import solutionService from '../../services/solutionService';
import testimonialService from '../../services/testimonialService';
import articleService from '../../services/articleService';
import eventService from '../../services/eventService';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [featuredSolutions, setFeaturedSolutions] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [solutionsResponse, testimonialsResponse, articlesResponse, eventsResponse] = await Promise.all([
          solutionService.getFeaturedSolutions(),
          testimonialService.getFeaturedTestimonials(),
          articleService.getFeaturedArticles(),
          eventService.getUpcomingEvents()
        ]);
        
        setFeaturedSolutions(solutionsResponse.results || solutionsResponse);
        setTestimonials(testimonialsResponse.results || testimonialsResponse);
        setArticles(articlesResponse.results?.slice(0, 3) || articlesResponse.slice(0, 3));
        setEvents(eventsResponse.results?.slice(0, 3) || eventsResponse.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div>
      <HeroSection />
      
      {/* Featured Solutions */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Our Solutions</h2>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <FeaturedSolutions solutions={featuredSolutions} />
          )}
          <div className="text-center mt-4">
            <Link to="/solutions" className="btn btn-primary">View All Solutions</Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">What Our Clients Say</h2>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <TestimonialSlider testimonials={testimonials} />
          )}
          <div className="text-center mt-4">
            <Link to="/testimonials" className="btn btn-outline-primary">Read More Testimonials</Link>
          </div>
        </div>
      </section>
      
      {/* Recent Articles */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Latest Articles</h2>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {articles.map(article => (
                <div key={article.id} className="col-md-4 mb-4">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-4">
            <Link to="/articles" className="btn btn-outline-primary">View All Articles</Link>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Upcoming Events</h2>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {events.map(event => (
                <div key={event.id} className="col-md-4 mb-4">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-4">
            <Link to="/events" className="btn btn-outline-primary">View All Events</Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Ready to transform your digital employee experience?</h2>
          <p className="lead mb-4">Contact us today to schedule a demo or learn more about our AI-powered solutions.</p>
          <Link to="/contact" className="btn btn-light btn-lg">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;