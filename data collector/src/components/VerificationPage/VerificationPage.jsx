import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputCode from "./InputCode";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "./styles.css";

function VerificationPage() {
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error message state
  const [showToast, setShowToast] = useState(false); // Toast visibility
  const [toastMessage, setToastMessage] = useState(''); // Toast message content
  const navigate = useNavigate(); // For navigation
  const location = useLocation(); // For accessing email passed from Signup

  const handleComplete = async (code) => {
    setLoading(true); // Start loading
    setError(''); // Reset error state

    // Extract email passed via React Router's location state
    const email = location.state?.email;

    if (!email) {
      setError("Email is missing. Please sign up again.");
      setLoading(false);
      return;
    }

    const payload = {
      verificationCode: code,
      email: email,
    };

    try {
      const response = await fetch('/.netlify/functions/proxy?api=verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // On successful verification, show the success toast
        setToastMessage('Verification successful!');
        setShowToast(true);

        // Hide the toast after 3 seconds and navigate to login
        setTimeout(() => {
          setShowToast(false);
          navigate('/login');
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="App">
      <h1>Verification Code</h1>

      <InputCode
        length={6}
        label="Enter the 6-digit code"
        loading={loading}
        onComplete={handleComplete} // Call handleComplete when code input is complete
        disabled={loading} // Disable input fields during loading
      />

      {/* Display error message if verification fails */}
      {error && <p className="error-message text-danger">{error}</p>}

      {/* Loading spinner during verification */}
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {/* Bootstrap Toast for showing success */}
      {showToast && (
        <div className="toast show position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div className="toast-body text-success">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}

export default VerificationPage;
