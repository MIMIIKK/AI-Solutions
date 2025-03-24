// frontend/src/pages/Articles/ArticlesPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import articleService from '../../services/articleService';
import ArticleCard from '../../components/articles/ArticleCard';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesResponse, categoriesResponse] = await Promise.all([
          articleService.getAllArticles(),
          articleService.getCategories()
        ]);
        
        setArticles(articlesResponse.results || articlesResponse);
        setCategories(categoriesResponse.results || categoriesResponse);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching articles data:', err);
        setError('Failed to load articles. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleCategoryChange = async (categorySlug) => {
    try {
      setLoading(true);
      setActiveCategory(categorySlug);
      
      let data;
      if (categorySlug) {
        data = await articleService.getArticlesByCategory(categorySlug);
      } else {
        data = await articleService.getAllArticles();
      }
      
      setArticles(data.results || data);
      setLoading(false);
    } catch (err) {
      console.error('Error filtering articles:', err);
      setError('Failed to filter articles. Please try again later.');
      setLoading(false);
    }
  };
  
  return (
    <div className="py-5">
      <div className="container">
        <header className="text-center mb-5">
          <h1 className="display-4">Articles & Insights</h1>
          <p className="lead">
            Stay updated with the latest trends, insights, and news about AI and software solutions.
          </p>
        </header>
        
        {/* Category Filters */}
        {categories && categories.length > 0 && (
          <div className="mb-5">
            <div className="d-flex justify-content-center flex-wrap">
              <button 
                className={`btn ${activeCategory === null ? 'btn-primary' : 'btn-outline-primary'} m-1`}
                onClick={() => handleCategoryChange(null)}
              >
                All Articles
              </button>
              
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={`btn ${activeCategory === category.slug ? 'btn-primary' : 'btn-outline-primary'} m-1`}
                  onClick={() => handleCategoryChange(category.slug)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Articles List */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : articles.length === 0 ? (
          <div className="alert alert-info" role="alert">
            No articles available in this category. Check back soon!
          </div>
        ) : (
          <div className="row">
            {articles.map(article => (
              <div key={article.id} className="col-lg-4 col-md-6 mb-4">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;