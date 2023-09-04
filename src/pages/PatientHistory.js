import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Typography } from '@mui/material';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import FormDialog from './Dialog';
import ViewMore from './viewMore';
import CompletedAppointmentService from '../Service/CompletedAppointmentService';

const columns = [
  { id: 'patient_name', label: 'Name of Patient', minWidth: 150, sortable: true },
  { id: 'date', label: 'Appointment Date', minWidth: 100, sortable: true },
  {
    id: 'appointment_time',
    label: 'Appointment Time',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'type',
    label: 'Appointment Type',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'explore',
    minWidth: 100,
    format: (value) => value.toFixed(2),
  },
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('patient_name');
  const [sortDirection, setSortDirection] = useState('asc');
  // const [appointmentsData, setAppointmentsData] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (columnId) => {
    if (columnId === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };

  const upcomingIcon = <CheckCircleTwoToneIcon style={{ color: 'green' }} />;

  // useEffect(() => {
  //   const fetchAvailableLocations = async () => {
  //     try {
  //       const response = await CompletedAppointmentService.getCompletedAppointment(3);
  //       const data = response.data;
  //       console.log(data);
  //       setAppointmentsData(data);
  //     } catch (error) {
  //       console.error('Error fetching available locations:', error);
  //     }
  //   };

  //   fetchAvailableLocations();
  // }, []);
  const appointmentsData = [
    {
      patient_name: 'John Doe',
      date: '2023-08-31',
      appointment_time: '09:00 AM',
      type: 'Offline',
      // pdfLink: 'path/to/pdf1.pdf',
      code: 1,
    },
    {
      patient_name: 'Jane Smith',
      date: '2023-09-01',
      appointment_time: '02:30 PM',
      type: 'Online',
      // pdfLink: 'path/to/pdf2.pdf',
      code: 2,
    },
    // ... more appointments
  ];

  if (appointmentsData.length === 0) { // Check if there's no data in appointmentsData
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {/* <img src="path/to/your/image.png" alt="No Data" /> */}
        <Typography variant="h6">No completed appointments available.</Typography>
      </div>
    );
  }
  const sortedRows = [...appointmentsData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0; // Add this line
  });

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    color: 'blue',
                    fontWeight: 'bold', // Added to make the head cells bold
                    borderBottom: 'none',
                  }}
                >
                  {column.sortable ? (
                    <Button onClick={() => handleSort(column.id)}>{column.label}</Button>
                  ) : (
                    <Button>{column.label}</Button>
                  )}
                </TableCell>
              ))}
              <TableCell align="right">View More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align} style={{ textAlign: 'center' }}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
                <FormDialog
                  prop={
                    <ViewMore
                      AppointmentStatus={'Completed'}
                      FullAppointmentData={appointmentsData}
                      IconToDisplay={upcomingIcon}
                      GeneratePdf='/pdf'
                      name={'generate Prescription'}
                    />
                  }
                  Style="md"
                  buttonTitle="View More"
                  buttonStyle={{
                    variant: 'outlined',
                    style: {
                      borderColor: 'green',
                      color: 'green',
                    },
                  }}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={appointmentsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
