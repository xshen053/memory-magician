/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard($filter: ModelSubscriptionCardFilterInput) {
    onCreateCard(filter: $filter) {
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
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard($filter: ModelSubscriptionCardFilterInput) {
    onUpdateCard(filter: $filter) {
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
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard($filter: ModelSubscriptionCardFilterInput) {
    onDeleteCard(filter: $filter) {
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
export const onCreateReviewDate = /* GraphQL */ `
  subscription OnCreateReviewDate(
    $filter: ModelSubscriptionReviewDateFilterInput
  ) {
    onCreateReviewDate(filter: $filter) {
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
export const onUpdateReviewDate = /* GraphQL */ `
  subscription OnUpdateReviewDate(
    $filter: ModelSubscriptionReviewDateFilterInput
  ) {
    onUpdateReviewDate(filter: $filter) {
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
export const onDeleteReviewDate = /* GraphQL */ `
  subscription OnDeleteReviewDate(
    $filter: ModelSubscriptionReviewDateFilterInput
  ) {
    onDeleteReviewDate(filter: $filter) {
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag($filter: ModelSubscriptionTagFilterInput) {
    onCreateTag(filter: $filter) {
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag($filter: ModelSubscriptionTagFilterInput) {
    onUpdateTag(filter: $filter) {
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag($filter: ModelSubscriptionTagFilterInput) {
    onDeleteTag(filter: $filter) {
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
export const onCreateCardDates = /* GraphQL */ `
  subscription OnCreateCardDates(
    $filter: ModelSubscriptionCardDatesFilterInput
  ) {
    onCreateCardDates(filter: $filter) {
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
export const onUpdateCardDates = /* GraphQL */ `
  subscription OnUpdateCardDates(
    $filter: ModelSubscriptionCardDatesFilterInput
  ) {
    onUpdateCardDates(filter: $filter) {
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
export const onDeleteCardDates = /* GraphQL */ `
  subscription OnDeleteCardDates(
    $filter: ModelSubscriptionCardDatesFilterInput
  ) {
    onDeleteCardDates(filter: $filter) {
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
export const onCreateCardTags = /* GraphQL */ `
  subscription OnCreateCardTags($filter: ModelSubscriptionCardTagsFilterInput) {
    onCreateCardTags(filter: $filter) {
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
export const onUpdateCardTags = /* GraphQL */ `
  subscription OnUpdateCardTags($filter: ModelSubscriptionCardTagsFilterInput) {
    onUpdateCardTags(filter: $filter) {
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
export const onDeleteCardTags = /* GraphQL */ `
  subscription OnDeleteCardTags($filter: ModelSubscriptionCardTagsFilterInput) {
    onDeleteCardTags(filter: $filter) {
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
