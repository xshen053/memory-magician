import { getAllUnreviewedCardsOfUser, getAllUnreviewedCardsOfUserForToday } from '../../cardAPI.js';
import fs from 'fs';
import {getUserByCognitoID} from '../../userAPI.js';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../../../amplifyconfiguration.json' assert { type: 'json' };
import FormData from 'form-data';
global.FormData = FormData;
import fetch from 'node-fetch';
if (!global.fetch) {
  global.fetch = fetch;
}

Amplify.configure(amplifyconfig);

// Test2: get card of a user
const userID = "069eff2b-8019-4291-aa12-a91709a0189e"
const reviewID = "65da175d-5491-41e8-a88d-9c6539a97dc3"

const today = new Date();
today.setHours(0, 0, 0, 0); // Set to start of today
const startOfToday = today.toISOString();

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1); // Set to start of tomorrow
const startOfTomorrow = tomorrow.toISOString();

const input = {
  userID: userID,
  filter: {
    // reviewDate : {
    //   ge: startOfToday, // Greater than or equal to the start of today
    //   lt: startOfTomorrow // Less than the start of tomorrow
    // },
    isReviewed: {
      eq: false
    }
  }
}

getUserByCognitoID("93b532b2-3bc7-45c4-bd20-d84bbb4715c3")
// getAllCardsOfUserFromReviewIdAPI(reviewID)
  .then(response => console.log('User get:', response))
  .catch(error => console.error(error));
