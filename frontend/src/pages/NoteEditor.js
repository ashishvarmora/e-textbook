import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopic, getNotesByTopic, createNote, updateNote, deleteNote } from '../services/api';
import Loading from '../components/Loading';
import './NoteEditor.css';

const NoteEditor = () => {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [topicId]);

  const fetchData = async () => {
    try {
      const [topicRes, notesRes] = await Promise.all([
        getTopic(topicId),
        getNotesByTopic(topicId)
      ]);
      setTopic(topicRes.data);
      setNotes(notesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('Note content is required');
      return;
    }
    try {
      if (editingNote) {
        await updateNote(editingNote._id, { content });
        setEditingNote(null);
      } else {
        await createNote({ topicId, content });
      }
      setContent('');
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note');
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setContent(note.content);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this note?')) {
      try {
        await deleteNote(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingNote(null);
    setContent('');
  };

  if (loading) return <Loading />;

  return (
    <div className="note-editor">
      <div className="breadcrumb">
        <button onClick={() => navigate('/')}>Subjects</button>
        <span> / </span>
        <button onClick={() => navigate(`/subject/${topic?.chapterId?.subjectId}`)}>
          Subject
        </button>
        <span> / </span>
        <button onClick={() => navigate(`/chapter/${topic?.chapterId?._id}`)}>
          {topic?.chapterId?.title || 'Chapter'}
        </button>
        <span> / </span>
        <span>{topic?.title}</span>
      </div>

      <div className="page-header">
        <h1>{topic?.title}</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Note'}
        </button>
      </div>

      {showForm && (
        <form className="form-card" onSubmit={handleSubmit}>
          <h3>{editingNote ? 'Edit Note' : 'Create New Note'}</h3>
          <textarea
            placeholder="Write your notes here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            required
          />
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingNote ? 'Update Note' : 'Create Note'}
            </button>
            {editingNote && (
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      )}

      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="empty-message">No notes yet. Create your first note!</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="note-card">
              <div className="note-content">
                <pre>{note.content}</pre>
              </div>
              <div className="note-meta">
                <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
                {note.updatedAt !== note.createdAt && (
                  <span> | Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
                )}
              </div>
              <div className="note-actions">
                <button className="btn-edit" onClick={() => handleEdit(note)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(note._id)}>
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

export default NoteEditor;
