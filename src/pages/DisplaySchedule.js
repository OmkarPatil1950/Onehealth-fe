import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'; // Correct import path
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import scheduleService from '../Service/scheduleService';
import { add } from '../store/ScheduleSlice';

function App() {
  const [scheduleData, setScheduleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  useEffect(() => {
    scheduleService.getSchedule(202).then((response) => {
      console.log(response.data);
      setScheduleData(response.data);
      setIsLoading(false);
    });
  }, []);

  const handleUpdateSchedule = (selectedData) => {
    // navigate(`/updateschedule/${doctorId}`);
    console.log(selectedData,'selected data')
    dispatch(add(selectedData));
    navigate('/updateschedule')
    // Handle update logic here
  };

  // Sort the scheduleData array by date in descending order
  const sortedScheduleData = [...scheduleData].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress size={60} color="secondary" />
          <Typography variant="h6">Loading...</Typography>
        </div>
      ) : sortedScheduleData.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Typography variant="h6">No schedule found..........</Typography>
          <Button component={Link} to="/schedule">
            Schedule
          </Button>
        </div>
      ) : (
        <div
          className="App"
          style={{
            maxWidth: '80%',
            width: '70%',
            padding: '20px',
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: '70px',
          }}
        >
          {sortedScheduleData.map((item, index) => (
            <Card key={index} variant="outlined" style={{ width: '100%', position: 'relative', marginBottom: '20px' }}>
              <CardContent>
                <Typography>
                  <strong>Selected Shift:</strong> {item.shift}
                </Typography>
                <Typography>
                  <strong>Selected Date:</strong> {item.date}
                </Typography>
                <Typography>
                  <strong>Start Time:</strong> {item.startTime}
                </Typography>
                <Typography>
                  <strong>End Time:</strong> {item.endTime}
                </Typography>
                <Typography>
                  <strong>Mode:</strong> {item.typeAvailability}
                </Typography>
                <Typography>
                  <strong>Locations:</strong> {item.addressAvailability}
                </Typography>
              </CardContent>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '10px', paddingLeft: '30px' }}>
                <Button variant="contained" color="success" onClick={() => handleUpdateSchedule(item)}>
                  {' '}
                  Update
                </Button>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
