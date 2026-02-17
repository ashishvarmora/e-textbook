import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Subject API calls
export const getSubjects = () => api.get('/subjects');
export const getSubject = (id) => api.get(`/subjects/${id}`);
export const createSubject = (data) => api.post('/subjects', data);
export const updateSubject = (id, data) => api.put(`/subjects/${id}`, data);
export const deleteSubject = (id) => api.delete(`/subjects/${id}`);

// Chapter API calls
export const getChaptersBySubject = (subjectId) => api.get(`/chapters/subject/${subjectId}`);
export const getChapter = (id) => api.get(`/chapters/${id}`);
export const createChapter = (data) => api.post('/chapters', data);
export const updateChapter = (id, data) => api.put(`/chapters/${id}`, data);
export const deleteChapter = (id) => api.delete(`/chapters/${id}`);

// Topic API calls
export const getTopicsByChapter = (chapterId) => api.get(`/topics/chapter/${chapterId}`);
export const getTopic = (id) => api.get(`/topics/${id}`);
export const createTopic = (data) => api.post('/topics', data);
export const updateTopic = (id, data) => api.put(`/topics/${id}`, data);
export const deleteTopic = (id) => api.delete(`/topics/${id}`);

// Note API calls
export const getNotesByTopic = (topicId) => api.get(`/notes/topic/${topicId}`);
export const getNote = (id) => api.get(`/notes/${id}`);
export const createNote = (data) => api.post('/notes', data);
export const updateNote = (id, data) => api.put(`/notes/${id}`, data);
export const deleteNote = (id) => api.delete(`/notes/${id}`);

export default api;
