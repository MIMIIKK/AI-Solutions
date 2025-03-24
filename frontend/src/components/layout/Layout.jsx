// frontend/src/components/layout/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        {/* Debug message to check if Layout is rendering */}
        <div style={{padding: '1rem', display: 'none'}}>Layout is rendering</div>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;