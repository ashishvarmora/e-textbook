import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ChapterView from './pages/ChapterView';
import TopicView from './pages/TopicView';
import NoteEditor from './pages/NoteEditor';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subject/:subjectId" element={<ChapterView />} />
            <Route path="/chapter/:chapterId" element={<TopicView />} />
            <Route path="/topic/:topicId" element={<NoteEditor />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
