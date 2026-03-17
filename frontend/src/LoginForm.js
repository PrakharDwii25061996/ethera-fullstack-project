import React, { useState } from "react";
import axios from "axios";
import { API_URLS } from "./api.js";
// import { useNavigate } from "react-router-dom";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        API_URLS.LOGIN,
        {
          email,
          password,
        },
        {
          withCredentials: true, // for Django session
        }
      );

      // ✅ SUCCESS
      if (response.status === 200) {
        setSuccess("Login Successful");
        console.log('Login Successful')
        const userData = response.data.user
        console.log(userData)
        // Example: store token (if using JWT)
        if (userData) {
          localStorage.setItem("id", userData.id);
          localStorage.setItem("email", userData.email);
          localStorage.setItem('is_superuser', userData.is_superuser)
        }
      }
    } catch (error) {
      // ❌ ERROR HANDLING
      if (error.response) {
        // Backend sent error
        setError(error.response.data.message || "Invalid credentials ❌");
      } else if (error.request) {
        // No response from server
        setError("Server not responding ❌");
      } else {
        // Other errors
        setError("Something went wrong ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Login</h3>

        {/* ❌ Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* ✅ Success Message */}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;