import axios from 'axios';

import BASE_REST_API_URL from './ParentUrl'; // Import the base URL from the config file

export default class CompletedAppointmentService {
  static getCompletedAppointment(id) {
    console.log('inside get complted');
    return axios.get(`${BASE_REST_API_URL}/api/doctors/appointment/doctor/1/Completed`);
  }
}
