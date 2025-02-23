import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const loginUrl = "http://friendai.pages.dev/api/auth/login";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Email:", email);
    console.log("Password:", password);
    // lets create an axios post request to the loginUrl
    axios
      .post(loginUrl, {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          // Navigate home on successful login
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
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
