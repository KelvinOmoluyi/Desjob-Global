import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Jobs from './pages/Jobs';
import Contact from './pages/Contact';

// Admin imports
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/Login';
import AdminMessages from './pages/admin/Messages';
import AdminPosts from './pages/admin/Posts';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'services', Component: Services },
      { path: 'jobs', Component: Jobs },
      { path: 'contact', Component: Contact },
    ],
  },
  {
    path: '/admin/login',
    Component: AdminLogin,
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { path: 'messages', Component: AdminMessages },
      { path: 'posts', Component: AdminPosts },
    ],
  },
]);
