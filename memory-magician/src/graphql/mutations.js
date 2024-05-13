/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const batchCreateReview = /* GraphQL */ `
  mutation BatchCreateReview($reviews: [BatchCreateReview]) {
    batchCreateReview(reviews: $reviews) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createCard = /* GraphQL */ `
  mutation CreateCard(
    $input: CreateCardInput!
    $condition: ModelCardConditionInput
  ) {
    createCard(input: $input, condition: $condition) {
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
export const updateCard = /* GraphQL */ `
  mutation UpdateCard(
    $input: UpdateCardInput!
    $condition: ModelCardConditionInput
  ) {
    updateCard(input: $input, condition: $condition) {
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
export const deleteCard = /* GraphQL */ `
  mutation DeleteCard(
    $input: DeleteCardInput!
    $condition: ModelCardConditionInput
  ) {
    deleteCard(input: $input, condition: $condition) {
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
export const createUserCards = /* GraphQL */ `
  mutation CreateUserCards(
    $input: CreateUserCardsInput!
    $condition: ModelUserCardsConditionInput
  ) {
    createUserCards(input: $input, condition: $condition) {
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
export const updateUserCards = /* GraphQL */ `
  mutation UpdateUserCards(
    $input: UpdateUserCardsInput!
    $condition: ModelUserCardsConditionInput
  ) {
    updateUserCards(input: $input, condition: $condition) {
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
export const deleteUserCards = /* GraphQL */ `
  mutation DeleteUserCards(
    $input: DeleteUserCardsInput!
    $condition: ModelUserCardsConditionInput
  ) {
    deleteUserCards(input: $input, condition: $condition) {
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