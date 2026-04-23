import './Home.css'
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import {
  ArrowRight, CheckCircle2, Users, TrendingUp, Award, Building2,
  Star, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Search, Briefcase, Target, Heart, Zap,
  Repeat, Lightbulb, Package, Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import ButtonPrimary from '../components/form/ButtonPrimary';
import ButtonSecondary from '../components/form/ButtonSecondary';
import { PARTNERS } from '../../data/DATA';
import IMAGES from '../../data/images';
import WhatsAppIcon from '../components/icons/WhatsappIcon';

const HERO_IMG = 'https://images.unsplash.com/photo-1758519289200-384c7ef2d163?q=80&w=1080&auto=format&fit=crop';
const WHY_IMG = 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?q=80&w=1080&auto=format&fit=crop';
const HOWIT_IMG = 'https://plus.unsplash.com/premium_photo-1661962849568-792fc7c8542b?q=80&w=1080&auto=format&fit=crop';
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
  { value: '30+', label: 'Companies Served', icon: Building2 },
  { value: '30,000+', label: 'Successful Placements', icon: Users },
  { value: '98%', label: 'Client Satisfaction', icon: Award },
  { value: '25+', label: 'Industries Covered', icon: TrendingUp },
];

const testimonials = [
  {
    name: 'Mr Sivanandha Sathananthan',
    title: 'HRM manager (Wellway Nigeria Plastic Industry)',
    avatar: IMAGES.personIcon,
    stars: 5,
    text: 'Desjob Global Limited has been an exceptional recruitment partner. Their deep understanding of the talent market helped us build our technical team seamlessly in record time. Truly world-class service!',
  },
  {
    name: 'Mr Francis Chukwemezie',
    title: 'Senior HRM Manager (CWAY NIGERIA DRINKING WATER LIMITED)',
    avatar: IMAGES.personIcon,
    stars: 5,
    text: 'Partnering with Desjob Global Limited transformed our hiring strategy. Their professional approach to workforce management and swift execution makes them an invaluable HR asset to our company.',
  },
  {
    name: 'Mr Idowu Odogberin',
    title: 'HR Manager (LUCKY FIBRE)',
    avatar: IMAGES.personIcon,
    stars: 5,
    text: 'Their HR consulting and outsourcing services are top-tier. Desjob meticulously handled our recruitment needs with unparalleled expertise, significantly boosting our operational efficiency.',
  },
  {
    name: 'Mrs Koko Taiwo',
    title: 'Head, HRM Manager (EUROMEGA ATLANTIC NIGERIA LIMITED)',
    avatar: IMAGES.personIcon,
    stars: 5,
    text: 'Desjob Global Limited consistently delivers outstanding talent solutions. Their dedication to understanding our company culture ensures we get perfect hires every single time. An absolute game-changer for HR!',
  },
  {
    name: 'Mr Belema Job-Kalio',
    title: 'HRM Manager (SARO AGRO-SCIENCES LIMITED)',
    avatar: IMAGES.personIcon,
    stars: 5,
    text: 'We rely on Desjob Global Limited for all our major recruitment drives. They do not just fill roles; they provide strategic HR guidance that adds immense value to our entire organizational structure.',
  },
  {
    name: 'Mrs Comfort Eyo',
    title: 'Head HRM Manager (CWAY ABUJA)',
    avatar: IMAGES.personIcon,
    stars: 5,
    text: 'The level of professionalism and speed Desjob brings to the table is unmatched. They have streamlined our hiring process, making talent acquisition entirely stress-free and highly effective.',
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
        aria-expanded={open}
        aria-controls={`faq-answer-${q.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <p className="faq-q">{q}</p>
        <span className="faq-icon-wrap">
          {open ? <ChevronUp className="faq-icon active" /> : <ChevronDown className="faq-icon" />}
        </span>
      </button>
      {open && (
        <p className="faq-a" id={`faq-answer-${q.replace(/\s+/g, '-').toLowerCase()}`}>
          {a}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [testimonialIndex]);

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

        <div className="home-hero-content">
          <div className="hero-header">
            <motion.div 
              className="hero-badge-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Badge icon={Briefcase} text="Your #1 HR Solutions Partner" />
            </motion.div>

            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Welcome to{' '}
              <span className="hero-title-highlight">Desjob Global</span>{' '}
              Limited
            </motion.h1>

            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Desjob Global Limited; otherwise known as DGL, is a detailed recruiting, outsourcing, supplying and management service firm. We are a team of experts licensed to operate and trained in every aspect of human resources with a passion in delivering exceptional services.
            </motion.p>


            <motion.p 
              className="hero-subtitle"
              style={{marginTop: 16, fontWeight: "800", fontFamily: "TWK", color: "var(--primary-color)"}}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              info@desjobglobal.com |  +234 90 3099 3292 <br/> 
              <span style={{display: "flex", alignItems: "center", gap: "4px"}}><WhatsAppIcon /> +234 91 3402 0665 </span> 
            </motion.p>

            <motion.div 
              style={{display: "flex", marginTop: "2rem", columnGap: "1rem"}}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ButtonPrimary text="About Us" link="/about" icon={<ArrowRight className="hero-btn-icon" />} />
              <ButtonSecondary text="Contact Us" link="/contact" />
            </motion.div>
          </div>

          {/* Hero image */}
          <div className="hero-img-wrap">
            <div className="hero-img-bg" />
            <img
              src={IMAGES.officePic6}
              alt="Desjob Global Limited professional HR team at work"
              className="hero-img"
            />
            {/* Floating card */}
            <div className="hero-floating-card left">
              <div className="hero-floating-icon-wrap">
                <Users className="hero-floating-icon" />
              </div>
              <div>
                <p className="hero-floating-title">30,000+ Placements</p>
                <p className="hero-floating-subtitle">Across Nigeria & Africa</p>
              </div>
            </div>
            <div className="hero-floating-card right">
              <div className="hero-floating-icon-wrap">
                <Star className="hero-floating-icon" />
              </div>
              <div>
                <p className="hero-floating-title">98% Satisfaction</p>
                <p className="hero-floating-subtitle">From 30+ companies</p>
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
                  {PARTNERS.map((co, idx) => (
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
            {stats.map(({ value, label, icon: Icon }, index) => (
              <motion.div 
                key={label} className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="stat-icon-wrap">
                  <Icon className="stat-icon" />
                </div>
                <p className="stat-value">{value}</p>
                <p className="stat-label">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="about-overview-section">
        <div className="container">
          <div className="about-overview-grid">
            <motion.div
              className="about-overview-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge icon={Building2} text="ABOUT DESJOB GLOBAL" />
              <h2 className="about-overview-title">
                About Us
              </h2>
              <p className="about-overview-text">
                Desjob Global Limited works with organisations that need dependable human resource support across recruitment, staffing, background checks, training and development, payroll administration, and related outsourcing services.
              </p>
              <p className="about-overview-text">
                Our approach focuses on helping clients maintain structured workplace practices, support employee performance, and keep people operations aligned with business goals.
              </p>

              <div className="about-overview-points">
                {[
                  'Recruitment and staffing support for different workforce needs.',
                  'Background checks, induction, and orientation for smoother onboarding.',
                  'Training, development, and payroll administration as part of broader HR support.',
                  'A steady focus on client feedback and continuous improvement in service delivery.',
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="about-overview-point"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                  >
                    <CheckCircle2 className="about-overview-point-icon" />
                    <span className="about-overview-point-text">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="about-overview-image-wrap"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="about-overview-image-bg" />
              <img
                src={IMAGES.officePic4}
                alt="Desjob Global Limited office team during a meeting"
                className="about-overview-image"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="purpose-section">
        <div className="container">
          <div className="section-header">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge text="PURPOSE & DIRECTION" />
            </motion.div>
            <motion.h2 
              className="purpose-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              What Drives Everything We Do
            </motion.h2>
          </div>

          <div className="purpose-grid">
            {/* Mission */}
            <motion.div 
              className="mission-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="mission-icon-wrap">
                <Target className="mission-icon" />
              </div>
              <h3 className="mission-card-title">Our Mission</h3>
              <p className="mission-desc">
                Our mission is to drive efficiency for clients by relieving them of possible distractions from their core businesses.
              </p>
              <div className="mission-list">
                {['Relieve clients of operational distractions', 'Drive efficiency across business functions', 'Enable focus on core objectives'].map((item, i) => (
                  <motion.div 
                    key={item} className="mission-list-item"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) }}
                  >
                    <CheckCircle2 className="mission-list-icon" />
                    <span className="mission-list-text">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div 
              className="vision-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="vision-icon-wrap">
                <Eye className="vision-icon" />
              </div>
              <h3 className="vision-card-title">Our Vision</h3>
              <p className="vision-desc">
                To be the human capital partner of choice in Africa, delivering exceptional value through insight, innovation, and integrity.
              </p>
              <div className="vision-list">
                {['Preferred partner across Africa', 'Driving innovation in HR tech', 'Building sustainable workforce legacies'].map((item, i) => (
                  <motion.div 
                    key={item} className="vision-list-item"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) }}
                  >
                    <CheckCircle2 className="vision-list-icon" />
                    <span className="vision-list-text">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge icon={Zap} text="OUR SERVICES" />
            </motion.div>
            <motion.h2 
              className="section-title services-title" 
              style={{ maxWidth: 640 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Comprehensive HR Solutions for Every Need
            </motion.h2>
            <motion.p 
              className="section-subtitle services-subtitle" 
              style={{ maxWidth: 560 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              From sourcing the best candidates to building world-class HR systems, we are your end-to-end human capital partner.
            </motion.p>
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
              <motion.div 
                key={i} className="service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                <div className="service-icon-wrap">
                  <Icon className="service-icon" />
                </div>
                <h3 className="service-title">{title}</h3>
                <p className="service-desc">{desc}</p>
              </motion.div>
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
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge icon={CheckCircle2} text="BENEFITS TO YOU" />
              <h2 className="why-title">
                The benefits of using our Outsourcing recruitment process services
              </h2>
              <p className="why-text">
                With years of deep expertise, we deliver the right people at the right time.
              </p>

              <ul className="why-list">
                {[
                  'We will help you translate fixed cost into variable cost.',
                  'Access to a ready/steady man-power.',
                  'We will help you promptly access markets currently unavailable as we are able to deploy nationwide.',
                  'We will take away the challenges of man power planning.',
                  'We will give you the well needed relief from endless paper work.',
                  'We will also help you to well reduce and manage operational cost.',
                  'We will also improve and motivate employee relations.',
                  'We will also guarantee all our staffs in case any problem occurs.',
                ].map((item, i) => (
                  <motion.li 
                    key={i} className="why-list-item"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <CheckCircle2 className="why-list-icon" />
                    <span className="why-list-text">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div style={{ marginTop: '2rem' }}>
                <ButtonPrimary
                  link="/about"
                  text="Learn About Us"
                  icon={<ArrowRight className="why-btn-icon" />}
                />
              </div>
            </motion.div>

            {/* Image */}
            <motion.div 
              className="why-img-wrapper"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="why-img-bg" />
              <img
                src={IMAGES.companyWorkers1}
                alt="Desjob Global Limited team collaborating on talent strategies"
                className="why-img"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section">
        <motion.div 
          className="cta-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="cta-title">
            Ready to Transform Your Workforce or Your Career?
          </h2>
          <p className="cta-subtitle" style={{ maxWidth: 560 }}>
            Whether you're an organisation seeking exceptional talent or a professional aiming higher, Desjob Global Limited is ready to make it happen.
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
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="home-process-section faq-section">
        <div className="faq-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge text="FAQ" />
            <h2 className="section-title mt-5 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="section-subtitle mt-4">
              Everything you need to know about working with Desjob Global Limited.
            </p>
          </motion.div>

          <motion.div 
            className="faq-list"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>

          <motion.div 
            className="faq-footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="faq-bottom-text">
              Still have questions?{' '}
              <Link to="/contact" className="faq-link">
                Get in touch with our team →
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
