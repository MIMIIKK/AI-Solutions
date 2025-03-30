import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { getInquiries, updateInquiryStatus } from '../../api/contact';

const InquiriesPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await getInquiries();
      setInquiries(response.results || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      setError('Failed to load inquiries. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setNewStatus(inquiry.status);
    setNotes(inquiry.notes || '');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInquiry(null);
  };

  const handleStatusChange = async () => {
    if (!selectedInquiry) return;
    
    try {
      await updateInquiryStatus(selectedInquiry.id, newStatus);
      
      // Update the local state
      setInquiries(inquiries.map(inquiry => {
        if (inquiry.id === selectedInquiry.id) {
          return { ...inquiry, status: newStatus, notes };
        }
        return inquiry;
      }));
      
      handleCloseModal();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'new':
        return <Badge bg="info">New</Badge>;
      case 'in_progress':
        return <Badge bg="warning">In Progress</Badge>;
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <Container fluid className="py-4">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading inquiries...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Customer Inquiries</h1>
        <Button variant="outline-primary" onClick={fetchInquiries}>
          Refresh
        </Button>
      </div>
      
      {inquiries.length === 0 ? (
        <div className="alert alert-info">No inquiries found.</div>
      ) : (
        <div className="table-responsive">
          <Table hover className="align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Country</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map(inquiry => (
                <tr key={inquiry.id}>
                  <td>
                    <div className="fw-bold">{inquiry.name}</div>
                    <div className="small text-muted">{inquiry.email}</div>
                  </td>
                  <td>{inquiry.company}</td>
                  <td>{inquiry.country}</td>
                  <td>{new Date(inquiry.created_at).toLocaleDateString()}</td>
                  <td>{getStatusBadge(inquiry.status)}</td>
                  <td>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleViewDetails(inquiry)}>
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      
      {/* Detail Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Inquiry Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInquiry && (
            <div>
              <Row className="mb-4">
                <Col md={6}>
                  <h5>Contact Information</h5>
                  <p><strong>Name:</strong> {selectedInquiry.name}</p>
                  <p><strong>Email:</strong> {selectedInquiry.email}</p>
                  <p><strong>Phone:</strong> {selectedInquiry.phone}</p>
                  <p><strong>Company:</strong> {selectedInquiry.company}</p>
                  <p><strong>Country:</strong> {selectedInquiry.country}</p>
                  {selectedInquiry.job_title && (
                    <p><strong>Job Title:</strong> {selectedInquiry.job_title}</p>
                  )}
                </Col>
                <Col md={6}>
                  <h5>Inquiry Details</h5>
                  <p><strong>Date:</strong> {new Date(selectedInquiry.created_at).toLocaleString()}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedInquiry.status)}</p>
                  <p><strong>Job Details:</strong></p>
                  <div className="p-3 bg-light rounded">
                    {selectedInquiry.job_details}
                  </div>
                </Col>
              </Row>
              
              <hr />
              
              <h5>Update Status</h5>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select 
                        value={newStatus} 
                        onChange={(e) => setNewStatus(e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStatusChange}>
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default InquiriesPage;