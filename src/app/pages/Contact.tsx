import React, { useState, useRef } from 'react';
import { Link } from 'react-router';
import { LucideIcon } from 'lucide-react';
import {
  Mail, Phone, MapPin, Clock, Upload, Building2, User,
  Send, CheckCircle, ArrowRight, Briefcase, ChevronDown, RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';
import './Contact.css';
import ButtonPrimary from '../components/form/ButtonPrimary';
import ButtonSecondary from '../components/form/ButtonSecondary';
import { publicApi } from '../api/publicApi';

function Badge({ icon: Icon, text }: { icon?: LucideIcon; text: string }) {
  return (
    <span className="badge-base">
      {Icon && <Icon className="badge-icon" />}
      {text}
    </span>
  );
}

function InputField({
  label, type = 'text', name, value, onChange, placeholder, required, children
}: {
  label: string; type?: string; name: string; value?: string; onChange?: (e: any) => void;
  placeholder?: string; required?: boolean; children?: React.ReactNode;
}) {
  const id = `input-${name}`;
  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {label} {required && <span className="input-required" aria-hidden="true">*</span>}
      </label>
      {children || (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          aria-required={required}
          className="input-field"
        />
      )}
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, placeholder, required, rows = 4 }: {
  label: string; name: string; value?: string; onChange?: (e: any) => void;
  placeholder?: string; required?: boolean; rows?: number;
}) {
  const id = `textarea-${name}`;
  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {label} {required && <span className="input-required" aria-hidden="true">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        rows={rows}
        className="input-field"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required }: {
  label: string; name: string; value?: string; onChange?: (e: any) => void;
  options: string[]; required?: boolean;
}) {
  const id = `select-${name}`;
  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {label} {required && <span className="input-required" aria-hidden="true">*</span>}
      </label>
      <div className="select-wrapper">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required}
          className={`input-field ${value ? 'select-selected' : 'select-placeholder'}`}
        >
          <option value="">Select an option...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="select-icon" aria-hidden="true" />
      </div>
    </div>
  );
}

function JobSeekerForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', field: '', experience: '', message: '' });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (file: File) => {
    if (file && (file.name.endsWith('.pdf') || file.name.endsWith('.doc') || file.name.endsWith('.docx'))) {
      setCvFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!cvFile) {
      setError('Please upload your CV before submitting your application.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await publicApi.submitJobSeekerForm(form, cvFile!);
      if (response.success) {
        setSubmitted(true);
      } else {
        setError(response.error || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-success-container" role="alert" aria-live="polite">
        <div className="form-success-icon-wrap">
          <CheckCircle className="form-success-icon" />
        </div>
        <h3 className="form-success-title">
          Application Submitted Successfully!
        </h3>
        <p className="form-success-text">
          Thank you for reaching out! Our recruitment team will review your profile and get in touch within 2–3 business days.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="form-success-btn"
          aria-label="Submit another application"
          disabled={isSubmitting}
        >
          Submit Another Application →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-layout">
      {error && <div className="contact-error-msg" role="alert" style={{ gridColumn: '1 / -1', padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}
      <div className="form-row">
        <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Adaeze Williams" required />
        <InputField label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
      </div>
      <div className="form-row">
        <InputField label="Phone Number" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 801 234 5678" required />
        <SelectField
          label="Years of Experience"
          name="experience"
          value={form.experience}
          onChange={handleChange}
          options={['0–2 years (Entry Level)', '3–5 years (Mid-Level)', '6–10 years (Senior)', '10+ years (Expert/Executive)']}
          required
        />
      </div>
      <SelectField
        label="Preferred Job Field / Industry"
        name="field"
        value={form.field}
        onChange={handleChange}
        options={['Technology & IT', 'Finance & Banking', 'Marketing & Communications', 'HR & People Management', 'Sales & Business Development', 'Operations & Logistics', 'Healthcare & Pharma', 'Oil & Gas & Energy', 'Real Estate & Construction', 'Other']}
        required
      />

      {/* CV Upload */}
      <div className="input-group">
        <label className="input-label" id="cv-upload-label">
          Upload Your CV <span className="input-required" aria-hidden="true">*</span>
        </label>
        <div
          className={`upload-area ${dragging || cvFile ? 'active' : ''} ${error && !cvFile ? 'error' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          aria-labelledby="cv-upload-label"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            aria-labelledby="cv-upload-label"
          />
          {cvFile ? (
            <div className="upload-file-info">
              <CheckCircle className="upload-success-icon" />
              <span className="upload-file-name">{cvFile.name}</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setCvFile(null); }}
                className="upload-remove-btn"
                aria-label={`Remove uploaded CV: ${cvFile.name}`}
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <Upload className="upload-icon" aria-hidden="true" />
              <p className="upload-text">
                Drag & drop your CV here, or <span className="upload-text-highlight">click to browse</span>
              </p>
              <p className="upload-hint">
                Supported formats: PDF, DOC, DOCX (max 5MB)
              </p>
            </>
          )}
        </div>
      </div>

      <TextAreaField
        label="Additional Message (Optional)"
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Tell us about your career goals, preferred work location, or any other relevant information..."
        rows={4}
      />

      <button
        type="submit"
        className="form-submit-btn"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <RefreshCw className="submit-icon animate-spin" aria-hidden="true" />
        ) : (
          <Send className="submit-icon" aria-hidden="true" />
        )}
        <p>{isSubmitting ? 'Submitting Application...' : 'Submit My Application'}</p>
      </button>

      <p className="form-disclaimer">
        Your information is kept strictly confidential. We never share your data without your consent.
      </p>
    </form>
  );
}

function EmployerForm() {
  const [form, setForm] = useState({
    company: '', contact: '', email: '', phone: '', industry: '', positions: '', hiringNeeds: '', timeline: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await publicApi.submitEmployerForm(form);
      if (response.success) {
        setSubmitted(true);
      } else {
        setError(response.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-success-container" role="alert" aria-live="polite">
        <div className="form-success-icon-wrap">
          <CheckCircle className="form-success-icon" />
        </div>
        <h3 className="form-success-title">
          Enquiry Received!
        </h3>
        <p className="form-success-text">
          Thank you for your interest! We will contact you within 24 hours to discuss your hiring needs.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="form-success-btn"
          aria-label="Submit another enquiry"
          disabled={isSubmitting}
        >
          Submit Another Enquiry →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-layout">
      {error && <div className="contact-error-msg" role="alert" style={{ gridColumn: '1 / -1', padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}
      <div className="form-row">
        <InputField label="Company Name" name="company" value={form.company} onChange={handleChange} placeholder="e.g. Acme Nigeria Ltd" required />
        <InputField label="Contact Person" name="contact" value={form.contact} onChange={handleChange} placeholder="Your full name" required />
      </div>
      <div className="form-row">
        <InputField label="Business Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="hr@yourcompany.com" required />
        <InputField label="Phone Number" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 801 234 5678" required />
      </div>
      <div className="form-row">
        <SelectField
          label="Industry / Sector"
          name="industry"
          value={form.industry}
          onChange={handleChange}
          options={['Technology & IT', 'Finance & Banking', 'Healthcare & Pharma', 'FMCG & Retail', 'Oil & Gas', 'Telecommunications', 'Manufacturing', 'Real Estate', 'Media & Creative', 'Education', 'Other']}
          required
        />
        <SelectField
          label="Number of Positions"
          name="positions"
          value={form.positions}
          onChange={handleChange}
          options={['1–3 positions', '4–10 positions', '11–25 positions', '26–50 positions', '50+ positions']}
          required
        />
      </div>
      <div className="form-row">
        <SelectField
          label="Service Required"
          name="hiringNeeds"
          value={form.hiringNeeds}
          onChange={handleChange}
          options={['Talent Acquisition / Recruitment', 'Executive Search', 'HR Consulting & Advisory', 'Workforce Management', 'Employee Training & Development', 'Background Verification', 'Multiple Services']}
          required
        />
        <SelectField
          label="Hiring Timeline"
          name="timeline"
          value={form.timeline}
          onChange={handleChange}
          options={['Immediately (ASAP)', 'Within 2 weeks', '1 month', '2–3 months', 'Flexible']}
        />
      </div>
      <TextAreaField
        label="Tell Us More About Your Requirements"
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Describe the roles you need filled, skills required, company culture, or any specific challenges you're facing with talent acquisition..."
        rows={5}
        required
      />

      <button
        type="submit"
        className="form-submit-btn"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <RefreshCw className="submit-icon animate-spin" aria-hidden="true" />
        ) : (
          <Send className="submit-icon" aria-hidden="true" />
        )}
        <p>{isSubmitting ? 'Sending Enquiry...' : 'Send Hiring Enquiry'}</p>
      </button>

      <p className="form-disclaimer">
        We will respond within 24 hours. All information shared is strictly confidential.
      </p>
    </form>
  );
}

export default function Contact() {
  const [activeTab, setActiveTab] = useState<'jobseeker' | 'employer'>('jobseeker');

  return (
    <div className="contact-page">
      {/* ── HERO ── */}
      <section className="contact-hero-section">
        <div className="hero-bg-glow" />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Badge icon={Mail} text="GET IN TOUCH" />
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let's Start a Conversation
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Have a question, need HR advisory, or looking for your next dream role? Our team is ready to help you navigate your journey with expert guidance and tailored solutions.
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="content-section">
        <div className="container">
          <div className="content-grid">

            {/* Form */}
            <div className="main-column">
              {/* Tabs */}
              <div className="tab-container" role="tablist" aria-label="Contact form options">
                <button
                  onClick={() => setActiveTab('jobseeker')}
                  className={`tab-btn ${activeTab === 'jobseeker' ? 'active' : ''}`}
                  role="tab"
                  aria-selected={activeTab === 'jobseeker'}
                  aria-controls="jobseeker-panel"
                  id="jobseeker-tab"
                >
                  <User className="tab-icon" aria-hidden="true" /> Job Seeker
                </button>
                <button
                  onClick={() => setActiveTab('employer')}
                  className={`tab-btn ${activeTab === 'employer' ? 'active' : ''}`}
                  role="tab"
                  aria-selected={activeTab === 'employer'}
                  aria-controls="employer-panel"
                  id="employer-tab"
                >
                  <Building2 className="tab-icon" aria-hidden="true" /> Employer
                </button>
              </div>

              {/* Context hint */}
              <div className="context-hint" aria-live="polite">
                {activeTab === 'jobseeker' ? (
                  <>
                    <User className="context-hint-icon" aria-hidden="true" />
                    <div>
                      <p className="context-hint-title">You're applying as a Job Seeker</p>
                      <p className="context-hint-text">
                        Upload your CV and tell us about your career goals. Our recruiters will match you with the most suitable opportunities.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Building2 className="context-hint-icon" aria-hidden="true" />
                    <div>
                      <p className="context-hint-title">You're contacting us as an Employer</p>
                      <p className="context-hint-text">
                        Tell us about your hiring needs and We will design a tailored recruitment solution for you.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Form card */}
              <div 
                className="form-card" 
                role="tabpanel" 
                id={`${activeTab}-panel`} 
                aria-labelledby={`${activeTab}-tab`}
              >
                {activeTab === 'jobseeker' ? <JobSeekerForm /> : <EmployerForm />}
              </div>
            </div>

            {/* Contact Info */}
            <div className="sidebar-column">
              <div className="info-card">
                <h3 className="info-card-title">Contact Information</h3>
                <div className="info-list">
                  {[
                    {
                      icon: MapPin,
                      label: 'Office Address',
                      value: '113 Idiroko Road, OTA, Ogun State',
                    },
                    {
                      icon: Phone,
                      label: 'Phone',
                      value: '+234 91 3402 0665',
                      href: 'tel:+234 91 3402 0665',
                    },
                    {
                      icon: Mail,
                      label: 'Email',
                      value: 'info@desjobglobal.com or desjobglobal@gmail.com',
                      href: 'mailto:info@desjobglobal.com',
                    },
                    {
                      icon: Clock,
                      label: 'Business Hours',
                      value: '8:00am to 5:00pm Monday to Friday',
                    },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="info-item">
                      <div className="info-icon-wrap">
                        <Icon className="info-icon" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="info-label">{label}</p>
                        {href ? (
                          <a href={href} className="info-link">{value}</a>
                        ) : (
                          <p className="info-text">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="guarantee-card">
                <h3 className="guarantee-title">
                  Quick Response Guaranteed
                </h3>
                <p className="guarantee-text">
                  We pride ourselves on our responsiveness. All enquiries receive a response within 24 hours during business days.
                </p>
                <div className="guarantee-list">
                  {['Response within 24 hours', 'Confidential & professional', 'No obligation required'].map((item) => (
                    <div key={item} className="guarantee-item">
                      <div className="guarantee-check">
                        <svg className="guarantee-check-icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="guarantee-list-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* ── MINI CTA ── */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            Prefer to Explore First?
          </h2>
          <p className="cta-subtitle">
            Browse our open jobs or explore our full range of HR services before reaching out.
          </p>
          <div className="cta-links">
            <ButtonSecondary
              link="/jobs"
              text="Browse Jobs"
              icon={<Briefcase className="cta-btn-icon" />}
            />
            <ButtonPrimary
              link="/services"
              text="Our Services"
              icon={<ArrowRight className="cta-btn-icon" />}
            />
          </div>
        </div>
      </section>
    </div>
  );
}