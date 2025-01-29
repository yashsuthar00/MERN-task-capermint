import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Registration from './pages/Registration';
import Login from './pages/Login';
import UpdateProfile from './pages/UpdateProfile';
import ViewProfile from './pages/ViewProfile';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

function App() {  

  return (
      <Router>
              <Routes>
                  <Route path="*" element={<NotFound />} />   
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Registration />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/update-profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
                  <Route path="/view-profile" element={<ProtectedRoute><ViewProfile /></ProtectedRoute>} />
                  <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
              </Routes>
      </Router>
  )
}

export default App
