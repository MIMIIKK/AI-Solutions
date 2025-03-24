// frontend/src/pages/Articles/ArticleDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import articleService from '../../services/articleService';

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        const articleData = await articleService.getArticleBySlug(slug);
        setArticle(articleData);
        
        // Get related articles from the same category
        if (articleData.category) {
          const categoryArticles = await articleService.getArticlesByCategory(articleData.category_slug || articleData.category);
          const filtered = (categoryArticles.results || categoryArticles)
            .filter(a => a.id !== articleData.id)
            .slice(0, 3);
          setRelatedArticles(filtered);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchArticleData();
  }, [slug]);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/articles" className="btn btn-primary">
          Back to Articles
        </Link>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          Article not found.
        </div>
        <Link to="/articles" className="btn btn-primary">
          Back to Articles
        </Link>
      </div>
    );
  }
  
  return (
    <div className="py-5">
      <div className="container">
        {/* Featured Image */}
        <div className="mb-4 text-center">
          <img 
            src={article.featured_image} 
            alt={article.title} 
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: '500px' }}
          />
        </div>
        
        <div className="row">
          <div className="col-lg-8 mx-auto">
            {/* Article Header */}
            <header className="mb-4">
              <h1 className="display-5 fw-bold">{article.title}</h1>
              <div className="text-muted">
                <span>By {article.author}</span>
                <span className="mx-2">|</span>
                <span>{formatDate(article.published_date)}</span>
                <span className="mx-2">|</span>
                <span className="badge bg-primary">{article.category_name}</span>
              </div>
            </header>
            
            {/* Article Content */}
            <div className="article-content mb-5">
              <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }}></div>
            </div>
            
            {/* Article Footer */}
            <div className="card mb-5">
              <div className="card-body">
                <h5 className="card-title">About the Author</h5>
                <p className="card-text">
                  {article.author} is a content writer at AI Solutions who specializes in 
                  writing about artificial intelligence and its applications in business.
                </p>
              </div>
            </div>
            
            {/* Social Sharing */}
            <div className="mb-5">
              <h5>Share this Article</h5>
              <div className="d-flex">
                <a href="#" className="btn btn-outline-primary me-2">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="btn btn-outline-primary me-2">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="btn btn-outline-primary me-2">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="#" className="btn btn-outline-primary">
                  <i className="bi bi-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-5">
            <h3 className="text-center mb-4">Related Articles</h3>
            <div className="row">
              {relatedArticles.map(relatedArticle => (
                <div key={relatedArticle.id} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img 
                      src={relatedArticle.featured_image} 
                      className="card-img-top" 
                      alt={relatedArticle.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{relatedArticle.title}</h5>
                      <p className="card-text">{relatedArticle.excerpt}</p>
                      <Link to={`/articles/${relatedArticle.slug}`} className="btn btn-outline-primary">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-center mt-5">
          <Link to="/articles" className="btn btn-primary">
            Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;