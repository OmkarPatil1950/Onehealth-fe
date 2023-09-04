import { useMediaQuery, MenuItem, Select, NativeSelect, FormControl, TextField, InputAdornment, Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
// import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import PreviousAppointment from './PatientHistory';
import UpcomingAppointment from './upcomingAppointments';
import TodaysAppointments from './TodaysAppoinment';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function FullWidthTabs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = React.useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  // const handleSearch = () => {
  //   // Your search logic goes here
  //   console.log('Search icon clicked');
  // };

  return (
    <div>
      
 <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
           sx={{
          bgcolor: 'transparent', // Remove the background color
          width: isMobile ? '100%' : '250px',
          marginBottom: '10px',
          marginLeft: '70px',
         
        }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>Todays Appointment</MenuItem>
          <MenuItem value={1}>Upcoming Appointment</MenuItem>
       
        </Select>
      </FormControl>
      
    
   

<Box sx={{ bgcolor: 'none', width: isMobile ? '100%' : '1000px', marginLeft: '50px' }}>
        <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={setValue}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <TodaysAppointments />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <UpcomingAppointment />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
