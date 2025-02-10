"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/axios"
import "./Auth.css"

function Login({ setUser }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post("/login", credentials)
      localStorage.setItem("token", response.data.token)
      setUser(response.data.user)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.error || "Failed to login. Please try again.")
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
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
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  )
}

export default Login

