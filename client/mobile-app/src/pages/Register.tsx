import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const registerUrl = "https://friendai.pages.dev/api/auth/register";

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Email:", email);
    console.log("Password:", password);
    // lets create an axios post request to the registerUrl
    axios
      .post(registerUrl, {
        username: "testuser",
        fullName: "Test User",
        email,
        password,
        interests: "testing",
        city: "Test City",
        country: "Test Country",
      })
      .then((response) => {
        if (response.status === 201) {
          // Navigate home on successful registration
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("There was an error registering the user!", error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "20px", color: "black" }}
        >
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "5px", color: "black" }}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value="logintest@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "5px",
                color: "black",
              }}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value="password123"
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
