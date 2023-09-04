import { useState } from 'react';
// @mui
import { Link } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
// import account from '../../../_mock/account';
import FormDialog from '../../../pages/Dialog';
import ViewMore from '../../../pages/viewMore';
// import BankDetailsForm from 'src/pages/BankDetails';
import BankDetailsInfo from '../../../pages/BankDetailsInfo';
import SimpleBadge from './ReqBadge';

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
    <SimpleBadge/>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            John Doe
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            JohnDoe@gmail.com
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }} onClick={handleClose}>
          <MenuItem component={Link} to="/viewprofile">
            <Typography>My Profile</Typography>
          </MenuItem>
          <MenuItem component={Link} to="/profile">
            <Typography>Fill Profile</Typography>
          </MenuItem>
          <MenuItem component={Link} to="/addClinic">
            <Typography>Add Clinic</Typography>
          </MenuItem>
          <MenuItem component={Link} to="/showaddress">
            <Typography>My Clinic</Typography>
          </MenuItem>
          <MenuItem component={Link} to="/schedule">
            <Typography>Add Schedule</Typography>
          </MenuItem>
          <MenuItem component={Link} to="/myschedule">
            <Typography>My Schedule</Typography>
          </MenuItem>
          <MenuItem component={Link} to="/bank">
            <Typography>Fill Bank Details</Typography>
          </MenuItem>
          <MenuItem component={Link} to="/viewbankdetails">
            <Typography>My Bank Details</Typography>
          </MenuItem>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose} sx={{ m: 1, color: 'red' }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
