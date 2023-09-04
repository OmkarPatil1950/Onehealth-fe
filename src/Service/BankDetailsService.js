import axios from 'axios';

import BASE_REST_API_URL from './ParentUrl'; // Import the base URL from the config file

export default class BankDetailsService {
  static saveBank(payload) {
    console.log('inside post of the Bank details the payload is ', payload);
    return axios.post(`${BASE_REST_API_URL}/api/doctors/doctorbankdetails/savebankdetails`, payload); // Use the correct endpoint for saving the profile
  }

  static getBankDetails(id) {
    console.log("inside the get bank details page")
    return axios.get(`${BASE_REST_API_URL}/api/doctors/doctorbankdetails/getdoctorbankdetails/${id}`);
  }


  static updateBankDetails(id,payload) {
    console.log("inside the update bank details page")
    return axios.get(`${BASE_REST_API_URL}/api/doctors/doctorbankdetails/updatebankdetails/${id}`,payload);
  }
  
  static deleteBankDetails(id,payload) {
    console.log("inside the delete bank details page")
    return axios.delete(`${BASE_REST_API_URL}/api/doctors/doctorbankdetails/deletebankdetails/${id}`);
  }


}
