import React, { useState } from 'react';

import {
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import FeesService from '../Service/FeesService';

const FeesStructure = () => {
  const [feesData, setFeesData] = useState([
    { doctorId: '71', speciality: 'Flu', fees: '100' },

    { doctorId: '71', speciality: 'Cold', fees: '80' },

    { doctorId: '71', speciality: 'Fever', fees: '120' },
  ]);

  
  const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(null);

  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const handleFeesChange = (event, index) => {
    const { name, value } = event.target;

    const newFeesData = feesData.map((fee, i) => (i === index ? { ...fee, [name]: value } : fee));

    setFeesData(newFeesData);
  };

  const handleAddRow = () => {
    setFeesData([...feesData, { speciality: '', fees: '' }]);
  };

  const handleDeleteRow = (index) => {
    setSelectedDeleteIndex(index);

    setConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    const newFeesData = feesData.filter((_, i) => i !== selectedDeleteIndex);

    setFeesData(newFeesData);

    setSelectedDeleteIndex(null);

    setConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setSelectedDeleteIndex(null);

    setConfirmationOpen(false);
  };

  const handleSubmit = () => {
    console.log('Fees Data:', feesData);
    FeesService.saveFees(feesData).then((response) => {
      console.log('fees saved sucseccfully...............');
    });
  };

  return (
    <div style={{ marginLeft: '0px', marginTop: '0px' }}>
      <Typography variant="h5" gutterBottom>
        Change Fees Structure
      </Typography>

      <Paper
        elevation={3}
        style={{ padding: '16px', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)', marginRight: '20px' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>speciality</TableCell>

              <TableCell>Fees</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {feesData.map((fee, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField name="speciality" value={fee.speciality} onChange={(e) => handleFeesChange(e, index)} />
                </TableCell>

                <TableCell>
                  <TextField
                    name="fees"
                    type="number"
                    value={fee.fees}
                    onChange={(e) => handleFeesChange(e, index)}
                    inputProps={{ min: 0 }}
                  />
                </TableCell>

                <TableCell>
                  <Button
                    onClick={() => handleDeleteRow(index)}
                    variant="contained"
                    color="error" // Set the color to red
                    sx={{ color: 'white' }} // Set the text color to white
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button variant="contained" onClick={handleAddRow} style={{ marginTop: '16px', marginRight: '8px' }}>
          Add Row
        </Button>

        <Button variant="contained" onClick={handleSubmit} style={{ marginTop: '16px' }}>
          Save Changes
        </Button>
      </Paper>

      {/* Delete Confirmation Dialog */}

      <Dialog open={isConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>

        <DialogContent>
          <DialogContentText>Are you sure you want to delete this entry?</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>

          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeesStructure;
