import { Link } from 'react-router';
import { LucideIcon } from 'lucide-react';
import {
  ArrowRight, Search, Target, Award, Users, TrendingUp, Shield,
  CheckCircle2, Briefcase, Building2, Zap, Star, Repeat, Lightbulb, Package
} from 'lucide-react';
import './Services.css';
import ButtonPrimary from '../components/form/ButtonPrimary';
import ButtonSecondary from '../components/form/ButtonSecondary';

const RECRUIT_IMG = 'https://images.unsplash.com/photo-1762330466678-45b42e02f5a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNydWl0bWVudCUyMGhpcmluZyUyMHRhbGVudCUyMGFjcXVpc2l0aW9ufGVufDF8fHx8MTc3NDAyMzU2MHww&ixlib=rb-4.1.0&q=80&w=1080';
const CONSULT_IMG = 'https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIUiUyMGNvbnN1bHRpbmclMjBzdHJhdGVneSUyMHdvcmtwbGFjZXxlbnwxfHx8fDE3NzQwMjM1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080';
const EXEC_IMG = 'https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2IlMjBpbnRlcnZpZXclMjBwcm9mZXNzaW9uYWwlMjBoYW5kc2hha2V8ZW58MXx8fHwxNzc0MDIzNTU2fDA&ixlib=rb-4.1.0&q=80&w=1080';
const WORKFORCE_IMG = 'https://images.unsplash.com/photo-1655720348616-184ae7fad7e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWxzJTIwd29ya2luZyUyMGxhcHRvcHxlbnwxfHx8fDE3NzQwMjM1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080';
const TRAINING_IMG = 'https://images.unsplash.com/photo-1744853930655-52d02b83abb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXBsb3llZSUyMG9uYm9hcmRpbmclMjB0cmFpbmluZyUyMGNvbXBhbnklMjBjdWx0dXJlfGVufDF8fHx8MTc3NDAyMzU2NXww&ixlib=rb-4.1.0&q=80&w=1080';
const SEARCH_IMG = 'https://images.unsplash.com/photo-1758520144417-e1c432042dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2IlMjBzZWFyY2glMjByZXN1bWUlMjBjYXJlZXIlMjBvcHBvcnR1bml0eXxlbnwxfHx8fDE3NzQwMjM1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080';

function Badge({ icon: Icon, text }: { icon?: LucideIcon; text: string }) {
  return (
    <span className="badge-base">
      {Icon && <Icon className="badge-icon" />}
      {text}
    </span>
  );
}

const services = [
  {
    id: 'outsourcing',
    badge: 'OUTSOURCING',
    icon: Repeat,
    title: 'Comprehensive Outsourcing Solutions to Streamline Operations',
    desc: 'We provide end-to-end outsourcing solutions, allowing you to focus on your core business objectives while we handle the critical support functions that keep your organisation running smoothly.',
    points: [
      'Business process outsourcing',
      'Contract staffing solutions',
      'Project-based talent deployment',
      'Operational support services',
      'Administrative task delegation',
    ],
    img: RECRUIT_IMG,
    reverse: false,
  },
  {
    id: 'training-development',
    badge: 'TRAINING & DEVELOPMENT',
    icon: TrendingUp,
    title: 'Building the Skills Your Organisation Needs to Win',
    desc: 'Hiring great people is just the beginning. Our employee training and development programmes are designed to unlock the full potential of your workforce, building the capabilities that drive competitive advantage.',
    points: [
      'Customised learning needs analysis',
      'Leadership development programmes',
      'Technical & soft skills training',
      'Team building & culture workshops',
      'E-learning & blended learning solutions',
    ],
    img: TRAINING_IMG,
    reverse: true,
  },
  {
    id: 'general-consulting',
    badge: 'GENERAL CONSULTING',
    icon: Lightbulb,
    title: 'Strategic Consulting to Drive Organisational Efficiency',
    desc: 'Our consulting services are targeted at optimising your overall business processes, boosting efficiency, and driving sustainable growth in a rapidly changing market environment.',
    points: [
      'Process improvement strategies',
      'Business expansion planning',
      'Operational efficiency analysis',
      'Change management support',
      'Organisational restructuring',
    ],
    img: CONSULT_IMG,
    reverse: false,
  },
  {
    id: 'supplies',
    badge: 'SUPPLIES',
    icon: Package,
    title: 'Reliable Procurement and Supply Chain Solutions',
    desc: 'We offer dependable procurement and supply services to ensure your business always has the essential materials and equipment it needs to function without costly interruptions.',
    points: [
      'General office supplies',
      'Equipment procurement and leasing',
      'Vendor management',
      'Inventory control solutions',
      'Logistics and delivery support',
    ],
    img: WORKFORCE_IMG,
    reverse: true,
  },
  {
    id: 'hr-consulting',
    badge: 'HR CONSULTING',
    icon: Target,
    title: 'Strategic HR Advisory That Transforms Organisations',
    desc: 'Your people strategy is the foundation of your business performance. Our HR consulting practice partners with leadership teams to design, implement, and optimise HR systems that attract, develop, and retain top talent.',
    points: [
      'HR strategy & policy development',
      'Performance management frameworks',
      'Employee engagement programmes',
      'HR compliance & labour law advisory',
      'Compensation & benefits consulting',
    ],
    img: EXEC_IMG,
    reverse: false,
  },
  {
    id: 'workforce-management',
    badge: 'WORKFORCE MANAGEMENT',
    icon: Users,
    title: 'Seamless Workforce Management from Hire to Retire',
    desc: 'Managing a workforce is complex payroll, compliance, benefits, contracts, and more. We take these operational burdens off your plate so your leadership team can focus on strategy and growth.',
    points: [
      'Payroll processing & management',
      'Employment contract administration',
      'Benefits & compensation planning',
      'HR compliance & regulatory filings',
      'Employee records management',
    ],
    img: SEARCH_IMG,
    reverse: true,
  },
];

