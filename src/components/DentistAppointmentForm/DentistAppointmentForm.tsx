import axios from 'axios';
import { useState } from 'react';
const DentistAppointmentForm = () => {
  const [patientUsername, setPatientUsername] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentDuration, setAppointmentDuration] = useState('');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === 'patientUsername') {
      setPatientUsername(value);
    } else if (name === 'appointmentDate') {
      setAppointmentDate(value);
    } else if (name === 'appointmentDuration') {
      setAppointmentDuration(value);
    } else if (name === 'appointmentType') {
      setAppointmentType(value);
    }
  };

  console.log(appointmentDate);

  const bookAppointment = async () => {
    try {
      const response = await axios.post('/api/dentist/book-appointment', {
        username: patientUsername,
        type: appointmentType,
        date: appointmentDate,
        duration: Number(appointmentDuration),
      });
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    bookAppointment();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='patient-name'>Patient username:</label>
      <input
        type='text'
        id='patient-name'
        name='patientUsername'
        value={patientUsername}
        onChange={handleInputChange}
      />

      <label htmlFor='appointment-type'>Appointment type:</label>
      <input
        type='text'
        id='appointment-type'
        name='appointmentType'
        value={appointmentType}
        onChange={handleInputChange}
      />

      <label htmlFor='appointment-date'>Appointment Date:</label>
      <input
        type='datetime-local'
        id='appointment-date'
        name='appointmentDate'
        value={appointmentDate}
        onChange={handleInputChange}
      />
      <label htmlFor='appointment-duration'>Appointment Duration:</label>
      <select
        id='appointment-duration'
        name='appointmentDuration'
        value={appointmentDuration}
        onChange={handleInputChange}
      >
        <option value=''>--Please choose an option--</option>
        <option value='30'>30 minutes</option>
        <option value='60'>60 minutes</option>
      </select>

      <button type='submit'>Book appointment</button>
    </form>
  );
};

export default DentistAppointmentForm;
