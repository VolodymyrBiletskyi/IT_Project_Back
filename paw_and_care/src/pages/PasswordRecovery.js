import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "./PasswordRecovery.css"; // Styles for the page

const PasswordRecovery = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [message, setMessage] = useState(""); // To display feedback to the user

  const handleSendLink = async (e) => {
    e.preventDefault(); // Prevent form default behavior

    try {
      const response = await fetch(
        "https://vetclinic-backend.ew.r.appspot.com/api/password-reset-request", // Your API endpoint
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }), // Send email in request body
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send recovery link.");
      }

      // If successful, show success message
      setMessage("A recovery link has been sent to your email.");
    } catch (error) {
      // Handle errors by showing the user friendly feedback
      setMessage("Error: Unable to send recovery link. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="password-recovery-container">
        <form className="password-recovery-form" onSubmit={handleSendLink}>
          <h1>Password Recovery</h1>
          <label>Email</label>
          <input
            type="email"
            required
            value={email} // Bind state to the email input field
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
          />
          <p>
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
          <button type="submit" className="sendlink-btn">
            Send Recovery Link
          </button>
          {message && <p>{message}</p>} {/* Show success or error message */}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordRecovery;