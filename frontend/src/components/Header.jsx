import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context, server } from "../main";

const headerStyle = {
  backgroundColor: "#1E40AF",
  padding: "1rem 2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const titleStyle = {
  color: "#ffffff",
  fontSize: "1.5rem",
  fontWeight: "bold",
};

const linkStyle = {
  color: "#ffffff",
  textDecoration: "none",
  marginRight: "1rem",
};

const buttonStyle = {
  backgroundColor: "#ffffff",
  color: "#1E40AF",
  padding: "0.5rem 1rem",
  borderRadius: "0.25rem",
  border: "none",
  cursor: "pointer",
};

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <nav style={headerStyle}>
      <div>
        <h2 style={titleStyle}>Todo App</h2>
      </div>
      <article>
        <Link to={"/"} style={linkStyle}>
          Home
        </Link>
        <Link to={"/profile"} style={linkStyle}>
          Profile
        </Link>
        {isAuthenticated ? (
          <button
            disabled={loading}
            onClick={logoutHandler}
            style={buttonStyle}
          >
            Logout
          </button>
        ) : (
          <Link to={"/login"} style={linkStyle}>
            Login
          </Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
