import axios from 'axios';

import BASE_REST_API_URL from './ParentUrl'; // Import the base URL from the config file

export default class BankFees {
  static saveFees(payload) {
    console.log('inside the save fees of doctor');
    axios.post(`${BASE_REST_API_URL}/api/doctors/doctorfees/saveFees`, payload);
  }
}
