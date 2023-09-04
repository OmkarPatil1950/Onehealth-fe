import axios from 'axios';

import BASE_REST_API_URL from './ParentUrl'; // Import the base URL from the config file

export default class ClicnicAddressService {
  static saveAddress(payload) {
    console.log('inside post of the ClinicalAddress the payload is ', payload);
    return axios.post(`${BASE_REST_API_URL}/api/doctors/addressprofileregistration/savedoctorAddress`, payload); // Use the correct endpoint for saving the profile
  }

  static getAddress(id) {
    console.log('inside get address ',id)
    return axios.get(`${BASE_REST_API_URL}/api/doctors/addressprofileregistration/by-doctor/${id}`);
  }


  static updateAddress(clinicId,payload) {
    console.log(`inside update updateAddress of id ${clinicId} the payload is `,payload)
    return axios.put(`${BASE_REST_API_URL}/api/doctors/addressprofileregistration/updateDoctorAddress/${clinicId}`,payload);
  }

  static deleteAddress(clinicId) {
    console.log(`inside delete Address of id ${clinicId}`)
    return axios.delete(`${BASE_REST_API_URL}/api/doctors/addressprofileregistration/deletedoctorAddressById/${clinicId}`);
  }
}
