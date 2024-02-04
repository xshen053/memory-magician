import { createUserAPI } from '../../userAPI.js';

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
const userData = {
  email: "exampleUser",
  name: "shen"
  // Include any other fields that are required by your CreateUserInput type
};

createUserAPI(userData)
  .then(response => console.log('User created:', response))
  .catch(error => console.error(error));
