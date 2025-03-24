// frontend/src/pages/About/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold">About AI Solutions</h1>
              <p className="lead">
                Leveraging AI to transform the digital employee experience and drive innovation across industries.
              </p>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img 
                src="/assets/images/about-hero.svg" 
                alt="About AI Solutions" 
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Company Overview */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="mb-4">Our Story</h2>
              <p className="lead">
                AI-Solutions is a forward-thinking start-up based in Sunderland that is 
                revolutionizing how businesses approach digital employee experience.
              </p>
              <p className="mb-4">
                Founded with a vision to make AI-powered solutions accessible to 
                businesses of all sizes, we have quickly grown to become a leader in our field.
                Our team combines expertise in artificial intelligence, software development, 
                and business strategy to create solutions that address real-world challenges.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <i className="bi bi-bullseye text-primary fs-1 mb-3"></i>
                  <h3 className="card-title">Our Mission</h3>
                  <p className="card-text">
                    To innovate, promote, and deliver the future of the digital employee experience, 
                    with a strong focus on supporting people at work. We aim to make a positive global 
                    impact by creating AI-powered solutions that enhance productivity and satisfaction.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <i className="bi bi-eye text-primary fs-1 mb-3"></i>
                  <h3 className="card-title">Our Vision</h3>
                  <p className="card-text">
                    To become the global leader in AI-powered software solutions that transform 
                    the digital workplace. We envision a future where every organization has access 
                    to cutting-edge AI technology that simplifies complex processes and empowers employees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* What Sets Us Apart */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">What Sets Us Apart</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="bi bi-robot text-primary fs-1 mb-3"></i>
                  <h4>AI-Powered Virtual Assistant</h4>
                  <p>
                    Our intelligent virtual assistant responds to users' inquiries and helps 
                    solve problems quickly and efficiently.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="bi bi-tools text-primary fs-1 mb-3"></i>
                  <h4>Affordable Prototyping</h4>
                  <p>
                    We provide cost-effective AI-based prototyping solutions that allow businesses 
                    to test concepts before full implementation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="bi bi-lightning-charge text-primary fs-1 mb-3"></i>
                  <h4>Rapid Issue Resolution</h4>
                  <p>
                    Our solutions proactively identify and address issues that impact the digital 
                    employee experience, enabling faster innovation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Our Leadership Team</h2>
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img src="/assets/images/team-1.jpg" className="card-img-top" alt="Team Member" />
                <div className="card-body text-center">
                  <h5 className="card-title">Sarah Johnson</h5>
                  <p className="text-muted">CEO & Co-Founder</p>
                  <p className="card-text">
                    With over 15 years of experience in AI and software development, Sarah leads 
                    our company vision and strategic direction.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img src="/assets/images/team-2.jpg" className="card-img-top" alt="Team Member" />
                <div className="card-body text-center">
                  <h5 className="card-title">David Chen</h5>
                  <p className="text-muted">CTO & Co-Founder</p>
                  <p className="card-text">
                    David oversees our technical strategy and innovation, bringing expertise in 
                    machine learning and software architecture.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img src="/assets/images/team-3.jpg" className="card-img-top" alt="Team Member" />
                <div className="card-body text-center">
                  <h5 className="card-title">Emily Rodriguez</h5>
                  <p className="text-muted">Head of Product Development</p>
                  <p className="card-text">
                    Emily leads our product team, ensuring our solutions meet the highest standards 
                    of quality and user experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Ready to experience the AI Solutions difference?</h2>
          <p className="lead mb-4">
            Contact us today to learn more about our innovative software solutions and how they can 
            transform your organization's digital employee experience.
          </p>
          <Link to="/contact" className="btn btn-light btn-lg">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;