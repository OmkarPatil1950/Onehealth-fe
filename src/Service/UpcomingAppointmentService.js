import axios from 'axios';

import BASE_REST_API_URL from './ParentUrl'; // Import the base URL from the config file

export default class UpcomingAppointmentService {
  static getUpcomingAppointment(id) {
    console.log('inside get upcoming');
    return axios.get(`${BASE_REST_API_URL}/api/doctors/appointment/upcoming-appointments/doctor/202`);
  }
}