import { IconHeartbeat } from '@tabler/icons-react';
import './HealthSection.css';

const HealthSection = () => {
  return (
    <div className='health-section'>
      <div className='health-section-content'>
        <span>Your health is your most valuable asset.</span>
        <div className='health-section-icon'>
          <IconHeartbeat size={120} color='white' />
        </div>
        <span>
          It's why we obsess over getting you the exceptional care you deserve.
        </span>
      </div>
    </div>
  );
};

export default HealthSection;
