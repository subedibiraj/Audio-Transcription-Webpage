import React, { useState, useEffect, useRef } from 'react';
import RecordButton from './RecordButton';
import UploadButton from './UploadButton';

const Card = ({ text }) => {
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
      <p>{text}</p>
      <RecordButton onRecordFinish={handleRecordFinish} />
      {audioURL && (
        <div>
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
