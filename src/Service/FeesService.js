import axios from 'axios';

import BASE_REST_API_URL from './ParentUrl'; // Import the base URL from the config file

export default class FeesService {
  static saveFees(payload) {
    console.log('inside post of the fees the payload is ', payload);
    return axios.post(`${BASE_REST_API_URL}/api/doctors/saveFees`, payload); // Use the correct endpoint for saving the profile
  }
}
