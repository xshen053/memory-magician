import { generateClient } from 'aws-amplify/api';
import { getUserCards } from '../../graphql/queries.js';
import { userCardsByUserIDAndCardID } from '../../graphql/customizedQueries.js'
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json' assert { type: 'json' };;

Amplify.configure(amplifyconfig);
const client = generateClient();

/**
 * 
 * @param {*} data 
 * 
 * @example
 * const cardData = {
  content: "django knowledge",
  tags: ["blind75", "leetcode"],
  type: "DAILY"
  // Include any other fields that are required by your CreateUserInput type
};
 */
export const createCardApi = async (data) => {
  try {
    await client.graphql({
      query: createCard,
      variables: {
        input: data
      }
    });
  } catch (error) {
    console.error("Error during createCardApi:", error);
    throw error;
  }
}

export const getAllCardsOfUserFromReviewIdAPI = async (review_id) => {
  try {
    const r = await client.graphql({
      query: getUserCards,
      variables: {
        id: review_id
      }
    });
    console.log(r.data.getUserCards)
  } catch (error) {
    console.error("Error during getAllCardsOfUserAPI:", error);
    throw error;
  }
}

/**
 * Retrieves all card details associated with a specific user ID where:
 * - The `isReviewed` status is false.
 * - The `reviewDate` is set to today (based on the server's time zone).
 * 
 * @param {Object} input - The input object containing the userID and filters.
 *   - `userID`: The unique identifier of the user.
 *   - `filter`: Object containing filter conditions.
 *     - `reviewDate`: Object specifying the date range.
 *       - `ge`: (Greater than or equal to) The start of today in UTC.
 *       - `lt`: (Less than) The start of tomorrow in UTC.
 *     - `isReviewed`: Object specifying the review status.
 *       - `eq`: (Equal to) Set to `false` to filter unreviewed cards.
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of card objects.
 *
 * @example
 * const input = {
 *   userID: 'user123',
 *   filter: {
 *     reviewDate: {
 *       ge: startOfToday, // Greater than or equal to the start of today in UTC
 *       lt: startOfTomorrow // Less than the start of tomorrow in UTC
 *     },
 *     isReviewed: {
 *       eq: false // Only fetch cards that have not been reviewed
 *     }
 *   }
 * };
 * getAllCardsOfUserFromUserIdAPI(input);
 *
 * @example
 * // Example of a user card object:
 * {
 *   id: '65da175d-5491-41e8-a88d-9c6539a97dc3',
 *   userID: '069eff2b-8019-4291-aa12-a91709a0189e',
 *   cardID: 'ee6e33b9-d593-4278-a46f-24d6c6a4f4a8',
 *   card: {
 *     id: 'ee6e33b9-d593-4278-a46f-24d6c6a4f4a8',
 *     content: 'django knowledge',
 *     tags: ['Python', 'Web Development'],
 *     type: 'DAILY',
 *     createdAt: '2024-02-04T05:40:05.593Z',
 *     updatedAt: '2024-02-04T05:40:05.593Z',
 *     __typename: 'Card'
 *   },
 *   number: null,
 *   isReviewed: true,
 *   reviewDuration: 30,
 *   reviewDate: '2024-02-03T09:00:00Z',
 *   createdAt: '2024-02-04T06:34:52.367Z',
 *   updatedAt: '2024-02-04T06:34:52.367Z',
 *   __typename: 'UserCards'
 * },
 * ...
 */
export const getAllCardsOfUserFromUserIdAPI = async (input) => {
  try {
    const r = await client.graphql({
      query: userCardsByUserIDAndCardID,
      variables: input
    });
    console.log(r.data.userCardsByUserIDAndCardID.items)
  } catch (error) {
    console.error("Error during getAllCardsOfUserAPI:", error);
    throw error;
  }
}


export const getUserCardsForDate = async (userID, date) => {
  try {
    r = await client.graphql({
      query: getUserCards,
      variables: {
        id: userID
      }
    });
    console.log(r)
    return r
  } catch (error) {
    console.error("Error during createCardApi:", error);
    throw error;
  }
}
