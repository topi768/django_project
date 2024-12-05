import { useEffect, useState } from "react";
import api from "../api/auth";

const Profile = () => {
  const [profile, setProfile] = useState({ username: "", email: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("profile/");
        console.log(data);
        
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await api.put("profile/", profile);
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>
        <p className="text-sm text-gray-600 mb-4" >Change username</p>
        <input
          name="username"
          value={profile.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          
        />
        <input
          name="password"
          value={profile.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Update Profile
        </button>
      </div> */}
    </div>
  );
};

export default Profile;
