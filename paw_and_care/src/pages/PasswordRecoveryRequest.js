import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "./PasswordRecovery.css";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://vetclinic-backend.ew.r.appspot.com/api/auth/reset-password-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send reset link");
      }

      setMessage("Password reset link sent to your email");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="password-recovery-container">
        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
          {message && <p>{message}</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordResetRequest;