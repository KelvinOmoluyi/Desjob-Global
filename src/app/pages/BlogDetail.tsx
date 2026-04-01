import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { adminApi } from '../api/adminApi';
import { BlogPost } from '../store/adminStore';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import './BlogDetail.css';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (slug) {
        const data = await adminApi.getBlogPostBySlug(slug);
        setBlog(data || null);
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="blog-detail-page py-20 text-center text-gray-500">
        Finding the perfect article for you...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-detail-page py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Link to="/blog" className="text-green-600 hover:underline">
          Return to blog insights
        </Link>
      </div>
    );
  }

  return (
    <article className="blog-detail-page">
      <div className="blog-detail-hero">
        <div className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none">
          <img src={blog.image} alt={blog.title} className="blog-detail-img" />
        </div>
      </div>

      <div className="blog-detail-header-container px-4">
        <div className="blog-detail-header">
          <Link to="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-green-600 mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Insights
          </Link>

          <span className="blog-detail-category">{blog.category}</span>
          <h1 className="blog-detail-title">{blog.title}</h1>

          <div className="blog-detail-meta">
            <div className="flex items-center">
              <User size={18} className="mr-2 text-green-600" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={18} className="mr-2 text-green-600" />
              <span>{blog.date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-detail-content">
        {blog.content.map((paragraph, idx) => (
          <p key={idx} className="blog-detail-paragraph">
            {paragraph}
          </p>
        ))}

        <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-100">
          <h3 className="text-xl font-bold mb-4">Enjoyed this read?</h3>
          <p className="text-gray-600 mb-6">
            Share this article with your colleagues or subscribe to our newsletter for more HR insights.
          </p>
          <div className="flex gap-4">
            <button className="flex items-center px-6 py-3 bg-white border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-colors">
              <Share2 size={18} className="mr-2" />
              Share Article
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
