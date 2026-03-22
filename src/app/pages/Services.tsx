import { Link } from 'react-router';
import { LucideIcon } from 'lucide-react';
import {
  ArrowRight, Search, Target, Award, Users, TrendingUp, Shield,
  CheckCircle2, Briefcase, Building2, Zap, Star
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
    id: 'talent-acquisition',
    badge: 'TALENT ACQUISITION',
    icon: Search,
    title: 'Recruitment That Finds the Right Fit — Every Time',
    desc: 'Our talent acquisition service is built on precision. We go beyond matching CVs to job descriptions; we find professionals whose skills, values, and ambitions align with your organisation\'s culture and long-term goals.',
    points: [
      'End-to-end recruitment management',
      'Multi-channel candidate sourcing',
      'Competency-based assessments',
      'Background & reference checks',
      'Offer management & onboarding support',
    ],
    img: RECRUIT_IMG,
    reverse: false,
  },
  {
    id: 'hr-consulting',
    badge: 'HR CONSULTING',
    icon: Target,
    title: 'Strategic HR Advisory That Transforms Organisations',
    desc: 'Your people strategy is the foundation of your business performance. Our HR consulting practice partners with leadership teams to design, implement, and optimise the HR systems that attract, develop, and retain top talent.',
    points: [
      'HR strategy & policy development',
      'Organisational design & restructuring',
      'Performance management frameworks',
      'Employee engagement programmes',
      'HR compliance & labour law advisory',
    ],
    img: CONSULT_IMG,
    reverse: true,
  },
  {
    id: 'executive-search',
    badge: 'EXECUTIVE SEARCH',
    icon: Award,
    title: 'Identifying Leaders Who Drive Transformational Growth',
    desc: 'At the C-suite and senior leadership level, the cost of a wrong hire is immeasurable. Our executive search practice combines deep market intelligence, discreet outreach, and rigorous evaluation to identify only the most exceptional candidates for your most critical roles.',
    points: [
      'Confidential search & outreach',
      'Leadership competency profiling',
      'Market mapping & competitor intelligence',
      'Board-level & C-suite placements',
      'Post-placement integration support',
    ],
    img: EXEC_IMG,
    reverse: false,
  },
  {
    id: 'workforce-management',
    badge: 'WORKFORCE MANAGEMENT',
    icon: Users,
    title: 'Seamless Workforce Management from Hire to Retire',
    desc: 'Managing a workforce is complex — payroll, compliance, benefits, contracts, and more. We take these operational burdens off your plate so your leadership team can focus on strategy and growth.',
    points: [
      'Payroll processing & management',
      'Employment contract administration',
      'Benefits & compensation planning',
      'HR compliance & regulatory filings',
      'Employee records management',
    ],
    img: WORKFORCE_IMG,
    reverse: true,
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
    reverse: false,
  },
  {
    id: 'background-checks',
    badge: 'BACKGROUND VERIFICATION',
    icon: Shield,
    title: 'Protect Your Organisation With Thorough Verification',
    desc: 'In today\'s complex hiring environment, knowing exactly who you\'re bringing into your organisation is non-negotiable. Our comprehensive background screening services give you the confidence to hire with certainty.',
    points: [
      'Academic qualification verification',
      'Employment history confirmation',
      'Professional licence validation',
      'Criminal record screening',
      'Credit & financial background checks',
    ],
    img: SEARCH_IMG,
    reverse: true,
  },
];

const industries = [
  'Technology & Fintech', 'Banking & Finance', 'Oil & Gas', 'Healthcare & Pharma',
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
          <div className="cta-links" style={{ justifyContent: 'flex-start', marginTop: '2rem' }}>
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
              {/* Text — conditionally first or second */}
              <div className={service.reverse ? 'order-second-1024' : 'order-first-1024'}>
                <Badge icon={service.icon} text={service.badge} />
                <h2 className="service-title">
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

              {/* Image — conditionally first or second */}
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
          <ButtonSecondary
            link="/contact"
            text="Book a Free Consultation"
            icon={<ArrowRight className="cta-btn-icon" />}
          />
        </div>
      </section>
    </div>
  );
}