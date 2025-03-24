// frontend/src/components/articles/ArticleCard.jsx
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={article.featured_image} 
        className="card-img-top" 
        alt={article.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{article.title}</h5>
        <p className="text-muted small mb-2">
          {formatDate(article.published_date)} | {article.category_name}
        </p>
        <p className="card-text flex-grow-1">{article.excerpt}</p>
        <Link to={`/articles/${article.slug}`} className="btn btn-outline-primary mt-auto">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;