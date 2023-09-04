import React, { useEffect, useState } from 'react';

import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import ProfileService from '../Service/ProfileService';

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

const DocumentSave = () => {
  const [fees, setFees] = useState('');
  const [aadharcard, setadharId] = useState('');
  const [pancard, setpanId] = useState('');
  const [medicalcert, setMedicalpanId] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const [files, setFiles] = useState({
    aadharId: null,
    panId: null,
    medicalCertificate: null,
    consultationFees: 300,
  });

  const handleaadharIdChange = (e) => {
    setadharId(e.target.files[0]);
  };

  const handlepanIdChange = (e) => {
    setpanId(e.target.files[0]);
  };

  const handleMedicalCertificateChange = (e) => {
    setMedicalpanId(e.target.files[0]);
  };

  const handleFeesChange = (event) => {
    setFees(event.target.value);
  };

  const profileData = useSelector((state) => state.Profile[0]);
  console.log(profileData, '-----------uploaded');

  let profileStore = {};

  try {
    profileStore = JSON.parse(profileData);
  } catch (error) {
    console.error('Error parsing profile data:', error);
  }
  console.log(profileStore.data, '-data'); // Access the 'data' property of the 'Profile' slice

  // const updatedData = [...profileStore.data, files];
  const dateOfBirth = profileData.specializations;

  console.log(profileStore.specializations, '*-----------dob from store');
  // Function to handle checkbox changes
  const handleCheckboxChange = (event) => {
    const selectedValue = event.target.value;
    if (event.target.checked) {
      // Checkbox is checked, add the selected value to the array
      setSelectedCheckboxes((prevSelected) => [...prevSelected, selectedValue]);
    } else {
      // Checkbox is unchecked, remove the selected value from the array
      setSelectedCheckboxes((prevSelected) => prevSelected.filter((value) => value !== selectedValue));
    }
  };
  console.log(selectedCheckboxes, 'selected checkbox');

  const Profilepayload = {
    first_name: profileData.first_name || '',
    last_name: profileData.last_name || '',
    city: profileData.city || '',
    email: profileData.email || '',
    contact: profileData.contact || '',
    gender: profileData.gender || '',
    blood_group: profileData.blood_group || '',
    birth_date: profileData.dateOfBirth || null, // Use null or a valid date
    license_number: profileData.license_number || '',
    experiance: profileData.experiance || '',
    passout_year: profileData.passout_year || '',
    university: profileData.university || '',
    degree: profileData.degree || '',
    biography: profileData.biography || '',
    panId: pancard,
    aadharId: aadharcard,
    medicalCertId: medicalcert,
    consultationFees: fees,
    specializations: selectedCheckboxes.map((name) => ({ name })),
  };
  console.log(Profilepayload, '-----------profile');
  // const combinedData = {
  //   ...profileStore,
  //   data: updatedData,
  // };
  // console.log('Combined Data:', updatedData);
  const handleFileUpload = () => {
    // console.log('Uploaded Files:', files);
    console.log(selectedCheckboxes, 'selected checkbox');

    try {
      const id = 304;
      console.log('inside the try of the axios');
      console.log(Profilepayload);
      ProfileService.updateProfile(id, Profilepayload).then((response) => {
        console.log('Data is saved sucessfully--------------------------');
      });

      // console.log(combinedData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    // You can perform further actions here, like sending the files to a server.
  };
  return (
    <Layout>
      <Container>
        <FormContainer>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/free-aadhaar-2085055-1747945.png"
                  alt="Aadhar Logo"
                  style={{ marginRight: '10px', height: '60px', width: '60' }}
                />
                Upload Aadhar Card
              </Typography>

              <input type="file" accept="image/*,.pdf" onChange={handleaadharIdChange} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="PAN Logo"
                  style={{ marginRight: '10px', height: '60px', width: '60' }}
                />
                Upload PAN Card
              </Typography>

              <input type="file" accept="image/*,.pdf" onChange={handlepanIdChange} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6401/6401380.png"
                  alt="Medical Logo"
                  style={{ marginRight: '10px', height: '60px', width: '60' }}
                />
                Upload Medical Certificate
              </Typography>

              <input type="file" accept="image/*,.pdf" onChange={handleMedicalCertificateChange} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Consulataion Fees : </Typography>
              <TextField
                id="standard-size-small"
                size="small"
                variant="standard"
                name="fees"
                type="number"
                value={fees}
                onChange={handleFeesChange}
                inputProps={{ min: 0 }}
              />
            </Grid>{' '}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" onClick={handleFileUpload}>
                Upload Files
              </Button>
            </Grid>
          </Grid>
        </FormContainer>
      </Container>
    </Layout>
  );
};

export default DocumentSave;
