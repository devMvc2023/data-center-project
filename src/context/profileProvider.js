import { createContext, useState } from "react";

const ProfileContext = createContext({});

const ProfileConsumer = ProfileContext.Consumer;

function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [editProfile, setEditProfile] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    password: "",
    email: "",
    allow_work: false,
    identity_id: "",
    phone: "",
    role: "",
    user_faction: [],
  });
  const [changePassPath, setChangePassPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");

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
        link,
        setLink,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileContext, ProfileConsumer, ProfileProvider };
export default ProfileContext;
