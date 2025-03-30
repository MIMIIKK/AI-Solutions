import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../api/blog';
import RatingStars from '../components/testimonials/RatingStars';
import TestimonialCard from '../components/testimonials/TestimonialCard';
import TestimonialForm from '../components/testimonials/TestimonialForm';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testimonialSuccess, setTestimonialSuccess] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postData = await getPostBySlug(slug);
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const handleTestimonialSubmit = () => {
    setShowTestimonialForm(false);
    setTestimonialSuccess(true);
    
    // Hide the success message after 5 seconds
    setTimeout(() => {
      setTestimonialSuccess(false);
    }, 5000);
  };

  if (loading) {
    return (
      <Container className="py-5 mt-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading blog post...</p>
        </div>
      </Container>
    );
  }

  if (error || !post) {
    return (
      <Container className="py-5 mt-5">
        <Alert variant="danger">
          {error || 'Blog post not found'}
        </Alert>
        <div className="text-center mt-4">
          <Button as={Link} to="/blog" variant="primary">
            Back to Blog
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* Blog Post Header */}
      <section className="py-5 mt-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="mb-4">
                {post.categories.map(category => (
                  <Badge 
                    key={category.id} 
                    bg="primary" 
                    className="me-2 mb-2"
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
              
              <h1 className="display-4 fw-bold mb-4">{post.title}</h1>
              
              <div className="d-flex align-items-center mb-4">
                <div className="me-4">
                  <p className="text-muted mb-0">
                    By {post.author.first_name} {post.author.last_name}
                  </p>
                </div>
                <div className="me-4">
                  <p className="text-muted mb-0">
                    {new Date(post.published_at || post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <RatingStars rating={post.average_rating} size={18} />
                  <span className="ms-2 text-muted">({post.average_rating.toFixed(1)})</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Featured Image */}
      <section className="pb-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <img 
                src={post.image} 
                alt={post.title} 
                className="img-fluid rounded w-100 mb-5"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Blog Post Content */}
      <section className="pb-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="blog-content">
                {/* Render content as HTML - Note: In production, sanitize this HTML */}
                <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}></div>
              </div>
              
              <hr className="my-5" />
              
              <div className="d-flex justify-content-between align-items-center">
                <Button as={Link} to="/blog" variant="outline-primary">
                  Back to Blog
                </Button>
                
                <div className="d-flex">
                  <Button variant="outline-secondary" className="me-2">
                    Share
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h2 className="mb-4">Reader Comments</h2>
              
              {testimonialSuccess && (
                <Alert variant="success" className="mb-4">
                  Thank you for your comment! It has been submitted for review.
                </Alert>
              )}
              
              {post.testimonials.length > 0 ? (
                <div className="mb-5">
                  {post.testimonials.map(testimonial => (
                    <div key={testimonial.id} className="mb-4">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mb-5">No comments yet. Be the first to leave a comment!</p>
              )}
              
              {showTestimonialForm ? (
                <TestimonialForm 
                  contentType="post" 
                  objectId={post.id}
                  onSubmitSuccess={handleTestimonialSubmit}
                />
              ) : (
                <div className="text-center">
                  <Button 
                    variant="outline-primary" 
                    onClick={() => setShowTestimonialForm(true)}
                  >
                    Leave a Comment
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BlogPostPage;