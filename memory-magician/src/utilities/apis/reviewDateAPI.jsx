import { generateClient } from 'aws-amplify/api';
import { createCard } from '../../graphql/mutations.js';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json' assert { type: 'json' };;

Amplify.configure(amplifyconfig);
const client = generateClient();


/**
 * 
 * 
 * @param {string} data 
 */
export const createReviewDateAPI = async (data) => {
}
