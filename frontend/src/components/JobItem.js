import React, { useState } from 'react';

function JobItem({ job, isEditing, onEdit, onSave, onCancel, onDelete }) {
  const [editData, setEditData] = useState(job);

  const handleSave = () => {
    // Format the date properly for MongoDB
    const formattedData = {
      ...editData,
      appliedDate: editData.appliedDate ? new Date(editData.appliedDate).toISOString() : new Date().toISOString()
    };
    onSave(formattedData);
  };

  const handleCancel = () => {
    setEditData(job);
    onCancel();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'status-applied';
      case 'Interviewing': return 'status-interviewing';
      case 'Offered': return 'status-offered';
      case 'Rejected': return 'status-rejected';
      default: return 'status-applied';
    }
  };

  if (isEditing) {
    return (
      <div className="job-item editing">
        <div className="edit-form">
          <div className="form-row">
            <div className="form-group">
              <label>Company:</label>
              <input
                type="text"
                value={editData.company}
                onChange={(e) => setEditData({...editData, company: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Position:</label>
              <input
                type="text"
                value={editData.position}
                onChange={(e) => setEditData({...editData, position: e.target.value})}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                value={editData.location}
                onChange={(e) => setEditData({...editData, location: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select
                value={editData.status}
                onChange={(e) => setEditData({...editData, status: e.target.value})}
              >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          
                      <div className="form-row">
            <div className="form-group">
              <label>Applied Date:</label>
              <input
                type="date"
                value={editData.appliedDate ? new Date(editData.appliedDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setEditData({...editData, appliedDate: e.target.value})}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Notes:</label>
            <textarea
              value={editData.notes}
              onChange={(e) => setEditData({...editData, notes: e.target.value})}
              rows="2"
            />
          </div>
          
          <div className="form-group">
            <label>HR Details:</label>
            <textarea
              value={editData.hrDetails || ''}
              onChange={(e) => setEditData({ ...editData, hrDetails: e.target.value })}
              rows="2"
              placeholder="HR contact details, interview notes..."
            />
          </div>

          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">Save</button>
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="job-item">
      <div className="job-header">
        <h3>{job.position}</h3>
        <span className={`status ${getStatusColor(job.status)}`}>
          {job.status}
        </span>
      </div>
      
      <div className="job-details">
        <p><strong>Company:</strong> {job.company}</p>
        {job.location && <p><strong>Location:</strong> {job.location}</p>}
        {job.appliedDate && <p><strong>Applied:</strong> {new Date(job.appliedDate).toLocaleDateString()}</p>}
        {job.notes && <p><strong>Notes:</strong> {job.notes}</p>}
        {job.hrDetails && <p><strong>HR Details:</strong> {job.hrDetails}</p>}
      </div>
      
      <div className="job-actions">
        <button onClick={onEdit} className="edit-btn">Edit</button>
        <button onClick={onDelete} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

export default JobItem;
