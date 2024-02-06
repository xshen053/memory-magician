
# Table of Contents

- [API Efficiency](#linkedlist)
- [useEffect](#useEffect)


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





# some apis are unexpected called twice (race condition in development mode)

Strict Mode in React:

If your application is running in React's strict mode (<React.StrictMode>), certain lifecycle methods including useEffect are intentionally invoked twice in development mode to help find problems in your code. This does not happen in production builds. If this is the case, the function being called twice should only be an issue during development.

## Bug2

```

I have the same issue stuck forever in the loop of

🛑 ["Index: 1 State: {\"preRollback\":\"previousDeploymentReadyCheck\"} Message: Resource is not in the state stackUpdateComplete"]

```

solution


i found the solution. I got the same error due to want to change the primary key, so did what they amplify told me, to use --allow-destructive-graphql-schema-updates , heck it failed, then i just delete the tables in the schema ( the one i want to change the primary key), push to the cloud, then after it finished, put back the table, push again, it worked

# useEffect


when using useEffect to call function?

`setState` doesn't function immediately


## why reviewDates are both []?

```Javascript
  console.log(reviewDates)
    if (reviewDates.length === 0) {
      const rd = generateAllReviewDates(todayDate)
      console.log("print")
      setReviewDates(rd)
    }
    console.log(reviewDates) why reviewDates is empty
```


> In React, state updates using the useState hook are asynchronous. This means when you call setReviewDates(rd), the state reviewDates doesn't update immediately. Instead, the update is scheduled, and the new value will be available on the next render of the component.


# After add a memory, if directly mark it, it will error


`getOneCardUserFromUserIDCardID` this function has problem

## Solution 
still need use nextToken to make sure fetch all the data

# Bug

```
"The conditional request failed (Service: DynamoDb, Status Code: 400, Request ID: NRERAH310V1E9A9O00GKTNPPF3VV4KQNSO5AEMVJF66Q9ASUAAJG)"
path
```

when doing a mutation

## Solution

didn't pass the correct id, I pass a cardid instead of a usercardid

it doesn't exist in the table!! after I passed the correct id, it works




