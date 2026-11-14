import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../src/services/api";
import "./Register.css";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        preferredLanguage: "English"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await api.post("/auth/register", {
                name: form.name.trim(),
                email: form.email.trim().toLowerCase(),
                preferredLanguage: form.preferredLanguage
            });

            setMessage(
                response.data.message || "Registration successful!"
            );

            // Navigate to email OTP verification
            navigate("/otp-verify", {
                state: {
                    email: form.email.trim().toLowerCase(),
                    purpose: "register"
                }
            });

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            {/* Left Side */}
            <div className="auth-image">
                <div>
                    <h1>Integration Management Platform</h1>
                    <p>Your Smart Travel Companion</p>
                </div>
            </div>

            {/* Right Side */}
            <div className="auth-content">
                <div className="auth-card">

                    <h1>Create Account</h1>

                    <p>
                        Join our Integration Management Platform
                        and explore the world.
                    </p>

                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Full Name */}
                        <div className="form-group">
                            <label>Full Name</label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label>Email Address</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Language */}
                        <div className="form-group">
                            <label>Select Language</label>

                            <select
                                name="preferredLanguage"
                                value={form.preferredLanguage}
                                onChange={handleChange}
                                required
                            >
                                <option value="English">English</option>
                                <option value="Telugu">Telugu</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Kannada">Kannada</option>
                                <option value="Tamil">Tamil</option>
                                <option value="Malayalam">Malayalam</option>
                                <option value="Bengali">Bengali</option>
                                <option value="Marathi">Marathi</option>
                                <option value="Gujarati">Gujarati</option>
                                <option value="Punjabi">Punjabi</option>
                            </select>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="profile-error">
                                {error}
                            </p>
                        )}

                        {/* Success */}
                        {message && (
                            <p className="profile-success">
                                {message}
                            </p>
                        )}

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>

                    </form>

                    <p style={{ marginTop: "20px", textAlign: "center" }}>
                        Already have an account?{" "}
                        <Link to="/login">
                            Login
                        </Link>
                    </p>

                </div>
            </div>

        </div>
    );
}

export default Register;
