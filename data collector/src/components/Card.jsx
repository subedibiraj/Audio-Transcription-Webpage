import React, { useState, useEffect, useRef } from 'react';
import RecordButton from './RecordButton';
import UploadButton from './UploadButton';

const Card = ({ person, bank, amount }) => {
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const audioRef = useRef(null); 

  const handleRecordFinish = (blob) => {
    setAudioBlob(blob);
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
  };

  useEffect(() => {
    if (audioURL && audioRef.current) {
      audioRef.current.volume = 1.0;
    }
  }, [audioURL]);

  return (
    <div className="card">
      <div className="card-info">
        <h2><strong>Name:</strong>{person}</h2> {/* Display person in a heading format */}
        <p><strong>Bank:</strong> {bank}</p> {/* Label the bank and display it clearly */}
        <p><strong>Amount:</strong> {amount}</p> {/* Label the amount and display it clearly */}
      </div>

      {/* Audio recording section */}
      <RecordButton onRecordFinish={handleRecordFinish} />

      {audioURL && (
        <div className="audio-controls">
          <audio ref={audioRef} controls src={audioURL}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {audioBlob && <UploadButton audioBlob={audioBlob} />}
    </div>
  );
};

export default Card;
