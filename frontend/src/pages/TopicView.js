import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChapter, getTopicsByChapter, createTopic, deleteTopic } from '../services/api';
import Loading from '../components/Loading';
import './TopicView.css';

const TopicView = () => {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [chapterId]);

  const fetchData = async () => {
    try {
      const [chapterRes, topicsRes] = await Promise.all([
        getChapter(chapterId),
        getTopicsByChapter(chapterId)
      ]);
      setChapter(chapterRes.data);
      setTopics(topicsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Topic title is required');
      return;
    }
    try {
      await createTopic({ chapterId, title });
      setTitle('');
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating topic:', error);
      alert('Failed to create topic');
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete topic "${title}" and all its notes?`)) {
      try {
        await deleteTopic(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting topic:', error);
        alert('Failed to delete topic');
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="topic-view">
      <div className="breadcrumb">
        <button onClick={() => navigate('/')}>Subjects</button>
        <span> / </span>
        <button onClick={() => navigate(`/subject/${chapter?.subjectId}`)}>
          {chapter?.subjectId?.name || 'Subject'}
        </button>
        <span> / </span>
        <span>{chapter?.title}</span>
      </div>

      <div className="page-header">
        <h1>{chapter?.title}</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Topic'}
        </button>
      </div>

      {showForm && (
        <form className="form-card" onSubmit={handleSubmit}>
          <h3>Create New Topic</h3>
          <input
            type="text"
            placeholder="Topic Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Create Topic</button>
        </form>
      )}

      <div className="cards-grid">
        {topics.length === 0 ? (
          <p className="empty-message">No topics yet. Create your first topic!</p>
        ) : (
          topics.map((topic) => (
            <div key={topic._id} className="card">
              <h3>{topic.title}</h3>
              <div className="card-actions">
                <button 
                  className="btn-view" 
                  onClick={() => navigate(`/topic/${topic._id}`)}
                >
                  View Notes
                </button>
                <button 
                  className="btn-delete" 
                  onClick={() => handleDelete(topic._id, topic.title)}
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

export default TopicView;
