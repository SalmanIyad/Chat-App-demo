import { useState } from 'react';
import axios from 'axios';

const projectID = '42dad909-774d-442d-bca1-032b6569f553';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
      setError('');
    } catch (err) {
      setError('Oops, incorrect credentials.');
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Syra Chat</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => {
            setUsername(e.target.value)
            setError('')
          }} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => {
            setPassword(e.target.value)
            setError('')
            console.log(username, password);
            }} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>Sign In</span>
            </button>
          </div>
        </form>
        <p className='errorMsg'>{error}</p>
      </div>
    </div>

  );
};

export default Modal;
