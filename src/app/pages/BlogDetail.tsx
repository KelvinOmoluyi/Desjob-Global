import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { publicApi } from '../api/publicApi';
import { BlogPost } from '../store/adminStore';
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import './BlogDetail.css';
import { toast } from 'sonner';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (slug) {
        const data = await publicApi.getBlogPostBySlug(slug);
        setBlog(data || null);
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleShare = async () => {
    const shareData = {
      title: blog?.title || 'Desjob Global - HR Insights',
      text: blog?.content[0]?.substring(0, 100) + '...',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        toast.success('Successfully shared!');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
          toast.error('Could not share. Your browser might not support this feature.');
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!', {
          icon: <Check size={18} style={{ color: '#10b981' }} />,
        });
      } catch (err) {
        console.error('Failed to copy link:', err);
        toast.error('Failed to copy link. Please manually copy the URL from your address bar.');
      }
    }
  };

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
          <Link to="/blog" className="blog-detail-back-link">
            <ArrowLeft size={16} className="back-icon" />
            Back to Insights
          </Link>

          <span className="blog-detail-category">{blog.category}</span>
          <h1 className="blog-detail-title">{blog.title}</h1>

          <div className="blog-detail-meta">
            <div className="blog-detail-meta-item">
              <User size={18} className="meta-icon" />
              <span>{blog.author}</span>
            </div>
            <div className="blog-detail-meta-item">
              <Calendar size={18} className="meta-icon" />
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

        <div className="blog-detail-cta">
          <h3 className="blog-cta-title">Enjoyed this read?</h3>
          <p className="cta-text">
            Share this article with your colleagues or subscribe to our newsletter for more HR insights.
          </p>
          <div className="cta-actions">
            <button className="cta-btn-share" onClick={handleShare}>
              <Share2 size={18} className="cta-icon-small" />
              Share Article
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
