# 🏗️ Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                     http://localhost:3000                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Requests
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Sidebar    │  │  Dashboard   │  │ ChapterView  │      │
│  │  Component   │  │     Page     │  │     Page     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  TopicView   │  │  NoteEditor  │  │   Loading    │      │
│  │     Page     │  │     Page     │  │  Component   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌─────────────────────────────────────────────────┐        │
│  │              API Service (Axios)                 │        │
│  │  - getSubjects()    - createSubject()           │        │
│  │  - getChapters()    - createChapter()           │        │
│  │  - getTopics()      - createTopic()             │        │
│  │  - getNotes()       - createNote()              │        │
│  └─────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Axios HTTP Calls
                              │ http://localhost:5000/api
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   EXPRESS BACKEND                            │
│  ┌─────────────────────────────────────────────────┐        │
│  │                  server.js                       │        │
│  │  - CORS middleware                               │        │
│  │  - JSON parser                                   │        │
│  │  - Route mounting                                │        │
│  │  - Error handling                                │        │
│  └─────────────────────────────────────────────────┘        │
│                              │                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   subjects   │  │   chapters   │  │    topics    │      │
│  │    routes    │  │    routes    │  │    routes    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐                                           │
│  │    notes     │                                           │
│  │    routes    │                                           │
│  └──────────────┘                                           │
│                              │                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Subject    │  │   Chapter    │  │    Topic     │      │
│  │    Model     │  │    Model     │  │    Model     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐                                           │
│  │     Note     │                                           │
│  │    Model     │                                           │
│  └──────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Mongoose ODM
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      MONGODB DATABASE                        │
│  ┌─────────────────────────────────────────────────┐        │
│  │         digital-textbook database                │        │
│  │                                                   │        │
│  │  ┌──────────────┐  ┌──────────────┐            │        │
│  │  │   subjects   │  │   chapters   │            │        │
│  │  │  collection  │  │  collection  │            │        │
│  │  └──────────────┘  └──────────────┘            │        │
│  │  ┌──────────────┐  ┌──────────────┐            │        │
│  │  │    topics    │  │    notes     │            │        │
│  │  │  collection  │  │  collection  │            │        │
│  │  └──────────────┘  └──────────────┘            │        │
│  └─────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Creating a Note

```
User Action (Frontend)
    │
    ├─► Click "+ Add Note"
    │
    ├─► Fill form with content
    │
    ├─► Click "Create Note"
    │
    ▼
React Component (NoteEditor.js)
    │
    ├─► handleSubmit()
    │
    ├─► Call API service
    │
    ▼
API Service (api.js)
    │
    ├─► createNote({ topicId, content })
    │
    ├─► POST /api/notes
    │
    ▼
Express Backend (notes.js route)
    │
    ├─► Receive request
    │
    ├─► Validate data
    │
    ├─► Create Note model instance
    │
    ▼
Mongoose Model (Note.js)
    │
    ├─► Validate schema
    │
    ├─► Set timestamps
    │
    ├─► Save to database
    │
    ▼
MongoDB Database
    │
    ├─► Insert document
    │
    ├─► Return saved document
    │
    ▼
Response Flow (Reverse)
    │
    ├─► MongoDB → Mongoose
    │
    ├─► Mongoose → Express
    │
    ├─► Express → API Service
    │
    ├─► API Service → React
    │
    ├─► React updates state
    │
    └─► UI re-renders with new note
```

---

## Component Hierarchy

```
App.js (Router)
│
├─► Sidebar (Always visible)
│   └─► Navigation links
│
└─► Main Content (Route-based)
    │
    ├─► Dashboard (/)
    │   ├─► Subject cards
    │   ├─► Create subject form
    │   └─► Loading component
    │
    ├─► ChapterView (/subject/:id)
    │   ├─► Chapter cards
    │   ├─► Create chapter form
    │   ├─► Breadcrumb navigation
    │   └─► Loading component
    │
    ├─► TopicView (/chapter/:id)
    │   ├─► Topic cards
    │   ├─► Create topic form
    │   ├─► Breadcrumb navigation
    │   └─► Loading component
    │
    └─► NoteEditor (/topic/:id)
        ├─► Note cards
        ├─► Create/edit note form
        ├─► Breadcrumb navigation
        └─► Loading component
```

---

## Database Relationships

```
Subject (1)
    │
    │ has many
    ▼
Chapter (N)
    │
    │ has many
    ▼
Topic (N)
    │
    │ has many
    ▼
Note (N)
```

### Example Data Structure

