/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($cognitoID: ID!) {
    getUser(cognitoID: $cognitoID) {
      cognitoID
      email
      phoneNumber
      name
      cards {
        nextToken
        __typename
      }
      createdCards {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $cognitoID: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      cognitoID: $cognitoID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        cognitoID
        email
        phoneNumber
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCard = /* GraphQL */ `
  query GetCard($id: ID!) {
    getCard(id: $id) {
      id
      content
      tags
      type
      total
      deleted
      link
      owner
      lastReviewDate
      creatorUserID
      creator {
        cognitoID
        email
        phoneNumber
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      users {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCards = /* GraphQL */ `
  query ListCards(
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        tags
        type
        total
        deleted
        link
        owner
        lastReviewDate
        creatorUserID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserCards = /* GraphQL */ `
  query GetUserCards($id: ID!) {
    getUserCards(id: $id) {
      id
      userID
      cardID
      user {
        cognitoID
        email
        phoneNumber
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      card {
        id
        content
        tags
        type
        total
        deleted
        link
        owner
        lastReviewDate
        creatorUserID
        createdAt
        updatedAt
        __typename
      }
      iteration
      isReviewed
      reviewDuration
      owner
      lastTimeReviewDuration
      reviewDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUserCards = /* GraphQL */ `
  query ListUserCards(
    $filter: ModelUserCardsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        cardID
        iteration
        isReviewed
        reviewDuration
        owner
        lastTimeReviewDuration
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
export const usersByEmail = /* GraphQL */ `
  query UsersByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        cognitoID
        email
        phoneNumber
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const cardsByCreatorUserIDAndContent = /* GraphQL */ `
  query CardsByCreatorUserIDAndContent(
    $creatorUserID: ID!
    $content: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cardsByCreatorUserIDAndContent(
      creatorUserID: $creatorUserID
      content: $content
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        tags
        type
        total
        deleted
        link
        owner
        lastReviewDate
        creatorUserID
        createdAt
        updatedAt
        __typename
      }
      nextToken
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
        iteration
        isReviewed
        reviewDuration
        owner
        lastTimeReviewDuration
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
export const userCardsByCardIDAndUserID = /* GraphQL */ `
  query UserCardsByCardIDAndUserID(
    $cardID: ID!
    $userID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserCardsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userCardsByCardIDAndUserID(
      cardID: $cardID
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        cardID
        iteration
        isReviewed
        reviewDuration
        owner
        lastTimeReviewDuration
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
