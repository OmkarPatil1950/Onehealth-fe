import * as React from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function FormDialog({prop,Style,buttonTitle,buttonStyle,icon, generatePdf }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Button
        onClick={handleClickOpen}
        variant={buttonStyle.variant}
        style={{ ...buttonStyle.style }}
        // startIcon={icon}
      >
        {buttonTitle}
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={Style} fullWidth>
        <DialogContent>
          {prop}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}