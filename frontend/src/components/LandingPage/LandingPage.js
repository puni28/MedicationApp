import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="hero text-center bg-primary text-white py-5">
        <h1 className="display-4">Welcome to MedTracker</h1>
        <p className="lead">Your personal medication management assistant</p>
        <div className="cta-buttons">
          <Link to="/login" className="btn btn-light btn-lg mx-2">Login</Link>
          <Link to="/register" className="btn btn-outline-light btn-lg mx-2">Register</Link>
        </div>
      </div>
      <div className="features container mt-5">
        <div className="row">
          <div className="col-md-4 text-center">
            <i className="fas fa-pills fa-3x mb-3"></i>
            <h2>Medication Management</h2>
            <p>Keep track of all your medications in one place</p>
          </div>
          <div className="col-md-4 text-center">
            <i className="fas fa-calendar-alt fa-3x mb-3"></i>
            <h2>Schedule Reminders</h2>
            <p>Never miss a dose with customizable reminders</p>
          </div>
          <div className="col-md-4 text-center">
            <i className="fas fa-chart-line fa-3x mb-3"></i>
            <h2>Track Progress</h2>
            <p>Monitor your health and medication effectiveness</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
