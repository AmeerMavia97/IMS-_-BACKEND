import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({component}) {
    const navigate = useNavigate();
    const [isUser, setisUser] = useState(false);
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");
  
    useEffect(() => {
      if (token) {
        setisUser(true);
      } else {
        setisUser(false);
        navigate("/login");
      }
    }, [token, navigate]);
  
    useEffect(() => {
      if (location.pathname === "/admin") {
        if (isUser && type === "student") {
          navigate("/student");
        }
      }
  
      if (location.pathname === "/student") {
        if (isUser && type === "admin") {
          navigate("/register");
        }
      }
    }, [isUser, type, location.pathname]);
    return (
      <>
        {isUser ? (
          component
        ) : (
          <div
            style={{
              position: "absolute",
              left: "45%",
              top: "50%",
              zIndex: "1000",
            }}
          >
            <h1>loading</h1>
          </div>
        )}
      </>
    );
  };
export default ProtectedRoutes;