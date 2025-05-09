
import { useState } from 'react';
import { useUser } from '../../UserContext';
import './LoginComponent.css';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { login } = useUser(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password); 
    if (success) {
      setShowForm(false);
      setUsername('');
      setPassword('');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-component">
      {showForm ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="login-buttons">
            <button type="submit">Login</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}>Log in</button>
      )}
    </div>
  );
};

export default LoginComponent;