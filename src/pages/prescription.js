import React, { useState } from 'react';

import Container from '@mui/material/Container';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import SendIcon from '@mui/icons-material/Send';

import Grid from '@mui/material/Grid';

import { AppBar, FormControl, Hidden, InputLabel, MenuItem, Select, Toolbar, Typography } from '@mui/material';

// import Email from 'smtpjs';

import Jspdf from 'jspdf';


import logoImg from './logo.png';

function Addmoreinput() {
  // const n= useHistory();

  const [inputList, setinputList] = useState([
    { drugname: '', numberOfTablets: 0, frequencyValue: '', intakeValue: '', days: 0 },
  ]);

  const [info, setInfo] = useState([]);

  const handleRemove = (index) => {
    const list = [...inputList];

    list.splice(index, 1);

    setinputList(list);
  };

  const handleAddClick = () => {
    setinputList([...inputList, { drugname: '', numberOfTablets: 0, frequencyValue: '', intakeValue: '', days: 0 }]);
  };

  const handleDrugnameChangeForRow = (event, index) => {
    const newInputList = [...inputList];

    newInputList[index].drugname = event.target.value;

    setinputList(newInputList);

    updateInfo(index, 'drugname', event.target.value);
  };

  const handleTabletNumberChangeForRow = (event, index) => {
    const newInputList = [...inputList];

    newInputList[index].numberOfTablets = event.target.value;

    setinputList(newInputList);

    updateInfo(index, 'numberOfTablets', event.target.value);
  };

  const handleFrequencyChangeForRow = (event, index) => {
    const newInputList = [...inputList];

    newInputList[index].frequencyValue = event.target.value;

    setinputList(newInputList);

    updateInfo(index, 'frequencyValue', event.target.value);
  };

  const handleIntakeChangeForRow = (event, index) => {
    const newInputList = [...inputList];

    newInputList[index].intakeValue = event.target.value;

    setinputList(newInputList);

    updateInfo(index, 'intakeValue', event.target.value);
  };

  const handleDayChangeForRow = (event, index) => {
    const newInputList = [...inputList];

    newInputList[index].days = event.target.value;

    setinputList(newInputList);

    updateInfo(index, 'days', event.target.value);
  };

  const updateInfo = (index, key, value) => {
    const newInfo = [...info];

    newInfo[index] = {
      ...newInfo[index],

      [key]: value,
    };

    setInfo(newInfo);
  };

  const jsPdfgenerate = () => {
    const doc = new Jspdf('p', 'pt');

    // Load the logo image

    const logoWidth = 100;

    const logoHeight = 50;

    // Add the logo to the top-left corner

    doc.addImage(logoImg, 'PNG', 20, 20, logoWidth, logoHeight);

    // Set the font and font size for the text

    doc.setFont('helvetica');

    doc.setFontSize(12);

    // Set the doctor's name

    const doctorName = 'Dr. John Doe';

    doc.setFont('bold');

    doc.text(doctorName, doc.internal.pageSize.getWidth() - doc.getStringUnitWidth(doctorName) - 100, 50);

    // Set the doctor's specialty

    const specialty = 'Cardiology';

    doc.setFont('bold');

    doc.setTextColor('#0000FF'); // Set the text color to blue using hexadecimal color code

    doc.text(specialty, doc.internal.pageSize.getWidth() - doc.getStringUnitWidth(specialty) - 100, 65);

    // Calculate the position for the horizontal line below the "Cardiology" text

    const linePositionY = 75; // Adjust the value to control the vertical position of the line

    // Add a horizontal line below the "Cardiology" text

    doc.setLineWidth(1); // Line width in points

    doc.line(20, linePositionY, doc.internal.pageSize.getWidth() - 20, linePositionY);

    // Display additional information below the horizontal line

    const additionalInfoY = linePositionY + 20; // Adjust the value to control the vertical position of the additional information

    const name = 'Name: John Doe';

    const age = 'Age: 20';

    const currentDate = `Date: ${new Date().toLocaleDateString()}`;

    doc.setFont('helvetica', 'normal');

    doc.setTextColor('black'); // Set the text color to black using named color

    doc.text(name, 20, additionalInfoY);

    doc.text(age, 20, additionalInfoY + 15);

    doc.text(currentDate, 20, additionalInfoY + 30);

    // Display "Drug," "Quantity," "Frequency," "Intake," and "Days" on the same horizontal line with 5cm spacing

    const horizontalLineY = additionalInfoY + 80; // Adjust the value to control the vertical position of the horizontal line

    const wordSpacing = 120; // Adjust the value to control the horizontal spacing between words (5cm = 180 points)

    // Set the background color for the horizontal line and words

    doc.setFillColor(200, 200, 200); // Light gray color

    // Draw rectangles for the background

    doc.rect(20, horizontalLineY - 12, 5 * wordSpacing, 15, 'F'); // Background for the horizontal line

    doc.rect(20, horizontalLineY, wordSpacing, 10, 'F'); // Background for "Drug"

    doc.rect(20 + wordSpacing, horizontalLineY, wordSpacing, 10, 'F'); // Background for "Quantity"

    doc.rect(20 + 2 * wordSpacing, horizontalLineY, wordSpacing, 10, 'F'); // Background for "Frequency"

    doc.rect(20 + 3 * wordSpacing, horizontalLineY, wordSpacing, 10, 'F'); // Background for "Intake"

    doc.rect(20 + 4 * wordSpacing, horizontalLineY, wordSpacing - 3, 10, 'F'); // Background for "Days"

    // Draw text for "Drug," "Quantity," "Frequency," "Intake," and "Days"

    doc.setTextColor('black'); // Set the text color back to black

    doc.text('Drug', 20, horizontalLineY + 6);

    doc.text('Quantity', 20 + wordSpacing, horizontalLineY + 6);

    doc.text('Frequency', 20 + 2 * wordSpacing, horizontalLineY + 6);

    doc.text('Intake', 20 + 3 * wordSpacing, horizontalLineY + 6);

    doc.text('Days', 10 + 4 * wordSpacing, horizontalLineY + 6);

    // Draw the values of frequencyValue, intakeValue, drugname, numberOfTablets, and days

    doc.setTextColor('black'); // Set the text color back to black

    // Calculate the position for the values

    const valuesX = 20;

    const valuesY = horizontalLineY + 25; // Adjust the value to control the vertical position of the values

    const lineHeight = 20;

    // Display the values

    inputList.forEach((record, index) => {
      doc.text(`${record.drugname}`, valuesX, valuesY + index * lineHeight);

      doc.text(`${record.numberOfTablets}`, valuesX + wordSpacing, valuesY + index * lineHeight);

      doc.text(`${record.frequencyValue}`, valuesX + 2 * wordSpacing, valuesY + index * lineHeight);

      doc.text(`${record.numberOfTablets}`, valuesX + 3 * wordSpacing, valuesY + index * lineHeight);

      doc.text(`${record.days}`, valuesX + 4 * wordSpacing, valuesY + index * lineHeight);
    });

    // Save the PDF

    doc.save('generated_pdf.pdf');
    // const pdfDataUri = doc.output('datauristring');
    // const emailConfig = {
    //   SecureToken: 'YourSecureToken', // Replace with your secure token
    //   To: 'recipient@gmail.com',     // Recipient's email address
    //   From: 'sender@gmail.com',      // Sender's email address
    //   Subject: 'Email with PDF Attachment',
    //   Body: 'This email contains a PDF attachment',
    //   Attachments: [
    //     {
    //       name: 'attachment.pdf',
    //       data: pdfDataUri
    //     }
    //   ]
    // };
  
    // Send the email
    // Email.send(emailConfig)
    //   .then(message => alert(message))
    //   .catch(error => console.error('Error sending email:', error));

  
  };

  return (
    <>
      <div className="">
        <Container className="content">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="mt-3 mb-4 fw-bold">Write your Prescription here !!!!!!!!!</h3>

              <div>
                {/* For larger screens (sm and up) */}

                <Hidden xsDown>
                  <AppBar position="static" color="default" elevation={0}>
                    <Toolbar>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item sm={3}>
                          <Typography variant="h6" color="inherit">
                            Drug
                          </Typography>
                        </Grid>

                        <Grid item sm={3}>
                          <Typography variant="h6" color="inherit">
                            Frequency
                          </Typography>
                        </Grid>

                        <Grid item sm={3}>
                          <Typography variant="h6" color="inherit">
                            Intake
                          </Typography>
                        </Grid>

                        <Grid item sm={2}>
                          <Typography variant="h6" color="inherit">
                            Days
                          </Typography>
                        </Grid>
                      </Grid>
                    </Toolbar>
                  </AppBar>
                </Hidden>

                {inputList.map((x, i) => (
                  <Grid container spacing={2} key={i} style={{ marginTop: i === inputList.length - 1 ? '2px' : 0 }}>
                    <Grid item xs={3}>
                      <TextField
                        id={`drugname-${i}`}
                        label="Search a drug"
                        variant="outlined"
                        size="small"
                        value={x.drugname}
                        onChange={(event) => handleDrugnameChangeForRow(event, i)}
                      />
                    </Grid>

                    <Grid item xs={1}>
                      <TextField
                        id={`numberOfTablets-${i}`}
                        type="number"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={x.numberOfTablets}
                        onChange={(event) => handleTabletNumberChangeForRow(event, i)}
                      />
                    </Grid>

                    <Grid item xs={2}>
                      <FormControl fullWidth>
                        <InputLabel id={`demo-simple-select-label-${i}`}>Frequency</InputLabel>

                        <Select
                          labelId={`demo-simple-select-label-${i}`}
                          id={`demo-simple-select-${i}`}
                          value={x.frequencyValue}
                          label="Frequency"
                          size="small"
                          onChange={(event) => handleFrequencyChangeForRow(event, i)}
                        >
                          <MenuItem value="twice daily">twice daily</MenuItem>

                          <MenuItem value="three times a day">three times a day</MenuItem>

                          <MenuItem value="four times a day">four times a day</MenuItem>

                          <MenuItem value="every four hours">every four hours</MenuItem>

                          <MenuItem value="every two hours">every two hours</MenuItem>

                          <MenuItem value="every other hour">every other hour</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={2.7}>
                      <FormControl fullWidth>
                        <InputLabel id={`demo-simple-select-label-age-${i}`}>Intake</InputLabel>

                        <Select
                          labelId={`demo-simple-select-label-age-${i}`}
                          id={`demo-simple-select-age-${i}`}
                          value={x.intakeValue}
                          label="intake"
                          size="small"
                          onChange={(event) => handleIntakeChangeForRow(event, i)}
                        >
                          <MenuItem value="Before Food">Before Food</MenuItem>

                          <MenuItem value="After Food">After Food</MenuItem>

                          <MenuItem value="Early in the morning">Early in the morning</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid className="mr-6" item xs={1}>
                      <TextField
                        id={`days-${i}`}
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        size="small"
                        value={x.days}
                        onChange={(event) => handleDayChangeForRow(event, i)}
                      />
                    </Grid>

                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                      {inputList.length !== 1 && (
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleRemove(i)}
                          style={{ marginRight: '4px' }}
                        >
                          Remove
                        </Button>
                      )}

                      {inputList.length - 1 === i && (
                        <Button variant="contained" color="primary" onClick={handleAddClick} size="small">
                          Add More
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                ))}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end', // Align button to the right
                marginTop: '8px',
                paddingRight: '20px', // Add padding for better spacing

                // Optional: Media query for smaller screens
                '@media (max-width: 600px)': {
                  justifyContent: 'center', // Center button on small screens
                  paddingRight: 0, // Remove right padding
                },
              }}
            >
              <Button
                variant="outlined"
                color="success"
                style={{ width: '100px' }}
                endIcon={<SendIcon />}
                onClick={jsPdfgenerate}
              >
                Send
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Addmoreinput;
