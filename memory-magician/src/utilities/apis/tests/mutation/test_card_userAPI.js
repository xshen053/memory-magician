import { createUserCardsApi } from '../../carduserAPI.js';

import fs from 'fs';

import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../../../amplifyconfiguration.json' assert { type: 'json' };
import FormData from 'form-data';
global.FormData = FormData;
import fetch from 'node-fetch';
if (!global.fetch) {
  global.fetch = fetch;
}

Amplify.configure(amplifyconfig);

// Example usage:
const cardData = {
  userID: "069eff2b-8019-4291-aa12-a91709a0189e",       // Replace with actual User ID
  cardID: "ee6e33b9-d593-4278-a46f-24d6c6a4f4a8",       // Replace with actual Card ID
  reviewDuration: 30,            // Duration in minutes
  reviewDate: "2024-02-03T09:00:00Z", // ISO 8601 formatted date
  isReviewed: true
  // Include any other fields that are required by your CreateUserInput type
};

createUserCardsApi(cardData)
  .then(response => console.log('User created:', response))
  .catch(error => console.error(error));
