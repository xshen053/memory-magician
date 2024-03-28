# Goal

The goal of this screen is to provide user all the general memories they have and user can interact with these memories.



# Functionalities

- show memories including following information
  - times reviewed
  - date created
  - content 
  - days since last review
  - last reviewed
  - tags
- review a memory
- Add a memory of any type
- customized sort


# Funtionalities need interaction with backend


> mark a general memory reviewed

```GraphQL
type UserCards @model {
  id: ID!
  userID: ID! @index(name: "byUser", sortKeyFields: ["cardID"])
  cardID: ID! @index(name: "byCard", sortKeyFields: ["userID"])
  user: User @belongsTo(fields: ["userID"])
  card: Card @belongsTo(fields: ["cardID"])
  iteration: Int!                   
  isReviewed: Boolean!              
  reviewDuration: Int               
  lastTimeReviewDuration: Int       
  reviewDate: AWSDateTime
}

```

when it happened?
- A user clicks the checkbox indicating he has reviewed one memory today

What happened 
1. it creates an entry in UserCard(Review) Table with these information
  - User's ID
  - Card's ID
  - Review date in UTC
  - Iteration (the ith time a memory is reviewed)
  - isReviewed set to true  

This is accomplished by calling the `createUserCardsBatchAPI`. For detailed usage, please refer to the corresponding documentation section.

2. it updates that memory entry in Card(memory) table, more specifically
  - it update lastReviewDate to today date (UTC)
  - it increment total reviewed times(total) by 1

This is accomplished by calling `mutateCard`.

3. In frontend, the screen will display a success message
- Failure is undefined behavior



> Add a memory of any type

Please refer to add_memory.md


# Other Funtionalities

> Customized sort

The page offers customized sorting of memories based on various criteria, including review status, date of creation, and content type. This feature allows users to tailor the display of their memories according to their personal preferences or needs.






