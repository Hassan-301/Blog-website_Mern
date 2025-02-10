"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/axios"
import "./Auth.css"

function Register({ setUser }) {
  const [credentials, setCredentials] = useState({ username: "", password: "", confirmPassword: "" })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const response = await api.post("/register", {
        username: credentials.username,
        password: credentials.password,
      })

      localStorage.setItem("token", response.data.token)
      setUser(response.data.user)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.")
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="input"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="input"
            value={credentials.confirmPassword}
            onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register

