import { Link } from 'react-router';
import { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import {
  Search, MapPin, Briefcase, Clock, ArrowRight, Upload, Filter,
  Building2, TrendingUp, Shield, Star, CheckCircle2, ChevronRight
} from 'lucide-react';
import './Jobs.css';
import ButtonPrimary from '../components/form/ButtonPrimary';
import ButtonSecondary from '../components/form/ButtonSecondary';

const JOBS_HERO_IMG = 'https://images.unsplash.com/photo-1758520144417-e1c432042dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2IlMjBzZWFyY2glMjByZXN1bWUlMjBjYXJlZXIlMjBvcHBvcnR1bml0eXxlbnwxfHx8fDE3NzQwMjM1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080';
const CAREER_IMG = 'https://images.unsplash.com/photo-1758876019673-704b039d405c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBncm93dGglMjBwcm9mZXNzaW9uYWwlMjBzdWNjZXNzJTIwb2ZmaWNlfGVufDF8fHx8MTc3NDAyMzU2MXww&ixlib=rb-4.1.0&q=80&w=1080';

// ==========================================
// SHARED DATA & TYPES
// ==========================================

const featuredJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'TechBridge Nigeria',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    salary: '₦500k – ₦800k/month',
    category: 'Technology',
    tags: ['React', 'Node.js', 'TypeScript'],
    posted: '2 days ago',
  },
  {
    id: 2,
    title: 'Head of Marketing',
    company: 'Greenfield FMCG Ltd',
    location: 'Abuja, Nigeria',
    type: 'Full-time',
    salary: '₦600k – ₦900k/month',
    category: 'Marketing',
    tags: ['Brand Strategy', 'Digital Marketing', 'Team Leadership'],
    posted: '3 days ago',
  },
  {
    id: 3,
    title: 'Finance Manager',
    company: 'Apex Commercial Bank',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    salary: '₦450k – ₦700k/month',
    category: 'Finance',
    tags: ['Financial Reporting', 'IFRS', 'Treasury'],
    posted: '5 days ago',
  },
  {
    id: 4,
    title: 'Human Resources Business Partner',
    company: 'OilServ Energy',
    location: 'Port Harcourt, Nigeria',
    type: 'Full-time',
    salary: '₦400k – ₦650k/month',
    category: 'HR',
    tags: ['HR Strategy', 'Labour Relations', 'HRIS'],
    posted: '1 week ago',
  },
  {
    id: 5,
    title: 'Product Manager',
    company: 'Paystack (Contract)',
    location: 'Lagos, Nigeria (Hybrid)',
    type: 'Contract',
    salary: '₦700k – ₦1.1m/month',
    category: 'Technology',
    tags: ['Product Strategy', 'Agile', 'FinTech'],
    posted: '4 days ago',
  },
  {
    id: 6,
    title: 'Sales Director West Africa',
    company: 'Novo Pharma Ltd',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    salary: '₦800k – ₦1.2m/month',
    category: 'Sales',
    tags: ['B2B Sales', 'Team Leadership', 'Pharmaceuticals'],
    posted: '6 days ago',
  },
];

const categories = [
  { name: 'Technology', count: 45, icon: '💻' },
  { name: 'Finance & Banking', count: 32, icon: '🏦' },
  { name: 'Marketing', count: 28, icon: '📣' },
  { name: 'HR & People', count: 21, icon: '👥' },
  { name: 'Sales', count: 38, icon: '📈' },
  { name: 'Operations', count: 25, icon: '⚙️' },
  { name: 'Healthcare', count: 18, icon: '🏥' },
];

const whyApplyFeatures = [
  { icon: Shield, title: 'Vetted, Legitimate Employers', desc: 'Every company we represent is thoroughly verified. No scams, no false promises just real opportunities with credible organisations.' },
  { icon: Star, title: 'Personalised Career Guidance', desc: 'Our recruiters provide honest feedback, interview coaching, and salary negotiation support to help you present your best self.' },
  { icon: CheckCircle2, title: 'Exclusive Unadvertised Roles', desc: 'Many of our most exciting positions are filled exclusively through our network before they\'re ever posted publicly.' },
  { icon: TrendingUp, title: 'Long-Term Career Development', desc: 'We\'re invested in your long-term success not just today\'s placement. Many of our candidates return to us as they grow in their careers.' },
];

type Job = typeof featuredJobs[0];

// ==========================================
// COMPONENTS
// ==========================================

function Badge({ icon: Icon, text }: { icon?: LucideIcon; text: string }) {
  return (
    <span className="badge-base">
      {Icon && <Icon className="badge-icon" />}
      {text}
    </span>
  );
}

function JobSearchBar({
  searchQuery,
  setSearchQuery,
  locationFilter,
  setLocationFilter
}: {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  locationFilter: string;
  setLocationFilter: (val: string) => void;
}) {
  return (
    <div className="search-container">
      <div className="search-input-wrap">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Job title, keyword, or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="location-input-wrap">
        <MapPin className="location-icon" />
        <input
          type="text"
          placeholder="Location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="location-input"
        />
      </div>
      <ButtonPrimary
        type="button"
        text="Search Jobs"
        icon={<Search className="search-btn-icon" />}
      />
    </div>
  );
}

