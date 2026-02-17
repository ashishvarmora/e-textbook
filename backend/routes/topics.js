const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const Note = require('../models/Note');

// Get all topics for a chapter
router.get('/chapter/:chapterId', async (req, res) => {
  try {
    const topics = await Topic.find({ chapterId: req.params.chapterId }).sort({ createdAt: -1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single topic
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id).populate('chapterId');
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create topic
router.post('/', async (req, res) => {
  const topic = new Topic({
    chapterId: req.body.chapterId,
    title: req.body.title
  });

  try {
    const newTopic = await topic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update topic
router.put('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });

    if (req.body.title) topic.title = req.body.title;

    const updatedTopic = await topic.save();
    res.json(updatedTopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete topic (cascade delete notes)
router.delete('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });

    // Delete all notes for this topic
    await Note.deleteMany({ topicId: req.params.id });

    await topic.deleteOne();
    res.json({ message: 'Topic and related notes deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
