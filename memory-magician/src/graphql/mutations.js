/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createCard = /* GraphQL */ `
  mutation CreateCard(
    $input: CreateCardInput!
    $condition: ModelCardConditionInput
  ) {
    createCard(input: $input, condition: $condition) {
      id
      content
      user {
        id
        username
        phoneNumber
        name
        createdAt
        updatedAt
        __typename
      }
      date {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      type
      createdAt
      updatedAt
      userCardsId
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
      user {
        id
        username
        phoneNumber
        name
        createdAt
        updatedAt
        __typename
      }
      date {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      type
      createdAt
      updatedAt
      userCardsId
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
      user {
        id
        username
        phoneNumber
        name
        createdAt
        updatedAt
        __typename
      }
      date {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      type
      createdAt
      updatedAt
      userCardsId
      __typename
    }
  }
`;
export const createReviewDate = /* GraphQL */ `
  mutation CreateReviewDate(
    $input: CreateReviewDateInput!
    $condition: ModelReviewDateConditionInput
  ) {
    createReviewDate(input: $input, condition: $condition) {
      id
      card {
        nextToken
        __typename
      }
      reviewDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateReviewDate = /* GraphQL */ `
  mutation UpdateReviewDate(
    $input: UpdateReviewDateInput!
    $condition: ModelReviewDateConditionInput
  ) {
    updateReviewDate(input: $input, condition: $condition) {
      id
      card {
        nextToken
        __typename
      }
      reviewDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteReviewDate = /* GraphQL */ `
  mutation DeleteReviewDate(
    $input: DeleteReviewDateInput!
    $condition: ModelReviewDateConditionInput
  ) {
    deleteReviewDate(input: $input, condition: $condition) {
      id
      card {
        nextToken
        __typename
      }
      reviewDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
      id
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
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
      id
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
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
      id
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
export const createCardDates = /* GraphQL */ `
  mutation CreateCardDates(
    $input: CreateCardDatesInput!
    $condition: ModelCardDatesConditionInput
  ) {
    createCardDates(input: $input, condition: $condition) {
      id
      cardId
      reviewDateId
      card {
        id
        content
        type
        createdAt
        updatedAt
        userCardsId
        __typename
      }
      reviewDate {
        id
        reviewDate
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCardDates = /* GraphQL */ `
  mutation UpdateCardDates(
    $input: UpdateCardDatesInput!
    $condition: ModelCardDatesConditionInput
  ) {
    updateCardDates(input: $input, condition: $condition) {
      id
      cardId
      reviewDateId
      card {
        id
        content
        type
        createdAt
        updatedAt
        userCardsId
        __typename
      }
      reviewDate {
        id
        reviewDate
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCardDates = /* GraphQL */ `
  mutation DeleteCardDates(
    $input: DeleteCardDatesInput!
    $condition: ModelCardDatesConditionInput
  ) {
    deleteCardDates(input: $input, condition: $condition) {
      id
      cardId
      reviewDateId
      card {
        id
        content
        type
        createdAt
        updatedAt
        userCardsId
        __typename
      }
      reviewDate {
        id
        reviewDate
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCardTags = /* GraphQL */ `
  mutation CreateCardTags(
    $input: CreateCardTagsInput!
    $condition: ModelCardTagsConditionInput
  ) {
    createCardTags(input: $input, condition: $condition) {
      id
      cardId
      tagId
      card {
        id
        content
        type
        createdAt
        updatedAt
        userCardsId
        __typename
      }
      tag {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCardTags = /* GraphQL */ `
  mutation UpdateCardTags(
    $input: UpdateCardTagsInput!
    $condition: ModelCardTagsConditionInput
  ) {
    updateCardTags(input: $input, condition: $condition) {
      id
      cardId
      tagId
      card {
        id
        content
        type
        createdAt
        updatedAt
        userCardsId
        __typename
      }
      tag {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCardTags = /* GraphQL */ `
  mutation DeleteCardTags(
    $input: DeleteCardTagsInput!
    $condition: ModelCardTagsConditionInput
  ) {
    deleteCardTags(input: $input, condition: $condition) {
      id
      cardId
      tagId
      card {
        id
        content
        type
        createdAt
        updatedAt
        userCardsId
        __typename
      }
      tag {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
