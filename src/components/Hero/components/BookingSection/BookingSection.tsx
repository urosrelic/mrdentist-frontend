import {
  IconCalendar,
  IconCreditCardRefund,
  IconDental,
} from '@tabler/icons-react';
import './BookingSection.css';

const BookingSection = () => {
  return (
    <div className='booking-section'>
      <span className='section-title'>Make better choices</span>
      <div className='booking-section-content'>
        <div className='booking-section-item'>
          <div className='booking-section-item-icon'>
            <IconCalendar size={120} color='#ae6c5c' />
          </div>
          <div className='booking-section-item-text'>
            <span>Booking is a breeze</span>
            <p>You are just a click away from booking your appointment</p>
            {/* <ul>
              <li> No calls </li>
              <li> No emails </li>
              <li> No unnecessary waiting </li>
            </ul> */}
          </div>
        </div>
        <div className='booking-section-item'>
          <div className='booking-section-item-icon'>
            <IconDental size={120} color='#ae6c5c' />
          </div>
          <div className='booking-section-item-text'>
            <span>Quality dental care</span>
            <p>
              We guarantee that you will not have any troubles during or after
              your appointment
            </p>
          </div>
        </div>
        <div className='booking-section-item'>
          <div className='booking-section-item-icon'>
            <IconCreditCardRefund size={120} color='#ae6c5c' />
          </div>
          <div className='booking-section-item-text'>
            <span>30 Day Money Back guarantee</span>
            <p>
              If you are not happy with our services, you can apply to get a
              refund within 30 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;
