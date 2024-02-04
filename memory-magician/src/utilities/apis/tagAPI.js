import { generateClient } from 'aws-amplify/api';
import { cardTagsByCardId } from '../../graphql/queries.js';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json' assert { type: 'json' };;

Amplify.configure(amplifyconfig);
const client = generateClient();



export const createTagAPI = async (data) => {
}
