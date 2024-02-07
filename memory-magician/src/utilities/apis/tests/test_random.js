
import { generateAllReviewDates } from '../../algorithm/ebbinghaus-forgetting-curve1.js';
import { getAllUnreviewedCardsOfUserBeforeToday, getOneCardUserFromUserIDCardID } from '../carduserAPI.js';
import {getCardsInfoFromUserApi, updateCardInfo} from '../cardAPI.js'

import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../../amplifyconfiguration.json' assert { type: 'json' };
import FormData from 'form-data';
global.FormData = FormData;
import fetch from 'node-fetch';
if (!global.fetch) {
  global.fetch = fetch;
}

const userID = "7d008bd6-740c-47a5-9338-8f237504584d"
const cardID = "4652b4ba-7656-4332-809a-1b0cb5989507"
// const allCardUsers = await getAllUnreviewedCardsOfUserBeforeToday(user_id).then(response => console.log('User get:', response))
// .catch(error => console.error(error));

// const r = await getCardsInfoFromUserApi("7d008bd6-740c-47a5-9338-8f237504584d")

const data = {
  id: cardID,
  content: "update test"
}
const r = await updateCardInfo(data)
