import React, { useState } from 'react';
import Login from './components/Login/Login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import HomeScreen from './components/HomeScreen/HomeScreen';
import { login } from './services/authService';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-wrapper">
        {showForgotPassword ? (
          <ForgotPassword onClose={() => setShowForgotPassword(false)} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} onForgotPassword={() => setShowForgotPassword(true)} />
        )}
      </div>
    );
  }

  return (
    <HomeScreen user={user} onLogout={handleLogout} />
  );
};

export default App;

