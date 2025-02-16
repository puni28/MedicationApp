import React, { useState, useEffect } from 'react';
import { getScheduleItemByDate, updateTaken, getAllSchedules } from '../../services/schedule';
import Swal from 'sweetalert2';
import Modal from 'react-modal';  
import Calendar from 'react-calendar';
import loadingGif from '../../assets/loading.gif'; // Import your loading GIF
import 'react-calendar/dist/Calendar.css';

Modal.setAppElement('#root'); // Set the app element for react-modal
function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSchedule, setModalSchedule] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [allSchedules, setAllSchedules] = useState([]); // State to hold all schedules

  useEffect(() => {
    fetchAllSchedules(); // Fetch all schedules on component mount
  });

  const fetchAllSchedules = async () => {
    try {
      const response = await getAllSchedules(); // Call the API to get all schedules
      setAllSchedules(response.data); // Save fetched schedules to state
      updateCalendarColors(response.data); // Update calendar colors after fetching
    } catch (error) {
      console.error('Failed to fetch all schedules:', error);
    }
  };

  const updateCalendarColors = (schedules) => {
    const calendarCells = document.querySelectorAll('.react-calendar__tile');
    calendarCells.forEach(cell => {
      const date = new Date(cell.getAttribute('aria-label'));
      const scheduleItem = schedules.find(item => new Date(item.scheduled_date).toLocaleDateString('en-US') === date.toLocaleDateString('en-US'));
      if (scheduleItem) {
        cell.style.backgroundColor = 'aqua'; // Set background color for scheduled dates
      } else {
        cell.style.backgroundColor = ''; // Reset background color for unscheduled dates
      }
    });
  };

  const fetchSchedule = async (date) => {
    try {
      const formattedDate = date.getFullYear().toString() + "-" + (date.getMonth()+1).toString() + "-" + date.getDate().toString();
      const response = await getScheduleItemByDate(formattedDate);
      if (response.status === 200) {
        const scheduleData = Object.values(response.data).flat().map(item => ({
          id: item.id,
          medication_id: item.medication_id,
          medication_name: item.medication_name,
          schedule_date: item.schedule_date,
          taken: item.taken,
          schedule_time: item.schedule_time.split('T')[1].slice(0, 5)
        })) || []; 
        setModalSchedule(scheduleData);
      } else {
        setModalSchedule([]);
      }
    } catch (error) {
      console.error('Failed to fetch schedule:', error);
    }
  };

  const handleDateClick = async (date) => {
    setSelectedDate(date);
    setLoading(true); // Set loading to true when fetching schedule
    await fetchSchedule(date); // Fetch schedule for the selected date
    setLoading(false); // Set loading to false after fetching
    setModalIsOpen(true);
    updateCalendarColors(allSchedules); // Update colors when a date is clicked
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleTakenChange = async (item) => {
    try {
      await updateTaken(item.id); // Call the API to update the taken status
      fetchSchedule(selectedDate); // Refresh the schedule after updating
    } catch (error) {
      console.error('Failed to update taken status:', error);
      Swal.fire('Error', 'Failed to update taken status. Please try again.', 'error');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary">Medication Schedule</h2>
      <p className="text-center">Select a date to view your medication schedule for the day.</p>
      <div className="text-center d-flex justify-content-center mt-5">
        <Calendar 
          onClickDay={handleDateClick} 
          value={selectedDate} 
          onActiveDateChange={({ activeStartDate }) => updateCalendarColors(allSchedules)} // Update colors on month change
        />
      </div>
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            maxHeight: '80%', // Adjust max height
            overflowY: 'auto', // Allow scrolling if content is too tall
            borderRadius: '10px', // Rounded corners
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Shadow effect
          }
        }}
      >
        {loading ? (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." className="loading-gif" />
          </div>
        ) : (
          <div>
            <h2 className="text-center">Schedule for {selectedDate.toDateString()}</h2>
            <div className="list-group">
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <p>Medication<br/>Time</p>
                <p>Taken</p>
              </div>
                {modalSchedule.map((item) => (                  
                  <div key={`${item.medication_id}-${item.schedule_time}`} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column">
                    <span>{item.medication_name}</span> {/* Display medication_name */}
                    <span className="badge bg-secondary me-2" title={`${item.medication_name} at item.schedule_time`}>{item.schedule_time}</span>
                  </div>
                  <div>
                    <input  
                      type="checkbox" 
                      checked={item.taken} 
                      onChange={() => handleTakenChange(item)} // Call the function on change
                    />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={closeModal} className="btn btn-secondary">Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Schedule;
  