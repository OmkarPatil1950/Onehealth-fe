import { Helmet } from 'react-helmet-async';
// @mui
import {  Grid, Typography } from '@mui/material';




export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Payments </title>
      </Helmet>

      <Grid container
  direction="row"
  justifyContent="center"
  alignItems="center"
  sx={{height:'100%'}}>
        
          <Typography variant="h4" gutterBottom>
            Payments
          </Typography>
          
        

        
      </Grid>
    </>
  );
}
