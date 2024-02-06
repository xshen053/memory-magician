
import { generateAllReviewDates } from '../../algorithm/ebbinghaus-forgetting-curve1.js';
import { getAllUnreviewedCardsOfUserBeforeToday, getOneCardUserFromUserIDCardID } from '../carduserAPI.js';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../../amplifyconfiguration.json' assert { type: 'json' };
import FormData from 'form-data';
global.FormData = FormData;
import fetch from 'node-fetch';
if (!global.fetch) {
  global.fetch = fetch;
}

const userID = "7d008bd6-740c-47a5-9338-8f237504584d"
const cardID = "6e05862b-505a-4516-8ae8-43739f164758"
// const allCardUsers = await getAllUnreviewedCardsOfUserBeforeToday(user_id).then(response => console.log('User get:', response))
// .catch(error => console.error(error));

const a = 5 + 1
const nextUserCardID = await getOneCardUserFromUserIDCardID(userID, cardID, a)

console.log(nextUserCardID)


