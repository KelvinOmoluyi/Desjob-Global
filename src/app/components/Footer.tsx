import { Link } from 'react-router';
import { Briefcase, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="text-white"
      style={{ background: 'linear-gradient(160deg, #0f2417 0%, #14532d 100%)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.3)' }}
              >
                <Briefcase className="w-4.5 h-4.5 text-green-400" />
              </div>
              <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                Desjob<span style={{ color: '#4ade80' }}>Global</span>
              </span>
            </Link>
            <p className="text-green-100/70 mb-5" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
              Nigeria's premier HR solutions partner connecting exceptional talent with forward-thinking organizations.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-green-600"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <Icon className="w-4 h-4 text-green-200" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/services', label: 'Our Services' },
                { to: '/jobs', label: 'Browse Jobs' },
                { to: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-green-100/70 hover:text-green-400 transition-colors"
                    style={{ fontSize: '0.9rem' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Services
            </h4>
            <ul className="space-y-2.5">
              {[
                'Talent Acquisition',
                'Executive Search',
                'HR Consulting',
                'Workforce Management',
                'Employee Training',
                'Background Checks',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-green-100/70 hover:text-green-400 transition-colors"
                    style={{ fontSize: '0.9rem' }}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-green-100/70" style={{ fontSize: '0.875rem' }}>
                  14 Broad Street, Lagos Island, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a href="tel:+2348012345678" className="text-green-100/70 hover:text-green-400 transition-colors" style={{ fontSize: '0.875rem' }}>
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a href="mailto:info@desjobglobal.com" className="text-green-100/70 hover:text-green-400 transition-colors" style={{ fontSize: '0.875rem' }}>
                  info@desjobglobal.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
              © {new Date().getFullYear()} Desjob Global. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-green-400 transition-colors"
                  style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
