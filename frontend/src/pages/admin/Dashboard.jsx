import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaEnvelope, FaGlobe, FaChartLine, FaCalendarCheck } from 'react-icons/fa';
import { getInquiryStats } from '../../api/contact';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await getInquiryStats();
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Container fluid className="py-4">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading dashboard data...</p>
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
      <h1 className="mb-4">Dashboard</h1>
      
      <Row className="g-4 mb-4">
        <Col xl={3} md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                <FaEnvelope className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="fw-bold mb-0">{stats.total}</h3>
                <p className="text-muted mb-0">Total Inquiries</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xl={3} md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                <FaCalendarCheck className="text-success" size={24} />
              </div>
              <div>
                <h3 className="fw-bold mb-0">
                  {stats.by_status.find(s => s.status === 'completed')?.count || 0}
                </h3>
                <p className="text-muted mb-0">Completed</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xl={3} md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                <FaChartLine className="text-warning" size={24} />
              </div>
              <div>
                <h3 className="fw-bold mb-0">
                  {stats.by_status.find(s => s.status === 'in_progress')?.count || 0}
                </h3>
                <p className="text-muted mb-0">In Progress</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xl={3} md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                <FaGlobe className="text-info" size={24} />
              </div>
              <div>
                <h3 className="fw-bold mb-0">
                  {stats.by_status.find(s => s.status === 'new')?.count || 0}
                </h3>
                <p className="text-muted mb-0">New Inquiries</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="g-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0">Monthly Inquiries</h5>
            </Card.Header>
            <Card.Body>
              {stats.monthly && stats.monthly.length > 0 ? (
                <div style={{ height: '300px' }}>
                  {/* You could add a chart library like Chart.js or Recharts here */}
                  <p>Chart would go here in a real implementation</p>
                  <ul>
                    {stats.monthly.map((item, index) => (
                      <li key={index}>
                        {new Date(item.month).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}: {item.count} inquiries
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-center py-5 text-muted">No monthly data available</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0">Inquiries by Country</h5>
            </Card.Header>
            <Card.Body>
              {stats.by_country && stats.by_country.length > 0 ? (
                <div>
                  {stats.by_country.map((item, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>{item.country}</span>
                        <span className="fw-bold">{item.count}</span>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar bg-primary" 
                          role="progressbar" 
                          style={{ width: `${(item.count / stats.total) * 100}%` }}
                          aria-valuenow={(item.count / stats.total) * 100}
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-5 text-muted">No country data available</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;