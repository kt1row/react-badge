import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { retrieveInfoByCallsign } from '../api/fcc.js'

const initialInputs = {
  senderCallsign: '',
  receiverCallsign: '',
};

export default function HomePage() {
  const [inputs, setInputs] = useState(initialInputs);
  const [sender, setSender] = useState({});
  const [isSenderLegit, setIsSenderLegit] = useState(false);
  const [senderLoaded, setSenderLoaded] = useState(false);
  const [receiver, setReceiver] = useState({});
  const [isReceiverLegit, setIsReceiverLegit] = useState(false);
  const [receiverLoaded, setReceiverLoaded] = useState(false);
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    })
  };

  const handleSubmit = (e) => {
    if(sender.status !== 'INVALID') {
      setIsSenderLegit(true);
    }
    else{
      setIsSenderLegit(false);
    }
    if(receiver.status !== 'INVALID') {
      setIsReceiverLegit(true);
    }
    else{
      setIsReceiverLegit(false);
    }
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    setSubmitted(false);
    retrieveInfoByCallsign(inputs.senderCallsign)
      .then((response)=>{
        setSender(response.data)
        setSenderLoaded(true);
      })
    retrieveInfoByCallsign(inputs.receiverCallsign)
      .then((response)=>{
        setReceiver(response.data)
        setReceiverLoaded(true);
      })
		}, [inputs.senderCallsign, inputs.receiverCallsign]);

  return  (
    <div>
      {(senderLoaded && receiverLoaded && submitted) ?
      <div>
        {isSenderLegit ?
        <div>
          {sender.name}
          {sender.address.line1}
        </div> : 'Not legitimate sender callsign'
        }
        {isReceiverLegit ?
        <div>
          {receiver.name}
          {receiver.address.line1}
        </div> : 'Not legitimate receiver callsign'
        }
      </div>
      : null}
      <div className='App'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='senderCallsign'>
            Your Callsign:
          </label>
          <input
            name='senderCallsign'
            value={inputs.senderCallsign}
            onChange={handleChange}
            pattern='[a-zA-Z0-9]{4,6}'
          />
          <label htmlFor='receiverCallsign'>
            Their Callsign:
          </label>
          <input
            name='receiverCallsign'
            value={inputs.receiverCallsign}
            onChange={handleChange}
            pattern='[a-zA-Z0-9]{4,6}'
          />
          <input type='submit' />
        </form>
      </div>
    </div>
  );
}
