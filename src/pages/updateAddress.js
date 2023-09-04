import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux'; // Correct import statement
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Container, Card, CardContent, Typography } from '@mui/material';
import ClicnicAddressService from '../Service/ClicnicAddressService';

const UpdateDoctorForm = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.Address);
  console.log('Address from redux store is ', data);

  const clinicId = data.data[0].clinicId;
  console.log(clinicId,'-----------')
  const [clinic, setClinic] = useState({
    clinicName: data.data[0].clinicName,
    address: data.data[0].address,
    location: data.data[0].location,
    city: data.data[0].city,
    pinCode: data.data[0].pinCode,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setClinic((prevClinic) => ({
      ...prevClinic,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here, you can implement the logic to submit the form data to the backend

    console.log('Form data:', clinic);

    ClicnicAddressService.updateAddress(clinicId, clinic).then((response) => {
      if (response.status) {
        alert('Address added successfully');
        navigate('/showaddress')
      } else {
        alert('Failed to add address');
      }
    });

    // Clear the form after submission
    setClinic({
      clinicName: '',
      address: '',
      location: '',
      city: '',
      pinCode: '',
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Add Clinic Address</Typography>
      <form onSubmit={handleSubmit}>
        <Card style={{ marginBottom: '16px' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Clinic Name"
                  name="clinicName"
                  value={clinic.clinicName}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={clinic.address}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={clinic.location}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={clinic.city}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="PIN Code"
                  name="pinCode"
                  value={clinic.pinCode}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </Container>
  );
};

export default UpdateDoctorForm;
