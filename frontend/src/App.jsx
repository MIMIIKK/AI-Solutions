// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import SolutionsPage from './pages/Solutions/SolutionsPage';
import SolutionDetailPage from './pages/Solutions/SolutionDetailPage';
import TestimonialsPage from './pages/Testimonials/TestimonialsPage';
import ArticlesPage from './pages/Articles/ArticlesPage';
import ArticleDetailPage from './pages/Articles/ArticleDetailPage';
import EventsPage from './pages/Events/EventsPage';
import EventDetailPage from './pages/Events/EventDetailPage';
import ContactPage from './pages/Contact/ContactPage';
import NotFoundPage from './pages/NotFound';
import './styles/main.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="solutions/:slug" element={<SolutionDetailPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<ArticleDetailPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:slug" element={<EventDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;