
export const userCardsByUserIDAndCardID = /* GraphQL */ `
  query UserCardsByUserIDAndCardID(
    $userID: ID!
    $cardID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserCardsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userCardsByUserIDAndCardID(
      userID: $userID
      cardID: $cardID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        cardID
        card {
          id
          content
          tags
          type
          total
          createdAt
          updatedAt
          __typename
        }        
        iteration
        isReviewed
        reviewDuration
        reviewDate
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
