import { IconSquareRoundedMinus } from '@tabler/icons-react';
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth';
import AppointmentModel from '../../../../model/AppointmentModel';
import './Appointment.css';

interface AppointmentProps {
  appointmentDetails: AppointmentModel;
}

const Appointment = ({ appointmentDetails }: AppointmentProps) => {
  const { user, userRole } = useAuth();

  const startDate = new Date(appointmentDetails.date);
  const endDate = new Date(startDate.getTime());
  endDate.setMinutes(startDate.getMinutes() + appointmentDetails.duration);

  const startMinutes = startDate.getMinutes().toString().padStart(2, '0');
  const endMinutes = endDate.getMinutes().toString().padStart(2, '0');

  const appointmentDuration = `${startDate.getHours()}:${startMinutes} - ${endDate.getHours()}:${endMinutes}`;

  const cancelAppointment = async () => {
    try {
      if (userRole === 'patient') {
        const patientId = user?.id;
        const response = await axios.post('/api/patient/cancel-appointment', {
          appointmentId: appointmentDetails.id,
          patientId: patientId,
        });
        alert(response.data.message);
      }

      if (userRole === 'dentist') {
        const dentistId = user?.id;
        const response = await axios.post('/api/dentist/cancel-appointment', {
          appointmentId: appointmentDetails.id,
          dentistId: dentistId,
        });
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  const handleCancelAppointment = () => {
    cancelAppointment();
  };

  return (
    <div className='appointment'>
      <div className='appointment-date'>{appointmentDuration}</div>
      <div className='appointment-details'>
        <div className='appointment-type'>{appointmentDetails.type}</div>
      </div>
      <div className='appointment-cancel-btn'>
        <IconSquareRoundedMinus color='red' onClick={handleCancelAppointment} />
      </div>
    </div>
  );
};

export default Appointment;
