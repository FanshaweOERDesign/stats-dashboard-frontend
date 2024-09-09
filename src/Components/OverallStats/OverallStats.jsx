import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';

const OverallStats = ({ stats }) => {
  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const formattedStats = {
    total_views: parseInt(stats.total_views).toLocaleString(),
    total_visitors: parseInt(stats.total_visitors).toLocaleString(),
    realtime_views: stats.realtime_views,
    books_unavailable: stats.books_unavailable,
    avg_change_in_views: parseFloat(stats.avg_change_in_views.toFixed(2)).toLocaleString(),
    avg_change_in_visitors: parseFloat(stats.avg_change_in_visitors.toFixed(2)).toLocaleString(),
    net_change_in_views: parseInt(stats.net_change_in_views).toLocaleString(),
    net_change_in_visitors: parseInt(stats.net_change_in_visitors).toLocaleString(),
    total_estimated_savings: formatNumber(stats.total_estimated_savings),
    fanshawe_estimated_savings: formatNumber(stats.fanshawe_estimated_savings),
    fanshawe_visitors: parseInt(stats.fanshawe_visitors).toLocaleString(),
    total_books: parseInt(stats.num_books).toLocaleString(),
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Views</Typography>
            <Typography variant="h4">{formattedStats.total_views}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Visitors</Typography>
            <Typography variant="h4">{formattedStats.total_visitors}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Fanshawe Visitors</Typography>
            <Typography variant="h4">{formattedStats.fanshawe_visitors}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Books</Typography>
            <Typography variant="h4">{formattedStats.total_books}</Typography>
          </Paper>
        </Grid>
        
        {/*<Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Realtime Views</Typography>
            <Typography variant="h4">{formattedStats.realtime_views}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Books Unavailable</Typography>
            <Typography variant="h4">{formattedStats.books_unavailable}</Typography>
          </Paper>
        </Grid>*/}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Avg. Change in Views</Typography>
            <Typography variant="h4">{formattedStats.avg_change_in_views}%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Avg. Change in Visitors</Typography>
            <Typography variant="h4">{formattedStats.avg_change_in_visitors}%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Net Change in Views</Typography>
            <Typography variant="h4">{formattedStats.net_change_in_views}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Net Change in Visitors</Typography>
            <Typography variant="h4">{formattedStats.net_change_in_visitors}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
        </Grid>
        {/*<Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Fanshawe Estimated Savings</Typography>
            <Typography variant="h4">{formattedStats.fanshawe_estimated_savings}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Estimated Savings</Typography>
            <Typography variant="h4">{formattedStats.total_estimated_savings}</Typography>
          </Paper>
        </Grid>*/}
        <Grid item xs={12} md={3}>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverallStats;
