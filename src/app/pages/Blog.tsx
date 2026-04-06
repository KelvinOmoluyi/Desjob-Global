import { useNavigate } from 'react-router';
import { LucideIcon, Briefcase, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBlogPosts } from '../hooks/useBlog';
import './Blog.css';

function Badge({ icon: Icon, text }: { icon?: LucideIcon; text: string }) {
  return (
    <span className="badge-base">
      {Icon && <Icon className="badge-icon" />}
      {text}
    </span>
  );
}

export default function Blog() {
  const navigate = useNavigate();

  const { data: blogs = [], isLoading } = useBlogPosts();

  const handleCardClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="blog-hero-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Badge icon={Briefcase} text="Your #1 HR Solutions Partner" />
          </motion.div>

          <motion.h1 
            className="blog-hero-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Inside <span className="blog-accent-text">HR & Recruitment</span>
          </motion.h1>

          <motion.p 
            className="blog-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Stay ahead with the latest strategies in talent acquisition, workforce management, and African business trends from the Desjob Global team.
          </motion.p>
        </div>
      </section>

      <div className="blog-grid-section">
        {isLoading ? (
          <div className="blog-loader-container">
            <Loader2 className="blog-spinner" size={40} />
            <p>Loading insights...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="col-span-full text-center py-20 text-gray-500">No blog posts found.</div>
        ) : (
          blogs.map((blog) => (
            <div 
              key={blog.id} 
              className="blog-card" 
              onClick={() => handleCardClick(blog.slug)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(blog.slug)}
              aria-label={`Read blog post: ${blog.title}`}
            >
              <img src={blog.image} alt="" className="blog-card-img" />
              <div className="blog-card-overlay">
                <span className="blog-card-category">{blog.category}</span>
                <h4 className="blog-card-title">{blog.title}</h4>
                <div className="blog-card-meta">
                  <span className="blog-card-author">{blog.author}</span>
                  <div className="meta-divider" />
                  <span className="blog-card-date">{blog.date}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
