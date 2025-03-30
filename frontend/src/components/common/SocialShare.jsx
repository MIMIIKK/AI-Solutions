import React from 'react';
import { Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

const SocialShare = ({ url, title }) => {
  const shareUrl = encodeURIComponent(url || window.location.href);
  const shareTitle = encodeURIComponent(title || document.title);
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    email: `mailto:?subject=${shareTitle}&body=${shareUrl}`
  };
  
  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };
  
  return (
    <div className="social-share d-flex align-items-center">
      <span className="me-3">Share:</span>
      <div>
        <Button 
          variant="outline-primary" 
          size="sm" 
          className="me-2 rounded-circle" 
          style={{ width: '36px', height: '36px', padding: 0 }}
          onClick={() => handleShare('facebook')}
        >
          <FaFacebookF />
        </Button>
        
        <Button 
          variant="outline-info" 
          size="sm" 
          className="me-2 rounded-circle" 
          style={{ width: '36px', height: '36px', padding: 0 }}
          onClick={() => handleShare('twitter')}
        >
          <FaTwitter />
        </Button>
        
        <Button 
          variant="outline-secondary" 
          size="sm" 
          className="me-2 rounded-circle" 
          style={{ width: '36px', height: '36px', padding: 0 }}
          onClick={() => handleShare('linkedin')}
        >
          <FaLinkedinIn />
        </Button>
        
        <Button 
          variant="outline-danger" 
          size="sm" 
          className="rounded-circle" 
          style={{ width: '36px', height: '36px', padding: 0 }}
          onClick={() => handleShare('email')}
        >
          <FaEnvelope />
        </Button>
      </div>
    </div>
  );
};

export default SocialShare;