```javascript
// Subject
{
  _id: "507f1f77bcf86cd799439011",
  name: "Mathematics",
  description: "Advanced mathematics",
  createdAt: "2024-01-01T00:00:00.000Z"
}

// Chapter (references Subject)
{
  _id: "507f1f77bcf86cd799439012",
  subjectId: "507f1f77bcf86cd799439011",  // ← Reference
  title: "Calculus",
  createdAt: "2024-01-01T00:00:00.000Z"
}

// Topic (references Chapter)
{
  _id: "507f1f77bcf86cd799439013",
  chapterId: "507f1f77bcf86cd799439012",  // ← Reference
  title: "Derivatives",
  createdAt: "2024-01-01T00:00:00.000Z"
}

// Note (references Topic)
{
  _id: "507f1f77bcf86cd799439014",
  topicId: "507f1f77bcf86cd799439013",    // ← Reference
  content: "The derivative represents...",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

---

## API Request Flow

### GET Request Example

```
Frontend                Backend              Database
   │                       │                    │
   │  GET /api/subjects    │                    │
   ├──────────────────────►│                    │
   │                       │                    │
   │                       │  Find all subjects │
   │                       ├───────────────────►│
   │                       │                    │
   │                       │  Return documents  │
   │                       │◄───────────────────┤
   │                       │                    │
   │  JSON response        │                    │
   │◄──────────────────────┤                    │
   │                       │                    │
   │  Update UI            │                    │
   └───────────            │                    │
```

### POST Request Example

```
Frontend                Backend              Database
   │                       │                    │
   │  POST /api/subjects   │                    │
   │  { name: "Math" }     │                    │
   ├──────────────────────►│                    │
   │                       │                    │
   │                       │  Validate data     │
   │                       │                    │
   │                       │  Create document   │
   │                       ├───────────────────►│
   │                       │                    │
   │                       │  Return saved doc  │
   │                       │◄───────────────────┤
   │                       │                    │
   │  JSON response        │                    │
   │  { _id, name, ... }   │                    │
   │◄──────────────────────┤                    │
   │                       │                    │
   │  Update UI            │                    │
   └───────────            │                    │
```

---

## Cascade Deletion Flow

```
Delete Subject
    │
    ├─► Find all Chapters with subjectId
    │   │
    │   ├─► For each Chapter:
    │   │   │
    │   │   ├─► Find all Topics with chapterId
    │   │   │   │
    │   │   │   ├─► For each Topic:
    │   │   │   │   │
    │   │   │   │   └─► Delete all Notes with topicId
    │   │   │   │
    │   │   │   └─► Delete all Topics
    │   │   │
    │   │   └─► Delete all Chapters
    │   │
    │   └─► Delete Subject
    │
    └─► Return success message
```

---

## State Management Flow

```
Component State (useState)
    │
    ├─► Initial state: []
    │
    ├─► useEffect on mount
    │   │
    │   ├─► Call API
    │   │
    │   ├─► Set loading: true
    │   │
    │   ├─► Fetch data
    │   │
    │   ├─► Update state with data
    │   │
    │   └─► Set loading: false
    │
    ├─► User action (create/update/delete)
    │   │
    │   ├─► Call API
    │   │
    │   ├─► Wait for response
    │   │
    │   └─► Refresh data (call fetchData again)
    │
    └─► Component re-renders with new state
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL (Frontend)                         │
│              https://your-app.vercel.app                     │
│                                                               │
│  - React build files                                         │
│  - Static hosting                                            │
│  - CDN distribution                                          │
│  - Automatic HTTPS                                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ API Calls
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   RENDER (Backend)                           │
│          https://your-api.onrender.com                       │
│                                                               │
│  - Node.js server                                            │
│  - Express API                                               │
│  - Automatic HTTPS                                           │
│  - Health checks                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Database Connection
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 MONGODB ATLAS (Database)                     │
│                                                               │
│  - Cloud database                                            │
│  - Automatic backups                                         │
│  - Global distribution                                       │
│  - Security & encryption                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│                                                               │
│  React Components, CSS, React Router                         │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│                                                               │
│  React Hooks, State Management, API Service                  │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      API LAYER                               │
│                                                               │
│  Express Routes, Middleware, Controllers                     │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                      │
│                                                               │
│  Mongoose Models, Validation, Business Rules                 │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│                                                               │
│  MongoDB Database, Collections, Documents                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Security Flow

```
Request
    │
    ├─► CORS Check (Backend)
    │   └─► Allow/Deny origin
    │
    ├─► Input Validation (Mongoose)
    │   └─► Schema validation
    │
    ├─► Sanitization (Mongoose)
    │   └─► Prevent injection
    │
    ├─► Business Logic
    │   └─► Process request
    │
    ├─► Error Handling
    │   └─► Safe error messages
    │
    └─► Response
        └─► JSON data
```

---

**This architecture follows industry best practices for scalable, maintainable web applications!** 🏗️
