import React, { useState } from "react";
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const FacultyStats = ({ statsByFaculty }) => {
  const [selectedFaculty, setSelectedFaculty] = useState("");

  if (!statsByFaculty) {
    return null;
  }

  const handleFacultyChange = (event) => {
    setSelectedFaculty(event.target.value);
  };

  const facultyOptions = Object.keys(statsByFaculty).sort();

  const facultyData = statsByFaculty[selectedFaculty] || {};

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Statistics by Faculty
      </Typography>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Select Faculty</InputLabel>
        <Select value={selectedFaculty} onChange={handleFacultyChange}>
          {facultyOptions.map((faculty) => (
            <MenuItem key={faculty} value={faculty}>
              {faculty}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedFaculty && (
        <Box sx={{ mt: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">{selectedFaculty}</Typography>
            <Typography variant="body1">
              Total Views: {facultyData.total_views?.toLocaleString() || 0}
            </Typography>
            <Typography variant="body1">
              Total Visitors: {facultyData.total_visitors?.toLocaleString() || 0}
            </Typography>
            <Typography variant="body1">
              Percentage of Views: {(facultyData.percentage_views)?.toFixed(2) || 0}%
            </Typography>
            <Typography variant="body1">
              Percentage of Visitors: {(facultyData.percentage_visitors)?.toFixed(2) || 0}%
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default FacultyStats;
