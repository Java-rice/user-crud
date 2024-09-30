// src/App.js
import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Course from './pages/Course';
import Users from './pages/Users';
import Payment from './pages/Payment';
import Report from './pages/Report';
import Settings from './pages/Settings';
import Header from './components/Header';

function App() {
  const [isExpanded, setIsExpanded] = useState(true); // Sidebar state

  const toggleSidebar = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <Router>
      <div className="app flex flex-row min-h-screen">
        <Sidebar isExpanded={isExpanded} />
        <div className={`content w-[100%] bg-[#F8F8F8]`}>
        <Header isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course" element={<Course />} />
            <Route path="/users" element={<Users />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/report" element={<Report />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
