import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubject, getChaptersBySubject, createChapter, deleteChapter } from '../services/api';
import Loading from '../components/Loading';
import './ChapterView.css';

const ChapterView = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId]);

  const fetchData = async () => {
    try {
      const [subjectRes, chaptersRes] = await Promise.all([
        getSubject(subjectId),
        getChaptersBySubject(subjectId)
      ]);
      setSubject(subjectRes.data);
      setChapters(chaptersRes.data);
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
      alert('Chapter title is required');
      return;
    }
    try {
      await createChapter({ subjectId, title });
      setTitle('');
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating chapter:', error);
      alert('Failed to create chapter');
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete chapter "${title}" and all its content?`)) {
      try {
        await deleteChapter(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting chapter:', error);
        alert('Failed to delete chapter');
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="chapter-view">
      <div className="breadcrumb">
        <button onClick={() => navigate('/')}>← Back to Subjects</button>
      </div>

      <div className="page-header">
        <div>
          <h1>{subject?.name}</h1>
          <p className="subtitle">{subject?.description}</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Chapter'}
        </button>
      </div>

      {showForm && (
        <form className="form-card" onSubmit={handleSubmit}>
          <h3>Create New Chapter</h3>
          <input
            type="text"
            placeholder="Chapter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Create Chapter</button>
        </form>
      )}

      <div className="cards-grid">
        {chapters.length === 0 ? (
          <p className="empty-message">No chapters yet. Create your first chapter!</p>
        ) : (
          chapters.map((chapter) => (
            <div key={chapter._id} className="card">
              <h3>{chapter.title}</h3>
              <div className="card-actions">
                <button 
                  className="btn-view" 
                  onClick={() => navigate(`/chapter/${chapter._id}`)}
                >
                  View Topics
                </button>
                <button 
                  className="btn-delete" 
                  onClick={() => handleDelete(chapter._id, chapter.title)}
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

export default ChapterView;
