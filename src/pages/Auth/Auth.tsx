import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import UserModel from '../../model/UserModel';
import './Auth.css';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const responseUser: UserModel | null = await login(username, password);

    if (responseUser?.role === 'dentist') {
      navigate('/dentist-dashboard');
    }

    if (responseUser?.role === 'patient') {
      navigate('/patient-dashboard');
    }

    setUsername('');
    setPassword('');
  };

  return (
    <div className='auth-container'>
      <form onSubmit={handleLogin} className='auth-form'>
        <h2>Login</h2>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type='submit'>Login</button>
      </form>
      {error && <div className='auth-error-message'>{error}</div>}
    </div>
  );
};

export default Auth;
