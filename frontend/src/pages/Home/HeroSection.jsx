// frontend/src/pages/Home/HeroSection.jsx
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-dark text-white py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold mb-4">AI-Powered Software Solutions</h1>
            <p className="lead mb-4">
              Leveraging AI to assist various industries with software solutions to rapidly and 
              proactively address issues that impact the digital employee experience.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link to="/solutions" className="btn btn-primary btn-lg px-4 me-md-2">
                Explore Solutions
              </Link>
              <Link to="/contact" className="btn btn-outline-light btn-lg px-4">
                Schedule Demo
              </Link>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <img 
              src="/assets/images/logo.png" 
              alt="AI Solutions" 
              className="img-fluid" 
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;