import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

function OTPVerify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const email = location.state?.email || "";
  const purpose = location.state?.purpose || "login";

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/verify-otp", {
        email,
        otp,
        purpose
      });

      if (purpose === "login") {
        const { user, token } = response.data;

        login(user, token);
        navigate("/dashboard");
      } else {
        alert("Email verified successfully. Please login.");
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleVerify}>
        <h1>Verify Email OTP</h1>
        <p>Enter the OTP sent to {email || "your email"}.</p>

        <input
          type="text"
          placeholder="Enter 4-digit OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))
          }
          maxLength={4}
          required
        />

        <button disabled={loading || otp.length !== 4}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <Link to="/login">Back to Login</Link>
      </form>
    </div>
  );
}

export default OTPVerify;
