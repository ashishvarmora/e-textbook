# Testing Guide

## Quick Test with Sample Data

Want to see the app in action immediately? Use the seed script!

### Step 1: Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digital-textbook
NODE_ENV=development
```

### Step 2: Seed Sample Data

```bash
npm run seed
```

This will create:
- 3 subjects (Mathematics, Computer Science, Physics)
- 9 chapters
- 10 topics
- 3 sample notes

### Step 3: Start Backend

```bash
npm start
```

### Step 4: Start Frontend

Open new terminal:
```bash
cd frontend
npm install
npm start
```

### Step 5: Explore!

Open http://localhost:3000 and you'll see:
- Pre-populated subjects
- Sample chapters and topics
- Example notes with content

---

## Manual Testing Checklist

### ✅ Subject Operations

**Create Subject:**
1. Click "+ Add Subject"
2. Enter name: "Biology"
3. Enter description: "Life sciences"
4. Click "Create Subject"
5. ✓ Subject appears in dashboard

**View Subject:**
1. Click "View Chapters" on any subject
2. ✓ Navigates to chapter view
3. ✓ Shows subject name and description

**Delete Subject:**
1. Click "Delete" on a subject
2. ✓ Confirmation dialog appears
3. Confirm deletion
4. ✓ Subject removed from list

---

### ✅ Chapter Operations

**Create Chapter:**
1. Open any subject
2. Click "+ Add Chapter"
3. Enter title: "Introduction"
4. Click "Create Chapter"
5. ✓ Chapter appears in list

**View Chapter:**
1. Click "View Topics" on any chapter
2. ✓ Navigates to topic view
3. ✓ Shows chapter title

**Delete Chapter:**
1. Click "Delete" on a chapter
2. ✓ Confirmation dialog appears
3. Confirm deletion
4. ✓ Chapter removed from list

---

### ✅ Topic Operations

**Create Topic:**
1. Open any chapter
2. Click "+ Add Topic"
3. Enter title: "Overview"
4. Click "Create Topic"
5. ✓ Topic appears in list

**View Topic:**
1. Click "View Notes" on any topic
2. ✓ Navigates to note editor
3. ✓ Shows topic title

**Delete Topic:**
1. Click "Delete" on a topic
2. ✓ Confirmation dialog appears
3. Confirm deletion
4. ✓ Topic removed from list

---

### ✅ Note Operations

**Create Note:**
1. Open any topic
2. Click "+ Add Note"
3. Enter content in textarea
4. Click "Create Note"
5. ✓ Note appears in list
6. ✓ Shows creation timestamp

**Edit Note:**
1. Click "Edit" on any note
2. ✓ Form appears with existing content
3. Modify content
4. Click "Update Note"
5. ✓ Note updated
6. ✓ Shows updated timestamp

**Delete Note:**
1. Click "Delete" on a note
2. ✓ Confirmation dialog appears
3. Confirm deletion
4. ✓ Note removed from list

---

### ✅ Navigation

**Breadcrumb Navigation:**
1. Navigate deep into hierarchy (Subject → Chapter → Topic)
2. Click breadcrumb links
3. ✓ Navigates back correctly
4. ✓ Data persists

**Sidebar Navigation:**
1. Click "Dashboard" in sidebar
2. ✓ Returns to subject list
3. ✓ All data intact

---

### ✅ UI/UX

**Loading States:**
1. Refresh any page
2. ✓ Loading spinner appears
3. ✓ Content loads smoothly

**Empty States:**
1. Create new subject with no chapters
2. ✓ Shows "No chapters yet" message
3. ✓ Helpful prompt to create first item

**Form Validation:**
1. Try to submit empty form
2. ✓ Validation error appears
3. ✓ Form doesn't submit

**Responsive Design:**
1. Resize browser window
2. ✓ Layout adapts
3. ✓ All features accessible

---

## API Testing with Postman/Thunder Client

### Base URL
```
http://localhost:5000/api
```

### Test Endpoints

**1. Create Subject**
```
POST /subjects
Body: {
  "name": "Chemistry",
  "description": "Chemical reactions and compounds"
}
```

**2. Get All Subjects**
```
GET /subjects
```

**3. Get Single Subject**
```
GET /subjects/:id
```

**4. Update Subject**
```
PUT /subjects/:id
Body: {
  "name": "Advanced Chemistry",
  "description": "Updated description"
}
```

**5. Delete Subject**
```
DELETE /subjects/:id
```

**6. Create Chapter**
```
POST /chapters
Body: {
  "subjectId": "subject_id_here",
  "title": "Chapter 1"
}
```

**7. Get Chapters by Subject**
```
GET /chapters/subject/:subjectId
```

**8. Create Topic**
```
POST /topics
Body: {
  "chapterId": "chapter_id_here",
  "title": "Topic 1"
}
```

**9. Get Topics by Chapter**
```
GET /topics/chapter/:chapterId
```

**10. Create Note**
```
POST /notes
Body: {
  "topicId": "topic_id_here",
  "content": "This is my note content"
}
```

**11. Get Notes by Topic**
```
GET /notes/topic/:topicId
```

---

## Database Testing

### MongoDB Compass

1. Download MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `digital-textbook`
4. View collections:
   - subjects
   - chapters
   - topics
   - notes

### Verify Relationships

**Check Subject → Chapter relationship:**
```javascript
// In MongoDB shell or Compass
db.chapters.find({ subjectId: ObjectId("subject_id_here") })
```

**Check cascade deletion:**
1. Note the IDs of chapters under a subject
2. Delete the subject via API or UI
3. Verify chapters are also deleted
4. Verify topics and notes are deleted

---

## Performance Testing

### Load Testing

**Test with multiple subjects:**
1. Create 50+ subjects
2. ✓ Dashboard loads quickly
3. ✓ Scrolling is smooth

**Test with large notes:**
1. Create note with 10,000+ characters
2. ✓ Saves successfully
3. ✓ Loads without lag
4. ✓ Edits smoothly

---

## Error Handling Testing

**Network Errors:**
1. Stop backend server
2. Try to create subject
3. ✓ Error message appears
4. ✓ App doesn't crash

**Invalid Data:**
1. Try to access non-existent ID
2. ✓ Handles gracefully
3. ✓ Shows appropriate message

**Database Errors:**
1. Stop MongoDB
2. Try to fetch data
3. ✓ Backend handles error
4. ✓ Returns error response

---

## Browser Compatibility

Test on:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

---

## Mobile Testing

Test on mobile devices:
1. Open on phone browser
2. ✓ Responsive layout
3. ✓ Touch interactions work
4. ✓ Forms are usable

---

## Reset Database

To start fresh:

```bash
cd backend
npm run seed
```

Or manually:
```javascript
// In MongoDB shell
use digital-textbook
db.dropDatabase()
```

---

## Common Issues & Solutions

**Issue: Can't create subject**
- Check backend is running
- Check MongoDB is connected
- Check browser console for errors

**Issue: Data not appearing**
- Refresh the page
- Check API response in Network tab
- Verify data exists in database

**Issue: Delete not working**
- Check confirmation dialog appears
- Check browser console
- Verify cascade deletion in database

---

## Test Coverage

- ✅ CRUD operations for all entities
- ✅ Navigation and routing
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ Cascade deletion
- ✅ Timestamps
- ✅ Responsive design

---

**Happy Testing! 🧪**
