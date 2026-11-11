import { useEffect, useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";
import useAuth from "../hooks/useAuth";

function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user || {});

  useEffect(() => {
    api.get("/auth/profile")
      .then((res) => {
        setProfile(res.data.user || res.data);
      })
      .catch((err) => console.error("Profile error:", err));
  }, []);

  return (
    <div className="page-container">
      <PageHeader title="My Profile"
        description="View your account information." />

      <div className="card profile-card">
        <div className="profile-avatar">
          {profile.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <h2>{profile.name || "User"}</h2>

        <p><strong>Email:</strong> {profile.email || "Not available"}</p>
        <p><strong>Role:</strong> {profile.role || "user"}</p>
        <p>
          <strong>Preferred Language:</strong>
          {" "}{profile.preferredLanguage || "en"}
        </p>
        <p>
          <strong>Email Verified:</strong>
          {" "}{profile.emailVerified ? "Yes" : "Not verified"}
        </p>
      </div>
    </div>
  );
}

export default Profile;
