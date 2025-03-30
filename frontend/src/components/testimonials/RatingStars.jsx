import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating, size = 20, color = "#ffc107" }) => {
  const stars = [];
  
  // Add full stars
  for (let i = 1; i <= Math.floor(rating); i++) {
    stars.push(<FaStar key={`star-${i}`} size={size} color={color} />);
  }
  
  // Add half star if necessary
  if (rating % 1 >= 0.5) {
    stars.push(<FaStarHalfAlt key="star-half" size={size} color={color} />);
  }
  
  // Add empty stars
  const emptyStars = 5 - stars.length;
  for (let i = 1; i <= emptyStars; i++) {
    stars.push(<FaRegStar key={`star-empty-${i}`} size={size} color={color} />);
  }
  
  return <div className="d-flex">{stars}</div>;
};

export default RatingStars;