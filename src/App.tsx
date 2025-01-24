import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import GlobalStyle from './styles/GlobalStyle';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cek status autentikasi saat aplikasi dimulai
  useEffect(() => {
    const token = localStorage.getItem('token'); // Cek token di localStorage
    if (token) {
      setIsAuthenticated(true); // Jika token ada, set status autentikasi ke true
    }
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Mengarahkan ke Login */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/home" element={isAuthenticated ? <Home isAuthenticated={isAuthenticated} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;