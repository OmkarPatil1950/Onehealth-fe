import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery, Pagination } from '@mui/material';
import { VideoCall, Event, AccessTime, Visibility, Person } from '@mui/icons-material';
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import InitialIcon from './IconBuilder';
import FormDialog from './Dialog';
import ViewMore from './viewMore';
import UpcomingAppointmentService from '../Service/UpcomingAppointmentService';

const ITEMS_PER_PAGE = 5;
const ExploreIcon = <AspectRatioIcon style={{ color: 'black' }} />;
let array = [];

const AppointmentCard = ({ appointment }) => {
  console.log(appointment, '-******------------------app');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedAppointment, setSelectedAppointment] = useState();

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedAppointment(null);
  };
  const visibilityIcon = <Visibility />;
  const upcomingIcon = <PendingActionsTwoToneIcon style={{ color: 'red' }} />; // <-- Change this line
  console.log(appointment, '------------------- last');

  return (
    <Box
      className="appointment-list"
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      alignItems="center"
      justifyContent="space-between"
      p={1}
      sx={{ bgcolor: 'background.paper', marginBottom: '10px' }}
    >
      <Box display="flex" alignItems="center" marginBottom="10px">
        <InitialIcon
          initials={appointment.patient_name ? appointment.patient_name.slice(0, 1) : ''}
          sx={{ backgroundColor: 'red' }}
        />
        <Box marginLeft={isMobile ? 2 : 2} mt={isMobile ? 2 : 0} sx={{ backgroundColor: 'transparent' }}>
          <Typography>{appointment.patient_name}</Typography>
          <Box className="patient-details" mt={1}>
            <Typography
              variant=""
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '12px',
                marginTop: '5px',
                color: 'GrayText',
              }}
            >
              <Event fontSize="small" sx={{ marginRight: '4px' }} /> {appointment.date}
              <Box component="span" sx={{ px: 3 }} />
              <AccessTime fontSize="small" sx={{ marginRight: '4px' }} /> {appointment.appointmentTime}
              <Box component="span" sx={{ px: 3 }} />
              <Person fontSize="small" sx={{ marginRight: '4px' }} /> {appointment.gender}
              <Box component="span" sx={{ px: 3 }}>
                |
              </Box>
              <VideoCall fontSize="small" sx={{ marginRight: '4px' }} /> {appointment.type}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="appointment-action" mt={isMobile ? 2 : 0}>
        <Box className="dc-recent-content">
          <FormDialog
            prop={
              <ViewMore
                AppointmentStatus={'upcoming'}
                FullAppointmentData={array}
                IconToDisplay={upcomingIcon}
                appointment={selectedAppointment}
              />
            }
            Style="md"
            buttonTitle="View More"
            buttonStyle={{ variant: 'outlined', style: { borderColor: 'green', color: 'green', marginRight: '25px' } }}
            icon={visibilityIcon}
            open={dialogOpen}
            onClose={handleCloseDialog}
          />
        </Box>
      </Box>
    </Box>
  );
};

const AppointmentsList = () => {
  const [page, setPage] = useState(1);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [paginatedAppointments, setPaginatedAppointments] = useState([]);

  const fetchAppointmentsData = async () => {
    try {
      const response = await UpcomingAppointmentService.getUpcomingAppointment(3);
      const data = response.data;

      // Sort the data by the 'date' property in ascending order
      const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));

      setAppointmentsData(sortedData);
      array = sortedData;
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointmentsData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newPaginatedAppointments = appointmentsData.slice(startIndex, endIndex);
    setPaginatedAppointments(newPaginatedAppointments);
  }, [page, appointmentsData]);

  return (
    <div>
      {appointmentsData.length === 0 ? ( // Check if there's no data in appointmentsData
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {/* <img src="path/to/your/image.png" alt="" /> */}
          <Typography variant="h6">No appointments available.</Typography>
        </div>
      ) : (
        paginatedAppointments.map((appointment) => <AppointmentCard key={appointment.id} appointment={appointment} />)
      )}
      {appointmentsData.length > ITEMS_PER_PAGE && (
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(appointmentsData.length / ITEMS_PER_PAGE)}
            page={page}
            onChange={handleChangePage}
            size="small"
            color="primary"
          />
        </Box>
      )}
    </div>
  );
};

export default AppointmentsList;
