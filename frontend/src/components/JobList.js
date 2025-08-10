import React, { useState } from 'react';
import JobItem from './JobItem';

function JobList({ jobs, filter, onFilterChange, onUpdateJob, onDeleteJob }) {
  const [editingId, setEditingId] = useState(null);

  // Filter jobs based on status
  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    return job.status.toLowerCase() === filter.toLowerCase();
  });

  if (jobs.length === 0) {
    return (
      <div className="job-list">
        <h2>Job Applications</h2>
        <p className="no-jobs">No job applications yet. Add your first one above!</p>
      </div>
    );
  }

  return (
    <div className="job-list">
      <div className="list-header">
        <h2>Job Applications ({filteredJobs.length})</h2>
        <div className="filter-section">
          <label htmlFor="status-filter">Filter by status: </label>
          <select
            id="status-filter"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">All Jobs</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offered">Offered</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <p className="no-jobs">No jobs match the selected filter.</p>
      ) : (
        <div className="jobs-container">
            {filteredJobs.map(job => (
              <JobItem
                key={job._id}
                job={job}
                isEditing={editingId === job._id}
                onEdit={() => setEditingId(job._id)}
                onSave={(updatedJob) => {
                  onUpdateJob(job._id, updatedJob);
                  setEditingId(null);
                }}
                onCancel={() => setEditingId(null)}
                onDelete={() => onDeleteJob(job._id)}
              />
            ))}
          </div>
      )}
    </div>
  );
}

export default JobList;
