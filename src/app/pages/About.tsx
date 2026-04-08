import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { LucideIcon } from 'lucide-react';
import {
  ArrowRight, CheckCircle2, Eye, Target, Heart, Shield, Zap, Users, Award, Star, Briefcase, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import './About.css';
import ButtonPrimary from '../components/form/ButtonPrimary';
import ButtonSecondary from '../components/form/ButtonSecondary';

const STORY_IMG = 'https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjB0ZWFtJTIwbWVldGluZyUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzczODk3MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080';
const VALUES_IMG = 'https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIUiUyMGNvbnN1bHRpbmclMjBzdHJhdGVneSUyMHdvcmtwbGFjZXxlbnwxfHx8fDE3NzQwMjM1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080';

import okorieImg from '../assets/img/employees/Okorie-Godswill-Ifeanyichukwu.jpeg';
import dadaImg from '../assets/img/employees/Dada-Olorunfemi.jpeg';
import lawalImg from '../assets/img/employees/Lawal-Olamilekan.jpeg';
import adenijiImg from '../assets/img/employees/Adeniji-Adedayo.jpeg';
import alkaliImg from '../assets/img/employees/Alkali-Saure-Kelvin.jpeg';
import victoryImg from '../assets/img/employees/Victory-Idam-Okocha.jpeg';
import ojetolaImg from '../assets/img/employees/Ojetola-Ifeoluwa-Elizabeth.jpeg';
import imphonopiImg from '../assets/img/employees/Imphonopi-Esther-Odufuwa.jpeg';
import amelokoImg from '../assets/img/employees/Ameloko-Joshua.jpeg';
import adegbiteImg from '../assets/img/employees/Adegbite-babajide.jpeg';
import IMAGES from '../../data/images';

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
  { name: 'Okorie Godswill Ifeanyichukwu', title: 'HR Supervisor - CWAY NIGERIA', location: 'Lagos State', img: okorieImg },
  { name: 'Dada Olorunfemi Ayomide', title: 'HR Supervisor - CWAY FOOD & BEVERAGES', location: 'Shagamu, Ogun State', img: dadaImg },
  { name: 'Lawal Olamilekan', title: 'HR Supervisor - WELLWAY PLASTIC LIMITED', location: 'Shagamu, Ogun State', img: lawalImg },
  { name: 'Adeniji Adedayo Q.', title: 'HR Supervisor - CWAY FOOD & BEVERAGES', location: 'Otta, Ogun State', img: adenijiImg },
  { name: 'Alkali Saure Kelvin', title: 'HR Supervisor - CWAY', location: 'Abuja', img: alkaliImg },
  { name: 'Victory Idam Okocha', title: 'Front Desk Administrator', location: '', img: victoryImg },
  { name: 'Ojetola Ifeoluwa Elizabeth', title: 'Assistant HR/Admin Manager', location: '', img: ojetolaImg },
  { name: 'Imphonopi Esther Odufuwa', title: 'Admin/HR Manager', location: '', img: imphonopiImg },
  { name: 'Ameloko Joshua', title: 'HR Supervisor - SARO AGRO-SCIENCE LTD', location: 'Magboro, Ogun State', img: amelokoImg },
  { name: 'Adegbite Babajide. Z', title: 'Field Coordinator Officer.', location: 'Otta, Ogun State', img: adegbiteImg }
];

