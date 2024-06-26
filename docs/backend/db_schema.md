> A doc about how to using GraphQL correctly and ifficently

- when fetching data, using nextToken

```graphql
# This "input" configures a global authorization rule to enable public access to
# all models in this schema. Learn more about authorization rules here: https://docs.amplify.aws/cli/graphql/authorization-rules
input AMPLIFY { globalAuthRule: AuthRule = { allow: public } } # FOR TESTING ONLY!

type User @model {
  cognitoID: ID! @primaryKey
  email: String! @index
  phoneNumber: String
  name: String
  cards: [UserCards] @hasMany(indexName: "byUser", fields: ["cognitoID"])
  createdAt: AWSDateTime
  updatedAt: AWSDateTime
}

type Card @model {
  id: ID!
  content: String!
  tags: [String]
  type: CardType!         # {daily task, don't need review task, general task}
  total: Int              # how many times is needed for this card
  users: [UserCards] @hasMany(indexName: "byCard", fields: ["id"])
}

type UserCards @model {
  id: ID!
  userID: ID! @index(name: "byUser", sortKeyFields: ["cardID"])
  cardID: ID! @index(name: "byCard", sortKeyFields: ["userID"])
  user: User @belongsTo(fields: ["userID"])
  card: Card @belongsTo(fields: ["cardID"])
  iteration: Int!             # the ith time to review
  isReviewed: Boolean! 
  reviewDuration: Int         # in millisecond
  reviewDate: AWSDateTime
}


enum CardType {
 DAILY
 GENERAL
 NOREVIEW
}

```


# when fetching data, using nextToken
