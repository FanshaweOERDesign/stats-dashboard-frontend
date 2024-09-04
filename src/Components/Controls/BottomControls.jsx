import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Slider,
  InputAdornment
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import ErrorModal from "../Modals/ErrorModal";

const BottomControls = ({ onApply, books }) => {
  const [selectedBook, setSelectedBook] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [avgTextbookCost, setAvgTextbookCost] = useState(150);

  useEffect(() => {
    const cachedAvgTextbookCost = localStorage.getItem('cachedAvgTextbookCost');
    const cachedSelectedBook = localStorage.getItem('cachedSelectedBook');

    if (cachedAvgTextbookCost) {
      setAvgTextbookCost(parseFloat(cachedAvgTextbookCost));
    }

    if (cachedSelectedBook) {
      setSelectedBook(cachedSelectedBook);
    }
  }, []);

  const handleApply = useCallback(async () => {
    const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : null;
    const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : null;

    if (!formattedStartDate || !formattedEndDate) {
      setError("Please select a valid date range.");
      return;
    }

    if (!selectedBook) {
      setError("Please select a book.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8384/get-stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            start_date: formattedStartDate,
            end_date: formattedEndDate,
            title: selectedBook,
            avg_textbook_cost: avgTextbookCost
          },
        }),
      });

      const stats = await response.json();
      onApply(stats);
    } catch (error) {
      console.error(error);
      setError('We ran into an error fetching stats, please try again in a few moments.');
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, selectedBook, avgTextbookCost, onApply]);

  const handleCloseModal = () => {
    setError(null);
  };

  const handleSetBook = (bookTitle) => {
    setSelectedBook(bookTitle);
    localStorage.setItem('cachedSelectedBook', bookTitle);
  };

  const handleChangeAvgTextbookCost = (event) => {
    const newCost = event.target.value;
    setAvgTextbookCost(newCost);
    localStorage.setItem('cachedAvgTextbookCost', newCost);
  };

  const handleSliderChange = (event, newValue) => {
    setAvgTextbookCost(newValue);
    localStorage.setItem('cachedAvgTextbookCost', newValue.toString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
        <Typography sx={{ textAlign: "center" }}>Date Range</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
          <Box sx={{marginRight: 2}}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(dayjs(newValue))}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Box>
          <Box sx={{marginLeft: 2}}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(dayjs(newValue))}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Box>
        </Box>
        <Box sx={{ mt: 2, width: '100%' }}>
          <FormControl fullWidth>
            <InputLabel>Book Title</InputLabel>
            <Select
              value={selectedBook}
              onChange={(e) => handleSetBook(e.target.value)}
              label="Book Title"
            >
              {books.map((book, index) => (
                <MenuItem key={index} value={book}>
                  {book}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Textbook Cost"
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
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button variant="contained" color="primary" onClick={handleApply} disabled={loading}>
            Apply
          </Button>
        </Box>
        {loading && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', width: '100%' }}>
            <CircularProgress />
          </Box>
        )}
        <ErrorModal error={error} handleClose={handleCloseModal} />
      </Box>
    </LocalizationProvider>
  );
};

export default BottomControls;
