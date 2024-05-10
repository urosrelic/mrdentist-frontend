import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import DentistModel from '../../model/DentistModel';
const PatientAppointmentForm = () => {
  const { user } = useAuth();
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentDuration, setAppointmentDuration] = useState('');
  const [dentists, setDentists] = useState<DentistModel[]>([]);
  const [selectedDentist, setSelectedDentist] = useState('');

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await axios.get('/api/dentist');
        console.log(response.data);
        setDentists(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDentists();
  }, [user]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === 'appointmentDate') {
      setAppointmentDate(value);
    } else if (name === 'appointmentDuration') {
      setAppointmentDuration(value);
    } else if (name === 'appointmentType') {
      setAppointmentType(value);
    } else if (name === 'dentistId') {
      setSelectedDentist(value);
    }
  };

  // useEffect(() => {
  //   console.log('selected dentist ' + selectedDentist);
  // }, [selectedDentist]);

  const bookAppointment = async () => {
    try {
      const response = await axios.post('/api/patient/book-appointment', {
        dentistId: selectedDentist,
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
    console.log(selectedDentist);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='dentist'>Choose a dentist:</label>
      <select
        id='dentist'
        name='dentistId'
        value={selectedDentist}
        onChange={handleInputChange}
      >
        <option value='' selected disabled hidden>
          Choose here
        </option>
        {dentists.map((dentist: DentistModel) => (
          <option key={dentist.id} value={dentist.id}>
            {dentist.first_name + ' ' + dentist.last_name}
          </option>
        ))}
      </select>
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

export default PatientAppointmentForm;
