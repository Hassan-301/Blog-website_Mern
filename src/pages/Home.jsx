"use client"

import { useState, useEffect } from "react"
import BlogPost from "../components/BlogPost"
import api from "../api/axios"
import "./Home.css"

function Home({ user }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await api.get("/posts")
      setPosts(response.data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`)
      setPosts(posts.filter((post) => post._id !== postId))
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-image">
          <img
            src="hero1.jpg"
            alt="Fresh salad with tomatoes and feta"
          />
        </div>
        <div className="hero-content">
          <h1>Fikrana Tech Blog</h1>
          <p>
            Exploring the frontiers of technology. From cutting-edge innovations to practical coding tips, we're here to
            keep you informed and inspired in the ever-evolving world of tech.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="posts-grid">
          {loading ? (
            <div className="loading">Loading posts...</div>
          ) : (
            posts.map((post, index) => (
              <BlogPost
                key={post._id}
                post={post}
                isAuthor={user && user._id === post.authorId}
                onDelete={handleDelete}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Home

