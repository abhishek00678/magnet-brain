import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);

  return loading ? (
    <Loader />
  ) : (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ color: "#333", marginBottom: "10px" }}>{user?.name}</h1>
      <p style={{ color: "#666" }}>{user?.email}</p>
    </div>
  );
};

export default Profile;
