import React from 'react';
import { Modal, Paper, Typography, Button, Box } from '@mui/material';

const ErrorModal = ({ error, handleClose }) => {
  return (
    <Modal
      open={!!error}
      onClose={handleClose}
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
    >
      <Paper sx={{ p: 3, m: 'auto', mt: '20%', maxWidth: 400 }}>
        <Typography id="error-modal-title" variant="h6" component="h2">
          Error
        </Typography>
        <Typography id="error-modal-description" sx={{ mt: 2 }}>
          {error}
        </Typography>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ErrorModal;
