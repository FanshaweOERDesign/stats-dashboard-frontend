import React from "react";
import { Box, Typography} from "@mui/material";
import OverallStats from "../../Components/OverallStats/OverallStats";
import LineChart from "../../Components/Charts/LineChart/LineChart"
import TopControls from "../../Components/Controls/TopControls"
import BottomControls from "../../Components/Controls/BottomControls";
import ReferrersList from "../../Components/OverallStats/Referrers";
import TopOERBooks from "../../Components/OverallStats/TopTenBooks";
import HotMap from "../../Components/OverallStats/HotMap";
import "./Home.scss"

const HomePage = ({ 
  overallStats, 
  bookStats, 
  monthlyOverallTrafficData, 
  monthlyBookTrafficData, 
  handleApplyTopControls, 
  handleApplyBottomControls, 
  books, 
  bottomControlsApplied,
  setFadeIn 
}) => {
  return (
    <Box className="main-container" sx={{ mt: 15, p: 3, pb: bottomControlsApplied ? 15 : '300px' }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>Overall Statistics</Typography>
      <TopControls onApply={handleApplyTopControls} setFadeIn={setFadeIn} />
      <OverallStats stats={overallStats} />
      <Box sx={{ mt: 2, height: '400px' }}>
              <LineChart chartData={monthlyOverallTrafficData} height="100%" />
      </Box>
      <TopOERBooks books={overallStats.top_ten_oers} />
      {overallStats.referrers && Object.keys(overallStats.referrers).length > 0 && (
        <ReferrersList referrers={Object.entries(overallStats.referrers).map(([url, data]) => ({ url, views: data.views, visitors: data.visitors }))} />
      )}
      {overallStats.referrers && Object.keys(overallStats.referrers).length > 0 && <HotMap referrers={overallStats.referrers} />}
      <Typography variant="h4" sx={{ textAlign: "center" }}>Statistics By Book Title</Typography>
      <BottomControls onApply={handleApplyBottomControls} books={books} />
      {bottomControlsApplied && (
        <>
          <OverallStats stats={bookStats} />
          <Box sx={{ mt: 2, height: '400px' }}>
            <LineChart chartData={monthlyBookTrafficData} height="100%" />
          </Box>
          {bookStats.referrers && Object.keys(bookStats.referrers).length > 0 && (
            <ReferrersList referrers={Object.entries(bookStats.referrers).map(([url, data]) => ({ url, views: data.views, visitors: data.visitors }))} />
          )}
          {bookStats.referrers && Object.keys(bookStats.referrers).length > 0 && <HotMap referrers={bookStats.referrers} />}
        </>
      )}
    </Box>
  );
};

export default HomePage;
