import React from 'react';

const UploadButton = ({ audioBlob }) => {
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', audioBlob);

    try {
      const response = await fetch('BACKEND_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully');
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Upload failed');
    }
  };

  return (
    <button onClick={handleUpload} disabled={!audioBlob}>
      Upload
    </button>
  );
};

export default UploadButton;
