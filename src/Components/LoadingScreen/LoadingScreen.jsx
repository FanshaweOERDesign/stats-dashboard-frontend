import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { loadingText } from "../../Utils/loadingText";
import ProgressBar from "@ramonak/react-progress-bar";

const LoadingScreen = (props) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (loadingText.length > 0) {
      setCurrentText(loadingText[0]);
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = Math.floor(Math.random() * loadingText.length);
        setCurrentText(loadingText[nextIndex]);
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [loadingText]);

  return (
    <div style={{ minWidth: '50%', marginLeft: "50%", transform: "translateX(-50%)" }}>
      
    <ProgressBar />
  

    </div>

//     {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center', minWidth: '100%' }}>
//       <img className='logo' src="../assets/Images/oer_logo.png" alt="OER Logo" />
//       <ProgressBar completed={currentIndex * 10} />
//       <Typography variant="h6" sx={{ mt: 2 }}>
//         {currentText}
//       </Typography>
//     </Box>  
// */}
  );
};

export default LoadingScreen;
