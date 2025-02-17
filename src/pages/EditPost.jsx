"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/axios"
import "./PostForm.css"

function EditPost() {
  const [post, setPost] = useState({ title: "", content: "" })
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { id } = useParams()

  const fetchPost = useCallback(async () => {
    try {
      const response = await api.get(`/posts/${id}`)
      setPost(response.data)
    } catch (err) {
      setError("Failed to fetch post")
    }
  }, [id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/posts/${id}`, post)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update post. Please try again.")
    }
  }

  return (
    <div className="post-form-container">
      <form className="post-form" onSubmit={handleSubmit}>
        <h2>Edit Post</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            required
            rows="10"
          />
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => navigate("/")} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Update Post
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPost
