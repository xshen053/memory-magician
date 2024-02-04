/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      phoneNumber
      name
      cards {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        phoneNumber
        name
        createdAt
        updatedAt
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
        id
        username
        phoneNumber
        name
        createdAt
        updatedAt
        __typename
      }
      card {
        id
        content
        tags
        type
        createdAt
        updatedAt
        __typename
      }
      number
      isReviewed
      reviewDuration
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
        number
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
          createdAt
          updatedAt
          __typename
        }        
        number
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
        number
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