function CategoryCard({
  name, count, icon, isActive, onClick
}: {
  name: string; count: number; icon: string; isActive: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`category-card ${isActive ? 'active' : ''}`}
    >
      <span className="category-icon">{icon}</span>
      <p className="category-name">{name}</p>
      <p className="category-count">{count} open roles</p>
    </button>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-card-title-wrap">
          <div className="job-icon-wrap">
            <Building2 className="job-icon" />
          </div>
          <div>
            <h3 className="job-title">{job.title}</h3>
            <p className="job-company">{job.company}</p>
          </div>
        </div>
      </div>

      <div className="job-meta">
        <span className="job-meta-item">
          <MapPin className="job-meta-icon" /> {job.location}
        </span>
        <span className="job-meta-item">
          <Clock className="job-meta-icon" /> {job.type}
        </span>
        <span className="job-meta-highlight">
          <TrendingUp className="job-meta-icon" /> {job.salary}
        </span>
      </div>

      <div className="job-tags">
        {job.tags.map((tag) => (
          <span key={tag} className="job-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="job-card-footer">
        <span className="job-posted">Posted {job.posted}</span>
        <ButtonPrimary
          link="/contact"
          text="Apply Now"
          icon={<ArrowRight className="job-apply-icon" />}
        />
      </div>
    </div>
  );
}

function WhyApplyFeature({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) {
  return (
    <div className="why-feature">
      <div className="why-feature-icon-wrap">
        <Icon className="why-feature-icon" />
      </div>
      <div>
        <h4 className="why-feature-title">{title}</h4>
        <p className="why-feature-desc">{desc}</p>
      </div>
    </div>
  );
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredJobs = featuredJobs.filter((job) => {
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation =
      !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesCategory =
      !activeCategory || job.category === activeCategory;
    return matchesSearch && matchesLocation && matchesCategory;
  });

  return (
    <div className="jobs-page">
      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-bg-glow" />
        <div className="hero-content">
          <Badge icon={Briefcase} text="BROWSE JOBS" />
          <h1 className="hero-title">
            Find Your Next Career-Defining Opportunity in Nigeria
          </h1>
          <p className="hero-subtitle">
            Desjob Global connects ambitious professionals with the most exciting roles across Nigeria's fastest-growing companies. Your dream job is closer than you think.
          </p>

          <JobSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
          />
        </div>
      </section>

      {/* ── JOB CATEGORIES ── */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <h2 className="section-title">Browse by Category</h2>
              <p className="section-subtitle">Explore opportunities in your field</p>
            </div>
            <button
              className="view-all-btn"
              onClick={() => setActiveCategory(null)}
            >
              {activeCategory ? 'Clear filter' : 'View all'}
              <ChevronRight className="view-all-icon" />
            </button>
          </div>
          <div className="categories-grid">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.name}
                name={cat.name}
                count={cat.count}
                icon={cat.icon}
                isActive={activeCategory === cat.name}
                onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED JOBS ── */}
      <section className="jobs-section">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <h2 className="section-title">
                {activeCategory ? `${activeCategory} Roles` : 'Open Opportunities'}
              </h2>
              <p className="section-subtitle">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
              </p>
            </div>
            {/* <ButtonSecondary
              type="button"
              text="Filter"
              icon={<Filter className="filter-icon" />}
            /> */}
          </div>

          {filteredJobs.length === 0 ? (
            <div className="no-jobs-container">
              <p className="no-jobs-text">No jobs found for your search. Try different keywords.</p>
            </div>
          ) : (
            <div className="jobs-grid">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          <div className="jobs-footer">
            <p className="jobs-bottom-text">
              Don't see the right role?{' '}
              <Link to="/contact" className="jobs-bottom-link">
                Submit your CV and we'll match you →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY FIND JOBS THROUGH DESJOB ── */}
      <section className="why-apply-section">
        <div className="container">
          <div className="why-grid">
            <div className="why-img-wrap">
              <div className="img-glow" />
              <img
                src={CAREER_IMG}
                alt="Career growth through Desjob Global"
                className="why-img"
              />
            </div>

            <div>
              <Badge icon={Star} text="WHY APPLY THROUGH US" />
              <h2 className="why-section-title">
                Your Career Deserves More Than Just a Job Board
              </h2>
              <p className="why-section-desc">
                When you apply through Desjob Global, you gain more than access to job listings you gain a dedicated career partner who understands your industry and advocates for your best interests.
              </p>

              <div className="why-features">
                {whyApplyFeatures.map((feature) => (
                  <WhyApplyFeature
                    key={feature.title}
                    icon={feature.icon}
                    title={feature.title}
                    desc={feature.desc}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUBMIT CV CTA ── */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-icon-wrap">
            <Upload className="cta-icon" />
          </div>
          <h2 className="cta-title">
            Don't See Your Dream Job Listed?
          </h2>
          <p className="cta-subtitle">
            Upload your CV today and let our recruiters match you with the perfect opportunity. We'll reach out the moment something aligns with your profile.
          </p>
          <div className="cta-links">
            <ButtonSecondary
              link="/contact"
              text="Submit My CV"
              icon={<Upload className="cta-btn-icon" />}
            />
            <ButtonPrimary
              link="/contact"
              text="Talk to a Recruiter"
              icon={<ArrowRight className="cta-btn-icon" />}
            />
          </div>
        </div>
      </section>
    </div>
  );
}