import React, { useState, useEffect } from 'react';
import './App.css';
import './components.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './components/Auth';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import JobStats from './components/JobStats';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function AppContent() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  const { user, token, logout, isAuthenticated } = useAuth();

  // Fetch jobs from API when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchJobs();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else if (response.status === 401) {
        // Token expired or invalid
        logout();
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addJob = async (job) => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(job),
      });
      
      if (response.ok) {
        const savedJob = await response.json();
        setJobs([...jobs, savedJob]);
      } else if (response.status === 401) {
        logout();
      } else {
        const errorData = await response.json();
        console.error('Error adding job:', errorData.message);
        alert(`Failed to add job: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding job:', error);
      alert('Failed to add job. Please check your connection and try again.');
    }
  };

  const updateJob = async (id, updatedJob) => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedJob),
      });
      
      if (response.ok) {
        const savedJob = await response.json();
        setJobs(jobs.map(job => job._id === id ? savedJob : job));
      } else if (response.status === 401) {
        logout();
      } else {
        const errorData = await response.json();
        console.error('Error updating job:', errorData.message);
        alert(`Failed to update job: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job. Please check your connection and try again.');
    }
  };

  const deleteJob = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setJobs(jobs.filter(job => job._id !== id));
      } else if (response.status === 401) {
        logout();
      } else {
        const errorData = await response.json();
        console.error('Error deleting job:', errorData.message);
        alert(`Failed to delete job: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job. Please check your connection and try again.');
    }
  };

  const handleLogout = () => {
    logout();
    setJobs([]);
    setFilter('all');
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Show authentication if not logged in
  if (!isAuthenticated) {
    return <Auth />;
  }

  // Show main app if authenticated
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Job Tracker</h1>
          <div className="user-info">
            <span>Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <JobForm onAddJob={addJob} />
        <JobStats jobs={jobs} />
        <JobList 
          jobs={jobs}
          filter={filter}
          onFilterChange={setFilter}
          onUpdateJob={updateJob}
          onDeleteJob={deleteJob}
        />
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
