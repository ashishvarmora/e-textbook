const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Note = require('../models/Note');

// Get all chapters for a subject
router.get('/subject/:subjectId', async (req, res) => {
  try {
    const chapters = await Chapter.find({ subjectId: req.params.subjectId }).sort({ createdAt: -1 });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single chapter
router.get('/:id', async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id).populate('subjectId');
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create chapter
router.post('/', async (req, res) => {
  const chapter = new Chapter({
    subjectId: req.body.subjectId,
    title: req.body.title
  });

  try {
    const newChapter = await chapter.save();
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update chapter
router.put('/:id', async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    if (req.body.title) chapter.title = req.body.title;

    const updatedChapter = await chapter.save();
    res.json(updatedChapter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete chapter (cascade delete topics and notes)
router.delete('/:id', async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    // Find all topics for this chapter
    const topics = await Topic.find({ chapterId: req.params.id });
    const topicIds = topics.map(t => t._id);

    // Delete all related data
    await Topic.deleteMany({ chapterId: req.params.id });
    if (topicIds.length > 0) {
      await Note.deleteMany({ topicId: { $in: topicIds } });
    }

    await chapter.deleteOne();
    res.json({ message: 'Chapter and related data deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
