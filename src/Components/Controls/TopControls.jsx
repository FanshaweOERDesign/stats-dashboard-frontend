import React, { useState, useEffect, useRef } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  TextField,
  Slider,
  InputAdornment,
  Modal
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import ErrorModal from "../Modals/ErrorModal";
import ModalBody from "rsuite/esm/Modal/ModalBody";

const TopControls = ({ onApply, setFadeIn }) => {
  const [startDate, setStartDate] = useState(dayjs().subtract(1, 'year'));
  const [endDate, setEndDate] = useState(dayjs());
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState(null);
  const [avgTextbookCost, setAvgTextbookCost] = useState(150);
  const [progress, setProgress] = useState(0);
  const initialized = useRef(false);

  useEffect(() => {

    if (initialized.current) {
      return;
    }
    const cachedStats = sessionStorage.getItem('cachedStats');
    const cachedStartDate = sessionStorage.getItem('cachedStartDate');
    const cachedEndDate = sessionStorage.getItem('cachedEndDate');
    const cachedAvgTextbookCost = sessionStorage.getItem('cachedAvgTextbookCost');
    
    if (cachedStats) {
      onApply(JSON.parse(cachedStats));
      setFadeIn(true);
    } else {
      setLocalLoading(true); 
    }
    
    if (cachedStartDate && cachedEndDate) {
      setStartDate(dayjs(cachedStartDate));
      setEndDate(dayjs(cachedEndDate));
    } else {
      const defaultStartDate = dayjs().subtract(1, 'year');
      const defaultEndDate = dayjs();
      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
      handleApply(defaultStartDate, defaultEndDate, avgTextbookCost);
    }

    if (cachedAvgTextbookCost) {
      setAvgTextbookCost(parseFloat(cachedAvgTextbookCost));
    }

    initialized.current = true;
  }, [onApply]);

  const handleApply = async (start = startDate, end = endDate, avgCost = avgTextbookCost) => {
    const formattedStartDate = start ? start.format('YYYY-MM-DD') : null;
    const formattedEndDate = end ? end.format('YYYY-MM-DD') : null;
    
    if (!formattedStartDate || !formattedEndDate) {
      setError("Please select a valid date range.");
      return;
    }
    
    setLocalLoading(true);
    setProgress(0);

    try {
      const response = await fetch('http://localhost:8384/get-stats-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            start_date: formattedStartDate,
            end_date: formattedEndDate,
            avg_textbook_cost: avgCost,
          },
        }),
      });

      const clientId = await response.json();
      console.log('Client ID:', clientId);

      listenForProgress(clientId.clientId, start, end, avgCost);
    } catch (error) {
      console.error(error);
      setError('We ran into an error fetching stats, please try again in a few moments.');
    } finally {
      setFadeIn(true);
    }
  };

  const listenForProgress = async (clientId, start, end, avgCost) => {

    const eventSource = new EventSource(`http://localhost:8384/get-stats-progress/${clientId}`);
    eventSource.addEventListener('progress', (event) => {
        const data = JSON.parse(event.data);
        const tempProgress = Math.floor(data.progress);
        setProgress(tempProgress);
    });

    eventSource.addEventListener('complete', (event) => {
        const stats = JSON.parse(event.data).data;
        
        sessionStorage.setItem('cachedStats', JSON.stringify(stats));
        sessionStorage.setItem('cachedStartDate', start.format());
        sessionStorage.setItem('cachedEndDate', end.format());
        sessionStorage.setItem('cachedAvgTextbookCost', avgCost.toString());
        onApply(stats);
        eventSource.close();
        setLocalLoading(false);
    });

    eventSource.addEventListener('error', (event) => {
        if (!event || !event.error) {
            eventSource.close();
            return;
        }
        const data = JSON.parse(event.error);
        console.error(data.error);
        eventSource.close();
    });
}

  const handleChangeStartDate = (newValue) => {
    const newStartDate = dayjs(newValue);
    setStartDate(newStartDate);
    sessionStorage.setItem('cachedStartDate', newStartDate.format());
  };

  const handleChangeEndDate = (newValue) => {
    const newEndDate = dayjs(newValue);
    setEndDate(newEndDate);
    sessionStorage.setItem('cachedEndDate', newEndDate.format());
  };

  const handleChangeAvgTextbookCost = (event) => {
    const newCost = event.target.value;
    setAvgTextbookCost(newCost);
    sessionStorage.setItem('cachedAvgTextbookCost', newCost);
  };

  const handleSliderChange = (event, newValue) => {
    setAvgTextbookCost(newValue);
    sessionStorage.setItem('cachedAvgTextbookCost', newValue.toString());
  };

  const handleCloseModal = () => {
    setError(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 3, justifyContent: "center" }}>
        <Typography sx={{ textAlign: "center" }}>Date Range</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
          <Box sx={{ marginRight: 2 }}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={handleChangeStartDate}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Box>
          <Box sx={{ marginLeft: 2 }}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={handleChangeEndDate}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Box>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Average Textbook Cost"
            type="number"
            value={avgTextbookCost}
            onChange={handleChangeAvgTextbookCost}
            sx={{ width: '200px', mb: 2 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <Slider
            value={avgTextbookCost}
            min={0}
            max={500}
            step={1}
            onChange={handleSliderChange}
            sx={{ width: '300px' }}
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={() => handleApply()} disabled={localLoading}>
            Apply
          </Button>
        </Box>
        <ErrorModal error={error} handleClose={handleCloseModal} />
      </Box>
      <Modal open={localLoading}>
        <ModalBody style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "100vh" }}>
          <div style={{width: "300px", backgroundColor: "white", textAlign: "center", padding: "2em" }}>
            <img className='logo' src="../assets/Images/oer_logo.png" alt="OER Logo" />
            <Typography variant='body1'>Collecting stats...</Typography>
          <ProgressBar completed={progress}/>
          </div>
        </ModalBody>
        
      </Modal>
    </LocalizationProvider>
  );
};

export default TopControls;
