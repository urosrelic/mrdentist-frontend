import axios from 'axios';
import { useEffect, useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import DentistAppointmentForm from '../../components/DentistAppointmentForm/DentistAppointmentForm';
import useAuth from '../../hooks/useAuth';
import AppointmentModel from '../../model/AppointmentModel';
import './DentistDashboard.css';
const DentistDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentModel[]>([]);

  // TODO move appointments to context
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/dentist/appointments');
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
    <div className='dentist-dashboard'>
      <h2>Welcome back dentist</h2>
      <span>{user?.first_name + ' ' + user?.last_name}</span>
      <DentistAppointmentForm />

      <div className='dentist-schedule'>
        <Calendar appointments={appointments} />
      </div>
    </div>
  );
};

export default DentistDashboard;
