"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import "./Contact.css"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="contact-container">
      <motion.h1
        className="contact-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Get in Touch
      </motion.h1>

      <div className="contact-content">
        <motion.div
          className="contact-form-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
                className="textarea-field"
              ></textarea>
            </div>
            <button type="submit" className="submit-btn modern-btn">
              <Send size={18} />
              Send
            </button>
          </form>
        </motion.div>

        <motion.div
          className="contact-info-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>Contact Us</h2>
          <div className="contact-info">
            <p>
              <Mail size={18} />
              <span>info@fikrana.com</span>
            </p>
            <p>
              <Phone size={18} />
              <span>+92 (321) 123-4567</span>
            </p>
            <p>
              <MapPin size={18} />
              <span>123, ABC Street, Islamabad</span>
            </p>
          </div>
          <div className="contact-map modern-map">
            <img
              src="map.JPG"
              alt="Map"
              className="map-image"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
