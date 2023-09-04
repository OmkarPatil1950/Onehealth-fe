import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box, TextField, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import visibilityIcon from '@mui/icons-material/Visibility'; // Import the visibility icon
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import TodaysAppointmentService from '../Service/TodaysAppointmentService';
import FormDialog from './Dialog'; // Import your FormDialog component
import ViewMore from './viewMore';

// const appointmentsData = [
//   {
//     id: 1,
//     name: 'John Doe',
//     age: 30,
//     bloodGroup: 'A+',
//     time: '10:00 AM',
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     age: 25,
//     bloodGroup: 'B-',
//     time: '11:30 AM',
//   },
//   {
//     id: 1,
//     name: 'John Doe',
//     age: 30,
//     bloodGroup: 'A+',
//     time: '10:00 AM',
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     age: 25,
//     bloodGroup: 'B-',
//     time: '11:30 AM',
//   },{
//     id: 1,
//     name: 'John Doe',
//     age: 30,
//     bloodGroup: 'A+',
//     time: '10:00 AM',
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     age: 25,
//     bloodGroup: 'B-',
//     time: '11:30 AM',
//   },{
//     id: 1,
//     name: 'John Doe',
//     age: 30,
//     bloodGroup: 'A+',
//     time: '10:00 AM',
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     age: 25,
//     bloodGroup: 'B-',
//     time: '11:30 AM',
//   },

//   // Add more appointment data objects here
// ];

const TodaysAppointments = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const navigate = useNavigate();
  const upcomingIcon = <PendingActionsTwoToneIcon style={{ color: 'red' }} />;
  const ExploreIcon = <AspectRatioIcon style={{ color: 'black' }} />;

  useEffect(() => {
    const fetchAvailableLocations = async () => {
      try {
        const response = await TodaysAppointmentService.getTodaysAppointment(3);
        const data = response.data;
        setAppointmentsData(data);
        console.log(data,'data')
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false)
        console.error('Error fetching available locations:', error);
      }
    };

    fetchAvailableLocations();
  }, []);

  const handleJoin = (id) => {
    console.log(`Join appointment ${id}`);
  };

  const handleCancel = (id) => {
    console.log(`Cancel appointment ${id}`);
  };

  // const handleView = (appointment) => {
  //   setSelectedAppointment(appointment);
  //   setDialogOpen(true);
  // };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div >
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress size={60} color="secondary" />
          <Typography variant="h6">Loading...</Typography>
        </div>
      ) : (
        appointmentsData.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h6">No appointments for today.</Typography>
          </div>
        ) : (
          appointmentsData.map((appointment) => (
            <Card
              key={appointment.id}
              sx={{ margin: '10px',display:'flex', minWidth: 200 }}
              // onClick={() => handleView(appointment)}
            >
              <CardContent>
                <Typography variant="h6" style={{ display: 'flex' }} gutterBottom>
                  {appointment.patient_name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Age: {appointment.age}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Time: {appointment.appointment_time}
                </Typography>
                <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" color="primary" onClick={() => handleJoin(appointment.id)}>
                    Join
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleCancel(appointment.id)}
                    sx={{ marginLeft: '10px' }}
                  >
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            
<FormDialog
              prop={
                <ViewMore
                  AppointmentStatus={'Today'}
                  FullAppointmentData={appointmentsData}
                  IconToDisplay={upcomingIcon}
                  appointment={selectedAppointment}
                />
              }
              Style="md"
              buttonTitle={ExploreIcon}
              buttonStyle={{
                variant: 'none',
                style: { borderColor: 'green', color: 'green', position: 'absolute', top: 0, right: 0 },
              }}
              // icon={visibilityIcon}
              // open={dialogOpen}
              // onClose={handleCloseDialog}
            />

            </Card>
          ))
        )
      )}
    </div>
  );
  
};

export default TodaysAppointments;
/*

<FormDialog
              prop={
                <ViewMore
                  AppointmentStatus={'Today'}
                  FullAppointmentData={appointmentsData}
                  IconToDisplay={upcomingIcon}
                  appointment={selectedAppointment}
                />
              }
              Style="md"
              buttonTitle={ExploreIcon}
              buttonStyle={{
                variant: 'none',
                style: { borderColor: 'green', color: 'green', position: 'absolute', top: 0, right: 0 },
              }}
              // icon={visibilityIcon}
              // open={dialogOpen}
              // onClose={handleCloseDialog}
            />

*/