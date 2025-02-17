import { Link } from "react-router-dom"
import "./BlogPost.css"
import { Edit, Trash2 } from "lucide-react"

function BlogPost({ post, isAuthor, onDelete, index }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  })

  return (
    <article className={`blog-post ${index % 2 === 0 ? "left" : "right"}`}>
      <div className="post-image">
        <img
          src={
            post.image ||
            "blog.jpg" ||
            "/placeholder.svg"
          }
          alt={post.title}
        />
      </div>
      <div className="post-content">
        <div className="post-date">{formattedDate}</div>
        <h2 className="post-title">
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </h2>
        <p className="post-excerpt">{post.content.substring(0, 120)}...</p>
        <div className="post-footer">
          <Link to={`/post/${post._id}`} className="read-more">
            Read More
          </Link>
          {isAuthor && (
            <div className="post-actions">
              <Link to={`/edit/${post._id}`} className="edit-link">
                <Edit size={16} />
              </Link>
              <button onClick={() => onDelete(post._id)} className="delete-btn">
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default BlogPost

