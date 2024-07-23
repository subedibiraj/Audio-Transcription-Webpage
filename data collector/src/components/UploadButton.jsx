import React from 'react';

const UploadButton = ({ audioBlob }) => {
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', audioBlob);

    try {
      const response = await fetch('http://localhost:8080/api/audios', {
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
    <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-3' onClick={handleUpload} disabled={!audioBlob}>
      Upload
    </button>
  );
};

export default UploadButton;
