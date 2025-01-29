import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Spinner from './components/Spinner';

const NotFound = lazy(() => import('./components/NotFound'));
const Registration = lazy(() => import('./pages/Registration'));
const Login = lazy(() => import('./pages/Login'));
const ViewProfile = lazy(() => import('./pages/ViewProfile'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const Logout = lazy(() => import('./pages/Logout'));

function App() {  

  return (
      <Router>
          <Suspense fallback={<Spinner />}>
              <Routes>
                  <Route path="*" element={<NotFound />} />   
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Registration />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} /> 
                  <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} >
                    <Route path="profile" element={<ProtectedRoute><ViewProfile /></ProtectedRoute>} />
                  </Route>
              </Routes>
          </Suspense>
      </Router>
  )
}

export default App
