import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/login';
import Registro from './components/register';
import Home from './components/home';
import Patients from './components/patients';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/"
            element={
              <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
                <h1 className="mb-4 text-center text-primary">Bienvenido a HealthLink</h1>
                <Link to='/login'
                  className="btn btn-primary btn-lg w-50"
                >
                  Ir al Login
                </Link>
              </div>
            } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
