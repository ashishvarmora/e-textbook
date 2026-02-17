require('dotenv').config();
const mongoose = require('mongoose');
const Subject = require('./models/Subject');
const Chapter = require('./models/Chapter');
const Topic = require('./models/Topic');
const Note = require('./models/Note');

// Sample data
const sampleData = {
  subjects: [
    { name: 'Mathematics', description: 'Advanced mathematics and calculus' },
    { name: 'Computer Science', description: 'Programming and algorithms' },
    { name: 'Physics', description: 'Classical and modern physics' }
  ],
  chapters: {
    'Mathematics': ['Calculus', 'Linear Algebra', 'Statistics'],
    'Computer Science': ['Data Structures', 'Algorithms', 'Web Development'],
    'Physics': ['Mechanics', 'Thermodynamics', 'Electromagnetism']
  },
  topics: {
    'Calculus': ['Derivatives', 'Integrals', 'Limits'],
    'Data Structures': ['Arrays', 'Linked Lists', 'Trees', 'Graphs'],
    'Mechanics': ['Kinematics', 'Dynamics', 'Energy']
  },
  notes: {
    'Derivatives': 'The derivative represents the rate of change of a function. Key rules:\n- Power rule: d/dx(x^n) = nx^(n-1)\n- Product rule: d/dx(uv) = u\'v + uv\'\n- Chain rule: d/dx(f(g(x))) = f\'(g(x))g\'(x)',
    'Arrays': 'Arrays are contiguous memory locations storing elements of the same type.\n\nTime Complexity:\n- Access: O(1)\n- Search: O(n)\n- Insert: O(n)\n- Delete: O(n)\n\nBest for: Random access, fixed size collections',
    'Kinematics': 'Kinematics studies motion without considering forces.\n\nKey equations:\n- v = u + at\n- s = ut + (1/2)at²\n- v² = u² + 2as\n\nWhere:\nu = initial velocity\nv = final velocity\na = acceleration\nt = time\ns = displacement'
  }
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Clear existing data
const clearData = async () => {
  await Note.deleteMany({});
  await Topic.deleteMany({});
  await Chapter.deleteMany({});
  await Subject.deleteMany({});
  console.log('Existing data cleared');
};

// Seed data
const seedData = async () => {
  try {
    await connectDB();
    await clearData();

    console.log('Seeding subjects...');
    const subjects = await Subject.insertMany(sampleData.subjects);
    console.log(`Created ${subjects.length} subjects`);

    console.log('Seeding chapters...');
    let chapterCount = 0;
    for (const subject of subjects) {
      const chapterTitles = sampleData.chapters[subject.name];
      if (chapterTitles) {
        const chapters = chapterTitles.map(title => ({
          subjectId: subject._id,
          title
        }));
        await Chapter.insertMany(chapters);
        chapterCount += chapters.length;
      }
    }
    console.log(`Created ${chapterCount} chapters`);

    console.log('Seeding topics...');
    let topicCount = 0;
    const allChapters = await Chapter.find();
    for (const chapter of allChapters) {
      const topicTitles = sampleData.topics[chapter.title];
      if (topicTitles) {
        const topics = topicTitles.map(title => ({
          chapterId: chapter._id,
          title
        }));
        await Topic.insertMany(topics);
        topicCount += topics.length;
      }
    }
    console.log(`Created ${topicCount} topics`);

    console.log('Seeding notes...');
    let noteCount = 0;
    const allTopics = await Topic.find();
    for (const topic of allTopics) {
      const noteContent = sampleData.notes[topic.title];
      if (noteContent) {
        await Note.create({
          topicId: topic._id,
          content: noteContent
        });
        noteCount++;
      }
    }
    console.log(`Created ${noteCount} notes`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSummary:');
    console.log(`- ${subjects.length} subjects`);
    console.log(`- ${chapterCount} chapters`);
    console.log(`- ${topicCount} topics`);
    console.log(`- ${noteCount} notes`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedData();
