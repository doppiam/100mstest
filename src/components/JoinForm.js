import {useState} from 'react';
import {useHMSActions} from '@100mslive/react-sdk';

function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: '',
  });

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    hmsActions.join({
      userName: inputValues.name,
      authToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3Nfa2V5IjoiNjI2OTQ0ODdmZjY4OGMwMzdhMzdlZTVmIiwicm9vbV9pZCI6IjYyNmFiYzNkZmY2ODhjMDM3YTM4MGEwYSIsInVzZXJfaWQiOiJvdW5jdWxkeSIsInJvbGUiOiJndWVzdCIsImp0aSI6ImI5NTgzMDY3LTU2OTktNDExNS05NDIyLTZhMTc2NjI4MjVlNiIsInR5cGUiOiJhcHAiLCJ2ZXJzaW9uIjoyLCJleHAiOjE2NTEzMDY5NjN9.9o4EUX9KvQ5XsBaOa_RLk5TTxJRFoa0ByXe34YbE5UM',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Join Room</h2>
      <div className="input-container">
        <input
          required
          value={inputValues.name}
          onChange={handleInputChange}
          id="name"
          type="text"
          name="name"
          placeholder="Your name"
        />
      </div>
      <button className="btn-primary">Join</button>
    </form>
  );
}

export default JoinForm;
