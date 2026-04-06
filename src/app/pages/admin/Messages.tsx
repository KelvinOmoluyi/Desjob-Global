import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Download, RefreshCw } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { JobSeekerMessage, EmployerMessage } from '../../store/adminStore';

export default function Messages() {
  const [activeTab, setActiveTab] = useState<'jobseeker' | 'employer'>('jobseeker');
  const [jobSeekers, setJobSeekers] = useState<JobSeekerMessage[]>([]);
  const [employers, setEmployers] = useState<EmployerMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    setIsLoading(true);
    const [jsMessages, empMessages] = await Promise.all([
      adminApi.getJobSeekerMessages(),
      adminApi.getEmployerMessages()
    ]);
    setJobSeekers(jsMessages);
    setEmployers(empMessages);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (isoStr: string) => {
    return new Date(isoStr).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Messages</h1>
        <button 
          onClick={fetchMessages} 
          className="admin-btn-outline" 
          disabled={isLoading}
          aria-label="Refresh messages"
        >
          <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-tabs" role="tablist" aria-label="Message categories">
          <button 
            className={`admin-tab ${activeTab === 'jobseeker' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobseeker')}
            role="tab"
            aria-selected={activeTab === 'jobseeker'}
            aria-controls="jobseeker-panel"
            id="jobseeker-tab"
          >
            Job Seekers ({jobSeekers.length})
          </button>
          <button 
            className={`admin-tab ${activeTab === 'employer' ? 'active' : ''}`}
            onClick={() => setActiveTab('employer')}
            role="tab"
            aria-selected={activeTab === 'employer'}
            aria-controls="employer-panel"
            id="employer-tab"
          >
            Employers ({employers.length})
          </button>
        </div>

        {isLoading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }} aria-live="polite">Loading messages...</div>
        ) : (
          <div className="admin-list">
            {activeTab === 'jobseeker' ? (
              <div id="jobseeker-panel" role="tabpanel" aria-labelledby="jobseeker-tab">
                {jobSeekers.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>No job seeker messages found.</div>
                ) : (
                  jobSeekers.map(msg => (
                    <div key={msg.id} className="admin-list-item">
                      <div className="admin-list-header">
                        <div>
                          <h3 className="admin-item-title">{msg.name}</h3>
                          <p className="admin-item-subtitle">{msg.field} • {msg.experience}</p>
                        </div>
                        <span className="admin-item-date">{formatDate(msg.date)}</span>
                      </div>
                      
                      <div className="admin-item-meta">
                        <span className="admin-meta-tag"><Mail size={14} /> {msg.email}</span>
                        <span className="admin-meta-tag"><Phone size={14} /> {msg.phone}</span>
                        {msg.cvUrl && (
                          <a 
                            href={msg.cvUrl} 
                            className="admin-meta-tag" 
                            style={{ color: 'var(--main-color-01)', background: '#ecfdf5', textDecoration: 'none' }}
                            aria-label={`Download CV for ${msg.name}`}
                          >
                            <Download size={14} /> Download CV
                          </a>
                        )}
                      </div>

                      <div className="admin-item-content">
                        <p className="admin-item-text">{msg.message || 'No additional message provided.'}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div id="employer-panel" role="tabpanel" aria-labelledby="employer-tab">
                {employers.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>No employer messages found.</div>
                ) : (
                  employers.map(msg => (
                    <div key={msg.id} className="admin-list-item">
                      <div className="admin-list-header">
                        <div>
                          <h3 className="admin-item-title">{msg.company}</h3>
                          <p className="admin-item-subtitle">{msg.contact} • {msg.industry}</p>
                        </div>
                        <span className="admin-item-date">{formatDate(msg.date)}</span>
                      </div>
                      
                      <div className="admin-item-meta">
                        <span className="admin-meta-tag"><Mail size={14} /> {msg.email}</span>
                        <span className="admin-meta-tag"><Phone size={14} /> {msg.phone}</span>
                        <span className="admin-meta-tag" style={{ background: '#fef3c7', color: '#92400e' }} aria-label="Hiring timeline">{msg.timeline}</span>
                        <span className="admin-meta-tag" style={{ background: '#e0e7ff', color: '#3730a3' }} aria-label="Hiring needs">{msg.positions} ({msg.hiringNeeds})</span>
                      </div>

                      <div className="admin-item-content">
                        <p className="admin-item-text">{msg.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
