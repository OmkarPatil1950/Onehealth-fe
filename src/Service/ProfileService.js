import axios from 'axios';

import BASE_REST_API_URL from './ParentUrl'; // Import the base URL from the config file

export default class ProfileService {
  static saveProfile(payload) {
    console.log('inside post of the profileService the payload is ', payload);
    return axios.post(`${BASE_REST_API_URL}/api/doctors/addressprofileregistration/saveprofile`, payload); // Use the correct endpoint for saving the profile
  }

  static getProfile(id) {
    return axios.get(`${BASE_REST_API_URL}/api/doctors/addressprofileregistration/getdoctorprofile/${id}`);
  }

  static updateProfile(id,payload) {
    console.log('inside put method of id ',id, 'payload is',payload)
    return axios.put(`${BASE_REST_API_URL}/api/doctors/addressprofileregistration/updateprofile/${id}`,payload);
  }
}
