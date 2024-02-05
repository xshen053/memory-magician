import { generateClient } from 'aws-amplify/api';
import { getUserCards } from '../../graphql/queries.js';
import { createCard } from '../../graphql/mutations.js'
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
