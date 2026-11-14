import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const normalizedEmail = email.trim().toLowerCase();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/send-login-otp",
        { email: normalizedEmail }
      );

      if (!response.data?.success) {
        setError(response.data?.message || "Unable to send OTP.");
        return;
      }

      setSuccess("OTP sent successfully!");

      navigate("/otp-verify", {
        state: {
          email: normalizedEmail,
          purpose: "login"
        }
      });

    } catch (err) {
      console.error("Login OTP Error:", err);
      console.error("Server response:", err.response?.data);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to send OTP. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <img
            src="/logo.png"
            alt="Integration Management Platform"
          />
        </div>

        <h1>Welcome Back!</h1>

        <p className="auth-description">
          Login using your registered email address.
        </p>

        <form onSubmit={handleLogin}>

          <label htmlFor="email">
            Email Address
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            autoComplete="email"
            required
          />

          {error && (
            <p className="auth-error">{error}</p>
          )}

          {success && (
            <p className="auth-success">{success}</p>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Login"}
          </button>

        </form>

        <p className="auth-register">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
