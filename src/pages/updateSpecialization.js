// import { Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import ProfileService from '../Service/ProfileService';

// export default function UpdateSpecialization() {
//   const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
//   const [profile, setProfile] = useState([]);
//   useEffect(() => {
//     const fetchAvailableLocations = async () => {
//       console.log('---------------------------fectching profile');
//       try {
//         const response = await ProfileService.getProfile(304);
//         const data = response.data; // Assuming the response data is an array of location objects
//         // const ProDta = data.map((location) => location.address);
//         console.log(data.specializations);
//         setProfile(data);
//         console.log(profile, 'profile');
//       } catch (error) {
//         console.error('Error fetching available locations:', error);
//       }
//     };

//     fetchAvailableLocations();
//   }, []);

//   const handleCheckboxChange = (event) => {
//     const selectedValue = event.target.value;
//     if (event.target.checked) {
//       // Checkbox is checked, add the selected value to the array
//       setSelectedCheckboxes((prevSelected) => [...prevSelected, selectedValue]);
//     } else {
//       // Checkbox is unchecked, remove the selected value from the array
//       setSelectedCheckboxes((prevSelected) => prevSelected.filter((value) => value !== selectedValue));
//     }
//   };
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <Grid item xs={12}>
//         {' '}
//         <Typography variant="h6">Select Speciality </Typography>
//       </Grid>
//       <Grid container spacing={2}>
//         <Grid item xs={3}>
//           <FormControlLabel
//             control={<Checkbox onChange={handleCheckboxChange} value="Cardiologist" />}
//             label="Cardiologist"
//           />
//         </Grid>
//         <Grid item xs={3}>
//           <FormControlLabel
//             control={<Checkbox onChange={handleCheckboxChange} value="Dermatologist" />}
//             label="Dermatologist"
//           />
//         </Grid>
//         <Grid item xs={3}>
//           <FormControlLabel
//             control={<Checkbox onChange={handleCheckboxChange} value="Dietitian" />}
//             label="Dietitian"
//           />
//         </Grid>
//         <Grid item xs={3}>
//           <FormControlLabel
//             control={<Checkbox onChange={handleCheckboxChange} value="Gynaecologist" />}
//             label="Gynaecologist"
//           />
//         </Grid>
//         <Grid item xs={3}>
//           <FormControlLabel
//             control={<Checkbox onChange={handleCheckboxChange} value="General Physician" />}
//             label="General Physician"
//           />
//         </Grid>
//         <Grid item xs={3}>
//           <FormControlLabel
//             control={<Checkbox onChange={handleCheckboxChange} value="Cardiologist" />}
//             label="Orthopedist"
//           />
//         </Grid>
//         <Grid item xs={3}>
//           <FormControlLabel
//             control={<Checkbox onChange={handleCheckboxChange} value="Pediatric" />}
//             label="Pediatric"
//           />
//         </Grid>
//         <Grid item xs={3}>
//           <FormControlLabel
//             control={<Checkbox onChange={handleCheckboxChange} value="Physiotherapist" />}
//             label="Physiotherapist"
//           />
//         </Grid>
//         <Grid item xs={3}>
//           <FormControlLabel
//             control={<Checkbox onChange={handleCheckboxChange} value="Urologist" />}
//             label="Urologist"
//           />
//         </Grid>
//       </Grid>
//       <Button variant="contained">Update</Button>
//     </div>
//   );
// }
import { Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProfileService from '../Service/ProfileService';

export default function UpdateSpecialization() {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchAvailableLocations = async () => {
      console.log('---------------------------fectching profile');
      try {
        const response = await ProfileService.getProfile(304);
        const data = response.data; // Assuming the response data is an array of location objects
        // const ProDta = data.map((location) => location.address);
        console.log(data.specializations);
        setProfile(data);

        // Initialize selectedCheckboxes with the values from the API
        setSelectedCheckboxes(data.specializations.map((spec) => spec.name));
        console.log(selectedCheckboxes)
        console.log(profile, 'profile');
      } catch (error) {
        console.error('Error fetching available locations:', error);
      }
    };

    fetchAvailableLocations();
  }, []);

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
  const handleUpdate=()=>{
    console.log("Selected Specializations:", selectedCheckboxes);

  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Grid item xs={12}>
        {' '}
        <Typography variant="h6">Select Speciality </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                value="Cardiologist"
                checked={selectedCheckboxes.includes('Cardiologist')}
              />
            }
            label="Cardiologist"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                value="Dermatologist"
                checked={selectedCheckboxes.includes('Dermatologist')}
              />
            }
            label="Dermatologist"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={<Checkbox onChange={handleCheckboxChange} value="Dietitian"  checked={selectedCheckboxes.includes('Dietitian')}/>}
            label="Dietitian"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={<Checkbox onChange={handleCheckboxChange} value="Gynaecologist" checked={selectedCheckboxes.includes('Gynaecologist')} />}
            label="Gynaecologist"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={<Checkbox onChange={handleCheckboxChange} value="General Physician" checked={selectedCheckboxes.includes('General Physician')} />}
            label="General Physician"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={<Checkbox onChange={handleCheckboxChange} value="Orthopedist"  checked={selectedCheckboxes.includes('Orthopedist')}/>}
            label="Orthopedist"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={<Checkbox onChange={handleCheckboxChange} value="Pediatric" checked={selectedCheckboxes.includes('Pediatric')} />}
            label="Pediatric"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={<Checkbox onChange={handleCheckboxChange} value="Physiotherapist"  checked={selectedCheckboxes.includes('Physiotherapist')}/>}
            label="Physiotherapist"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={<Checkbox onChange={handleCheckboxChange} value="Urologist" checked={selectedCheckboxes.includes('Urologist')} />}
            label="Urologist"
          />
        </Grid>{' '}
      </Grid>
      <Button variant="contained" onClick={handleUpdate}>Update</Button>
    </div>
  );
}
