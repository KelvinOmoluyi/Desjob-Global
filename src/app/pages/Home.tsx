import { Link } from 'react-router';
import { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import {
  ArrowRight, CheckCircle2, Users, TrendingUp, Award, Building2,
  Star, ChevronDown, ChevronUp, Search, Briefcase, Target, Heart, Zap,
  Repeat, Lightbulb, Package
} from 'lucide-react';
import { motion } from 'framer-motion';
import './Home.css';
import ButtonPrimary from '../components/form/ButtonPrimary';
import ButtonSecondary from '../components/form/ButtonSecondary';

const HERO_IMG = 'https://images.unsplash.com/photo-1626954499077-b56bd315594d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBIUiUyMHRlYW0lMjBOaWdlcmlhJTIwb2ZmaWNlfGVufDF8fHx8MTc3NDAyMzU1Nnww&ixlib=rb-4.1.0&q=80&w=1080';
const WHY_IMG = 'https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjB0ZWFtJTIwbWVldGluZyUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzczODk3MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080';
const HOWIT_IMG = 'https://images.unsplash.com/photo-1762330466678-45b42e02f5a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNydWl0bWVudCUyMGhpcmluZyUyMHRhbGVudCUyMGFjcXVpc2l0aW9ufGVufDF8fHx8MTc3NDAyMzU2MHww&ixlib=rb-4.1.0&q=80&w=1080';
const WOMAN_IMG = 'https://images.unsplash.com/photo-1760543998147-117ae5649c5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGV4ZWN1dGl2ZSUyMHBvcnRyYWl0JTIwc21pbGluZ3xlbnwxfHx8fDE3NzM5NDYyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080';
const MAN_IMG = 'https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBleGVjdXRpdmUlMjBwb3J0cmFpdCUyMG9mZmljZXxlbnwxfHx8fDE3NzQwMjM1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080';
const CAREER_IMG = 'https://images.unsplash.com/photo-1758876019673-704b039d405c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBncm93dGglMjBwcm9mZXNzaW9uYWwlMjBzdWNjZXNzJTIwb2ZmaWNlfGVufDF8fHx8MTc3NDAyMzU2MXww&ixlib=rb-4.1.0&q=80&w=1080';

const faqs = [
  {
    q: 'How long does the recruitment process typically take?',
    a: 'Our standard recruitment process takes 2–4 weeks from requirement gathering to final placement, depending on the role\'s seniority and your specific requirements. For executive searches, we may take up to 6 weeks to ensure the perfect match.',
  },
  {
    q: 'What industries do you specialise in?',
    a: 'We cover 15+ industries including Technology, Finance & Banking, Healthcare, FMCG, Oil & Gas, Telecommunications, Manufacturing, Real Estate, and more with dedicated specialist teams for each sector.',
  },
  {
    q: 'Do you handle entry-level roles as well as senior positions?',
    a: 'Absolutely. We manage the full talent spectrum from entry-level professionals and mid-career specialists to C-suite executives and board-level appointments.',
  },
  {
    q: 'How do you ensure the quality of candidates you present?',
    a: 'Every candidate undergoes a rigorous multi-stage screening process that includes CV evaluation, competency-based interviews, skills assessments, reference verification, and background checks before being presented to our clients.',
  },
  {
    q: 'What is your fee structure for recruitment services?',
    a: 'We operate on transparent, results-based pricing tailored to the scope and complexity of your hiring needs. Contact us for a customised proposal with no hidden charges.',
  },
  {
    q: 'Do you offer HR services beyond recruitment?',
    a: 'Yes. Beyond recruitment, we offer HR strategy consulting, organisational design, payroll management, employee training & development programmes, and compliance advisory services.',
  },
];

const stats = [
  { value: '500+', label: 'Companies Served', icon: Building2 },
  { value: '10,000+', label: 'Successful Placements', icon: Users },
  { value: '98%', label: 'Client Satisfaction', icon: Award },
  { value: '15+', label: 'Industries Covered', icon: TrendingUp },
];

const testimonials = [
  {
    name: 'Adebayo Okafor',
    title: 'Head of People, TechBridge Nigeria',
    avatar: MAN_IMG,
    stars: 5,
    text: 'Desjob Global helped us build our entire engineering team in under four weeks. Their deep understanding of the Nigerian tech talent market is unmatched. We\'ve made them our go-to recruitment partner.',
  },
  {
    name: 'Fatima Aliyu',
    title: 'Senior Marketing Manager, Lagos',
    avatar: WOMAN_IMG,
    stars: 5,
    text: 'Within two weeks of uploading my CV, I had three interview calls and landed a role that perfectly matched my career goals. The team was professional, responsive, and genuinely invested in my success.',
  },
  {
    name: 'Emeka Chukwu',
    title: 'CEO, Greenfield Properties Ltd',
    avatar: CAREER_IMG,
    stars: 5,
    text: 'Their HR consulting service transformed how we manage our workforce. From policy redesign to payroll compliance, they handled everything with incredible expertise. I highly recommend Desjob Global.',
  },
];

function Badge({ icon: Icon, text }: { icon?: LucideIcon; text: string }) {
  return (
    <span className="badge-base">
      {Icon && <Icon className="badge-icon" />}
      {text}
    </span>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'active' : ''}`}>
      <button
        className="faq-btn"
        onClick={() => setOpen(!open)}
      >
        <span className="faq-q">{q}</span>
        <span className="faq-icon-wrap">
          {open ? <ChevronUp className="faq-icon active" /> : <ChevronDown className="faq-icon" />}
        </span>
      </button>
      {open && (
        <div className="faq-a">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="home-page">
      {/* ── HERO ── */}
      <section className="hero-section">
        {/* Background glow */}
        <div className="hero-bg-glow" />
        
        {/* Decorative dots */}
        {[
          { top: '12%', left: '8%', size: 6, opacity: 0.5 },
          { top: '25%', left: '4%', size: 4, opacity: 0.3 },
          { top: '40%', left: '12%', size: 5, opacity: 0.4 },
          { top: '10%', right: '10%', size: 6, opacity: 0.5 },
          { top: '28%', right: '5%', size: 4, opacity: 0.3 },
          { top: '50%', right: '14%', size: 5, opacity: 0.35 },
        ].map((dot, i) => (
          <div
            key={i}
            className="hero-dot"
            style={{
              top: dot.top,
              left: (dot as any).left,
              right: (dot as any).right,
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity,
            }}
          />
        ))}

        <div className="hero-content">
          <div className="hero-header">
            <div className="hero-badge-wrap">
              <Badge icon={Briefcase} text="Your #1 HR Solutions Partner" />
            </div>

            <h1 className="hero-title">
              Find Top Talent or{' '}
              <span className="hero-title-highlight">Your Dream Job</span>{' '}
              in Nigeria
            </h1>

            <p className="hero-subtitle">
              Desjob Global bridges the gap between exceptional professionals and forward-thinking organisations. Whether you're growing your team or advancing your career, we're your trusted HR partner.
            </p>

            <div className="cta-links">
              <ButtonPrimary text="Hire Top Talent" link="/contact" icon={<ArrowRight className="hero-btn-icon" />} />
              <ButtonSecondary text="Find Your Dream Job" link="/jobs" />
            </div>
          </div>

          {/* Hero image */}
          <div className="hero-img-wrap">
            <div className="hero-img-bg" />
            <img
              src={HERO_IMG}
              alt="Desjob Global professional HR team at work"
              className="hero-img"
            />
            {/* Floating card */}
            <div className="hero-floating-card left">
              <div className="hero-floating-icon-wrap">
                <Users className="hero-floating-icon" />
              </div>
              <div>
                <p className="hero-floating-title">10,000+ Placements</p>
                <p className="hero-floating-subtitle">Across Nigeria & Africa</p>
              </div>
            </div>
            <div className="hero-floating-card right">
              <div className="hero-floating-icon-wrap">
                <Star className="hero-floating-icon" />
              </div>
              <div>
                <p className="hero-floating-title">98% Satisfaction</p>
                <p className="hero-floating-subtitle">From 500+ companies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="trust-bar">
        <div className="container">
          <p className="trust-bar-title">
            Trusted by leading organisations across Nigeria
          </p>
          <div className="trust-logos-wrapper">
            <motion.div
              className="trust-logos-track"
              animate={{ x: ['-50%', '0%'] }}
              transition={{
                repeat: Infinity,
                ease: 'linear',
                duration: 25,
              }}
            >
              {[1, 2].map((groupIndex) => (
                <div key={groupIndex} className="trust-logos-group">
                  {['Zenith Bank', 'MTN Nigeria', 'Dangote Group', 'Flutterwave', 'Access Bank', 'Konga', 'NNPC'].map((co, idx) => (
                    <span key={`${co}-${idx}-${groupIndex}`} className="trust-bar-company">
                      {co}
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="stat-card">
                <div className="stat-icon-wrap">
                  <Icon className="stat-icon" />
                </div>
                <p className="stat-value">{value}</p>
                <p className="stat-label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <Badge icon={Zap} text="OUR SERVICES" />
            <h2 className="section-title services-title" style={{ maxWidth: 640 }}>
              Comprehensive HR Solutions for Every Need
            </h2>
            <p className="section-subtitle services-subtitle" style={{ maxWidth: 560 }}>
              From sourcing the best candidates to building world-class HR systems, we are your end-to-end human capital partner.
            </p>
          </div>

          <div className="services-grid">
            {[
              {
                icon: Repeat,
                title: 'Outsourcing',
                desc: 'Comprehensive outsourcing solutions to handle operational burdens so you can focus on core business objectives.',
              },
              {
                icon: TrendingUp,
                title: 'Training & Development',
                desc: 'Customised learning programmes that upskill your workforce, boost performance, and build a culture of continuous growth.',
              },
              {
                icon: Lightbulb,
                title: 'General Consulting',
                desc: 'Strategic consulting services to optimise overall business processes, boost efficiency, and drive sustainable growth.',
              },
              {
                icon: Package,
                title: 'Supplies',
                desc: 'Reliable procurement and supply chain solutions to ensure your business has the essential materials it needs to function.',
              },
              {
                icon: Target,
                title: 'HR Consulting',
                desc: 'Strategic HR advisory services that help you design high-performing organisational structures and people strategies.',
              },
              {
                icon: Users,
                title: 'Workforce Management',
                desc: 'End-to-end workforce planning, payroll processing, benefits administration, and HR compliance management.',
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="service-card">
                <div className="service-icon-wrap">
                  <Icon className="service-icon" />
                </div>
                <h3 className="service-title">{title}</h3>
                <p className="service-desc">{desc}</p>
              </div>
            ))}
          </div>

          <div className="services-footer">
            <ButtonSecondary
              link="/services"
              text="Explore All Services"
              icon={<ArrowRight className="services-btn-icon" />}
            />
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="why-section">
        <div className="container">
          <div className="why-grid">
            {/* Text */}
            <div>
              <Badge icon={CheckCircle2} text="WHY DESJOB GLOBAL" />
              <h2 className="why-title">
                The HR Partner That Consistently Delivers Results
              </h2>
              <p className="why-text">
                In a market where talent is your greatest competitive advantage, you need an HR partner who truly understands the Nigerian business landscape. With years of deep expertise, we deliver the right people at the right time.
              </p>

              <ul className="why-list">
                {[
                  'Proven track record with 500+ companies across industries',
                  'Deep, localised understanding of the Nigerian job market',
                  'End-to-end recruitment from sourcing to onboarding',
                  'Dedicated account managers for every client',
                  'Industry-specific specialist recruiting teams',
                  'Transparent process with regular progress updates',
                ].map((item, i) => (
                  <li key={i} className="why-list-item">
                    <CheckCircle2 className="why-list-icon" />
                    <span className="why-list-text">{item}</span>
                  </li>
                ))}
              </ul>

              <ButtonPrimary
                link="/about"
                text="Learn About Us"
                icon={<ArrowRight className="why-btn-icon" />}
              />
            </div>

            {/* Image */}
            <div className="why-img-wrapper">
              <div className="why-img-bg" />
              <img
                src={WHY_IMG}
                alt="Desjob Global team collaborating on talent strategies"
                className="why-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="home-process-section">
        <div className="container">
          <div className="home-process-grid flex-reverse">
            {/* Image */}
            <div className="home-process-img-wrap">
              <div className="why-img-bg" />
              <img
                src={HOWIT_IMG}
                alt="Desjob Global recruitment process in action"
                className="home-process-img"
              />
            </div>

            {/* Steps */}
            <div className="home-process-content">
              <Badge icon={Zap} text="HOW WE WORK" />
              <h2 className="home-process-section-title">
                A Simple Process Built for Speed and Precision
              </h2>
              <p className="home-process-section-desc">
                We've refined our approach over hundreds of successful engagements to make hiring and job-hunting as seamless as possible.
              </p>

              <div className="home-process-steps">
                {[
                  {
                    step: '01',
                    title: 'Share Your Requirements',
                    desc: 'Tell us what you\'re looking for, whether it\'s a specific job role or a complete workforce solution. We listen, ask the right questions, and get to work immediately.',
                  },
                  {
                    step: '02',
                    title: 'Expert Matching & Screening',
                    desc: 'Our specialist recruiters leverage deep market knowledge and rigorous evaluation to identify candidates who match your requirements in skills, culture, and ambition.',
                  },
                  {
                    step: '03',
                    title: 'Interview, Hire & Grow',
                    desc: 'We manage interviews, negotiate offers, and support onboarding ensuring a smooth transition for both employers and new hires. Our support doesn\'t stop at placement.',
                  },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="home-process-step">
                    <div className="home-process-step-num-wrap">
                      <span className="home-process-step-num">{step}</span>
                    </div>
                    <div>
                      <h3 className="home-process-step-title">{title}</h3>
                      <p className="home-process-step-desc">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="home-process-footer">
                <ButtonPrimary
                  link="/contact"
                  text="Start the Conversation"
                  icon={<ArrowRight className="why-btn-icon" />}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <Badge icon={Star} text="TESTIMONIALS" />
            <h2 className="section-title testimonials-title" style={{ maxWidth: 620 }}>
              What Our Clients & Candidates Say
            </h2>
            <p className="section-subtitle testimonials-subtitle" style={{ maxWidth: 520 }}>
              Real stories from the companies and professionals we've partnered with to achieve extraordinary outcomes.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map(({ name, title, avatar, stars, text }, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">
                  {Array.from({ length: stars }).map((_, si) => (
                    <Star key={si} className="testimonial-star" />
                  ))}
                </div>
                <p className="testimonial-text">"{text}"</p>
                <div className="testimonial-author">
                  <img
                    src={avatar}
                    alt={name}
                    className="testimonial-avatar"
                  />
                  <div>
                    <p className="testimonial-name">{name}</p>
                    <p className="testimonial-role">{title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            Ready to Transform Your Workforce or Your Career?
          </h2>
          <p className="cta-subtitle" style={{ maxWidth: 560 }}>
            Whether you're an organisation seeking exceptional talent or a professional aiming higher, Desjob Global is ready to make it happen.
          </p>
          <div className="cta-links">
            <ButtonSecondary
              link="/contact"
              text="For Employers"
              icon={<Building2 className="cta-btn-icon" />}
            />
            <ButtonPrimary
              link="/jobs"
              text="Find Jobs"
              icon={<ArrowRight className="cta-btn-icon-right" />}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="home-process-section faq-section">
        <div className="faq-container">
          <div className="section-header">
            <Badge text="FAQ" />
            <h2 className="section-title mt-5 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="section-subtitle mt-4">
              Everything you need to know about working with Desjob Global.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>

          <div className="faq-footer">
            <p className="faq-bottom-text">
              Still have questions?{' '}
              <Link to="/contact" className="faq-link">
                Get in touch with our team →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}