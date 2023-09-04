// import React, { useEffect, useState } from 'react';
// import { Button, CircularProgress, Typography } from '@mui/material';
// import ReactDOM from 'react-dom';
// import { useSelector } from 'react-redux';
// import RequestAppointmentService from '../Service/RequestAppointmentService';
// import ConfirmationModal from './Confirmationmodal'; // Import the modal component

// const PatientRequest = ({ request, onAccept, onReject }) => {
//   console.log(request, '----------------');
//   return (
//     <tr>
//       <td>{request.patient_name}</td>
//       <td>{request.age}</td>
//       <td>{request.gender}</td>
//       <td>{request.type}</td>
//       <td>{request.date}</td>
//       <td>{request.appointmentTime}</td>
//       <td>
//         <Button variant="outlined" onClick={() => onAccept(request.appointment_id)}>
//           Accept
//         </Button>
//         <Button
//           variant="outlined"
//           onClick={() => onReject(request.appointment_id)}
//           color="error"
//           sx={{ marginLeft: 1, border: '1px solid red' }}
//         >
//           Reject
//         </Button>
//       </td>
//     </tr>
//   );
// };

// const Request = () => {
//   const [requests, setRequests] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); // Add isLoading state
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state

//   // setRequests(requestData[0])
//   const handleAccept = async (appointmentId) => {
//     console.log(appointmentId, '----------------- appointment id <-');
//     try {
//       const response = await RequestAppointmentService.updateRequest(appointmentId, 'accepted');
//       // Assuming the response contains updated data
//       const updatedData = response.data;

//       // Update the local state to reflect the change
//       setRequests(updatedData);
//       console.log(response.status);
//       if (response.status === 200) {
//         // window.location.reload();
//       }
//     } catch (error) {
//       console.error('Error accepting request:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchAvailableLocations = async () => {
//       try {
//         const response = await RequestAppointmentService.getRequest(53);
//         const data = response.data;
//         console.log('request', data);
//         setRequests(data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching available locations:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchAvailableLocations();
//   }, []);

//   const handleReject = (index) => {
//     // Handle rejecting the request...
//   };

//   return (
//     <>
//       {isLoading ? (
//         <div style={{ textAlign: 'center' }}>
//           <CircularProgress />
//           <Typography variant="h6">Loading...</Typography>
//         </div>
//       ) : requests.length === 0 ? (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//           <Typography variant="h6">No request for today.</Typography>
//         </div>
//       ) : (
//         <>
//           <h3 style={{ textAlign: 'center' }}>Patient Requests for Doctor</h3>
//           <div className="doctor-app" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <table
//               className="patient-table"
//               style={{ width: '100%', maxWidth: '8000px', mx: 'auto', overflowX: 'auto' }}
//             >
//               <thead>
//                 <tr style={{ textAlign: 'left' }}>
//                   <th>Name</th>
//                   <th>Age</th>
//                   <th>Gender</th>
//                   <th>Mode</th>
//                   <th>Date</th>
//                   <th>Time</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {requests.map((request, index) => (
//                   <PatientRequest
//                     key={request.appointment_id}
//                     request={request}
//                     onAccept={() => handleAccept(request.appointment_id)}
//                     onReject={() => handleReject(index)}
//                   />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}

//       {/* {?:():(:()} */}
//     </>
//   );
// };

// export default Request;
import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import RequestAppointmentService from '../Service/RequestAppointmentService';

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Appointment Acceptance</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to accept this appointment?
        </DialogContentText>
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
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAccept = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setIsModalOpen(true);
  };

  const handleModalConfirm = async () => {
    try {
      console.log(selectedAppointmentId,'-------selected Appointment id')
      const response = await RequestAppointmentService.updateRequest(selectedAppointmentId, 'Accepted');
      const updatedData = response.data;
      setRequests(updatedData);
      setIsModalOpen(false);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleModalClose = () => {
    setSelectedAppointmentId(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchAvailableLocations = async () => {
      try {
        const response = await RequestAppointmentService.getRequest(202);
        const data = response.data;
        setRequests(data);
        setIsLoading(false);
        console.log(data)
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
      ) : requests.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Typography variant="h6">No request for today.</Typography>
        </div>
      ) : (
        <>
          <h3 style={{ textAlign: 'center' }}>Patient Requests for Doctor</h3>
          <div className="doctor-app" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <table
              className="patient-table"
              style={{ width: '100%', maxWidth: '8000px', mx: 'auto', overflowX: 'auto' }}
            >
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Mode</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, index) => (
                  <tr key={request.appointment_id}>
                    <td>{request.patient_name}</td>
                    <td>{request.age}</td>
                    <td>{request.gender}</td>
                    <td>{request.type}</td>
                    <td>{request.date}</td>
                    <td>{request.appointmentTime}</td>
                    <td>
                      <Button variant="outlined" onClick={() => handleAccept(request.appointment_id)}>
                        Accept
                      </Button>
                      <Button
                        variant="outlined"
                        // onClick={() => handleReject(request.appointment_id)}
                        color="error"
                        sx={{ marginLeft: 1, border: '1px solid red' }}
                      >
                        Reject
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
      />
    </>
  );
};

export default Request;
