import React, { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider} from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import HomePage from "./Pages/Home/Home";
import LoginPage from "./Pages/Login/Login";
import EditBookPage from "./Pages/EditBooks/EditBooks";
import { lightTheme, darkTheme } from "./Utils/Theme";
import "./App.scss";
import useAuth from "./Hooks/useAuth";

function App() {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [monthlyOverallTrafficData, setOverallMonthlyTrafficData] = useState({});
  const [monthlyBookTrafficData, setBookMonthlyTrafficData] = useState({});
  const [progress, setProgress] = useState(0);
  const [overallStats, setOverallStats] = useState({
    total_views: 0,
    total_visitors: 0,
    realtime_views: 0,
    books_unavailable: 0,
    avg_change_in_views: 0,
    avg_change_in_visitors: 0,
    net_change_in_views: 0,
    net_change_in_visitors: 0,
    fanshawe_estimated_savings: 0,
    total_estimated_savings: 0,
    referrers: {}, 
    top_ten_oers: []
  });
  const [bookStats, setBookStats] = useState({
    total_views: 0,
    total_visitors: 0,
    realtime_views: 0,
    books_unavailable: 0,
    avg_change_in_views: 0,
    avg_change_in_visitors: 0,
    net_change_in_views: 0,
    net_change_in_visitors: 0,
    fanshawe_estimated_savings: 0,
    total_estimated_savings: 0,
    referrers: {}
  });
  const [books, setBooks] = useState([]);
  const [bottomControlsApplied, setBottomControlsApplied] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();

  const handleApplyTopControls = (stats) => {
    setOverallMonthlyTrafficData(stats.daily_stats);
    setOverallStats(stats);
  };

  const handleApplyBottomControls = (stats) => {
    setBookMonthlyTrafficData(stats.daily_stats);
    setBookStats(stats);
    setBottomControlsApplied(true);
  };

  const toggleTheme = () => {
    const newTheme = !isLightTheme;
    setIsLightTheme(newTheme);
    sessionStorage.setItem('isLightTheme', JSON.stringify(newTheme));
  };

  useEffect(() => {
    const savedTheme = sessionStorage.getItem('isLightTheme');
    if (savedTheme) {
      setIsLightTheme(JSON.parse(savedTheme));
    }

    const cachedStats = sessionStorage.getItem('cachedStats');
    if (cachedStats) {
      handleApplyTopControls(JSON.parse(cachedStats));
      setOverallStats(JSON.parse(cachedStats));
    }

    const cachedBooks = sessionStorage.getItem('cachedBooks');
    if (cachedBooks) {
      setBooks(JSON.parse(cachedBooks));
    } else {
      const fetchBooks = async () => {
        try {
          const response = await fetch('/get-oers');
          const titles = await response.json();
          setBooks(titles);
          sessionStorage.setItem('cachedBooks', JSON.stringify(titles)); 
        } catch (error) {
          console.error('Error fetching book titles:', error);
        } 
      };

      fetchBooks();
      
    }
  }, []);


  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <CssBaseline />
        <Router>
          <Header isLoggedIn={isLoggedIn} logout={logout} />
          <Routes>
          <Route 
              path="/" 
              element={
                  <HomePage 
                    overallStats={overallStats}
                    bookStats={bookStats}
                    monthlyOverallTrafficData={monthlyOverallTrafficData}
                    monthlyBookTrafficData={monthlyBookTrafficData}
                    handleApplyTopControls={handleApplyTopControls}
                    handleApplyBottomControls={handleApplyBottomControls}
                    books={books}
                    bottomControlsApplied={bottomControlsApplied}
                    setFadeIn={setFadeIn}
                  />
              } 
            />
            <Route 
              path="/login" 
              element={<LoginPage login={login} />} 
            />
             <Route 
              path="/edit-books" 
              element={<EditBookPage isLoggedIn={isLoggedIn} logout={logout} />} 
            />
          </Routes>
          <Footer isLightTheme={isLightTheme} toggleTheme={toggleTheme} />
        </Router>
    </ThemeProvider>
  );
}

export default App;
