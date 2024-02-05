import fs from 'fs';

import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../../../amplifyconfiguration.json' assert { type: 'json' };
import FormData from 'form-data';
global.FormData = FormData;
import fetch from 'node-fetch';
if (!global.fetch) {
  global.fetch = fetch;
}
import { getAllUnreviewedCardsOfUserForToday, getAllUnreviewedCardsOfUser } from '../../carduserAPI.js';

Amplify.configure(amplifyconfig);

// Test2: get card of a user
const userID = "7d008bd6-740c-47a5-9338-8f237504584d"
const reviewID = "65da175d-5491-41e8-a88d-9c6539a97dc3"

getAllUnreviewedCardsOfUser(userID)
// getAllCardsOfUserFromReviewIdAPI(reviewID)
  .then(response => console.log('User get:', response))
  .catch(error => console.error(error));

