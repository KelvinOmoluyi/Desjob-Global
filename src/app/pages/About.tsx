import { Link } from 'react-router';
import { LucideIcon } from 'lucide-react';
import {
  ArrowRight, CheckCircle2, Eye, Target, Heart, Shield, Zap, Users, Award, Star, Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import './About.css';
import ButtonPrimary from '../components/form/ButtonPrimary';
import ButtonSecondary from '../components/form/ButtonSecondary';

const STORY_IMG = 'https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjB0ZWFtJTIwbWVldGluZyUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzczODk3MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080';
const TEAM1_IMG = 'https://images.unsplash.com/photo-1760543998147-117ae5649c5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGV4ZWN1dGl2ZSUyMHBvcnRyYWl0JTIwc21pbGluZ3xlbnwxfHx8fDE3NzM5NDYyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080';
const TEAM2_IMG = 'https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBleGVjdXRpdmUlMjBwb3J0cmFpdCUyMG9mZmljZXxlbnwxfHx8fDE3NzQwMjM1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080';
const TEAM3_IMG = 'https://images.unsplash.com/photo-1655720348616-184ae7fad7e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWxzJTIwd29ya2luZyUyMGxhcHRvcHxlbnwxfHx8fDE3NzQwMjM1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080';
const VALUES_IMG = 'https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIUiUyMGNvbnN1bHRpbmclMjBzdHJhdGVneSUyMHdvcmtwbGFjZXxlbnwxfHx8fDE3NzQwMjM1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080';

function Badge({ icon: Icon, text }: { icon?: LucideIcon; text: string }) {
  return (
    <span className="badge-base">
      {Icon && <Icon className="badge-icon" />}
      {text}
    </span>
  );
}

const coreValues = [
  { icon: Shield, title: 'Integrity', desc: 'We build every relationship with clients and candidates on a foundation of honesty, transparency, and trust.' },
  { icon: Award, title: 'Excellence', desc: 'Good enough is never enough. We pursue the highest standards in every placement, every advisory session, every interaction.' },
  { icon: Zap, title: 'Innovation', desc: 'We leverage modern recruitment technology and fresh thinking to stay ahead of market trends and deliver smarter solutions.' },
  { icon: Heart, title: 'People-First', desc: 'People are at the heart of everything we do. We treat every candidate and client with empathy, respect, and genuine care.' },
  { icon: Target, title: 'Results-Driven', desc: 'We measure our success by yours. Our focus is on delivering measurable, meaningful results that move your organisation forward.' },
  { icon: Users, title: 'Partnership', desc: 'We don\'t just fill roles we build long-term partnerships. Your growth is our growth, and we\'re with you every step of the way.' },
];

const teamMembers = [
  {
    name: 'Chidinma Obi',
    title: 'Founder & CEO',
    bio: 'A seasoned HR professional with 15+ years of experience transforming organisations through strategic talent management across West Africa.',
    img: TEAM1_IMG,
  },
  {
    name: 'Segun Adeyemi',
    title: 'Head of Recruitment',
    bio: 'Segun leads our talent acquisition team with a data-driven approach that has placed over 3,000 professionals in roles perfectly matched to their potential.',
    img: TEAM2_IMG,
  },
  {
    name: 'Amara Nwosu',
    title: 'Director, HR Consulting',
    bio: 'A certified HR strategist who has helped 200+ Nigerian organisations redesign their people operations for maximum efficiency and employee engagement.',
    img: TEAM3_IMG,
  },
];

export default function About() {
  return (
    <div className="about-page">
      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-bg-glow" />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Badge icon={Briefcase} text="ABOUT DESJOB GLOBAL" />
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your Trusted HR Partner in Nigeria
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            At Desjob Global, we believe that the right people in the right roles change everything. Since our founding, we've been on a mission to transform how Nigerian businesses attract, develop, and retain exceptional talent.
          </motion.p>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div>
              <Badge icon={Star} text="OUR STORY" />
              <h2 className="section-title">
                Born from a Passion for People and Purpose
              </h2>
              <div className="story-text">
                <p>
                  Desjob Global was founded with a singular vision: to bridge the widening gap between outstanding talent and the organisations that need them most in Nigeria and across Africa.
                </p>
                <p>
                  We built Desjob Global differently combining human insight with modern technology, deep industry expertise with genuine personal attention. Today, we are proud to be the preferred HR partner for hundreds of organisations, from promising startups to Fortune 500 subsidiaries operating in Nigeria.
                </p>
                <p>
                  Our work isn't just about filling vacancies. It's about fuelling ambitions, building legacies, and shaping the future of work in Nigeria.
                </p>
              </div>
            </div>
            <div className="story-img-wrap">
              <div className="img-glow" />
              <img
                src={STORY_IMG}
                alt="Desjob Global team collaborating"
                className="story-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="purpose-section">
        <div className="container">
          <div className="section-header">
            <Badge text="PURPOSE & DIRECTION" />
            <h2 className="purpose-title">
              What Drives Everything We Do
            </h2>
          </div>

          <div className="purpose-grid">
            {/* Mission */}
            <div className="mission-card">
              <div className="mission-icon-wrap">
                <Target className="mission-icon" />
              </div>
              <h3 className="mission-card-title">Our Mission</h3>
              <p className="mission-desc">
                Our mission is to drive efficiency for clients by relieving them of possible distractions from their core businesses.
              </p>
              <div className="mission-list">
                {['Relieve clients of operational distractions', 'Drive efficiency across business functions', 'Enable focus on core objectives'].map((item) => (
                  <div key={item} className="mission-list-item">
                    <CheckCircle2 className="mission-list-icon" />
                    <span className="mission-list-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="vision-card">
              <div className="vision-icon-wrap">
                <Eye className="vision-icon" />
              </div>
              <h3 className="vision-card-title">Our Vision</h3>
              <p className="vision-desc">
                Our vision is to become a key player in the business support service industry in the Nigeria Economy.
              </p>
              <div className="vision-list">
                {['Key player in business support', 'Recognised across the Nigerian economy', 'Trusted partner for exponential growth'].map((item) => (
                  <div key={item} className="vision-list-item">
                    <CheckCircle2 className="vision-list-icon" />
                    <span className="vision-list-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="values-section">
        <div className="container">
          <div className="values-grid">
            <div>
              <Badge icon={Heart} text="OUR CORE VALUES" />
              <h2 className="section-title">
                The Principles That Guide Every Decision We Make
              </h2>
              <p className="values-subtitle">
                Our values aren't framed on office walls they're lived in every conversation, every placement, and every piece of advice we give.
              </p>

              <div className="values-cards-grid">
                {coreValues.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="value-card">
                    <div className="value-icon-wrap">
                      <Icon className="value-icon" />
                    </div>
                    <h4 className="value-card-title">{title}</h4>
                    <p className="value-card-desc">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="values-img-wrap">
              <div className="img-glow" />
              <img
                src={VALUES_IMG}
                alt="Desjob Global values in action"
                className="values-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <Badge icon={Users} text="MEET THE TEAM" />
            <h2 className="team-title section-title">
              The People Behind Your Success
            </h2>
            <p className="team-subtitle">
              Our team of seasoned HR professionals brings deep expertise, genuine passion, and an unwavering commitment to your outcomes.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map(({ name, title, bio, img }) => (
              <div key={name} className="team-card">
                <img
                  src={img}
                  alt={name}
                  className="team-img"
                />
                <div className="team-info">
                  <h3 className="team-name">{name}</h3>
                  <p className="team-role">{title}</p>
                  <p className="team-bio">{bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            Partner With Nigeria's Most Trusted HR Firm
          </h2>
          <p className="cta-subtitle">
            Join hundreds of organisations and thousands of professionals who have transformed their futures with Desjob Global.
          </p>
          <div className="cta-links">
            <ButtonPrimary
              link="/contact"
              text="Get in Touch"
              icon={<ArrowRight className="cta-btn-icon" />}
            />
            <ButtonSecondary
              link="/services"
              text="Explore Services"
            />
          </div>
        </div>
      </section>
    </div>
  );
}