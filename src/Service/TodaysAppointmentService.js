import axios from 'axios';

import BASE_REST_API_URL from './ParentUrl'; // Import the base URL from the config file

export default class TodaysAppointmentService {
  static getTodaysAppointment(id) {
    return axios.get(`${BASE_REST_API_URL}/api/doctors/appointment/appointments-for-today/doctor/1`);
  }
}
