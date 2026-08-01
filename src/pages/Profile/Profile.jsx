import { useEffect, useState } from "react";
import { getProfile } from "../../services/profileService";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return <h2>Loading Profile...</h2>;
  }

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>👤 My Profile</h1>

      <hr />

      <p><strong>Name:</strong> {profile.name}</p>

      <p><strong>Email:</strong> {profile.email}</p>

      <p><strong>Age:</strong> {profile.age}</p>

      <p><strong>Gender:</strong> {profile.gender}</p>

      <p><strong>Height:</strong> {profile.height_cm} cm</p>

      <p><strong>Weight:</strong> {profile.weight_kg} kg</p>

      <p><strong>Goal:</strong> {profile.goal}</p>

      <p><strong>Activity:</strong> {profile.activity_level}</p>

      <p><strong>Diet:</strong> {profile.diet_preferences}</p>

      <p><strong>Budget:</strong> ₹{profile.daily_budget}</p>
    </div>
  );
}