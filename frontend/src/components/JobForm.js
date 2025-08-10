import React, { useState } from 'react';

function JobForm({ onAddJob }) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    status: 'Applied',
    appliedDate: '',
    notes: '',
    hrDetails: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.company && formData.position) {
      // Format the date properly for MongoDB
      const jobData = {
        ...formData,
        appliedDate: formData.appliedDate ? new Date(formData.appliedDate).toISOString() : new Date().toISOString()
      };
      
      onAddJob(jobData);
      setFormData({
        company: '',
        position: '',
        location: '',
        status: 'Applied',
        appliedDate: '',
        notes: '',
        hrDetails: ''
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="job-form">
      <h2>Add New Job Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="company">Company *</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="position">Position *</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="appliedDate">Applied Date</label>
          <input
            type="date"
            id="appliedDate"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="hrDetails">HR Details</label>
          <textarea
            id="hrDetails"
            name="hrDetails"
            value={formData.hrDetails}
            onChange={handleChange}
            rows="3"
            placeholder="Enter HR contact details, interview notes, or any HR-related information..."
          />
        </div>

        <button type="submit" className="submit-btn">Add Job</button>
      </form>
    </div>
  );
}

export default JobForm;
