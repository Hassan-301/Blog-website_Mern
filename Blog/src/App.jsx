"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreatePost from "./pages/CreatePost"
import EditPost from "./pages/EditPost"
import api from "./api/axios"
import "./App.css"
import Footer from "./components/Footer"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const response = await api.get("/verify")
          setUser(response.data.user)
        } catch (error) {
          console.error("Token verification failed:", error)
          localStorage.removeItem("token")
        }
      }
    }

    verifyToken()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />
  }

  return (
    <Router>
      <div className="app">
        <Navbar user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

