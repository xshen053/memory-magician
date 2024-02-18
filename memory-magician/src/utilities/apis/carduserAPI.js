import { generateClient } from 'aws-amplify/api';
import { userCardsByUserIDAndCardID, getUserCardByCard } from '../../graphql/customizedQueries.js';
import { batchCreateReview, updateUserCards } from '../../graphql/mutations.js';
import {listUserCards} from '../../graphql/queries.js'
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json'

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
 * @param {*} id card_id
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
 * 
 * @param {*} id should be the one next review
 * @param {*} duration 
 */
export const updateOneUserCardLastTimeReviewDuration = async (id, duration) => {
  try {
    const input = {
      id: id,
      lastTimeReviewDuration: parseInt(duration, 10)
    }
    await client.graphql({
      query: updateUserCards,
      variables: {
        input: input
      }
    });
  } catch (error) {
    console.log("Error in updateOneUserCardLastTimeReviewDuration: ", error)
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
export const createUserCardsBatchAPI = async (dataArray, numberOfSplits = 5) => {
  try {
    console.log("I am in createUserCardsBatchAPI");
    if (dataArray.length < 20) {
      numberOfSplits = 1
    }
    // Calculate the size of each segment based on the desired number of splits
    const segmentSize = Math.ceil(dataArray.length / numberOfSplits);
    for (let i = 0; i < numberOfSplits; i++) {
      // Calculate start and end indices for each segment
      const start = i * segmentSize;
      const end = start + segmentSize;

      // Create each segment by slicing the dataArray
      const segment = dataArray.slice(start, end);

      // Optionally, log or process each segment
      // console.log(`Segment ${i + 1} of dataArray:`, segment);

      // Call the GraphQL mutation for each segment
      await client.graphql({
        query: batchCreateReview,
        variables: {
          reviews: segment
        }
      });
    }
  } catch (error) {
    console.error("Error during createUserCardsBatchAPI:", error);
    throw error;
  }
};




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
export const getAllCardsNeedReviewOfAUserForToday = async (user_id) => {
  try {
    const startTime = performance.now(); // Start measuring time
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today
    const startOfToday = today.toISOString();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set to start of tomorrow
    const startOfTomorrow = tomorrow.toISOString();
 
    let allItems = [];
    let nextToken = null;
    const batchSize = 5000; // Fetch items in batches of 5000
    let count = 0
    do {
      const input = {
        userID: user_id,
        filter: {
          reviewDate : {
            ge: startOfToday, // Greater than or equal to the start of today
            lt: startOfTomorrow // Less than the start of tomorrow
          }
        },
        limit: batchSize, // Limit number of items per request
        nextToken: nextToken
      }
      const r = await client.graphql({
        query: userCardsByUserIDAndCardID,
        variables: input
      });
      allItems = allItems.concat(r.data.userCardsByUserIDAndCardID.items);
      nextToken = r.data.userCardsByUserIDAndCardID.nextToken;
      count = count + 1
    } while (nextToken)
    allItems = allItems.filter(item => !item.card.deleted || item.card.deleted === false);
    console.log("call ", count, "times")

    const endTime = performance.now(); // Stop measuring time
    const executionTime = endTime - startTime; // Calculate execution time

    console.log("Time taken to run getAllCardsNeedReviewOfAUserForToday:", executionTime / 1000, "seconds");

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
    allItems = allItems.filter(item => !item.card.deleted || item.card.deleted === false);

    return allItems
  } catch (error) {
    console.error("Error during getAllUnreviewedCardsOfUser:", error);
    throw error;
  }
}

/**
 * get all review cardUser of a user
 * - all dates
 * - both reviewed and unreviewed
 * 
 * @param {*} user_id 
 * @returns 
 */
export const getAllUserCardsOfUser = async (user_id) => {
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
      allItems = allItems.concat(r.data.userCardsByUserIDAndCardID.items)
      nextToken = r.data.userCardsByUserIDAndCardID.nextToken;
    } while (nextToken)
    allItems = allItems.filter(item => !item.card.deleted || item.card.deleted === false);
    return allItems
  } catch (error) {
    console.error("Error during getAllUserCardsOfUser:", error);
    throw error;
  }
}


/**
 * not ready to use
 * 
 * @param {*} user_id 
 * @returns 
 */
const getAllUnreviewedCardsOfUserBeforeToday = async (user_id) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today
    const startOfToday = today.toISOString();
    let allItems = [];
    let nextToken = null;
    do {
      const input = {
        userID: user_id,
        filter: {
          isReviewed: {
            eq: false
          },
          reviewDate : {
            lt: startOfToday // Less than the start of tomorrow
          },
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
    allItems = allItems.filter(item => !item.card.deleted || item.card.deleted === false);
    return allItems
  } catch (error) {
    console.error("Error during getAllUnreviewedCardsOfUser:", error);
    throw error;
  }
}

/**
 * get a review date card based on iteration
 * 
 * @param {*} user_id the user of that review userCard
 * @param {*} card_id the card of that review userCard
 * @return id of that userCard
 */
export const getOneCardUserFromUserIDCardID = async (user_id, card_id, index) => {
  try {
    const r = await client.graphql({
      query: getUserCardByCard,
      variables: {
        id: card_id
      }
    });
    if (!card_id) {
      throw new Error("card_id is null or undefined");
    }
    for (let c of r.data.getCard.users.items) {
      if (c.userID === user_id && c.iteration === index) {
        return c.id
      }
    }
    console.log("this is the last one for current card!")
    return null
    // throw new Error("can't find cardID");
  } catch (error) {
    console.error("Error during getOneCardUserFromUserIDCardID:", error);
    throw error;  
  }
}
