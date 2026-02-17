# Digital Textbook / Notes Manager

A full-stack web application for managing personal study notes with a hierarchical structure: Subjects → Chapters → Topics → Notes.

## Tech Stack

- **Frontend**: React 18 (functional components + hooks)
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose ODM)
- **API Communication**: Axios
- **Routing**: React Router v6

## Features

✅ Create, Read, Update, Delete (CRUD) operations for all entities
✅ Hierarchical structure: Subject → Chapter → Topic → Notes
✅ Rich text notes with timestamps
✅ Responsive dashboard layout
✅ Sidebar navigation
✅ Confirmation dialogs before deletion
✅ Loading states
✅ RESTful API design
✅ Cascade deletion (deleting a subject removes all related data)

## Project Structure

```
digital-textbook/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── Subject.js         # Subject schema
│   │   ├── Chapter.js         # Chapter schema
│   │   ├── Topic.js           # Topic schema
│   │   └── Note.js            # Note schema
│   ├── routes/
│   │   ├── subjects.js        # Subject CRUD routes
│   │   ├── chapters.js        # Chapter CRUD routes
│   │   ├── topics.js          # Topic CRUD routes
│   │   └── notes.js           # Note CRUD routes
│   ├── .env.example           # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js              # Express server entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.js     # Navigation sidebar
    │   │   ├── Sidebar.css
    │   │   ├── Loading.js     # Loading spinner
    │   │   └── Loading.css
    │   ├── pages/
    │   │   ├── Dashboard.js   # Subjects list
    │   │   ├── Dashboard.css
    │   │   ├── ChapterView.js # Chapters list
    │   │   ├── ChapterView.css
    │   │   ├── TopicView.js   # Topics list
    │   │   ├── TopicView.css
    │   │   ├── NoteEditor.js  # Notes editor
    │   │   └── NoteEditor.css
    │   ├── services/
    │   │   └── api.js         # Axios API calls
    │   ├── App.js             # Main app with routing
    │   ├── App.css
    │   ├── index.js           # React entry point
    │   └── index.css
    ├── .env.example
    ├── .gitignore
    └── package.json
```

## Local Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Edit `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digital-textbook
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/digital-textbook?retryWrites=true&w=majority
```

5. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Edit `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Subjects
- `GET /api/subjects` - Get all subjects
- `GET /api/subjects/:id` - Get single subject
- `POST /api/subjects` - Create subject
- `PUT /api/subjects/:id` - Update subject
- `DELETE /api/subjects/:id` - Delete subject (cascade)

### Chapters
- `GET /api/chapters/subject/:subjectId` - Get chapters by subject
- `GET /api/chapters/:id` - Get single chapter
- `POST /api/chapters` - Create chapter
- `PUT /api/chapters/:id` - Update chapter
- `DELETE /api/chapters/:id` - Delete chapter (cascade)

### Topics
- `GET /api/topics/chapter/:chapterId` - Get topics by chapter
- `GET /api/topics/:id` - Get single topic
- `POST /api/topics` - Create topic
- `PUT /api/topics/:id` - Update topic
- `DELETE /api/topics/:id` - Delete topic (cascade)

### Notes
- `GET /api/notes/topic/:topicId` - Get notes by topic
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## Database Schema

### Subject
```javascript
{
  name: String (required),
  description: String,
  createdAt: Date
}
```

### Chapter
```javascript
{
  subjectId: ObjectId (ref: Subject, required),
  title: String (required),
  createdAt: Date
}
```

### Topic
```javascript
{
  chapterId: ObjectId (ref: Chapter, required),
  title: String (required),
  createdAt: Date
}
```

### Note
```javascript
{
  topicId: ObjectId (ref: Topic, required),
  content: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Backend Deployment (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `PORT`: 5000 (or leave empty, Render will assign)
     - `NODE_ENV`: production

### Frontend Deployment (Vercel)

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: build
   - **Environment Variables**:
     - `REACT_APP_API_URL`: Your Render backend URL (e.g., `https://your-app.onrender.com/api`)

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get connection string and add to backend `.env`

## Usage Guide

1. **Create a Subject**: Click "+ Add Subject" on the dashboard
2. **Add Chapters**: Click on a subject, then "+ Add Chapter"
3. **Add Topics**: Click on a chapter, then "+ Add Topic"
4. **Write Notes**: Click on a topic, then "+ Add Note"
5. **Edit Notes**: Click "Edit" on any note to modify
6. **Delete**: Use delete buttons (confirmation required)

## Features Explained

### Cascade Deletion
When you delete a subject, all related chapters, topics, and notes are automatically deleted.

### Breadcrumb Navigation
Navigate back through the hierarchy using breadcrumb links at the top of each page.

### Timestamps
Notes show creation and last update timestamps.

### Responsive Design
Works on desktop, tablet, and mobile devices.

## Troubleshooting

### Backend won't start
- Check MongoDB is running (if local)
- Verify `.env` file exists and has correct values
- Check port 5000 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Check CORS is enabled in backend

### Database connection error
- Verify MongoDB connection string
- Check network access in MongoDB Atlas
- Ensure database user credentials are correct

## Future Enhancements

- User authentication and authorization
- Rich text editor (WYSIWYG)
- File attachments
- Search functionality
- Tags and categories
- Export notes to PDF
- Dark mode
- Collaborative features

## License

MIT

## Author

Your Name

---

**Happy Learning! 📚**
#   e - t e x t b o o k  
 