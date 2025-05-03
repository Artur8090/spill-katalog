import { useState } from "react";
import "./LoginComponent.css";

type Props = {
  onLogin: (username: string) => void;
};

const LoginComponent = ({ onLogin }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);

  const testUser = { username: "test", password: "1234" };

  const handleSubmit = () => {
    if (username === testUser.username && password === testUser.password) {
      onLogin(username);
      setShowForm(false);
      setUsername("");
      setPassword("");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-component">
      {showForm ? (
        <div className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)}>Log in</button>
      )}
    </div>
  );
};

export default LoginComponent;
