import { generateClient } from 'aws-amplify/api';
import { userCardsByUserIDAndCardID } from '../../graphql/customizedQueries.js';
import { createUserCards, updateUserCards } from '../../graphql/mutations.js';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json' assert { type: 'json' };;

Amplify.configure(amplifyconfig);
const client = generateClient();

/**
 * 
 * @param {string} id id of that usercard relation
 */
export const markOneUserCardReviewed = async (id) => {
  try {
    const input = {
      id: id,
      isReviewed: true
    }
    await client.graphql({
      query: updateUserCards,
      variables: {
        input: input
      }
    });
  } catch (error) {
    console.log("Error in markOneUserCardReviewed: ", error)
    throw error
  }
}

/**
 * 
 * @param {*} id 
 * @param {int} duration ms
 */
export const markOneUserCardReviewedWithDuration = async (id, duration) => {
  try {
    const input = {
      id: id,
      reviewDuration: duration,
      isReviewed: true
    }
    await client.graphql({
      query: updateUserCards,
      variables: {
        input: input
      }
    });
  } catch (error) {
    console.log("Error in markOneUserCardReviewedWithDuration: ", error)
    throw error
  }
}

/**
 * Function to create a user card association with review details.
 *
 * @param {} dataArray - The Array of data
 *
 * @example usage:
 * const data = [{
 *   userID: "069eff2b-8019-4291-aa12-a91709a0189e", // Replace with actual User ID
 *   cardID: "ee6e33b9-d593-4278-a46f-24d6c6a4f4a8", // Replace with actual Card ID
 *   reviewDuration: -1, // Duration in minutes for the review
 *   reviewDate: "2024-02-03T09:00:00Z", // ISO 8601 formatted date for the review
 *   isReviewed: true, // Flag indicating if the card has been reviewed
 *   iteration: 1    // the number of iteration
 *   // Include any other fields that are required by your CreateUserInput type
 * },
 * ...
 * ]
 * createUserCardsBatchAPI(cardData)
 */
export const createUserCardsBatchAPI = async (dataArray) => {
  try {
    for (const data of dataArray) {
      await client.graphql({
        query: createUserCards,
        variables: {
          input: data
        }
      });
    }
  } catch (error) {
    console.error("Error during createUserCardsApi:", error);
    throw error;
  }
}


//////////////////////////////// QUERY ////////////////////////////////
/**
 * Retrieves all card details associated with a specific user ID where:
 * - The `isReviewed` status is false.
 * - The `reviewDate` is set to today (based on the server's time zone).
 * - need to use limit to fetch all data
 * 
 * @param {Object} input - The input object containing the userID and filters.
 *   - `userID`: The unique identifier of the user.
 *   - `filter`: Object containing filter conditions.
 *     - `reviewDate`: Object specifying the date range.
 *       - `ge`: (Greater than or equal to) The start of today in UTC.
 *       - `lt`: (Less than) The start of tomorrow in UTC.
 *     - `isReviewed`: Object specifying the review status.
 *       - `eq`: (Equal to) Set to `false` to filter unreviewed cards.
 * @query {@link userCardsByUserIDAndCardID}
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
export const getAllUnreviewedCardsOfUserForToday = async (user_id) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today
    const startOfToday = today.toISOString();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set to start of tomorrow
    const startOfTomorrow = tomorrow.toISOString();
 
    let allItems = [];
    let nextToken = null;

    do {
      const input = {
        userID: user_id,
        filter: {
          reviewDate : {
            ge: startOfToday, // Greater than or equal to the start of today
            lt: startOfTomorrow // Less than the start of tomorrow
          },
          isReviewed: {
            eq: false
          }
        },
        nextToken: nextToken
      }
      const r = await client.graphql({
        query: userCardsByUserIDAndCardID,
        variables: input
      });
      allItems = allItems.concat(r.data.userCardsByUserIDAndCardID.items);
      nextToken = r.data.userCardsByUserIDAndCardID.nextToken;
    } while (nextToken)

    // console.log(r.data.userCardsByUserIDAndCardID.items)
    return allItems
  } catch (error) {
    console.error("Error during getAllUnreviewedCardsOfUserForToday:", error);
    throw error;
  }
}

/**
 * 
 * @param {*} input 
 * @returns {Promise<Array>} A promise that resolves to an array of card objects.
 * 
 * @example input
 * const input = {
 *   userID: 'user123',
 *   filter: {
 *     isReviewed: {
 *       eq: false // Only fetch cards that have not been reviewed
 *     }
 *   }
 * };
 * 
 * @example output
 * [
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
 * {
 * ...
 * }
 * ]
 */
export const getAllUnreviewedCardsOfUser = async (user_id) => {
  try {
    let allItems = [];
    let nextToken = null;
    do {
      const input = {
        userID: user_id,
        filter: {
          isReviewed: {
            eq: false
          }
        },
        nextToken: nextToken
      }
      const r = await client.graphql({
        query: userCardsByUserIDAndCardID,
        variables: input
      });
      allItems = allItems.concat(r.data.userCardsByUserIDAndCardID.items)
      nextToken = r.data.userCardsByUserIDAndCardID.nextToken;
    } while (nextToken)

    return allItems
  } catch (error) {
    console.error("Error during getAllUnreviewedCardsOfUser:", error);
    throw error;
  }
}
