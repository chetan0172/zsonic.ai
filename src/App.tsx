import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout.tsx';
import Dashboard from './screens/Dashboard';
import Upload from './screens/Upload';
import ContentLibrary from './screens/ContentLibrary';
import Campaign from './screens/Campaign';
import Analytics from './screens/Analytics';
import Settings from './screens/Settings';
import LandingPage from './screens/LandingPage';
import Auth from './screens/Auth';

function App() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage isDark={isDark} setIsDark={setIsDark} />} />
      <Route path="/auth/*" element={<Auth />} />
      
      <Route path="/app" element={<DashboardLayout isDark={isDark} setIsDark={setIsDark} />}>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="upload" element={<Upload />} />
        <Route path="library" element={<ContentLibrary />} />
        <Route path="campaign" element={<Campaign />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;