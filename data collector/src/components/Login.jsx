import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext'; // Import AuthContext for global authentication state
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const LoginWithGoogleButton = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastClass, setToastClass] = useState(''); // For green (success) or red (error)

  const navigate = useNavigate();
  const { isLoggedIn, logIn } = useContext(AuthContext); // Get isLoggedIn and logIn from AuthContext

  // Redirect to /data if user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/data');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!email || !password) {
      setToastMessage("Please fill in both fields.");
      setToastClass("text-danger");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setLoading(true); // Show loading spinner
    setError(""); // Reset error state

    try {
      const response = await fetch("/.netlify/functions/proxy?api=login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful", data);

        // Use the logIn function from AuthContext to save the token and set the logged-in state
        logIn(data.token);

        // Show success toast
        setToastMessage("Login successful");
        setToastClass("text-success"); // Set text to green for success
        setShowToast(true);
        setTimeout(() => {
          navigate('/data'); // Redirect after 3 seconds of showing toast
        }, 3000);
      } else {
        setToastMessage("Invalid email or password.");
        setToastClass("text-danger"); // Set text to red for failure
        setPassword(""); // Clear password on failure
      }
    } catch (err) {
      setToastMessage("An error occurred. Please try again.");
      setToastClass("text-danger"); // Set text to red for failure
    } finally {
      setLoading(false); // Hide loading spinner
      setShowToast(true); // Show toast
      setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };

  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          {/* Login Text */}
          <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
            User Sign In
          </h1>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>

          {/* Input Fields */}
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading} // Disable while loading
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading} // Disable while loading
            />
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
            >
              Forget Password?
            </a>
          </div>

          {/* Login Button */}
          <div className="mt-8">
            <button
              onClick={handleLogin}
              className={`bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 transition-all duration-300 ease-in-out ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading} // Disable while loading
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>

          {/* Bootstrap Toast for showing login status */}
          {showToast && (
            <div className="toast show position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
              <div className={`toast-body ${toastClass}`}>
                {toastMessage}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginWithGoogleButton;
