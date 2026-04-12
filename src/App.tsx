import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LogoLoader from './components/LogoLoader';
import Home from './pages/Home';
import Cours from './pages/Cours';
import Stages from './pages/Stages';
import FormationPro from './pages/FormationPro';
import About from './pages/About';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import AtelierPartage from './pages/AtelierPartage';
import BlogIndex from './pages/BlogIndex';
import BlogPostDetail from './pages/BlogPostDetail';
import Chatbot from './components/Chatbot';
import CookiePopup from './components/CookiePopup';

import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import StagesManagement from './pages/admin/StagesManagement';
import CoursManagement from './pages/admin/CoursManagement';
import BlogManagement from './pages/admin/BlogManagement';
import PageManagement from './pages/admin/PageManagement';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <Router>
      <LogoLoader />
      <ScrollToTop />
      <div className="min-h-screen">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cours" element={<Cours />} />
          <Route path="/stages" element={<Stages />} />
          <Route path="/formation-pro" element={<FormationPro />} />
          <Route path="/atelier-partage" element={<AtelierPartage />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservation/:courseId" element={<Reservation />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/stages"
            element={
              <ProtectedRoute>
                <StagesManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cours"
            element={
              <ProtectedRoute>
                <CoursManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <ProtectedRoute>
                <BlogManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pages"
            element={
              <ProtectedRoute>
                <PageManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Chatbot />
      <CookiePopup />
    </Router>
  );
}

export default App;