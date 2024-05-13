import axios from 'axios';
import { useEffect, useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import PatientAppointmentForm from '../../components/PatientAppointmentForm/PatientAppointmentForm';
import useAuth from '../../hooks/useAuth';
import AppointmentModel from '../../model/AppointmentModel';
import './PatientDashboard.css';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentModel[]>([]);

  // TODO move appointments to context
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/patient/appointments');
        console.log(response.data.appointments);
        setAppointments(response.data.appointments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppointments();
    console.log(user);
  }, [user]);

  return (
    <div className='patient-dashboard'>
      <h2>Welcome back patient</h2>
      <span>{user?.firstName + ' ' + user?.lastName}</span>
      <PatientAppointmentForm />
      <Calendar appointments={appointments} />
    </div>
  );
};

export default PatientDashboard;
