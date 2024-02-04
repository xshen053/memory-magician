import { generateClient } from 'aws-amplify/api';
import { createUser } from '../../graphql/mutations.js';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json' assert { type: 'json' };;

Amplify.configure(amplifyconfig);
const client = generateClient();



export const createUserAPI = async (data) => {
  console.log(data)
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
