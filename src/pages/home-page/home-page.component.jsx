import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { retrieveInfoByCallsign } from '../api/fcc.js'
import styles from '../../styles/QSLInput.module.scss';

const initialInputs = {
  senderCallsign: '',
  receiverCallsign: '',
  date: '',
  time: '',
  mode: '',
  rst: '',
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
      <div className={styles.QSLInput}>
        <form onSubmit={handleSubmit}>
          <label htmlFor='senderCallsign'>
            Your Callsign:
          </label>
          <input
            name='senderCallsign'
            value={inputs.senderCallsign}
            onChange={handleChange}
            pattern='[a-zA-Z0-9]{4,6}'
            title='Not a valid callsign'
          />
          <label htmlFor='receiverCallsign'>
            Their Callsign:
          </label>
          <input
            name='receiverCallsign'
            value={inputs.receiverCallsign}
            onChange={handleChange}
            pattern='[a-zA-Z0-9]{4,6}'
            title='Not a valid callsign'
          />
          <label htmlFor='receiverCallsign'>
            Date:
          </label>
          <input
            name='date'
            value={inputs.date}
            onChange={handleChange}
            type='date'
          />
          <label htmlFor='receiverCallsign'>
            UTC:
          </label>
          <input
            name='time'
            value={inputs.time}
            onChange={handleChange}
            type='time'
          />
          <label htmlFor='receiverCallsign'>
            MHz:
          </label>
          <input
            name='MHz'
            value={inputs.frequency}
            onChange={handleChange}
            type='decimal'
          />
          <label htmlFor='receiverCallsign'>
            Mode:
          </label>
          <input
            name='mode'
            value={inputs.mode}
            onChange={handleChange}
          />
          <label htmlFor='receiverCallsign'>
            RS(T):
          </label>
          <input
            name='rst'
            value={inputs.rst}
            onChange={handleChange}
            pattern='[0-9]{2,3}'
            type='number'
            title='RST should be 2 or 3 digits'
          />
          <input type='submit' />
        </form>
      </div>

      {(senderLoaded && receiverLoaded && submitted) ?
      <div>
        {isSenderLegit && isReceiverLegit ?
        <div className={styles.verification}>
          <strong>Is this information correct? If not, resubmit!</strong>
          <div>Your callsign: {sender.current.callsign}</div>
          <div>Your name: {sender.name}</div>
          <div>Their callsign: {receiver.current.callsign}</div>
          <div>Date: {inputs.date}</div>
          <div>Time (UTC): {inputs.time}</div>
          <div>Frequency: {inputs.frequency} MHz</div>
          <div>Mode: {inputs.mode}</div>
          <div>RS(T): {inputs.rst}</div>
          <a href='/QSLCard'>Click here to generate QSL card!</a>
        </div> : null
        }
        <div className={styles.error}>
        {isSenderLegit ? null : 'Invalid sender callsign'}
        </div>
        <div>
        {isReceiverLegit ? null : 'Invalid reciever callsign'}
        </div>
      </div>
      : null}

    </div>
  );
}
