import React, { useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const ReferrersList = ({ referrers }) => {
  const [expanded, setExpanded] = useState(false);

  const topReferrers = expanded ? referrers : referrers.slice(0, 5);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>Top Referrers</Typography>
      <List>
        {topReferrers.map((referrer, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={referrer.url}
              secondary={`Views: ${referrer.views}, Visitors: ${referrer.visitors}`}
            />
          </ListItem>
        ))}
      </List>
      {referrers.length > 10 && (
        <Button onClick={toggleExpand} sx={{ mt: 2 }}>
          {expanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </Paper>
  );
};

export default ReferrersList;
