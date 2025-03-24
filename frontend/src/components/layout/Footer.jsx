// frontend/src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>AI Solutions</h5>
            <p className="text-muted">
              Leveraging AI to assist various industries with software solutions to address digital employee experience.
            </p>
          </div>
          
          <div className="col-md-2 mb-4">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
              <li><Link to="/about" className="text-decoration-none text-muted">About</Link></li>
              <li><Link to="/solutions" className="text-decoration-none text-muted">Solutions</Link></li>
              <li><Link to="/contact" className="text-decoration-none text-muted">Contact</Link></li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-4">
            <h5>Resources</h5>
            <ul className="list-unstyled">
              <li><Link to="/articles" className="text-decoration-none text-muted">Articles</Link></li>
              <li><Link to="/events" className="text-decoration-none text-muted">Events</Link></li>
              <li><Link to="/testimonials" className="text-decoration-none text-muted">Testimonials</Link></li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-4">
            <h5>Contact</h5>
            <ul className="list-unstyled text-muted">
              <li>Email: info@ai-solutions.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 AI Street, Sunderland, UK</li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4 bg-secondary" />
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">© {currentYear} AI Solutions. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="#" className="text-muted">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-muted">
                  <i className="bi bi-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-muted">
                  <i className="bi bi-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;