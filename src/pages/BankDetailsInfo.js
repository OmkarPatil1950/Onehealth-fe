import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Typography, Box, Button, Paper, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import BankDetailsService from '../Service/BankDetailsService';

const Layout = styled('div')(({ theme }) => ({
  marginLeft: '150px',
  marginTop: '100px',
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const DoctorImage = styled('img')(({ theme }) => ({
  width: '50%',
  objectFit: 'cover',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginBottom: '20px',
  },
}));

function BankDetailsInfo() {
  const [dataFromBackend, setdataFromBackend] = useState([]);

  useEffect(() => {
    const fetchAvailableLocations = async () => {
      try {
        const response = await BankDetailsService.getBankDetails(1);
        const data = response.data;
        console.log(response.status);
        console.log('bank details', data);
        if (response.status === 200) {
          console.log('inside if with response 200');
          setdataFromBackend(data);
          // dispatch(add(data))
        } else {
          console.log('failed to fetch', response.status);
        }
      } catch (error) {
        console.error('Error fetching available locations:', error);
      }
    };

    fetchAvailableLocations();
  }, []);

  // const dataFromBackend = {
  //   bank_name: 'Sample Bank',
  //   acc_number: '1234567890',
  //   ifsc: 'ABC12345',
  //   upi_id: 'sample@upi',
  //   address: '123 Main St, City',
  //   pan_number: 'ABCDE1234F',
  //   aadhar_number: '1234 5678 9012',
  //   gst_number: 'GST1234567890',
  // };

  const handleDelete = () => {
    console.log('inside handle delete to delete');
    const response = BankDetailsService.deleteBankDetails(1).then((response) => {
      if (response.status === 200) {
        alert('deleted sucessfully');
        window.location.reload();
      } else {
        alert('failed to delete');
      }
    });
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'flex-start', marginTop: '-110px' }}>
      <Layout>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          {dataFromBackend.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '100px',marginLeft:'200px' }}>
              {/* <img src="path/to/your/image.png" alt="" /> */}
              <Typography variant="h6">No appointments available.</Typography>
              <Button component={Link} to="/bank">
                Add Bank
              </Button>
            </div>
          ) : (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
                  <Typography variant="h4" gutterBottom>
                    Bank Information
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1">Bank Name: {dataFromBackend.bank_name}</Typography>
                  <Typography variant="subtitle1">Account Number: {dataFromBackend.acc_number}</Typography>
                  <Typography variant="subtitle1">IFSC: {dataFromBackend.ifsc}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1">UPI ID: {dataFromBackend.upi_id}</Typography>
                  <Typography variant="subtitle1">Address: {dataFromBackend.address}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1">PAN Number: {dataFromBackend.pan_number}</Typography>
                  <Typography variant="subtitle1">Aadhar Number: {dataFromBackend.aadhar_number}</Typography>
                  <Typography variant="subtitle1">GST Number: {dataFromBackend.gst_number}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                    <Button
                      sx={{ display: 'flex', justifyContent: 'start', marginTop: 2 }}
                      variant="contained"
                      component={Link}
                      to="/bankdetailsupdate"
                      color="primary"
                    >
                      Edit Bank Information
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>
                      Delete
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </>
          )}
        </Container>
      </Layout>
      {/* <div>
        <Box style={{ justifyContent: 'center' }}>
          <DoctorImage
            style={{
              justifyContent: 'center',
              width: '600px',
              marginTop: '200px',
              height: '350px',
            }}
            src="https://media.istockphoto.com/id/1284602903/vector/medicine-doctor-nurse-health-care-concept-vector-flat-cartoon-graphic-design-illustration.jpg?s=612x612&w=0&k=20&c=Pu9j8-EqpXvDl5cGt4gAJSGDXnCdK3j7GuUPeknimbY="
          />
        </Box>
      </div> */}
    </Box>
  );
}

export default BankDetailsInfo;
