import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import useAuth from "../hooks/useAuth";
import "./OTPVerify.css";

// Mask email address for display
const maskEmail = (email) => {
  if (!email || !email.includes("@")) {
    return "";
  }

  const [username, domain] = email.split("@");

  if (username.length <= 1) {
    return `${username}***@${domain}`;
  }

  return `${username[0]}${"*".repeat(username.length - 1)}@${domain}`;
};

function OTPVerify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  // Keep the original email for backend verification
  const email = location.state?.email || "";
  const purpose = location.state?.purpose || "login";

  // Masked email only for displaying on the page
  const maskedEmail = maskEmail(email);

  const handleVerify = async (e) => {
    e.preventDefault();

    setError("");

    if (!email) {
      setError("Email address is missing. Please login again.");
      return;
    }

    if (otp.length !== 4) {
      setError("Please enter the 4-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      // Send ORIGINAL email to backend
      const response = await api.post("/auth/verify-otp", {email: email, otp: otp, purpose: purpose});

      if (response.data.success) {
        if (purpose === "login") {
          const { user, token } = response.data;

          login(user, token);
          navigate("/dashboard");
        } else {
          alert("Email verified successfully. Please login.");
          navigate("/login");
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "OTP verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleVerify}>

        <div className="auth-logo">
          <img src="/logo.png" alt="Integration Management Platform" />
        </div>

        <h1>Verify Email OTP</h1>

        <p className="auth-description">
          Enter the 4-digit verification code sent to
          <br />
          <strong>{maskedEmail || "your email"}</strong>
        </p>

        <label htmlFor="otp">Verification Code</label>

        <input
          id="otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="Enter 4-digit OTP"
          value={otp}
          onChange={(e) => {
            setOtp(
              e.target.value.replace(/\D/g, "").slice(0, 4)
            );
            setError("");
          }}
          maxLength={4}
          required
          disabled={loading}
        />

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="auth-button"
          disabled={loading || otp.length !== 4}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="auth-register">
          Didn't receive the OTP? Please try logging in again.
        </p>

        <p className="auth-register">
          <Link to="/login">Back to Login</Link>
        </p>

      </form>
    </div>
  );
}

export default OTPVerify;
