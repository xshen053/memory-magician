# a successful resolver

```graphql
type UserCards @model {
  id: ID!
  userID: ID! @index(name: "byUser", sortKeyFields: ["cardID"])
  cardID: ID! @index(name: "byCard", sortKeyFields: ["userID"])
  user: User @belongsTo(fields: ["userID"])
  card: Card @belongsTo(fields: ["cardID"])
  iteration: Int!                   # the ith time to review
  isReviewed: Boolean! 
  reviewDuration: Int
  lastTimeReviewDuration: Int       # last time review duration, ONETIME Card ignores this feature
  reviewDate: AWSDateTime
}


type Mutation {
  batchCreateReview(reviews: [BatchCreateReview]): [UserCards]
}

input BatchCreateReview {
  id: ID
  userID: String!
  cardID: String!
  reviewDuration: Int             
  lastTimeReviewDuration: Int
  isReviewed: Boolean!
  reviewDate: AWSDateTime
  iteration: Int!
}
```
