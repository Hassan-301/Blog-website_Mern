"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import "./PostForm.css"

function CreatePost() {
  const [post, setPost] = useState({ title: "", content: "", category: "Technology" }); 
  const [error, setError] = useState("")
  const [isFormFilled, setIsFormFilled] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });

 
    setIsFormFilled(
      (post.title.trim() !== "" && post.content.trim() !== "") || 
      (name === "title" ? value.trim() !== "" && post.content.trim() !== "" : post.title.trim() !== "" && value.trim() !== "")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post("/posts", post)
      navigate("/")
    } catch (err) {
      console.error("Error creating post:", err)
      setError(err.response?.data?.error || "Failed to create post. Please try again.")
    }
  }

  return (
    <div className="post-form-container">
      <form className="post-form" onSubmit={handleSubmit}>
        <h2>Create New Post</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            required
            rows="10"
          />
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => navigate("/")} className="cancel-btn">
            Cancel
          </button>
          {isFormFilled && (
            <button type="submit" className="submit-btn">
              Post
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default CreatePost
