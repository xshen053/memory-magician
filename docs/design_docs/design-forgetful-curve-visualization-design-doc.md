# Forgetful Curve Visualization Design Document

## Feature Overview
This is a graph that is automatically generated based on user's review status.


## Why need this feature
User has lots of general memories, he wants to know the progress so far. A visualization is really necessary.


## Requirements
### Functional Requirements
- User should know if he review a memory today, the impact (e.g. decrease forgetful rate from 50% to 30%)
- If the memory is solid enough

### Non-Functional Requirements
- The board should be responsive and work on desktop

## Design Details
### Architecture
- Frontend: Implemented using React.js
- Backend: Node.js with Express
- Database: MongoDB

### Data Models
- **Note**
  - `id`: string (unique identifier)
  - `title`: string
  - `content`: string
  - `tags`: array of strings
  - `created_at`: date
  - `updated_at`: date

### APIs
- **Create Note**
  - `POST /api/notes`
- **Get All Notes**
  - `GET /api/notes`
- **Get Note by ID**
  - `GET /api/notes/:id`
- **Update Note**
  - `PUT /api/notes/:id`
- **Delete Note**
  - `DELETE /api/notes/:id`

## Dependencies
- React.js for the frontend
- Node.js and Express for the backend
- MongoDB for the database

## Risk Analysis
- **Risk:** Data loss during note creation or deletion.
  - **Mitigation:** Implement proper error handling and backups.

