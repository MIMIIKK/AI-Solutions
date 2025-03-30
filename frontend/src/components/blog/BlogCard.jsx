import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  return (
    <Card className="h-100 border-0 shadow-sm">
      <div className="overflow-hidden" style={{ height: '200px' }}>
        <Card.Img 
          variant="top" 
          src={post.image} 
          alt={post.title} 
          className="img-fluid h-100 w-100 object-fit-cover" 
        />
      </div>
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
        
        <Card.Title as={Link} to={`/blog/${post.slug}`} className="text-decoration-none text-dark">
          {post.title}
        </Card.Title>
        
        <Card.Subtitle className="mb-3 text-muted">
          <small>
            By {post.author.first_name} {post.author.last_name} | 
            {' '}{new Date(post.published_at || post.created_at).toLocaleDateString()}
          </small>
        </Card.Subtitle>
        
        <Card.Text>
          {post.summary.substring(0, 120)}...
        </Card.Text>
        
        <Link to={`/blog/${post.slug}`} className="text-primary text-decoration-none">
          Read More →
        </Link>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;