const industries = [
  'Technology & Fintech', 'Banking & Finance', 'Healthcare & Pharma',
  'FMCG & Retail', 'Telecommunications', 'Manufacturing', 'Real Estate & Construction',
  'Media & Creative', 'Education', 'Logistics & Supply Chain', 'Hospitality',
];

export default function Services() {
  return (
    <div className="services-page">
      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-bg-glow" />
        <div className="hero-content">
          <Badge icon={Briefcase} text="OUR SERVICES" />
          <h1 className="hero-title">
            Powerful HR Solutions to Fuel Your Growth
          </h1>
          <p className="hero-subtitle">
            From recruitment to consulting to compliance, Desjob Global offers a comprehensive suite of HR services designed to help Nigerian businesses compete, grow, and thrive.
          </p>
          <div className="cta-links">
            <ButtonPrimary
              link="/contact"
              text="Discuss Your Needs"
              icon={<ArrowRight className="hero-btn-icon" />}
            />
            <ButtonSecondary
              link="/jobs"
              text="Browse Open Jobs"
            />
          </div>
        </div>
      </section>

      {/* ── SERVICES ALTERNATING SECTIONS ── */}
      {services.map((service, idx) => (
        <section
          key={service.id}
          className={idx % 2 === 0 ? 'service-section' : 'service-section-alt'}
        >
          <div className="container">
            <div className="service-grid">
              {/* Text conditionally first or second */}
              <div className={service.reverse ? 'order-second-1024' : 'order-first-1024'}>
                <Badge icon={service.icon} text={service.badge} />
                <h2 className="service-section-title">
                  {service.title}
                </h2>
                <p className="service-desc">
                  {service.desc}
                </p>
                <ul className="service-list">
                  {service.points.map((point) => (
                    <li key={point} className="service-list-item">
                      <CheckCircle2 className="service-check-icon" />
                      <span className="service-list-text">{point}</span>
                    </li>
                  ))}
                </ul>
                <ButtonPrimary
                  link="/contact"
                  text="Get Started"
                  icon={<ArrowRight className="service-btn-icon" />}
                />
              </div>

              {/* Image conditionally first or second */}
              <div className={`service-img-wrap ${service.reverse ? 'order-first-1024' : 'order-second-1024'}`}>
                <div className="img-glow" />
                <img
                  src={service.img}
                  alt={service.title}
                  className="service-img"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── INDUSTRIES ── */}
      <section className="industries-section">
        <div className="container">
          <div className="industries-header">
            <Badge icon={Building2} text="INDUSTRIES WE SERVE" />
            <h2 className="industries-title">
              Expertise Across Every Major Sector
            </h2>
            <p className="industries-subtitle">
              Our specialist teams bring sector-specific knowledge to ensure every placement is truly the right fit for your industry.
            </p>
          </div>

          <div className="industries-list">
            {industries.map((industry) => (
              <span key={industry} className="industry-tag">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="process-section">
        <div className="container">
          <div className="process-header">
            <Badge icon={Zap} text="OUR PROCESS" />
            <h2 className="process-title">
              How We Deliver Results That Last
            </h2>
          </div>

          <div className="process-grid">
            {[
              { step: '01', title: 'Consultation', desc: 'We begin with a deep-dive conversation to understand your exact needs, culture, and success metrics.' },
              { step: '02', title: 'Strategy & Search', desc: 'We develop a targeted search strategy and leverage our extensive talent network to identify the best candidates.' },
              { step: '03', title: 'Evaluation & Screening', desc: 'Candidates undergo thorough assessments, interviews, and background checks before we present a shortlist.' },
              { step: '04', title: 'Placement & Support', desc: 'We manage offer negotiations, onboarding logistics, and provide ongoing support to ensure a successful transition.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="process-step-card">
                <div className="process-step-num-wrap">
                  <span className="process-step-num">{step}</span>
                </div>
                <h3 className="process-step-title">{title}</h3>
                <p className="process-step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-container">
          <Badge icon={Star} text="START TODAY" />
          <h2 className="cta-title">
            Ready to Build Your Dream Team?
          </h2>
          <p className="cta-subtitle">
            Let Desjob Global take the complexity out of hiring and HR management. Contact our team today for a no-obligation consultation.
          </p>
          <div className='cta-links'>
            <ButtonSecondary
              link="/contact"
              text="Book a Free Consultation"
              icon={<ArrowRight className="cta-btn-icon" />}
            />
          </div>
        </div>
      </section>
    </div>
  );
}