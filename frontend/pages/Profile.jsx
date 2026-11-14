import { useEffect, useState } from "react";
import api from "../src/services/api";
import PageHeader from "../components/PageHeader";
import useAuth from "../hooks/useAuth";
import "./Profile.css";

function Profile() {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    profilePicture: null
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_ORIGIN = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  ).replace(/\/api\/?$/, "");

  // Load profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get("/auth/profile");
        const profile = response.data.user || response.data;

        setForm({
          name: profile.name || "",
          email: profile.email || "",
          phoneNumber: profile.phoneNumber || "",
          dateOfBirth: profile.dateOfBirth
            ? new Date(profile.dateOfBirth).toISOString().slice(0, 10)
            : "",
          gender: profile.gender || "",
          profilePicture: null
        });

        setPreview(
          profile.profilePicture
            ? `${API_ORIGIN}${profile.profilePicture}`
            : ""
        );

        setUser(profile);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load profile."
        );
      } finally {
        setFetching(false);
      }
    };

    loadProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  // Handle profile picture
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Only JPG, PNG and WEBP images are allowed.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2 MB.");
      return;
    }

    setForm((previous) => ({
      ...previous,
      profilePicture: file
    }));

    setPreview(URL.createObjectURL(file));
    setError("");
    setMessage("");
  };

  // Save profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("dateOfBirth", form.dateOfBirth);
      formData.append("gender", form.gender);

      if (form.profilePicture) {
        formData.append("profilePicture", form.profilePicture);
      }

      const response = await api.put("/auth/profile", formData);

      const updatedUser = response.data.user;

      setUser(updatedUser);

      setForm((previous) => ({
        ...previous,
        profilePicture: null
      }));

      setPreview(
        updatedUser.profilePicture
          ? `${API_ORIGIN}${updatedUser.profilePicture}`
          : ""
      );

      setMessage("Profile updated successfully!");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="page-container">Loading profile...</div>;
  }

  return (
    <div className="page-container">

      <PageHeader
        title="My Profile"
        description="View and update your personal information."
      />

      <form className="card profile-card" onSubmit={handleSubmit}>

        <div className="profile-photo-section">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="profile-photo"
            />
          ) : (
            <div className="profile-avatar">
              {form.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          <label htmlFor="profilePicture" className="upload-photo">
            Upload Photo
          </label>

          <input
            id="profilePicture"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handlePhotoChange}
            hidden
          />

          <small>JPG, PNG or WEBP. Maximum 2 MB.</small>
        </div>

        <div className="profile-form-grid">

          <div className="profile-field">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="profile-field">
            <label>Email Address</label>
            <input
              type="email"
              value={form.email}
              readOnly
            />
            <small>Email cannot be changed here.</small>
          </div>

          <div className="profile-field">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="+91 9876543210"
            />
          </div>

          <div className="profile-field">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div className="profile-field">
            <label>Gender (Optional)</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Prefer not to say</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

        </div>

        <div className="profile-account-info">
          <p>
            <strong>Role:</strong> {user?.role || "user"}
          </p>

          <p>
            <strong>Email Verified:</strong>{" "}
            {user?.emailVerified ? "Yes" : "Not verified"}
          </p>
        </div>

        {message && (
          <p className="profile-success">{message}</p>
        )}

        {error && (
          <p className="profile-error">{error}</p>
        )}

        <button
          type="submit"
          className="profile-save-button"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </form>
    </div>
  );
}

export default Profile;
