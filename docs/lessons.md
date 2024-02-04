

# API Efficiency

If the dataset is large, consider enhancing the GraphQL API to allow for more specific queries, reducing the need for client-side filtering.

# When trying to create mutliple queries at once


# many to many aws 语法


# many to one

有些系统设计成many-to-many不影响，但会简化一些步骤

many-to-one 是many-to-many的子集


# 数据库的设计

如果设计成原来的样子，结果就是

- 第一遍先查出所有的card
- 然后第二遍card再查所有的review date

但如果变成many-to-many

- 直接查jointable，通过userID就可以获得所有的card和reviewdate

# how to query using non-primary field?

- add @index in table in schema.graphql
e.g.

```graphql
type UserCards @model {
  id: ID!
  userID: ID! @index(name: "byUser", sortKeyFields: ["cardID"])
  cardID: ID! @index(name: "byCard", sortKeyFields: ["userID"])
  user: User @belongsTo(fields: ["userID"])
  card: Card @belongsTo(fields: ["cardID"])
  number: Int          # the ith time to review
  isReviewed: Boolean 
  reviewDuration: Int
  reviewDate: AWSDateTime
}
```

- query.js generates corresponding query
- can be directly use!





