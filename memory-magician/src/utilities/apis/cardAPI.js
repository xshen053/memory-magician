import { generateClient } from 'aws-amplify/api';
import { createCard, updateCard } from '../../graphql/mutations.js'
import { listCards, listUserCards } from '../../graphql/queries.js';
import { userCardsByUserIDAndCardID } from '../../graphql/customizedQueries.js'
import { Amplify } from 'aws-amplify';
// import amplifyconfig from '../../amplifyconfiguration.json' assert { type: 'json' };;
import amplifyconfig from '../../amplifyconfiguration.json'

Amplify.configure(amplifyconfig);
const client = generateClient();


export const mutateCard = async (cardID, reviewedTimes, latestReviewDate) => {
  try {
    const r = await client.graphql({
      query: updateCard,
      variables: {
        input: {
          id: cardID,
          total: reviewedTimes,
          lastReviewDate: latestReviewDate,
        },
      },
    });    
  } catch (error) {
    console.error("Error during udateCard:", error);
    throw error;  
  }
}

/**
 * Asynchronously creates a card in the database with the specified details.
 *
 * This function takes a data object containing the necessary details for creating a card,
 * such as its content, associated tags, type, the total number of review dates (if applicable),
 * and the ID of the creator user. It returns the ID of the newly created card.
 *
 * @param {Object} data The data object containing card details.
 * @param {string} data.content The content or description of the card.
 * @param {Array<string>} data.tags An array of tags associated with the card.
 * @param {string} data.type The type of the card (e.g., "DAILY", "GENERAL").
 * @param {number} data.total The total number of review dates associated with the card; use -1 for cards with type "NOREVIEW".
 * @param {string} data.creatorUserID The ID of the user creating the card.
 * @returns {Promise<string>} A promise that resolves with the ID of the newly created card.
 * 
 * @example
 * // Example usage for creating a new card with specific details
 * const cardData = {
 *   content: "Django knowledge",
 *   tags: ["blind75", "leetcode"],
 *   type: "DAILY",
 *   total: selection === 'NOREVIEW' ? -1 : reviewDates.length,
 *   creatorUserID: "user123",
 * };
 * 
 * createCardApi(cardData).then(cardId => {
 *   console.log("Created card ID:", cardId);
 * }).catch(error => {
 *   console.error("Failed to create card:", error);
 * });
 */
export const createCardApi = async (data) => {
  try {
    const r = await client.graphql({
      query: createCard,
      variables: {
        input: data
      }
    });
    return r.data.createCard.id
  } catch (error) {
    console.error("Error during createCardApi:", error);
    throw error;
  }
}

/**
 * Fetch all cards of a user, way better than {@link getCardsInfoFromUserApi}
 * 
 * @param {*} userId 
 * @param {*} type 
 * @return {Array} 
 */
export const fetchCards = async (userId, type = null) => {
  let nextToken = null;
  const allCards = [];

  // Start with the mandatory filter criteria
  const filter = {
    and: [
      { creatorUserID: { eq: userId } },
      { deleted: { ne: true } }
    ],
  };

  // Add type to the filter if it is provided
  if (type) {
    filter.and.push({ type: { eq: type } });
  }

  try {
    while (true) {
      const response = await client.graphql({
        query: listCards,
        variables: {
          filter: filter,
          nextToken: nextToken, // Use the current nextToken
        },
      });

      const fetchedCards = response.data.listCards.items;
      allCards.push(...fetchedCards); // Add the fetched cards to the accumulator

      nextToken = response.data.listCards.nextToken; // Update nextToken with the new value
      if (!nextToken) {
        break; // Exit the loop if there's no nextToken, indicating no more pages to fetch
      }
    }
    return allCards;
  } catch (error) {
    console.error("Error during fetchCards:", error);
    throw error;
  }
};

/**
 * use UserCard to do this
 * @param {*} user_id 
 * @returns array of cards
 * 
 *[
  {
    id: 'f69e8553-08a7-40e4-8ca5-45982fe2f96f',
    content: 'vvvvv',
    tags: [],
    type: 'GENERAL',
    total: 11,
    createdAt: '2024-02-06T23:27:55.275Z',
    updatedAt: '2024-02-06T23:27:55.275Z',
    __typename: 'Card'
  },
  {
    id: 'f9fc9d47-c9c1-4944-a033-49dd1a4859b0',
    content: 'qqqq',
    tags: [],
    type: 'GENERAL',
    total: 11,
    createdAt: '2024-02-06T04:43:27.644Z',
    updatedAt: '2024-02-06T04:43:27.644Z',
    __typename: 'Card'
  }
]
 */
export const getCardsInfoFromUserApi = async (user_id) => {
  try {
    const startTime = performance.now(); // Start measuring time

    let allItems = [];
    let nextToken = null;
    const batchSize = 3000;
    // first get all cardID from relation table
    // next filter all cards
    
    do {
      const input = {
        userID: user_id,
        filter: {
          iteration: {
          eq: 0
          }
        },
        limit: batchSize,
        nextToken: nextToken
      }
      const r = await client.graphql({
        query: userCardsByUserIDAndCardID,
        variables: input
      });
      allItems = allItems.concat(r.data.userCardsByUserIDAndCardID.items);
      nextToken = r.data.userCardsByUserIDAndCardID.nextToken;
    } while (nextToken)

    const cardIds = new Set(); // Initialize a Set to hold unique card IDs
    const cardInfos = []
    allItems.forEach((item) => {
      if (!cardIds.has(item.card.id) && !item.card.deleted) {
        cardInfos.push(item.card)
        cardIds.add(item.card.id); // Add each card's ID to the Set
      }
    });
    const endTime = performance.now(); // Stop measuring time
    const executionTime = endTime - startTime; // Calculate execution time

    console.log("Time taken to run getCardsInfoFromUserApi:", executionTime / 1000, "seconds");
    return cardInfos
    
  } catch (error) {
    console.error("Error during getCardsApi:", error);
    throw error;
  }
}

/**
 * update cardInfo
 * 
 * @param {*} data 
 * 
 * const data = {
 *  id: cardID,
 *  content: "update test"
 * }
 */
export const updateCardInfoApi = async (data) => {
  try {
    const r = await client.graphql({
      query: updateCard,
      variables: {
        input: data
      }
    });
  } catch (error) {
    console.error("Error during getCardsApi:", error);
    throw error;
  }
}

