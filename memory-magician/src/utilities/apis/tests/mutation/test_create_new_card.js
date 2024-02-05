import { createCardApi } from '../../cardAPI.js';
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
  content: "hey",
  tags: ["blind75", "leetcode"],
  type: "DAILY"
  // Include any other fields that are required by your CreateUserInput type
};

// Test1: create card
createCardApi(cardData)
  .then(response => console.log('User created:', response))
  .catch(error => console.error(error));




