import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API request for login
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Save token to localStorage
        localStorage.setItem("token", response.data.token);

        // Show success message
        toast.success("Login successful!");

        // Redirect to home or dashboard (optional)
        window.location.href = "/"; // Or use `history.push('/dashboard')` if using react-router
      }
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Inline styles
  const styles = {
    loginContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f4f4f9",
    },
    loginForm: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
    },
    formGroup: {
      marginBottom: "1rem",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "0.5rem",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "14px",
      outline: "none",
      transition: "border 0.3s ease",
    },
    inputFocus: {
      border: "1px solid #007bff",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonDisabled: {
      backgroundColor: "#cccccc",
      cursor: "not-allowed",
    },
    footer: {
      marginTop: "1rem",
      fontSize: "14px",
      color: "#555",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginForm}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading && styles.buttonDisabled),
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div style={styles.footer}>
          <span>
            Don't have an account?{" "}
            <a href="/register" style={styles.link}>
              Sign up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
