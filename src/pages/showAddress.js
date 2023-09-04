import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  Button,
  CircularProgress,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import ClicnicAddressService from '../Service/ClicnicAddressService';
import UpdateDoctorForm from './updateAddress';
import { add } from '../store/AddressSlice';

const ConfirmationModal = ({ open, onClose, onConfirm, messageToDisplay }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Appointment Acceptance</DialogTitle>
      <DialogContent>
        <DialogContentText>{messageToDisplay}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Request = () => {
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleUpdate = (clinicId) => {
    setSelectedClinic(clinicId);
    setIsModalOpen(true);
    setMessage(' Are you sure you want to update this appointment?');
  };

  const handleModalConfirm = async () => {
    console.log('adding data to addressStore');
    dispatch(add(selectedClinic));
    console.log('data added sucessfully');
    navigate(`/updateaddress`);
  };

  const handleModalClose = () => {
    setSelectedClinic(null);
    setIsModalOpen(false);
  };

  const handleDelete = (clinicId) => {
    setSelectedClinic(clinicId);
    // setIsModalOpen(true);

    const confirm = window.confirm('Are you sure you want to delete this appointment?');
    if (confirm) {
      ClicnicAddressService.deleteAddress(clinicId).then((response)=>{
        if(response.status===200){
            alert('deleted sucessfully...........')
            window.location.reload();
        }
      });

    } else {
      alert('something');
    }
    setMessage(' Are you sure you want to delete this appointment?');
  };
  useEffect(() => {
    const fetchAvailableLocations = async () => {
      try {
        const response = await ClicnicAddressService.getAddress(153);
        const data = response.data;
        setAddress(data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.error('Error fetching available locations:', error);
        setIsLoading(false);
      }
    };

    fetchAvailableLocations();
  }, []);

  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h6">Loading...</Typography>
        </div>
      ) : address.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Typography variant="h6">No request for today.</Typography>
        </div>
      ) : (
        <>
          <h3 style={{ textAlign: 'center' }}>Your Clinic Address</h3>
          <div
            className="doctor-app"
            style={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              alignItems: 'center',
              marginTop: '50px',
            }}
          >
            <table
              className="patient-table"
              style={{ width: '100%', maxWidth: '8000px', mx: 'auto', overflowX: 'auto' }}
            >
              <thead>
                <tr style={{ textAlign: 'center' }}>
                  <th>SR.No</th>
                  <th>Clinic Name </th>
                  <th>Address</th>
                  <th>Location</th>
                  <th>City</th>
                  <th>PinCode</th>
                </tr>
              </thead>
              <tbody>
                {address.map((request, index) => (
                  <tr key={request.clinicId}>
                    <td>{index + 1}</td>
                    <td>{request.clinicName}</td>
                    <td>{request.address}</td>
                    <td>{request.location}</td>
                    <td>{request.city}</td>
                    <td>{request.pinCode}</td>
                    <td>
                      <Button variant="contained" onClick={() => handleUpdate(request)}>
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(request.clinicId)}
                        color="error"
                        sx={{ marginLeft: 1, border: '1px solid red' }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <ConfirmationModal
        open={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        messageToDisplay={message}
      />
    </>
  );
};

export default Request;
