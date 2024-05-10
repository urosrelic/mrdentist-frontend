import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';
import AppointmentModel from '../../model/AppointmentModel';
import './Calendar.css';
import Appointment from './components/Appointment/Appointment';

interface CalendarProps {
  appointments: AppointmentModel[];
}

const Calendar = ({ appointments }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return days;
  };

  const daysInMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return (
      appointmentDate.getFullYear() === selectedDate.getFullYear() &&
      appointmentDate.getMonth() === selectedDate.getMonth() &&
      appointmentDate.getDate() === selectedDate.getDate()
    );
  });

  return (
    <>
      <div className='calendar'>
        <div className='calendar-month-selection'>
          <div className='current-month'>
            <span>
              {currentDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className='change-date-btn'>
            <IconArrowLeft
              className='calendar-arrow-left'
              onClick={handlePreviousMonth}
            />
            <IconArrowRight
              className='calendar-arrow-right'
              onClick={handleNextMonth}
            />
          </div>
        </div>
        <div className='calendar-dates'>
          {daysInMonth.map((day, index) => (
            <div
              key={index}
              className='calendar-date'
              onClick={() => setSelectedDate(day)}
            >
              {day.getDate()}
            </div>
          ))}
        </div>
        <div className='calendar-appointments'>
          <div className='selected-appointment-date'>
            <span>
              {selectedDate.toLocaleString('default', { weekday: 'long' })}
            </span>
          </div>
          <div className='appointments'>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <Appointment appointmentDetails={appointment} />
              ))
            ) : (
              <span>No appointments</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
