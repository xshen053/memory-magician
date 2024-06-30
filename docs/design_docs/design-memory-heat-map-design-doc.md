# Memory-Heat-Map Design Document

## Feature Overview
The memory-heat-map works for general memories. It allows users to intuitively know status of all their general memories. 

The map consists of lots of blocks, each block represent a general memory.

It will be something visually similar to heat map on github. We set green as default. The greener a block is, the more recently the memory should be in the user's mind.

## Why need this feature
User has lots of general memories, he wants to know the progress so far. A visualization is really necessary.


## Requirements
### Functional Requirements
- User should be able to see status of all their general memories through this board
- These blocks are sorted by title of each memory
- When user hovers over a block, it will show following information of that card
  - title
  - last review
  - also, visualize the forgetting curve of the memory
- If user clicks that block, it will open a small window, so that user can check information of that memory, same as 
this page: https://mymemorycompanion.com/ReinforcedMemories

### Non-Functional Requirements
- The board should be responsive and work on desktop


## Funtionalities need interaction with backend


## Design Details
### Architecture
- Frontend: Implemented using React.js
- Backend: AWS Amplify
- Database: AWS Dynamodb

### Data Models
```Graphql
type Card @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  content: String!
  tags: [String]
  type: CardType!         # {daily, general, onetime, periodic}
  total: Int              # total reviewed times
  deleted: Boolean
  link: String
  owner: String
  lastReviewDate: AWSDateTime # this works if it is one-many relationship
  creatorUserID: ID! @index(name: "byCreator", sortKeyFields: ["content"])  # new field
  creator: User @belongsTo(fields: ["creatorUserID"])                          # new field
  users: [UserCards] @hasMany(indexName: "byCard", fields: ["id"])
}
```

### APIs
- **Get All Memories**

- **Get All Memories**
  - `fetchCards`

## Dependencies
- React.js for the frontend
- Node.js and Express for the backend
- MongoDB for the database

## Risk Analysis
- **Risk:** Data loss during note creation or deletion.
  - **Mitigation:** Implement proper error handling and backups.

