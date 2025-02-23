import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const registerUrl = "http://friendai.pages.dev/api/auth/register";

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
    <div>
      <h2>Auth</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
