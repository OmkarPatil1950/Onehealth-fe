import axios from 'axios';

import BASE_REST_API_URL from './ParentUrl'; // Import the base URL from the config file

export default class scheduleService {
  static saveSchedule(payload) {
    console.log('inside post of the schedule service the payload is ', payload);
    return axios.post(`${BASE_REST_API_URL}/api/doctors/schedule/saveSchedule`, payload); // Use the correct endpoint for saving the profile
  }

  static getSchedule(id) {
    console.log('inside get of the schedule service and id ', id);
    return axios.get(`${BASE_REST_API_URL}/api/doctors/schedule/todayandupcoming/${id}`);
  }

  static updateSchedule(slotId,payload) {
    console.log(`inside update schedule of slot id ${slotId} and payload is `,payload)
    return axios.get(`${BASE_REST_API_URL}/api/doctors/schedule/updateDoctorSchedule/${slotId}`);
  }
}
