import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubjects, createSubject, deleteSubject } from '../services/api';
import Loading from '../components/Loading';
import './Dashboard.css';

const Dashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      alert('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Subject name is required');
      return;
    }
    try {
      await createSubject(formData);
      setFormData({ name: '', description: '' });
      setShowForm(false);
      fetchSubjects();
    } catch (error) {
      console.error('Error creating subject:', error);
      alert('Failed to create subject');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete subject "${name}" and all its content?`)) {
      try {
        await deleteSubject(id);
        fetchSubjects();
      } catch (error) {
        console.error('Error deleting subject:', error);
        alert('Failed to delete subject');
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>My Subjects</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Subject'}
        </button>
      </div>

      {showForm && (
        <form className="form-card" onSubmit={handleSubmit}>
          <h3>Create New Subject</h3>
          <input
            type="text"
            placeholder="Subject Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
          />
          <button type="submit" className="btn-primary">Create Subject</button>
        </form>
      )}

      <div className="cards-grid">
        {subjects.length === 0 ? (
          <p className="empty-message">No subjects yet. Create your first subject!</p>
        ) : (
          subjects.map((subject) => (
            <div key={subject._id} className="card">
              <h3>{subject.name}</h3>
              <p>{subject.description || 'No description'}</p>
              <div className="card-actions">
                <button 
                  className="btn-view" 
                  onClick={() => navigate(`/subject/${subject._id}`)}
                >
                  View Chapters
                </button>
                <button 
                  className="btn-delete" 
                  onClick={() => handleDelete(subject._id, subject.name)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
