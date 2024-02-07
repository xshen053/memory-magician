import { generateClient } from 'aws-amplify/api';
import { createCard, updateCard } from '../../graphql/mutations.js'
import { userCardsByUserIDAndCardID } from '../../graphql/customizedQueries.js'
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json' assert { type: 'json' };;

Amplify.configure(amplifyconfig);
const client = generateClient();

/**
 * Function to create a card with specified content, tags, and type.
 *
 * @param {Object} data - The data object containing card details.
 * @return cardId - the id of the newly created card
 * 
 * @example
 * Example usage for creating a new card
 * const cardData = {
 *   content: "Django knowledge", // Description or content of the card
 *   tags: ["blind75", "leetcode"], // Array of tags associated with the card
 *   type: "DAILY", // Type of the card (e.g., DAILY, GENERAL, etc.)  
 *   total: selection === 'NOREVIEW' ? -1 : reviewDates.length 
 * 
 * };
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
 * 
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
    let allItems = [];
    let nextToken = null;
    do {
      const input = {
        userID: user_id,
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
    console.log(allItems)
    allItems.forEach((item) => {
      if (!cardIds.has(item.card.id) && !item.card.deleted) {
        cardInfos.push(item.card)
        cardIds.add(item.card.id); // Add each card's ID to the Set
      }
    });
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
