import React, { useState, useEffect } from 'react';
import './RecordButton.css';

const RecordButton = ({ onRecordFinish }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [countdown, setCountdown] = useState(30); // Set the initial countdown to 30 seconds

  useEffect(() => {
    let timer = null;
    if (isRecording && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000); // Decrease countdown every second
    } else if (countdown === 0) {
      stopRecording(); // Automatically stop recording when countdown reaches 0
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
      setCountdown(30); // Reset countdown to 30 seconds when starting recording

      const chunks = [];
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        onRecordFinish(blob); // Call the parent callback with the recorded blob
      };
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop(); // Stop the media recorder
    }
    setIsRecording(false);
    setCountdown(30); // Reset countdown after stopping the recording
  };

  return (
    <div>
      <div className={`recording-light ${isRecording ? 'active' : ''}`}></div>
      {isRecording ? (
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={stopRecording}
        >
          Stop Recording ({countdown})
        </button>
      ) : (
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={startRecording}
        >
          Record
        </button>
      )}
    </div>
  );
};

export default RecordButton;
