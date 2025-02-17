import { motion } from "framer-motion"
import { Github, Twitter, Linkedin } from "lucide-react"
import "./About.css"

const teamMembers = [
  {
    name: "Ahmad",
    role: "Founder & Lead Developer",
    bio: "Passionate about creating intuitive software solutions.",
    image: "about.jpg",
    social: {
      twitter: "https://twitter.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Ali",
    role: "AI Specialist",
    bio: "Exploring the frontiers of machine learning and AI applications.",
    image: "about2.jpg",
    social: {
      twitter: "https://twitter.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Aliza",
    role: "UX/UI Designer",
    bio: "Crafting seamless user experiences for cutting-edge tech products.",
    image: "about4.jpg",
    social: {
      twitter: "https://twitter.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
]

function About() {
  return (
    <div className="about-container">
      <motion.section
        className="about-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>About</h1>
        <p>
          At Fikrana Tech, we believe that technology is not just about gadgets and code – it's about innovation,
          problem-solving, and shaping the future. Our mission is to demystify complex tech concepts and keep you at the
          forefront of digital advancements.
        </p>
      </motion.section>

      <motion.section
        className="team-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="team-member"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
            >
              <div className="member-image">
                <img src={member.image || "/placeholder.svg"} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <span className="member-role">{member.role}</span>
              <p className="member-bio">{member.bio}</p>
              <div className="social-links">
                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href={member.social.github} target="_blank" rel="noopener noreferrer" aria-label="Github">
                  <Github size={18} />
                </a>
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default About

