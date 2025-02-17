"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogPost from "../components/BlogPost";
import api from "../api/axios";
import "./Home.css";

function Home({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      console.log(`Post ${postId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (postId) => {
    console.log("Navigating to edit post:", postId);
    navigate(`/edit/${postId}`);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>
            <span className="welcome-text">Welcome to</span>
            <span className="brand-name">Fikrana</span>
          </h1>
          <p className="hero-description">
            <span className="highlight">Discover</span> the future of technology. 
            Journey with us through <span className="highlight">innovative solutions</span>, 
            <span className="highlight">expert insights</span>, and 
            <span className="highlight">practical guides</span> that shape the 
            digital landscape of tomorrow.
          </p>
          <div className="hero-cta">
            <button className="primary-button">Start Exploring</button>
            <button className="secondary-button">Learn More</button>
          </div>
        </div>
        <div className="hero-image-container">
          <div className="hero-image">
            <img 
              src="hero1.jpg" 
              alt="Technology illustration" 
              className="main-image"
            />
          </div>
          <div className="floating-elements">
            <div className="tech-icon code">{"</>"}</div>
            <div className="tech-icon ai">AI</div>
            <div className="tech-icon data">DATA</div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="posts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {loading ? (
            <div className="loading">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="no-posts">No posts available.</div>
          ) : (
            posts.map((post, index) => {
              const isAuthor = user && user._id === post.authorId;
              console.log(`Post ID: ${post._id}, isAuthor: ${isAuthor}`);

              return (
                <BlogPost
                  key={post._id}
                  post={post}
                  isAuthor={isAuthor}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  index={index}
                  user={user}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
