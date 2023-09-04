import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router';

import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';

import axios from 'axios';
import BankDetailsService from '../Service/BankDetailsService';

const Layout = styled('div')(({ theme }) => ({
  marginLeft: '20px',

  marginTop: '7px',

  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const BankDetailsForm = () => {
  const naviagte = useNavigate();

  const [bankDetails, setBankDetails] = useState({
    doctor_id: 2,

    bank_name: '',

    acc_number: '',

    ifsc: '',

    upi_id: '',

    address: '',

    pan_number: '',

    aadhar_number: '',

    gst_number: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBankDetails((prevState) => ({
      ...prevState,

      [name]: value,
    }));

    // Perform real-time validation and update error messages

    const validationErrors = { ...errors };

    if (!value.trim()) {
      validationErrors[name] = `${name.split('_').join(' ')} is required.`;
    } else {
      validationErrors[name] = '';

      if (name === 'acc_number' && !/^\d{9,18}$/.test(value)) {
        validationErrors[name] = 'Invalid Account Number. It should be 9 to 18 digits long.';
      } else if (name === 'ifsc' && !/^[A-Za-z]{4}[0][A-Za-z0-9]{6}$/.test(value)) {
        validationErrors[name] =
          'Invalid IFSC Code. It should be 11 characters long with first 4 letters, followed by 0, and last 6 alphanumeric characters.';
      } else if (name === 'upi_id' && !/^\S+@\S+$/.test(value)) {
        validationErrors[name] = 'Invalid UPI ID.';
      } else if (name === 'pan_number' && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
        validationErrors[name] = 'Invalid PAN Number. It should be in the format ABCDE1234F.';
      } else if (name === 'aadhar_number' && !/^\d{12}$/.test(value)) {
        validationErrors[name] = 'Invalid Aadhar Number. It should be 12 digits long.';
      } else if (name === 'gst_number' && !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/.test(value)) {
        validationErrors[name] = 'Invalid GST Number. It should be in the format 99ABCDE1234F1Z5.';
      }
    }

    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    console.log('inside handle submit');
    e.preventDefault();
    const { name, value } = e.target;

    setBankDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(bankDetails);
    // Check for empty fields

    const validationErrors = { ...errors };

    // if (!value.trim()) {
    //   validationErrors[name] = `${name.split('_').join(' ')} is required.`;
    // } else {
    //   validationErrors[name] = '';

    //   // Rest of your validation logic here
    // }

    setErrors(validationErrors);

    setErrors(validationErrors);

    // Check if there are any validation errors

    BankDetailsService.updateBankDetails(1,bankDetails).then((response) => {
      console.log('sucessfully updated ...................');
      naviagte('/app');
    });

    // Submit the data to the backend using axios
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Account Details
        </Typography>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Bank Name */}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  name="bank_name"
                  value={bankDetails.bank_name}
                  onChange={handleChange}
                  error={!!errors.bank_name}
                  helperText={errors.bank_name}

                  // required
                />
              </Grid>

              {/* Account Number */}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Account Number"
                  name="acc_number"
                  value={bankDetails.acc_number}
                  onChange={handleChange}
                  error={!!errors.acc_number}
                  helperText={errors.acc_number}

                  // required
                />
              </Grid>

              {/* IFSC Code */}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="IFSC Code"
                  name="ifsc"
                  value={bankDetails.ifsc}
                  onChange={handleChange}
                  error={!!errors.ifsc}
                  helperText={errors.ifsc}

                  // required
                />
              </Grid>

              {/* UPI ID */}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="UPI ID"
                  name="upi_id"
                  value={bankDetails.upi_id}
                  onChange={handleChange}
                  error={!!errors.upi_id}
                  helperText={errors.upi_id}

                  // required
                />
              </Grid>

              {/* Address */}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={bankDetails.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}

                  // required
                />
              </Grid>

              {/* PAN Number */}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="PAN Number"
                  name="pan_number"
                  value={bankDetails.pan_number}
                  onChange={handleChange}
                  error={!!errors.pan_number}
                  helperText={errors.pan_number}

                  // required
                />
              </Grid>

              {/* Aadhar Number */}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Aadhar Number"
                  name="aadhar_number"
                  value={bankDetails.aadhar_number}
                  onChange={handleChange}
                  error={!!errors.aadhar_number}
                  helperText={errors.aadhar_number}

                  // required
                />
              </Grid>

              {/* GST Number */}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="GST Number"
                  name="gst_number"
                  value={bankDetails.gst_number}
                  onChange={handleChange}
                  error={!!errors.gst_number}
                  helperText={errors.gst_number}

                  // required
                />
              </Grid>

              {/* Submit Button */}

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save Bank Details
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormContainer>
      </Container>
    </Layout>
  );
};

export default BankDetailsForm;
