/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard(
    $filter: ModelSubscriptionCardFilterInput
    $owner: String
  ) {
    onCreateCard(filter: $filter, owner: $owner) {
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
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard(
    $filter: ModelSubscriptionCardFilterInput
    $owner: String
  ) {
    onUpdateCard(filter: $filter, owner: $owner) {
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
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard(
    $filter: ModelSubscriptionCardFilterInput
    $owner: String
  ) {
    onDeleteCard(filter: $filter, owner: $owner) {
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
export const onCreateUserCards = /* GraphQL */ `
  subscription OnCreateUserCards(
    $filter: ModelSubscriptionUserCardsFilterInput
    $owner: String
  ) {
    onCreateUserCards(filter: $filter, owner: $owner) {
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
export const onUpdateUserCards = /* GraphQL */ `
  subscription OnUpdateUserCards(
    $filter: ModelSubscriptionUserCardsFilterInput
    $owner: String
  ) {
    onUpdateUserCards(filter: $filter, owner: $owner) {
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
export const onDeleteUserCards = /* GraphQL */ `
  subscription OnDeleteUserCards(
    $filter: ModelSubscriptionUserCardsFilterInput
    $owner: String
  ) {
    onDeleteUserCards(filter: $filter, owner: $owner) {
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
