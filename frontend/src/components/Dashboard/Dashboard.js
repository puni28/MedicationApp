import { Link } from 'react-router-dom';
function Dashboard() {
  return (
    <div className="container mt-4">
      <h1 className="text-center">Dashboard</h1>
      
      <div className="row">
        <section className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">My Medications</h2>
              <Link to="/medications" className="btn btn-primary mt-2">View All Medications</Link>
            </div>
          </div>
        </section>

        <section className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Schedules</h2>
              <Link to="/schedule" className="btn btn-primary mt-2">View Full Schedule</Link>
            </div>
          </div>
        </section>

        <section className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Medical Recommendations</h2>
              <Link to="/recommendation" className="btn btn-primary mt-2">View Recommendations</Link>
            </div>
          </div>
        </section>

        <section className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Pill Identifier</h2>
              <a href="/augmented-reality/pill-identifier.html" className="btn btn-primary mt-2" target="_blank">View Pill Identifier</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
