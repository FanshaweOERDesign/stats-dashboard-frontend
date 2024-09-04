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
    total_views: stats.total_views,
    total_visitors: stats.total_visitors,
    realtime_views: stats.realtime_views,
    books_unavailable: stats.books_unavailable,
    avg_change_in_views: stats.avg_change_in_views.toFixed(2),
    avg_change_in_visitors: stats.avg_change_in_visitors.toFixed(2),
    net_change_in_views: stats.net_change_in_views,
    net_change_in_visitors: stats.net_change_in_visitors,
    total_estimated_savings: formatNumber(stats.total_estimated_savings),
    fanshawe_estimated_savings: formatNumber(stats.fanshawe_estimated_savings),
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
            <Typography variant="h6">Realtime Views</Typography>
            <Typography variant="h4">{formattedStats.realtime_views}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Books Unavailable</Typography>
            <Typography variant="h4">{formattedStats.books_unavailable}</Typography>
          </Paper>
        </Grid>
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
        <Grid item xs={12} md={3}>
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
        </Grid>
        <Grid item xs={12} md={3}>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverallStats;
