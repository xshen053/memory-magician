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
        type
        createdAt
        updatedAt
        userCardsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getReviewDate = /* GraphQL */ `
  query GetReviewDate($id: ID!) {
    getReviewDate(id: $id) {
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
export const listReviewDates = /* GraphQL */ `
  query ListReviewDates(
    $filter: ModelReviewDateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviewDates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
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
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
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
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
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
export const getCardDates = /* GraphQL */ `
  query GetCardDates($id: ID!) {
    getCardDates(id: $id) {
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
export const listCardDates = /* GraphQL */ `
  query ListCardDates(
    $filter: ModelCardDatesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCardDates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cardId
        reviewDateId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCardTags = /* GraphQL */ `
  query GetCardTags($id: ID!) {
    getCardTags(id: $id) {
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
export const listCardTags = /* GraphQL */ `
  query ListCardTags(
    $filter: ModelCardTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCardTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cardId
        tagId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const cardDatesByCardId = /* GraphQL */ `
  query CardDatesByCardId(
    $cardId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCardDatesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cardDatesByCardId(
      cardId: $cardId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        cardId
        reviewDateId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const cardDatesByReviewDateId = /* GraphQL */ `
  query CardDatesByReviewDateId(
    $reviewDateId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCardDatesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cardDatesByReviewDateId(
      reviewDateId: $reviewDateId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        cardId
        reviewDateId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const cardTagsByCardId = /* GraphQL */ `
  query CardTagsByCardId(
    $cardId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCardTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cardTagsByCardId(
      cardId: $cardId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        cardId
        tagId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const cardTagsByTagId = /* GraphQL */ `
  query CardTagsByTagId(
    $tagId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCardTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cardTagsByTagId(
      tagId: $tagId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        cardId
        tagId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
