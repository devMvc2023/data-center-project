import { createContext, useState } from "react";

const ProfileContext = createContext({});

const ProfileConsumer = ProfileContext.Consumer;

function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [editProfile, setEditProfile] = useState(null);
  const [changePassPath, setChangePassPath] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        editProfile,
        setEditProfile,
        changePassPath,
        setChangePassPath,
        loading,
        setLoading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileContext, ProfileConsumer, ProfileProvider };
export default ProfileContext;
