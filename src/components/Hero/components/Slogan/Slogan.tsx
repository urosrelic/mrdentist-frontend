import './Slogan.css';

const Slogan = () => {
  return (
    <div className='slogan-section'>
      <div className='slogan-container'>
        <div className='slogan'>
          <span>Take care of your teeth and they will take care of you</span>
        </div>
        <div className='sub-slogan'>
          <span>Where Excellence Meets Convenience, Book Online Instantly</span>
        </div>
      </div>
      <div className='slogan-image-container'>
        <img src='/toothbrush.jpg' />
      </div>
    </div>
  );
};

export default Slogan;
