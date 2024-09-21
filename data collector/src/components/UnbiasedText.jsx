import React, { useState, useEffect, useRef } from 'react';

const UnbiasedText = () => {
  const [unbiasedTexts, setUnbiasedTexts] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const audioRef = useRef(null);

  // Fetch the unbiased text data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://nepaliapi.us-east-1.elasticbeanstalk.com/api/auth/unbiasedText');
        const data = await response.json();
        setUnbiasedTexts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRecordFinish = (blob) => {
    setAudioBlob(blob);
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      handleRecordFinish(audioBlob);
    };

    mediaRecorder.start();
    setTimeout(() => {
      mediaRecorder.stop();
    }, 3000); // Set a 3-second recording limit for simplicity.
  };

  const uploadAudio = async (audioBlob, id) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('audio', audioBlob);

    try {
      const response = await fetch('http://nepaliapi.us-east-1.elasticbeanstalk.com/api/auth/unbiasedText', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Audio uploaded successfully');
      } else {
        alert('Failed to upload audio');
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
      alert('Error uploading audio');
    }
  };

  return (
    <div className="app">
      {unbiasedTexts.map((textObj) => (
        <div key={textObj.id} className="card">
          <p>{textObj.destinationPerson} - {textObj.amount}</p>
          <button onClick={startRecording}>Start Recording</button>
          {audioURL && (
            <div>
              <audio ref={audioRef} controls src={audioURL}>
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          {audioBlob && (
            <button onClick={() => uploadAudio(audioBlob, textObj.id)}>Upload Audio</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default UnbiasedText;
