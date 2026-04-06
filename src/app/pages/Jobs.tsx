import { useState } from 'react';
import { JobPost } from '../store/adminStore';
import { LucideIcon, Loader2 } from 'lucide-react';
import { Link } from 'react-router';
import {
  Search, MapPin, Briefcase, Clock, ArrowRight, Upload, Filter,
  Building2, TrendingUp, Shield, Star, CheckCircle2, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useJobs } from '../hooks/useJobs';
import './Jobs.css';
import ButtonPrimary from '../components/form/ButtonPrimary';
import ButtonSecondary from '../components/form/ButtonSecondary';

const JOBS_HERO_IMG = 'https://images.unsplash.com/photo-1758520144417-e1c432042dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2IlMjBzZWFyY2glMjByZXN1bWUlMjBjYXJlZXIlMjBvcHBvcnR1bml0eXxlbnwxfHx8fDE3NzQwMjM1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080';
const CAREER_IMG = 'https://plus.unsplash.com/premium_photo-1683980578016-a1f980719ec2?q=80&w=1080&auto=format&fit=crop';

// ==========================================
// SHARED DATA & TYPES
// ==========================================

// featuredJobs moved to state inside Jobs component


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

type Job = JobPost;

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
          aria-label="Search job title, keyword, or company"
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
          aria-label="Filter by location"
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
      aria-label={`Filter by ${name} category. ${count} open roles available.`}
      aria-pressed={isActive}
    >
      <span className="category-icon" aria-hidden="true">{icon}</span>
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

      {job.image && (
        <div className="job-card-image">
          <img src={job.image} alt={job.title} />
        </div>
      )}

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
        {job.tags.map((tag: string) => (
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

  const { data: jobs = [], isLoading } = useJobs();

  const filteredJobs = jobs.filter((job) => {
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Badge icon={Briefcase} text="BROWSE JOBS" />
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find Your Next Career-Defining Opportunity in Nigeria
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Desjob Global connects ambitious professionals with the most exciting roles across Nigeria's fastest-growing companies. Your dream job is closer than you think.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <JobSearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
            />
          </motion.div>
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
              aria-label="Clear all category filters"
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

          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 0', gap: '1rem', color: '#6b7280' }}>
              <Loader2 className="animate-spin" style={{ color: '#16a34a' }} size={40} />
              <p>Scanning the current job market for you...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
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