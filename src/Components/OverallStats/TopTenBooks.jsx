import React, { useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const TopOERBooks = ({ books }) => {
  const [expanded, setExpanded] = useState(false);

  const topBooks = expanded ? books : books.slice(0, 5);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>Top 10 OER Books</Typography>
      <List>
        {topBooks.map((book, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={book.title}
              secondary={`Total Visitors: ${book.total_visitors}`}
            />
          </ListItem>
        ))}
      </List>
      {books.length > 5 && (
        <Button onClick={toggleExpand} sx={{ mt: 2 }}>
          {expanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </Paper>
  );
};

export default TopOERBooks;
