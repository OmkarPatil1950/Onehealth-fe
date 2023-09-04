import React, { useState, useEffect } from 'react';

import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { Close as CloseIcon } from '@mui/icons-material';

import { useSelector } from 'react-redux';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import {
  Grid,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  SnackbarContent,
  IconButton,
} from '@mui/material';

import { styled } from '@mui/material/styles';

// import { scheduleMeeting } from './Api'; // Import the correct function from the api.js file

import { format, parseISO, isAfter } from 'date-fns';
import { parseInt } from 'lodash';

import ClicnicAddressService from '../Service/ClicnicAddressService';
import scheduleService from '../Service/scheduleService';

const Layout = styled('div')(({ theme }) => ({
  marginLeft: '250px',

  marginTop: '130px',

  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const DoctorImage = styled('img')(({ theme }) => ({
  width: '100%',

  objectFit: 'cover', // To make the image take up the full height

  [theme.breakpoints.down('md')]: {
    width: '100%',

    marginBottom: '20px',
  },
}));

const formatTimeForBackend = (time) => {
  console.log('inside format time backend ');
  return format(time);
};


const formatDateForBackend = (date) => {
  console.log(date, 'date in fuction');
  return format(date, 'yyyy-MM-dd');
};
const UpdateDoctorSchedulePage = () => {
  const selectedSechedule = useSelector((state) => state.Schedule);

  const slotId = selectedSechedule.data[0].slotId;
  // console.log(selectedSechedule.data[0].endTime);
  const StarTime = selectedSechedule.data[0].startTime;

  const [hour, minute, second] = StarTime.split(':');
  const initialDate = new Date();
  initialDate.setHours(Number(hour));
  initialDate.setMinutes(Number(minute));
  initialDate.setSeconds(Number(second));

  const LastTime = selectedSechedule.data[0].endTime; // Assuming it's in the format "hh:mm aa"

  const [hours, minutes, seconds] = LastTime.split(':');
  const LastDate = new Date();
  LastDate.setHours(Number(hours));
  LastDate.setMinutes(Number(minutes));
  LastDate.setSeconds(Number(seconds));
  // Set the newEndTime in the state
  // Then, set the formatted time in the state

  const dateString = selectedSechedule.data[0].date;
  console.log(dateString, 'date');

  // Split the date string into its components (year, month, and day)
  const dateParts = dateString.split('-');
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Month is zero-based
  const day = parseInt(dateParts[2]);

  // Create a new Date object with the extracted components
  const dateObject = new Date(year, month, day);

  console.log(dateObject, 'date object from redux'); // This will be the JavaScript Date object

  console.log(selectedSechedule, 'selected schedule');

  const [selectedShift, setShift] = useState(selectedSechedule.data[0].shift);

  const [startTime, setStartTime] = useState(null);

  const [endTime, setEndTime] = useState(null);

  const [selectedMode, setMode] = useState(selectedSechedule.data[0].typeAvailability);

  const [location, setLocation] = useState('');

  const [availableLocations, setAvailableLocations] = useState([]);

  const [selectedDate, setSelectedDate] = useState(dateObject);

  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  // setStartTime(initialDate);
  // setEndTime(LastDate);
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };
  const sTime = formatTimeForBackend(startTime);
  const eTime = formatTimeForBackend(endTime);
  const handleScheduleMeeting = async () => {
    setConfirmationOpen(false);

    try {
      console.log('inside try');
      const payload = {
        doctorId: 202,
        date: formatDateForBackend(selectedDate),
        shift: selectedShift,
        startTime: sTime,
        endTime: eTime,
        typeAvailability: selectedMode,
        addressAvailability: location,
      };

      console.log(payload);

      await scheduleService.updateSchedule(slotId, payload).then((response) => {
        console.log(response.status);
        if (response.status >= 200 && response.status <= 203) {
          handleSnackbarOpen('Schedule added successfully.', 'success');
        } else {
          handleSnackbarOpen('Failed to add schedule.', 'error');
        }

        console.log('Schedule added successfully.');
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        handleSnackbarOpen('Server is busy try after some time......', 'error'); // Handle 404 error
      } else {
        handleSnackbarOpen('Server busy ..............', 'error'); // Handle other errors
      }
      console.error('Error while scheduling meeting try after some time.......');
    }
  };

  useEffect(() => {
    const fetchAvailableLocations = async () => {
      console.log('---------------------------fectching address');
      try {
        const response = await ClicnicAddressService.getAddress(202);
        const data = response.data; // Assuming the response data is an array of location objects
        const addresses = data.map((location) => location.address);
        console.log(addresses);
        setAvailableLocations(addresses);
      } catch (error) {
        console.error('Error fetching available locations:', error);
      }
    };

    fetchAvailableLocations();
  }, []);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarVariant, setSnackbarVariant] = useState('success');

  const handleSnackbarOpen = (message, variant) => {
    setSnackbarMessage(message);
    setSnackbarVariant(variant);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  console.log(selectedShift, '-------------');
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: '-200px', marginTop: '-150px' }}>
      <Layout>
        {/* <section style={{display:"flex"}}> */}

        <Typography variant="h4" gutterBottom>
          Schedule Your Day
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <DatePicker
                  fullWidth
                  label="Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                  disablePast // This prop prevents selecting past dates
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <RadioGroup row aria-label="shift" name="shift" value={selectedShift} onChange={handleShiftChange}>
                    <FormControlLabel value="Morning" control={<Radio />} label="Morning" />

                    <FormControlLabel value="Afternoon" control={<Radio />} label="Afternoon" />

                    <FormControlLabel value="Evening" control={<Radio />} label="Evening" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TimePicker
                  sx={{ width: '400px' }}
                  label="Start Time"
                  value={startTime}
                  onChange={handleStartTimeChange}
                />
              </Grid>

              <Grid item xs={10}>
                <TimePicker sx={{ width: '400px' }} label="End Time" value={endTime} onChange={handleEndTimeChange} />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <RadioGroup row aria-label="mode" name="mode" value={selectedMode} onChange={handleModeChange}>
                    <FormControlLabel value="online" control={<Radio />} label="Online" />

                    <FormControlLabel value="offline" control={<Radio />} label="Offline" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {selectedMode === 'offline' && (
                <Grid item xs={8}>
                  <InputLabel>Location</InputLabel>

                  <Select value={location} onChange={(e) => setLocation(e.target.value)} variant="outlined" fullWidth>
                    {availableLocations.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() => setConfirmationOpen(true)}>
                  update
                </Button>

                {/* Confirmation Dialog */}

                <Dialog open={isConfirmationOpen} onClose={() => setConfirmationOpen(false)}>
                  <DialogTitle>Confirm Schedule Update</DialogTitle>

                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to update your schedule ?{/* Display the selected options here */}
                    </DialogContentText>
                  </DialogContent>

                  <DialogActions>
                    <Button onClick={() => setConfirmationOpen(false)} color="primary">
                      Cancel
                    </Button>

                    <Button onClick={handleScheduleMeeting} color="primary">
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>

        {/* */}

        {/* </section> */}
      </Layout>

      <div>
        <Box style={{ justifyContent: 'center' }}>
          <DoctorImage
            style={{
              justifyContent: 'center',
              width: '1500px',
              marginTop: '90px',
              height: '500px',
            }}
            src="https://img.freepik.com/free-vector/doctor-nurse-study-discuss-xray-patient-lung-image-man-pulmonologist-woman-therapist-assistant-examine-fluorography-result-disease-determination_575670-456.jpg?w=2000"
            alt="Doctor"
          />
        </Box>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={5000} // Change this to your desired duration
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          sx={{
            backgroundColor: snackbarVariant === 'success' ? 'green' : 'red',
          }}
          message={snackbarMessage}
          action={
            <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </Box>
  );
};

export default UpdateDoctorSchedulePage;
