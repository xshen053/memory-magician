import { generateClient } from 'aws-amplify/api';
import { createUser } from '../../graphql/mutations.js';
import { getUser } from '../../graphql/queries.js'
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json'

Amplify.configure(amplifyconfig);
const client = generateClient();



export const createUserAPI = async (data) => {
  try {
    await client.graphql({
      query: createUser,
      variables: {
        input: data
      }
    });
  } catch (error) {
    console.error("Error during createUserAPI:", error);
    throw error;
  }
}

/**
 * 
 * @param {string} id 
 * @return {Array} 
 */
export const getUserByCognitoID = async (id) => {
  try {
    const r = await client.graphql({
      query: getUser,
      variables: {
        cognitoID: id
      }
    });
    return r.data.getUser
  } catch (error) {
    console.error("Error during createUserAPI:", error);
    throw error;
  }
}
