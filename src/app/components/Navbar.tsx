import { Link, useLocation } from 'react-router';
import { useState } from 'react';
import { Menu, X, Briefcase, ChevronRight } from 'lucide-react';
import ButtonPrimary from './form/ButtonPrimary';
import ButtonPrimarySmall from './form/ButtonPrimarySmall';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(0,0,0,0.07)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}
            >
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-900" style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.01em' }}>
              Desjob <span style={{ color: '#16a34a' }}>Global</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-2 rounded-full transition-colors"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#16a34a' : '#374151',
                    background: isActive ? '#f0fdf4' : 'transparent',
                  }}
                >
                  <p>{link.label}</p>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ButtonPrimarySmall text="Login" link="/admin/login" icon={<ChevronRight color='white' size={16} />} />
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-xl transition-colors"
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#16a34a' : '#374151',
                  background: isActive ? '#f0fdf4' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/admin/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-full py-3 text-white"
              style={{
                fontSize: '0.9375rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #16a34a, #22c55e)',
              }}
            >
              Login <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
