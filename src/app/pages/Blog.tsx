import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { adminApi } from '../api/adminApi';
import { BlogPost } from '../store/adminStore';
import { Badge } from 'lucide-react';
import { Briefcase } from 'lucide-react';
import './Blog.css';

const BadgeComponent = ({ text }: { text: string }) => (
  <span 
    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
    style={{ background: '#f0fdf4', color: '#16a34a' }}
  >
    {text}
  </span>
);

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await adminApi.getBlogPosts();
      setBlogs(data);
      setIsLoading(false);
    };
    fetchBlogs();
  }, []);

  const handleCardClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="max-w-4xl mx-auto px-4">
          <BadgeComponent text="Insights & News" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mt-6 mb-4" style={{ letterSpacing: '-0.02em' }}>
            Inside <span style={{ color: '#16a34a' }}>HR & Recruitment</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay ahead with the latest strategies in talent acquisition, workforce management, and African business trends from the Desjob Global team.
          </p>
        </div>
      </section>

      <div className="blog-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="col-span-full text-center py-20 text-gray-500">Loading insights...</div>
        ) : blogs.length === 0 ? (
          <div className="col-span-full text-center py-20 text-gray-500">No blog posts found.</div>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="blog-card group" onClick={() => handleCardClick(blog.slug)}>
              <img src={blog.image} alt={blog.title} className="blog-card-img transition duration-500 group-hover:scale-110" />
              <div className="blog-card-overlay">
                <span className="blog-card-category">{blog.category}</span>
                <h4 className="blog-card-title">{blog.title}</h4>
                <div className="blog-card-meta flex items-center space-x-2">
                  <span className="text-sm font-medium blog-card-sub-title">{blog.author}</span>
                  <div className="meta-divider" />
                  <span className="text-sm">{blog.date}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
