export const getCardsByUser = `
query GetUserAndCards($cognitoID: ID!) {
  getUser(cognitoID: $cognitoID) {
    cognitoID
    name
    email
    cards {
      items {
        card {
          id
          content
          tags
          type
          total
          deleted
        }
      }
    }
  }
}

`;


export const getUserCardByCard = /* GraphQL */ `
  query GetCard($id: ID!) {
    getCard(id: $id) {
      id
      users {
        items {
          id
          userID
          cardID
          iteration
        }
        nextToken
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;



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
          deleted
          createdAt
          updatedAt
          __typename
        }        
        iteration
        isReviewed
        reviewDuration
        reviewDate
        lastTimeReviewDuration
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;



export const listUserCardsCustomized = /* GraphQL */ `
  query ListUserCards(
    $filter: ModelUserCardsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        isReviewed
        reviewDate
        cardID
      }
      nextToken
    }
  }
`;

export const listCardsCustomized = `
query ListCards(
  $filter: ModelCardFilterInput
  $limit: Int
  $nextToken: String
) {
  listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      type
      deleted
    }
    nextToken
    __typename
  }
}
`;
