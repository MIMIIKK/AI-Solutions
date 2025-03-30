import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaReply, FaThumbsUp } from 'react-icons/fa';

const BlogComments = ({ comments }) => {
  return (
    <div className="blog-comments mt-5">
      <h4 className="mb-4">Comments ({comments.length})</h4>
      
      {comments.map(comment => (
        <Card key={comment.id} className="mb-4 border-0 shadow-sm">
          <Card.Body>
            <div className="d-flex mb-3">
              {comment.user.avatar ? (
                <img 
                  src={comment.user.avatar} 
                  alt={comment.user.name} 
                  className="rounded-circle me-3"
                  width="50"
                  height="50"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div 
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                  style={{ width: '50px', height: '50px' }}
                >
                  {comment.user.name.charAt(0).toUpperCase()}
                </div>
              )}
              
              <div>
                <h6 className="mb-0">{comment.user.name}</h6>
                <small className="text-muted">
                  {new Date(comment.created_at).toLocaleDateString()} at {new Date(comment.created_at).toLocaleTimeString()}
                </small>
              </div>
            </div>
            
            <p>{comment.content}</p>
            
            <div className="d-flex">
              <Button variant="link" className="text-decoration-none p-0 me-3">
                <FaThumbsUp className="me-1" /> Like ({comment.likes})
              </Button>
              <Button variant="link" className="text-decoration-none p-0">
                <FaReply className="me-1" /> Reply
              </Button>
            </div>
            
            {comment.replies && comment.replies.length > 0 && (
              <div className="ms-5 mt-3">
                {comment.replies.map(reply => (
                  <div key={reply.id} className="mb-3">
                    <div className="d-flex mb-2">
                      {reply.user.avatar ? (
                        <img 
                          src={reply.user.avatar} 
                          alt={reply.user.name} 
                          className="rounded-circle me-3"
                          width="40"
                          height="40"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div 
                          className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3"
                          style={{ width: '40px', height: '40px' }}
                        >
                          {reply.user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      
                      <div>
                        <h6 className="mb-0">{reply.user.name}</h6>
                        <small className="text-muted">
                          {new Date(reply.created_at).toLocaleDateString()} at {new Date(reply.created_at).toLocaleTimeString()}
                        </small>
                      </div>
                    </div>
                    
                    <p className="ms-5">{reply.content}</p>
                    
                    <div className="d-flex ms-5">
                      <Button variant="link" className="text-decoration-none p-0 me-3">
                        <FaThumbsUp className="me-1" /> Like ({reply.likes})
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default BlogComments;