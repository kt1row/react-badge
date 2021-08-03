import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { retrieveInfoByCallsign } from '../api/fcc.js'

export default function HomePage() {
  
  const [sender, setSender] = useState(null);
  const [input, setInput] = useState('')
  const [senderCallsign, setSenderCallsign] = useState('')
  const [errorMessage, setErrorMessage] = useState(null);
  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    if (
      /^[a-zA-Z0-9]{4,6}$/.test(
          e.target.value
      )
    ) {
        setErrorMessage('');
    }
    else {
      setErrorMessage('Invalid callsign');
    }
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
      e.preventDefault();
      setSenderCallsign(input);
  };
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    retrieveInfoByCallsign(senderCallsign)
      .then((response)=>{
        setSender(response.data)
        setLoaded(true);
      });
      console.log(sender)
		}, [senderCallsign]);

  return  (
    <div>
      {loaded ?
      <div>
        {sender.name}
        {sender.address.line1}
      </div>
      : null}
      <div className='App'>
        <form onSubmit={handleSubmit}>
            <label htmlFor='callsign'>
                Call Sign:
            </label>
            <input
                name='callsign'
                value={input}
                onChange={handleChange}
                pattern='[a-zA-Z0-9]{4,6}'
            />
            <div className='error-message'>
                {errorMessage}
            </div>
            <input type='submit' />
        </form>
      </div>
    </div>
  );
}
