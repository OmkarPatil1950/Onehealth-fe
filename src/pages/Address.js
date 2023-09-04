import React, { useState } from 'react';

import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';

import {
  Container,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';

import AddIcon from '@mui/icons-material/Add';

import DeleteIcon from '@mui/icons-material/Delete';

import ClicnicAddressService from '../Service/ClicnicAddressService';

const Layout = styled('div')(({ theme }) => ({
  marginLeft: '200px',

  marginTop: '130px',

  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const AddDoctorForm = () => {
  const [clinicList, setClinicList] = useState([
    {
      doctorId: 153,

      clinicName: '',

      address: '',

      location: '',

      city: '',

      pinCode: '',
    },
  ]);

  const [deleteIndex, setDeleteIndex] = useState(-1);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleChange = (event, index) => {
    const { name, value } = event.target;

    setClinicList((prevList) => {
      const newList = [...prevList];

      newList[index] = { ...newList[index], [name]: value };

      return newList;
    });
  };

  const handleAddClinic = () => {
    setClinicList((prevList) => [
      ...prevList,

      {
        doctorId: 153,


        clinicName: '',

        address: '',

        location: '',

        city: '',

        pinCode: '',
      },
    ]);
  };

  const handleDeleteClinic = (index) => {
    setDeleteIndex(index);

    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setClinicList((prevList) => prevList.filter((_, i) => i !== deleteIndex));

    setDeleteIndex(-1);

    setConfirmOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteIndex(-1);

    setConfirmOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here, you can implement the logic to submit the form data to the backend
    
    console.log('Form data:', clinicList);

    // Clear the form after submission

    ClicnicAddressService.saveAddress(clinicList).then((response) => {
      console.log('saved sucessfully.................');
      if(response.status){
        alert('address added sucessfully');
      }
      else{
        alert('failed to add address')
      }
    });

    setClinicList([
      {
        doctorId: '',

        clinicName: '',

        address: '',

        location: '',

        city: '',

        pinCode: '',
      },
    ]);
    
  };

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4">Add Clinic Address</Typography>
        <form onSubmit={handleSubmit}>
          {clinicList.map((clinic, index) => (
            <Card key={index} style={{ marginBottom: '16px' }}>
              <CardHeader
                title={`Clinic ${index + 1}`}
                action={
                  <IconButton onClick={() => handleDeleteClinic(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              />

              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Clinic Name"
                      name="clinicName"
                      value={clinic.clinicName}
                      onChange={(e) => handleChange(e, index)}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="address"
                      name="address"
                      value={clinic.address}
                      onChange={(e) => handleChange(e, index)}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Location"
                      name="location"
                      value={clinic.location}
                      onChange={(e) => handleChange(e, index)}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={clinic.city}
                      onChange={(e) => handleChange(e, index)}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="PIN Code"
                      name="pinCode"
                      value={clinic.pinCode}
                      onChange={(e) => handleChange(e, index)}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Button type="button" variant="contained" color="primary" onClick={handleAddClinic} startIcon={<AddIcon />}>
            Add Another Clinic
          </Button>

          <Button type="submit" variant="contained" color="primary" onClick={handleAddClinic}  style={{ marginLeft: '8px' }}>
            Confirm
          </Button>
        </form>

        {/* Delete Confirmation Dialog */}

        <Dialog open={confirmOpen} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>

          <DialogContent>Are you sure you want to delete this clinic?</DialogContent>

          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>

            <Button onClick={handleConfirmDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default AddDoctorForm;
