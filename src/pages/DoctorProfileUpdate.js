import React, { Profiler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { endOfDay, isAfter, format, parse } from 'date-fns';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { add } from '../store/profileSlice';
import ProfileService from '../Service/ProfileService';

function UpdateProfile() {
  const [formErrors, setFormErrors] = useState({});

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  // const serializedProfile = sessionStorage.getItem('profile');

  // // Parse the serialized profile back into an object
  // const profile = JSON.parse(serializedProfile);
  const [profile, setProfile] = useState([]);
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await ProfileService.getProfile(153);
        const data = response.data;
        console.log('data is ->', data);
        setProfile(data);

        // Populate form fields when profile data is fetched
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          city: data.city || '',
          email: data.email || '',
          contact: data.contact || '',
          gender: data.gender || '',
          blood_group: data.blood_group || '',
          birth_date: data.birth_date || null, // Use null or a valid date
          license_number: data.license_number || '',
          experiance: data.experiance || '',
          passout_year: data.passout_year || '',
          university: data.university || '',
          degree: data.degree || '',
          biography: data.biography || '',
          specialization: data.specialization || '',
          // profilePicture: data.profilePicture || '',
        //   aadharId:'0',
        //   medicalCertId:'1',
        //   panId:'3',
        //   photoId:'7',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfileData();
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  const handleNext = () => {
    const errors = validateForm();
    console.log(formData,'-form data in the next')
    console.log('inside handle next');
    if (true) {
      dispatch(add(formData));
      navigate('/documents');
    } else {
      setFormErrors(errors);
    }
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    const newValue = value === 'Other' ? '' : value; // Set to empty string if 'Other'
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
    validateField(name, newValue);
  };
  const validateField = (name, value) => {
    // ... remaining code of the validateField function ...
  };

  const shouldDisableDate = (date) => {
    const today = endOfDay(new Date());
    return isAfter(date, today);
  };

  const handlecontactChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      contact: value,
    }));
    validateField('contact', value);
  };

  const handleDateChange = (date) => {
    const today = endOfDay(new Date());

    if (isAfter(date, today)) {
      // If selected date is after today, do not update the state

      return;
    }

    setSelectedDate(date);

    // Format the date as "yyyy-MM-dd" for sending to the backend

    const formattedDate = formatDateForBackend(date);

    setFormData((prevFormData) => ({
      ...prevFormData,

      dateOfBirth: formattedDate,
    }));
  };

  const formatDateForBackend = (date) => {
    if (!date) return ''; // Handle the case where the date is not set

    return date.toISOString().split('T')[0]; // Format the date as "yyyy-MM-dd"
  };
  // useEffect to check updated birth_date value
  const validateForm = () => {
    const errors = {};

    if (!formData.first_name) {
      errors.first_name = 'First Name is required';
    }

    if (!formData.last_name) {
      errors.last_name = 'Last Name is required';
    }

    if (!formData.city) {
      errors.city = 'City is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!formData.contact) {
      errors.contact = 'Contact number is required';
    } else if (!phonePattern.test(formData.contact)) {
      errors.contact = 'Invalid contact number';
    }
    // Add more validation checks for other fields here

    return errors;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('handle submit');

    // Validate all fields before submission
    const fieldNames = Object.keys(formData);
    const fieldErrors = {};

    fieldNames.forEach((name) => {
      validateField(name, formData[name]);
      fieldErrors[name] = formErrors[name];
    });
    console.log('The form data is ', formData);
    setFormErrors(fieldErrors);

    try {
      console.log('inside the try of the axios');

      ProfileService.saveProfile(formData).then((response) => {
        console.log('Data is saved sucessfully--------------------------');
        setFormData({
          first_name: '',
          last_name: '',
          city: '',
          email: '',
          contact: '',
          gender: '',
          blood_group: '',
          birth_date: '',
          license_number: '',
          experiance: '',
          passout_year: '',
          university: '',
          degree: '',
          biography: '',
          specialization: '',
          profilePicture: '',
        });
      });

      console.log(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const defaultTheme = createTheme();
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other'];
  const specializations = [
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Orthopedic Surgeon',
    'Neurologist',
    'Ophthalmologist',
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profilePicture: reader.result, // Update the profile picture with the selected image data URL
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <Grid container direction="column" alignItems="center">
              <Typography component="h1" variant="h5" sx={{ marginTop: '16px' }}>
                Doctor Profile
              </Typography>
              <Avatar
                src={formData.profilePicture}
                alt="Profile Picture"
                sx={{ width: '120px', height: '120px', marginTop: '16px' }}
              />
              <label htmlFor="upload-photo">
                <input
                  style={{ display: 'none', marginBottom: '2px' }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  
                />
                <Button variant="outlined" component="span" style={{ marginBottom: '8px' }}>
                  Upload Photo
                </Button>
              </label>
            </Grid>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="first_name"
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    error={formErrors.first_name !== ''}
                    helperText={formErrors.first_name}
                    required
                    InputLabelProps={{
                      shrink: true, // This property prevents label from overlapping with content
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    error={formErrors.last_name !== ''}
                    helperText={formErrors.last_name}
                    InputLabelProps={{
                      shrink: true, // This property prevents label from overlapping with content
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="city"
                    label="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={formErrors.city !== ''}
                    helperText={formErrors.city}
                    InputLabelProps={{
                      shrink: true, // This property prevents label from overlapping with content
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={formErrors.email !== ''}
                    helperText={formErrors.email}
                    InputLabelProps={{
                      shrink: true, // This property prevents label from overlapping with content
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <PhoneInput
                    fullWidth
                    country={'in'}
                    value={formData.contact}
                    onChange={handlecontactChange}
                    inputStyle={{ width: '100%', height: '56px' }}
                    containerStyle={{ marginBottom: '1rem' }}
                    buttonStyle={{ borderRadius: '4px 0 0 4px', height: '56px' }}
                    dropdownStyle={{
                      width: '250%',
                      height: '200px', // Set a fixed height for the dropdown
                      zIndex: 9999,
                      backgroundColor: '#ffffff',
                      overflowY: 'auto', // Enable vertical scrolling
                      fontSize: '10px',
                    }}
                    isValid={(value, country) => {
                      return formErrors.contact === '';
                    }}
                    InputLabelProps={{
                      shrink: true, // This property prevents label from overlapping with content
                    }}
                  />
                  {formErrors.contact && <Typography color="error">{formErrors.contact}</Typography>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select
                    fullWidth
                    id="gender"
                    name="gender"
                    value={formData.gender} // Make sure this value matches one of the options in the dropdown
                    onChange={handleChange}
                    displayEmpty
                    renderValue={(selected) => selected || 'Select Gender'}
                    error={formErrors.gender !== ''}
                    InputLabelProps={{
                      shrink: true, // This property prevents label from overlapping with content
                    }}
                  >
                    <MenuItem value="">Select Gender</MenuItem>
                    {genders.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.gender && <Typography color="error">{formErrors.gender}</Typography>}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Select
                    fullWidth
                    id="blood_group"
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleChange}
                    displayEmpty
                    renderValue={(selected) => selected || 'Select Blood Group'}
                    error={formErrors.blood_group !== ''}
                    InputLabelProps={{
                      shrink: true, // This property prevents label from overlapping with content
                    }}
                  >
                    <MenuItem value="">Select Blood Group</MenuItem>
                    {bloodGroups.map((bloodGroup) => (
                      <MenuItem key={bloodGroup} value={bloodGroup}>
                        {bloodGroup}
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.blood_group && <Typography color="error">{formErrors.blood_group}</Typography>}
                </Grid>
                <Grid item xs={6}>
                  <Select
                    fullWidth
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    displayEmpty
                    renderValue={(selected) => selected || 'Select specialization'}
                    error={formErrors.specialization !== ''}
                    InputLabelProps={{
                      shrink: true, // This property prevents label from overlapping with content
                    }}
                  >
                    <MenuItem value="">Select specialization</MenuItem>
                    {specializations.map((specialization) => (
                      <MenuItem key={specialization} value={specialization}>
                        {specialization}
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.specialization && <Typography color="error">{formErrors.specialization}</Typography>}
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    fullWidth
                    label="Date of Birth"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                    shouldDisableDate={shouldDisableDate}
                    InputLabelProps={{
                      shrink: true, // This property prevents label from overlapping with content
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="license_number"
                    label="Medical License Number"
                    name="license_number"
                    value={formData.license_number}
                    onChange={handleChange}
                    error={formErrors.license_number !== ''}
                    helperText={formErrors.license_number}
                    InputLabelProps={{
                      shrink: true, // This property prevents label from overlapping with content
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="experiance"
                    label="experiance"
                    type="number"
                    name="experiance"
                    value={formData.experiance}
                    onChange={handleChange}
                    error={formErrors.experiance !== ''}
                    helperText={formErrors.experiance}
                    inputProps={{
                      min: 0,
                      max: 100,
                    }}
                    InputLabelProps={{
                      shrink: true, // This property prevents label from overlapping with content
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="passout_year"
                    label="Year of Pass Out"
                    name="passout_year"
                    type="number"
                    value={formData.passout_year}
                    onChange={handleChange}
                    error={formErrors.passout_year !== ''}
                    helperText={formErrors.passout_year}
                    inputProps={{
                      min: 1950,
                      max: 2023,
                    }}
                    InputLabelProps={{
                      shrink: true, // This property prevents label from overlapping with content
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="university"
                    label="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    error={formErrors.university !== ''}
                    helperText={formErrors.university}
                    InputLabelProps={{
                      shrink: true, // This property prevents label from overlapping with content
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="degree"
                    label="degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    error={formErrors.degree !== ''}
                    helperText={formErrors.degree}
                    InputLabelProps={{
                      shrink: true, // This property prevents label from overlapping with content
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="biography"
                    label="Biography"
                    name="biography"
                    multiline
                    rows={4}
                    value={formData.biography}
                    onChange={handleChange}
                    error={formErrors.biography !== ''}
                    helperText={formErrors.biography}
                    InputLabelProps={{
                      shrink: true, // This property prevents label from overlapping with content
                    }}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleNext}>
                next
              </Button>
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default UpdateProfile;