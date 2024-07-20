import React, { useState, useEffect } from 'react';
import './RecordButton.css';

const RecordButton = ({ onRecordFinish }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [countdown, setCountdown] = useState(10); 

  useEffect(() => {
    let timer = null;
    if (isRecording && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      stopRecording();
    }
    return () => clearTimeout(timer);
  }, [isRecording, countdown]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();

      setIsRecording(true);
      setCountdown(10);

      const chunks = [];
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        onRecordFinish(blob);
      };
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);
    setCountdown(10);
  };

  return (
    <div>
      <div className={`recording-light ${isRecording ? 'active' : ''}`}></div>
      {isRecording ? (
        <button onClick={stopRecording}>
          Stop Recording ({countdown})
        </button>
      ) : (
        <button onClick={startRecording}>Record</button>
      )}
    </div>
  );
};

export default RecordButton;
