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
- The color of a block indicates its last review time, user is able to set threshold on their own.
e.g., if user sets a value to be 14.
- It will show color of memories reviewed in past 14 days from a gradient
- But for memories > 14, they will all be transparent

- When user hovers over a block, it will show following information of that card
  - title
  - last reviewed day
- If user clicks a block, it will open a small window, showing information of this memory
  - title
  - last review date
  - review total times
  - a review plot of that memory
- below the heatmap, there will be a summary
  - you reviewed xx% of your general memories (num / total) in the past y days
  - xx% of memories haven't been reviewed in the past y days
  - xx% of memories have never been reviewed since added




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

