/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      cognitoID
      email
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      cognitoID
      email
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      cognitoID
      email
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
export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard($filter: ModelSubscriptionCardFilterInput) {
    onCreateCard(filter: $filter) {
      id
      content
      tags
      type
      total
      deleted
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
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard($filter: ModelSubscriptionCardFilterInput) {
    onUpdateCard(filter: $filter) {
      id
      content
      tags
      type
      total
      deleted
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
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard($filter: ModelSubscriptionCardFilterInput) {
    onDeleteCard(filter: $filter) {
      id
      content
      tags
      type
      total
      deleted
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
export const onCreateUserCards = /* GraphQL */ `
  subscription OnCreateUserCards(
    $filter: ModelSubscriptionUserCardsFilterInput
  ) {
    onCreateUserCards(filter: $filter) {
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
        __typename
      }
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
      lastTimeReviewDuration
      reviewDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserCards = /* GraphQL */ `
  subscription OnUpdateUserCards(
    $filter: ModelSubscriptionUserCardsFilterInput
  ) {
    onUpdateUserCards(filter: $filter) {
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
        __typename
      }
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
      lastTimeReviewDuration
      reviewDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserCards = /* GraphQL */ `
  subscription OnDeleteUserCards(
    $filter: ModelSubscriptionUserCardsFilterInput
  ) {
    onDeleteUserCards(filter: $filter) {
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
        __typename
      }
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
      lastTimeReviewDuration
      reviewDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
