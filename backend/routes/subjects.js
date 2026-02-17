const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const Chapter = require('../models/Chapter');

// Get all subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single subject
router.get('/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create subject
router.post('/', async (req, res) => {
  const subject = new Subject({
    name: req.body.name,
    description: req.body.description
  });

  try {
    const newSubject = await subject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update subject
router.put('/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });

    if (req.body.name) subject.name = req.body.name;
    if (req.body.description !== undefined) subject.description = req.body.description;

    const updatedSubject = await subject.save();
    res.json(updatedSubject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete subject (cascade delete chapters, topics, notes)
router.delete('/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });

    // Find all chapters for this subject
    const chapters = await Chapter.find({ subjectId: req.params.id });
    const chapterIds = chapters.map(ch => ch._id);

    // Delete all related data
    await Chapter.deleteMany({ subjectId: req.params.id });
    
    if (chapterIds.length > 0) {
      const Topic = require('../models/Topic');
      const Note = require('../models/Note');
      const topics = await Topic.find({ chapterId: { $in: chapterIds } });
      const topicIds = topics.map(t => t._id);
      
      await Topic.deleteMany({ chapterId: { $in: chapterIds } });
      if (topicIds.length > 0) {
        await Note.deleteMany({ topicId: { $in: topicIds } });
      }
    }

    await subject.deleteOne();
    res.json({ message: 'Subject and related data deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
