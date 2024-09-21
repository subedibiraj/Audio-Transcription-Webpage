import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext to check login status
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(""); // Error message state
  const [showToast, setShowToast] = useState(false); // Toast visibility
  const [toastMessage, setToastMessage] = useState(""); // Toast message content
  const [toastClass, setToastClass] = useState(""); // Toast color class for success or error

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext); // Get login status from AuthContext

  // Redirect to /data if user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/data");
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!formData.username || !formData.email || !formData.password) {
      setToastMessage("Please fill in all fields.");
      setToastClass("text-danger");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setLoading(true); // Show loading spinner
    setError(""); // Reset error state

    try {
      const response = await fetch(
        "/.netlify/functions/proxy?api=signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Sending data as JSON
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful", data);

        // Show success toast
        setToastMessage("Registration successful. Please verify your email.");
        setToastClass("text-success"); // Set text to green for success

        // Navigate to the verification page with the email passed in state
        setTimeout(() => {
          navigate("/verification", { state: { email: formData.email } });
        }, 3000); // Navigate after showing toast for 3 seconds
      } else {
        const errorData = await response.json(); // If the server returns a JSON error response
        setToastMessage(
          errorData.message || "Registration failed. Please try again."
        );
        setToastClass("text-danger"); // Set text to red for failure
        setFormData({ ...formData, password: "" }); // Clear password on failure
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      setToastMessage("An error occurred. Please try again.");
      setToastClass("text-danger"); // Set text to red for failure
    } finally {
      setLoading(false); // Hide loading spinner
      setShowToast(true); // Show toast
      setTimeout(() => setShowToast(false), 3000); // Hide the toast after 3 seconds
    }
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                User Sign up
              </h1>
              <p className="text-[12px] text-gray-500">
                Enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={loading} // Disable while loading
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading} // Disable while loading
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading} // Disable while loading
                />
                <button
                  className={`mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={handleSubmit}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Sign Up</span>
                    </>
                  )}
                </button>

                {/* Bootstrap Toast for showing registration status */}
                {showToast && (
                  <div
                    className="toast show position-fixed bottom-0 end-0 p-3"
                    style={{ zIndex: 11 }}
                  >
                    <div className={`toast-body ${toastClass}`}>
                      {toastMessage}
                    </div>
                  </div>
                )}

                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link to="/login">
                    <span className="text-blue-900 font-semibold">Sign in</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
