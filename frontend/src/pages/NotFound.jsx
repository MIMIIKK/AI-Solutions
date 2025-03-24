// frontend/src/pages/NotFound/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="py-5 my-5">
      <div className="container text-center">
        <div className="mb-4">
          <i className="bi bi-exclamation-triangle display-1 text-warning"></i>
        </div>
        <h1 className="display-4 mb-4">404 - Page Not Found</h1>
        <p className="lead mb-5">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-primary mb-4">
              <div className="card-body">
                <h5 className="card-title">Here are some helpful links:</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <Link to="/">Home Page</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/solutions">Our Solutions</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;