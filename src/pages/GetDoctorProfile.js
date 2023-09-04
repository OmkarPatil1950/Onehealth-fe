import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Paper, Typography, Box, Container, Avatar, Button } from '@mui/material';

import { styled } from '@mui/material/styles';
import ProfileService from '../Service/ProfileService';
import { add } from '../store/profileSlice';

const Layout = styled('div')(({ theme }) => ({
  marginLeft: '20px',

  marginTop: 'px',

  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const ProfileContainer = styled(Container)({
  padding: '20px',

  display: 'flex',

  flexDirection: 'column',

  alignItems: 'center',

  textAlign: 'center',
});

const Logo = styled(Avatar)({
  width: '100px',

  height: '100px',

  marginBottom: '20px',
});

const FieldWrapper = styled(Box)({
  marginBottom: '15px',

  textAlign: 'left',
});

const EditButton = styled(Button)({
  padding: '8px 20px',
});

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoSrc = 'URL_TO_LOGO_IMAGE'; // Replace with the actual logo image URL
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchAvailableLocations = async () => {
      console.log('---------------------------fectching profile');
      try {
        const response = await ProfileService.getProfile(304);
        const data = response.data; // Assuming the response data is an array of location objects
        // const ProDta = data.map((location) => location.address);
        console.log(data);
        setProfile(data);
        console.log(profile, 'profile');
      } catch (error) {
        console.error('Error fetching available locations:', error);
      }
    };

    fetchAvailableLocations();
  }, []);

  // console.log(profile, 'profile before saving in the sessionStorage');

  // sessionStorage.setItem('profile', serializedProfile);
  // console.log(sessionStorage.getItem('profile'));

  const handleProfile = () => {
    const serializedProfile = JSON.stringify(profile);
    sessionStorage.setItem('profile', serializedProfile);
    dispatch(add(profile));
    navigate('/updateprofile', { state: { profileData: profile } });
  };
  return (
    <Layout>
      <Paper elevation={3}>
        <ProfileContainer>
          <Logo src={logoSrc} alt="Doctor Logo" />

          <Typography variant="h5">Profile Information</Typography>

          <FieldWrapper>
            <Typography>
              <strong>First Name:</strong> {profile.first_name}
            </Typography>
          </FieldWrapper>

          <FieldWrapper>
            <Typography>
              <strong>Last Name:</strong>
              {profile.last_name}
            </Typography>
          </FieldWrapper>

          <FieldWrapper>
            <Typography>
              <strong>Email:</strong> {profile.email}
            </Typography>
          </FieldWrapper>

          <FieldWrapper>
            <Typography>
              <strong>Phone Number:</strong> {profile.contact}
            </Typography>
          </FieldWrapper>

          <FieldWrapper>
            <Typography>
              <strong>Gender:</strong>
              {profile.gender}
            </Typography>
          </FieldWrapper>

          <FieldWrapper>
            <Typography>
              <strong>Blood Group:</strong> {profile.blood_group}
            </Typography>
          </FieldWrapper>

          <FieldWrapper>
            <Typography>
              <strong>Date of Birth:</strong> {profile.birth_date}
            </Typography>
          </FieldWrapper>

          <FieldWrapper>
            <Typography>
              <strong>City:</strong> {profile.city}
            </Typography>
          </FieldWrapper>

          <FieldWrapper>
            <Typography>
              <strong>Year of Pass Out:</strong> {profile.passout_year}
            </Typography>
          </FieldWrapper>

          <FieldWrapper>
            <Typography>
              <strong>University:</strong> {profile.university}
            </Typography>
          </FieldWrapper>

          <FieldWrapper>
            <Typography>
              <strong>Degrees:</strong> {profile.degree}
            </Typography>
          </FieldWrapper>

          <FieldWrapper>
            <Typography>
              <strong>Biography:</strong> {profile.biography}
            </Typography>
          </FieldWrapper>

          <FieldWrapper>
            <Typography>
              <strong>Medical License Number:</strong> {profile.license_number}
            </Typography>
          </FieldWrapper>

          <FieldWrapper>
            <Typography>
              <strong>Experience:</strong> {profile.experiance}
            </Typography>
          </FieldWrapper>
          <FieldWrapper>
            <Typography>
              <strong>Consultation Fees:</strong> {profile.consultationFees}
            </Typography>
          </FieldWrapper>

          {profile.specializations && profile.specializations.length > 0 && (
            <FieldWrapper>
              <Typography>
                <strong>Specializations:</strong>
                <ul>
                  {profile.specializations.map((spec, index) => (
                    <li key={index}>{spec.name}</li>
                  ))}
                </ul>
              </Typography>
            </FieldWrapper>
          )}

          <EditButton variant="contained" color="primary" onClick={handleProfile}>
            Edit
          </EditButton>
        </ProfileContainer>
      </Paper>
    </Layout>
  );
};

export default Profile;
