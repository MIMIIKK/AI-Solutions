import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getPosts, getCategories } from '../api/blog';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsResponse, categoriesResponse] = await Promise.all([
          getPosts(),
          getCategories()
        ]);
        
        setPosts(postsResponse.results || []);
        setCategories(categoriesResponse.results || []);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categorySlug) => {
    if (selectedCategory === categorySlug) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categorySlug);
    }
  };

  const filteredPosts = posts.filter(post => {
    // Filter by search text
    const matchesSearch = 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase());
      
    // Filter by category
    const matchesCategory = selectedCategory 
      ? post.categories.some(category => category.slug === selectedCategory)
      : true;
      
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Blog Hero */}
      <section 
        className="py-5 text-white position-relative" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/blog-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px'
        }}
      >
        <Container className="py-5 mt-5">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">Our Blog</h1>
              <p className="lead">
                Insights, news, and updates about AI technology and its applications in business.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Blog Content */}
      <section className="py-5">
        <Container>
          <Row>
            {/* Main Content */}
            <Col lg={8}>
              {/* Search */}
              <div className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="shadow-sm"
                />
              </div>
              
              {/* Blog Posts */}
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading blog posts...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-5">
                  <p className="lead">No articles found matching your criteria</p>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => {
                      setSearch('');
                      setSelectedCategory(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                filteredPosts.map(post => (
                  <Card key={post.id} className="mb-4 border-0 shadow-sm">
                    <Row className="g-0">
                      <Col md={4}>
                        <div className="overflow-hidden h-100">
                          <Card.Img 
                            src={post.image} 
                            alt={post.title} 
                            className="img-fluid h-100 w-100 object-fit-cover" 
                          />
                        </div>
                      </Col>
                      <Col md={8}>
                        <Card.Body>
                          <div className="mb-2">
                            {post.categories.map(category => (
                              <Badge 
                                key={category.id} 
                                bg="primary" 
                                className="me-2 mb-1"
                              >
                                {category.name}
                              </Badge>
                            ))}
                          </div>
                          
                          <Card.Title className="mb-2">{post.title}</Card.Title>
                          
                          <Card.Subtitle className="mb-3 text-muted">
                            <small>
                              By {post.author.first_name} {post.author.last_name} | 
                              {' '}{new Date(post.published_at || post.created_at).toLocaleDateString()}
                            </small>
                          </Card.Subtitle>
                          
                          <Card.Text>
                            {post.summary}
                          </Card.Text>
                          
                          <Button as={Link} to={`/blog/${post.slug}`} variant="outline-primary">
                            Read More
                          </Button>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))
              )}
            </Col>
            
            {/* Sidebar */}
            <Col lg={4}>
              {/* Categories */}
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                  <Card.Title className="mb-3">Categories</Card.Title>
                  <div>
                    {categories.map(category => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.slug ? "primary" : "outline-primary"}
                        className="me-2 mb-2"
                        onClick={() => handleCategoryClick(category.slug)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </Card.Body>
              </Card>
              
              {/* Subscribe */}
              <Card className="border-0 shadow-sm mb-4 bg-primary text-white">
                <Card.Body className="p-4">
                  <Card.Title className="mb-3">Subscribe to Our Newsletter</Card.Title>
                  <Card.Text>
                    Stay updated with our latest articles and news about AI technology.
                  </Card.Text>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Control 
                        type="email" 
                        placeholder="Your Email Address" 
                      />
                    </Form.Group>
                    <Button variant="light" className="w-100">
                      Subscribe
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BlogPage;