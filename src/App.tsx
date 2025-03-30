import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';

// Import pages
import Landing from './pages/Landing';
import SmartCalendar from './pages/SmartCalendar';
import Layout from './components/layout/Layout';

// Placeholder imports for future components
const Dashboard = () => <div>Dashboard Page</div>;
const HabitTracker = () => <div>Habit Tracker Page</div>;
const Shop = () => <div>Shop Page</div>;
const Login = () => <div>Login Page</div>;
const Signup = () => <div>Signup Page</div>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<SmartCalendar />} />
          <Route path="/habits" element={<HabitTracker />} />
          <Route path="/shop" element={<Shop />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App; 