export default function About() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % teamMembers.length);
  };
  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % teamMembers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeSlide]);

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
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            At Desjob Global Limited, we believe that the right people in the right roles change everything. Since our founding, we've been on a mission to transform how Nigerian businesses attract, develop, and retain exceptional talent.
          </motion.p>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge icon={Star} text="OUR STORY" />
              <h2 className="section-title">
                Born from a Passion for People and Purpose
              </h2>
              <div className="story-text">
                <p>
                  Desjob Global Limited was founded with a singular vision: to bridge the widening gap between outstanding talent and the organisations that need them most in Nigeria and across Africa.
                </p>
                <p>
                  We built Desjob Global Limited differently combining human insight with modern technology, deep industry expertise with genuine personal attention. Today, we are proud to be the preferred HR partner for hundreds of organisations, from promising startups to Fortune 500 subsidiaries operating in Nigeria.
                </p>
                <p>
                  Our work isn't just about filling vacancies. It's about fuelling ambitions, building legacies, and shaping the future of work in Nigeria.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="story-img-wrap"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="img-glow" />
              <img
                src={IMAGES.officePic1}
                alt="Desjob Global Limited team collaborating"
                className="story-img"
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

      {/* ── CORE VALUES ── */}
      <section className="values-section">
        <div className="container">
          <div className="values-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge icon={Heart} text="OUR CORE VALUES" />
              <h2 className="section-title">
                The Principles That Guide Every Decision We Make
              </h2>
              <p className="values-subtitle">
                Our values aren't framed on office walls they're lived in every conversation, every placement, and every piece of advice we give.
              </p>

              <div className="values-cards-grid">
                {coreValues.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div 
                    key={title} className="value-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                  >
                    <div className="value-icon-wrap">
                      <Icon className="value-icon" />
                    </div>
                    <h4 className="value-card-title">{title}</h4>
                    <p className="value-card-desc">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="values-img-wrap"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="img-glow" />
              <img
                src={VALUES_IMG}
                alt="Desjob Global Limited values in action"
                className="values-img"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge icon={Users} text="MEET THE TEAM" />
            </motion.div>
            <motion.h2 
              className="team-title section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The People Behind Your Success
            </motion.h2>
            <motion.p 
              className="team-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Our team of seasoned HR professionals brings deep expertise, genuine passion, and an unwavering commitment to your outcomes.
            </motion.p>
          </div>

          <div className="team-carousel-wrapper">
            <button 
              className="team-carousel-btn prev" 
              onClick={prevSlide}
              aria-label="Previous team member"
            >
              <ChevronLeft />
            </button>
            <button 
              className="team-carousel-btn next" 
              onClick={nextSlide}
              aria-label="Next team member"
            >
              <ChevronRight />
            </button>

            <div className="team-carousel-viewport" style={{ height: '520px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {teamMembers.map(({ name, title, location, img }, i) => {
                const offset = i - activeSlide;
                const absOffset = Math.abs(offset);
                const isActive = offset === 0;
                
                return (
                  <motion.div 
                    key={i} 
                    className="team-slide-fancy-wrap"
                    animate={{
                      x: `calc(${offset} * var(--team-slide-offset))`,
                      scale: isActive ? 1 : Math.max(0.7, 1 - absOffset * 0.15),
                      opacity: absOffset > 2 ? 0 : isActive ? 1 : 0.4,
                      zIndex: teamMembers.length - absOffset,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 30 }}
                  >
                    <div className="team-card-fancy">
                      <div className="team-img-wrapper">
                         <img src={img} alt={name} className="team-img-fancy" style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)' }} />
                         <div className="team-img-overlay" />
                      </div>
                      <div className="team-info-fancy">
                        <motion.h3 
                          className="team-name"
                          animate={{ 
                            x: isActive ? 0 : offset * 250, 
                            opacity: isActive ? 1 : 0 
                          }}
                          transition={{ ease: "linear", duration: 0.8 }}
                        >
                          {name}
                        </motion.h3>
                        <motion.p 
                          className="team-role"
                          animate={{ 
                            x: isActive ? 0 : offset * 350, 
                            opacity: isActive ? 1 : 0 
                          }}
                          transition={{ ease: "linear", duration: 0.8 }}
                        >
                          {title}
                        </motion.p>
                        {location && (
                          <motion.p 
                            className="team-location"
                            animate={{ 
                              y: isActive ? 0 : 10, 
                              opacity: isActive ? 1 : 0 
                            }}
                            transition={{ ease: "linear", duration: 0.8 }}
                          >
                            <span style={{ marginRight: '4px' }}>📍</span> {location}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="team-carousel-dots">
              {teamMembers.map((_, i) => (
                <button 
                  key={i} 
                  className={`team-carousel-dot ${i === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <motion.div 
          className="cta-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="cta-title">
            Ready to Work With Us?
          </h2>
          <p className="cta-subtitle">
            Whether you're looking to hire the right talent or find the right opportunity, we're here to help. Reach out and let's have a conversation.
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
        </motion.div>
      </section>
    </div>
  );
}