import React, { useEffect, useState } from 'react';
import { Box, Checkbox, Grid, Typography } from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  CheckCircle,
  VideoCall,
  Event,
  AccessTime,
  Visibility,
  Person,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

export default function ViewMore({ AppointmentStatus, IconToDisplay, GeneratePdf, name, FullAppointmentData }) {
  const [patinetDetails, setPatientdetails] = useState([]);
  const [lifestyle, setLifestyle] = useState([]);
  const [MedicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const isChecked = true;
  console.log(FullAppointmentData, '-----------FULL APP');
  const arrayFromJson = Object.values(FullAppointmentData);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent', // Set the background color to 'transparent'
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
    color: theme.palette.text.secondary,
    whiteSpace: 'pre-wrap', // Allow wrapping of text
  }));
  // Define the maximum number of words to display

  useEffect(() => {
    async function fetchData() {
      try {
        const patientResponse = await fetch(
          `https://apigateway-yjb28-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/patientProfile/123`
        );
        const patientData = await patientResponse.json();
        setPatientdetails(patientData);

        console.log('----------feching lifestyle');
        const lifestyleResponse = await fetch(
          `https://apigateway-yjb28-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/lifeStyleAndHistory/lifeStyle/1`
        );
        const lifestyleData = await lifestyleResponse.json();
        console.log('lifestyledata is ', lifestyleData);
        setLifestyle(lifestyleData);
        console.log(lifestyle, 'this is lifestyle on usestate');
        setLoading(false);

        const medicalHistoryResponse = await fetch(
          `https://apigateway-yjb28-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/lifeStyleAndHistory/MedicalHistory/1`
        );
        const medicalHistoryData = await medicalHistoryResponse.json();
        setMedicalHistory(medicalHistoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const answers = {
    smoke: true,
    alcohol: false,
    exerciseLevel: 'Moderate',
    foodPreference: 'Vegetarian',
    occupation: 'Engineer',
    currentMedicines: 'NA',
  };
  const previousPrescriptions = [
    { name: 'Prescription 1', url: 'https://example.com/prescription1.pdf' },
    { name: 'Prescription 2', url: 'https://example.com/prescription2.pdf' },
    // Add more prescriptions as needed
  ];

  const previousMedicalRecords = [
    { name: 'Record 1', url: 'https://example.com/record1.pdf' },
    { name: 'Record 2', url: 'https://example.com/record2.pdf' },
    // Add more medical records as needed
  ];
  return (
    <Box
      sx={{
        alignItems: 'start',
        justifyContent: 'space-between',
        padding: '1rem', // Add padding for spacing
        maxWidth: '800px',
        width: '100%',
        maxHeight: '96rem',
        height: 'auto', // Set height to 'auto' to make it responsive
        boxSizing: 'border-box', // Include border in the total width and height
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          // 1px border for the outer box
          padding: '1rem', // Add padding for spacing
          maxWidth: '100%',
          width: '100%',
          maxHeight: '10rem',
          height: '8rem',
          boxSizing: 'border-box', // Include border in the total width and height
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start', // Align the content at the start of the inner box
            flex: 1, // Let the inner box take all available horizontal space
          }}
        >
          <Typography variant="h3">{arrayFromJson[0].patient_name}</Typography>
          <Box
            sx={{
              display: 'flex',
              padding: '5px',
              alignItems: 'center', // Align the content at the center vertically
              gap: '10px', // Add some spacing between the icon and the text
            }}
          >
            <Email />
            <Typography>{patinetDetails.email}</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              padding: '5px',
              alignItems: 'center', // Align the content at the center vertically
              gap: '10px', // Add some spacing between the icon and the text
            }}
          >
            <Phone />
            <Typography>{patinetDetails.phone}</Typography>
          </Box>
          {/* <Typography>
            <LocationOn /> India
          </Typography> */}
        </Box>

        <Box
          sx={{
            // display: 'flex',
            alignItems: 'center',
            gap: '1rem', // Add gap between the items
          }}
        >
          <div style={{ padding: '30px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '5px',
              }}
            >
              {/* <CheckCircle
                sx={{
                  color: (theme) => theme.palette.success.main,
                  marginRight: 1,
                }}
              /> */}
              {IconToDisplay}
              <Typography variant="h5">{AppointmentStatus}</Typography>
            </div>
            <div>
              <Link to='/pdf'>{name}</Link>
            </div>
          </div>
        </Box>
      </Box>
      <hr style={{ border: '1px solid black', margin: '20px 0' }} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          // 1px border for the outer box
          padding: '1rem', // Add padding for spacing
          maxWidth: '100%',
          width: '100%',
          maxHeight: '96rem',
          height: '36rem',
          boxSizing: 'border-box', // Include border in the total width and height
          marginTop: '10px',
          // overflow: 'auto'
        }}
      >
        {/* Add content for the second box with height 10rem here */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start', // Align the content at the start of the inner box
            flex: 1, // Let the inner box take all available horizontal space
            gap: '25px',
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs>
              <Item>
                <span style={{ color: 'Black' }}>Patient Age : </span>
                <br /> {arrayFromJson[0].age}
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <span style={{ color: 'Black' }}>Patient Blood Group:</span>
                <br /> B-
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <span style={{ color: 'Black' }}>Patient Gender:</span>
                <br />
                {arrayFromJson[0].gender}
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs>
              <Item>
                <span style={{ color: 'Black' }}>Height:</span>
                <br />
                170cm
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <span style={{ color: 'Black' }}>Weight:</span>
                <br />
                75
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <span style={{ color: 'Black' }}>Address:</span>
                <br />
                {arrayFromJson[0].address}
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs>
              <Item>
                <span style={{ color: 'Black' }}>Appointment Date:</span>
                <br />
                {arrayFromJson[0].date}
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <span style={{ color: 'Black' }}>Appointment Time:</span>
                <br /> {arrayFromJson[0].appointment_time}
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <span style={{ color: 'Black' }}>Appointment Type:</span>
                <br />
                {arrayFromJson[0].type}
              </Item>
            </Grid>
          </Grid>
          <Typography variant="h5">Lifestyle</Typography>

          <Grid container spacing={1}>
            <Grid item xs>
              <Item>
                <span style={{ color: 'black' }}>Do you consume alcohol?</span>
                <br />
                {lifestyle.alcohol}
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <span style={{ color: 'black' }}>Do you smoke?</span>
                <br />
                {lifestyle.smoke}
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <span style={{ color: 'black' }}>Exercise Level:</span>
                <br />
                {lifestyle.exercise}
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs>
              <Item>
                <span style={{ color: 'black' }}>Food Preference:</span>
                <br />
                {lifestyle.foodPreferences}
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <span style={{ color: 'black' }}>Occupation:</span>
                <br />
                {lifestyle.occupation}
              </Item>
            </Grid>
            <Grid item xs>
              {/* Add more fields here if needed */}
            </Grid>
          </Grid>

          <Typography variant="h5">Clinical History</Typography>

          <Grid container spacing={1}>
            <Grid item xs>
              <Item>
                <span style={{ color: 'black' }}>Any Allergy?</span>
                <br />
                {MedicalHistory.allergies}
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <span style={{ color: 'black' }}>Current Medicines:</span>
                <br />
                <div
                  style={{
                    maxWidth: '200px',
                    width: '150px',
                    overflow: 'auto',
                    wordWrap: 'break-word',
                    height: 'auto',
                  }}
                >
                  {MedicalHistory.currentMedication}
                </div>
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <span style={{ color: 'black' }}>Past Medications:</span>
                <br />
                {MedicalHistory.pastMedication}
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs>
              <Item>
                <span style={{ color: 'black' }}>Chronic Disease:</span>
                <br />
                {MedicalHistory.chronicDiseases}
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <span style={{ color: 'black' }}>Any Injuries?</span>
                <br />
                {MedicalHistory.injuries}
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <span style={{ color: 'black' }}>Undergone Any Surgeries?</span>
                <br />
                {MedicalHistory.surgeries}
              </Item>
            </Grid>
          </Grid>

          <div style={{ display: 'flex', marginTop: '50px' }}>
            <Typography variant="h6">Previous Prescriptions</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {previousPrescriptions.map((prescription, index) => (
                <div key={index} style={{ flexBasis: '200px', marginBottom: '20px' }}>
                  <span>{prescription.name}</span>
                  <a href={prescription.url} download>
                    Download
                  </a>
                </div>
              ))}
            </div>
            <Typography variant="h6">Medical Records</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {previousMedicalRecords.map((record, index) => (
                <div key={index} style={{ flexBasis: '200px', marginBottom: '20px' }}>
                  <span>{record.name}</span>
                  <a href={record.url} download>
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
