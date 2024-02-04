import { generateClient } from 'aws-amplify/api';
import { createUserCards } from '../../graphql/mutations.js';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json' assert { type: 'json' };;

Amplify.configure(amplifyconfig);
const client = generateClient();


export const createUserCardsApi = async (data) => {
  try {
    await client.graphql({
      query: createUserCards,
      variables: {
        input: data
      }
    });
  } catch (error) {
    console.error("Error during createCardApi:", error);
    throw error;
  }
}
