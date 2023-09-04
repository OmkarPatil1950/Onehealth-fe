import axios from 'axios';

import BASE_REST_API_URL from './ParentUrl'; // Import the base URL from the config file

export default class RequestAppointmentService {
    
  static getRequest(id) {
    console.log("inside requiest get FOR non accepted")
    return axios.get(`${BASE_REST_API_URL}/api/doctors/appointment/doctor/${id}/NotAccepted`);
  }

  
  static updateRequest(id,status) {
    console.log("inside requiest update api")
    console.log(id,status,'id and status is-----')
    return axios.put(`${BASE_REST_API_URL}/api/doctors/appointment/updateappointment/${id}/update/${status}`);
  }
}
