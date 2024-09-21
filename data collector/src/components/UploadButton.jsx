import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadButton = ({ audioBlob }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastClass, setToastClass] = useState(''); // For green (success) or red (error)

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', audioBlob);

    try {
      const response = await fetch('/.netlify/functions/proxy?api=audios', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setToastMessage('File uploaded successfully');
        setToastClass('text-success'); // Set text to green for success
      } else {
        setToastMessage('Upload failed');
        setToastClass('text-danger'); // Set text to red for failure
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setToastMessage('Upload failed');
      setToastClass('text-danger'); // Set text to red for failure
    }

    setShowToast(true); // Show the toast after upload attempt
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };

  return (
    <div>
      <button
        className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-3'
        onClick={handleUpload}
        disabled={!audioBlob}
      >
        Upload
      </button>

      {/* Bootstrap Toast */}
      {showToast && (
        <div className='toast show position-fixed bottom-0 end-0 p-3' style={{ zIndex: 11 }}>
          <div className={`toast-body ${toastClass}`}>
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadButton;
