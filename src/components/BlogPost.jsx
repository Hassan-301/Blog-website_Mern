import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import "./BlogPost.css";

function BlogPost({ post, isAuthor, onDelete, onEdit, index }) {
  console.log(`Rendering post: ${post.title}, isAuthor: ${isAuthor}`);

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  const [showFullContent, setShowFullContent] = useState(false);

  return (
    <article className={`blog-post ${index % 2 === 0 ? "left" : "right"}`}>
      <div className="post-image">
        <img src={post.image || "blog.jpg"} alt={post.title} />
      </div>

      <div className="post-content">
        <div className="post-date">{formattedDate}</div>

        <h2 className="post-title">
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </h2>

        <p className="post-excerpt">
          {showFullContent ? post.content : `${post.content.substring(0, 120)}...`}
        </p>

        <div className="post-footer">
          <button onClick={() => setShowFullContent(!showFullContent)} className="read-more">
            {showFullContent ? "Show Less" : "Read More"}
          </button>

          {/* 🔥 Force buttons to always show for debugging */}
          <div className="post-actions" style={{ display: "flex", gap: "1rem" }}>
            <button onClick={() => onEdit(post._id)} className="edit-button">
              <Edit size={20} />
            </button>
            <button onClick={() => onDelete(post._id)} className="delete-button">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogPost;
