import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import UserModel from '../../model/UserModel';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');

  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const responseUser: UserModel | null = await login(username);

    if (responseUser?.role === 'dentist') {
      navigate('/dentist-dashboard');
    }

    if (responseUser?.role === 'patient') {
      navigate('/patient-dashboard');
    }

    setUsername('');
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleLogin} className='login-form'>
        <h2>Login</h2>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <button type='submit'>Login</button>
      </form>
      {error && <div className='login-error-message'>{error}</div>}

    </div>
  );
};

export default Login;
