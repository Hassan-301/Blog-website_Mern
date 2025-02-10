import { Link } from "react-router-dom"
import { Instagram, Youtube, Twitter } from "lucide-react"
import "./Navbar.css"

function Navbar({ user, handleLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-brand">
          Fikrana
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Blog
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>

          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Instagram size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Youtube size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Twitter size={20} />
            </a>
          </div>

          {user ? (
            <>
              <Link to="/create" className="add-post-btn">
                Add Post
              </Link>
              <button onClick={handleLogout} className="auth-link">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="auth-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

