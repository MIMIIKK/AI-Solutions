// frontend/src/pages/Contact/ContactPage.jsx
import { useState } from 'react';
import inquiryService from '../../services/inquiryService';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    job_title: '',
    job_details: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      await inquiryService.submitInquiry(formData);
      setMessage({
        text: 'Your inquiry has been submitted successfully. Our team will contact you soon.',
        type: 'success'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        job_title: '',
        job_details: ''
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setMessage({
        text: 'There was an error submitting your inquiry. Please try again later.',
        type: 'danger'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="text-center mb-5">Contact Us</h1>
            
            {message.text && (
              <div className={`alert alert-${message.type} mb-4`} role="alert">
                {message.text}
              </div>
            )}
            
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h5 className="card-title mb-4">Submit Your Job Requirements</h5>
                
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Personal Information */}
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        // frontend/src/pages/Contact/ContactPage.jsx (continued)
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="company" className="form-label">Company Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="country" className="form-label">Country *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="job_title" className="form-label">Job Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="job_title"
                        name="job_title"
                        value={formData.job_title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-12">
                      <label htmlFor="job_details" className="form-label">Job Details *</label>
                      <textarea
                        className="form-control"
                        id="job_details"
                        name="job_details"
                        rows="5"
                        value={formData.job_details}
                        onChange={handleChange}
                        placeholder="Please describe your project requirements in detail..."
                        required
                      ></textarea>
                    </div>
                    
                    <div className="col-12 mt-4">
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Submitting...
                          </>
                        ) : 'Submit'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="row mt-5">
              <div className="col-md-4">
                <div className="card text-center mb-4">
                  <div className="card-body">
                    <i className="bi bi-envelope-fill fs-1 text-primary mb-3"></i>
                    <h5>Email</h5>
                    <p>info@ai-solutions.com</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card text-center mb-4">
                  <div className="card-body">
                    <i className="bi bi-telephone-fill fs-1 text-primary mb-3"></i>
                    <h5>Phone</h5>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card text-center mb-4">
                  <div className="card-body">
                    <i className="bi bi-geo-alt-fill fs-1 text-primary mb-3"></i>
                    <h5>Address</h5>
                    <p>123 AI Street, Sunderland, UK</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;