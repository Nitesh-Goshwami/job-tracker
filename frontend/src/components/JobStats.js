import React from 'react';

function JobStats({ jobs }) {
  const totalJobs = jobs.length;
  const appliedJobs = jobs.filter(job => job.status === 'Applied').length;
  const interviewingJobs = jobs.filter(job => job.status === 'Interviewing').length;
  const offeredJobs = jobs.filter(job => job.status === 'Offered').length;
  const rejectedJobs = jobs.filter(job => job.status === 'Rejected').length;

  const getPercentage = (count) => {
    return totalJobs > 0 ? Math.round((count / totalJobs) * 100) : 0;
  };

  return (
    <div className="job-stats">
      <h2>Application Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card total">
          <h3>{totalJobs}</h3>
          <p>Total Applications</p>
        </div>
        
        <div className="stat-card applied">
          <h3>{appliedJobs}</h3>
          <p>Applied ({getPercentage(appliedJobs)}%)</p>
        </div>
        
        <div className="stat-card interviewing">
          <h3>{interviewingJobs}</h3>
          <p>Interviewing ({getPercentage(interviewingJobs)}%)</p>
        </div>
        
        <div className="stat-card offered">
          <h3>{offeredJobs}</h3>
          <p>Offered ({getPercentage(offeredJobs)}%)</p>
        </div>
        
        <div className="stat-card rejected">
          <h3>{rejectedJobs}</h3>
          <p>Rejected ({getPercentage(rejectedJobs)}%)</p>
        </div>
      </div>
    </div>
  );
}

export default JobStats;
