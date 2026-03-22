import { useState, useRef } from 'react';
import React from 'react';
import { Link } from 'react-router';
import { LucideIcon } from 'lucide-react';
import {
  Mail, Phone, MapPin, Clock, Upload, Building2, User,
  Send, CheckCircle, ArrowRight, Briefcase, ChevronDown
} from 'lucide-react';
import './Contact.css';
import ButtonPrimary from '../components/form/ButtonPrimary';
import ButtonSecondary from '../components/form/ButtonSecondary';

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
  return (
    <div className="input-group">
      <label className="input-label">
        {label} {required && <span className="input-required">*</span>}
      </label>
      {children || (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
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
  return (
    <div className="input-group">
      <label className="input-label">
        {label} {required && <span className="input-required">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
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
  return (
    <div className="input-group">
      <label className="input-label">
        {label} {required && <span className="input-required">*</span>}
      </label>
      <div className="select-wrapper">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`input-field ${value ? 'select-selected' : 'select-placeholder'}`}
        >
          <option value="">Select an option...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="select-icon" />
      </div>
    </div>
  );
}

function JobSeekerForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', field: '', experience: '', message: '' });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [dragging, setDragging] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-success-container">
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
        >
          Submit Another Application →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-layout">
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
        <label className="input-label">
          Upload Your CV <span className="input-required">*</span>
        </label>
        <div
          className={`upload-area ${dragging || cvFile ? 'active' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          {cvFile ? (
            <div className="upload-file-info">
              <CheckCircle className="upload-success-icon" />
              <span className="upload-file-name">{cvFile.name}</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setCvFile(null); }}
                className="upload-remove-btn"
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <Upload className="upload-icon" />
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
      >
        <Send className="submit-icon" /> Submit My Application
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-success-container">
        <div className="form-success-icon-wrap">
          <CheckCircle className="form-success-icon" />
        </div>
        <h3 className="form-success-title">
          Enquiry Received!
        </h3>
        <p className="form-success-text">
          Thank you for your interest! A dedicated account manager will contact you within 24 hours to discuss your hiring needs.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="form-success-btn"
        >
          Submit Another Enquiry →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-layout">
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
      >
        <Send className="submit-icon" /> Send Hiring Enquiry
      </button>

      <p className="form-disclaimer">
        A dedicated account manager will respond within 24 hours. All information shared is strictly confidential.
      </p>
    </form>
  );
}

export default function Contact() {
  const [activeTab, setActiveTab] = useState<'jobseeker' | 'employer'>('jobseeker');

  return (
    <div className="contact-page">
      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-bg-glow" />
        <div className="hero-content">
          <Badge icon={Mail} text="GET IN TOUCH" />
          <h1 className="hero-title">
            Let's Start a Conversation
          </h1>
          <p className="hero-subtitle">
            Whether you're looking to build your dream team or land your next great role, our team is ready to help. Fill in the form below and we'll be in touch promptly.
          </p>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="content-section">
        <div className="container">
          <div className="content-grid">

            {/* Form */}
            <div className="main-column">
              {/* Tabs */}
              <div className="tab-container">
                <button
                  onClick={() => setActiveTab('jobseeker')}
                  className={`tab-btn ${activeTab === 'jobseeker' ? 'active' : ''}`}
                >
                  <User className="tab-icon" /> Job Seeker
                </button>
                <button
                  onClick={() => setActiveTab('employer')}
                  className={`tab-btn ${activeTab === 'employer' ? 'active' : ''}`}
                >
                  <Building2 className="tab-icon" /> Employer
                </button>
              </div>

              {/* Context hint */}
              <div className="context-hint">
                {activeTab === 'jobseeker' ? (
                  <>
                    <User className="context-hint-icon" />
                    <div>
                      <p className="context-hint-title">You're applying as a Job Seeker</p>
                      <p className="context-hint-text">
                        Upload your CV and tell us about your career goals. Our recruiters will match you with the most suitable opportunities.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Building2 className="context-hint-icon" />
                    <div>
                      <p className="context-hint-title">You're contacting us as an Employer</p>
                      <p className="context-hint-text">
                        Tell us about your hiring needs and a dedicated account manager will design a tailored recruitment solution for you.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Form card */}
              <div className="form-card">
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
                      value: '14 Broad Street, Lagos Island, Lagos, Nigeria',
                    },
                    {
                      icon: Phone,
                      label: 'Phone',
                      value: '+234 801 234 5678',
                      href: 'tel:+2348012345678',
                    },
                    {
                      icon: Mail,
                      label: 'Email',
                      value: 'info@desjobglobal.com',
                      href: 'mailto:info@desjobglobal.com',
                    },
                    {
                      icon: Clock,
                      label: 'Business Hours',
                      value: 'Mon–Fri: 8:00am – 6:00pm WAT',
                    },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="info-item">
                      <div className="info-icon-wrap">
                        <Icon className="info-icon" />
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
                  {['Response within 24 hours', 'Free initial consultation', 'Confidential & professional', 'No obligation required'].map((item) => (
                    <div key={item} className="guarantee-item">
                      <div className="guarantee-check">
                        <svg className="guarantee-check-icon" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="guarantee-list-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Abuja Office */}
              <div className="office-card">
                <h3 className="office-title">Abuja Office</h3>
                <div className="office-details">
                  <div className="office-row">
                    <MapPin className="office-icon" />
                    <p className="office-text">Plot 1234, Wuse Zone 5, Abuja, FCT, Nigeria</p>
                  </div>
                  <div className="office-row">
                    <Phone className="office-icon" style={{ marginTop: 0 }} />
                    <a href="tel:+2349012345678" className="office-link">+234 901 234 5678</a>
                  </div>
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