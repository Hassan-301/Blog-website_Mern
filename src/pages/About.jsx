import { motion } from "framer-motion"
import { Github, Twitter, Linkedin } from "lucide-react"
import "./About.css"

const teamMembers = [
  {
    name: "Ahmad",
    role: "Founder & Lead Developer",
    bio: "Passionate about creating intuitive software solutions that transform ideas into reality. Leading innovation through clean code and scalable architecture.",
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
    bio: "Pushing the boundaries of artificial intelligence to create smarter, more efficient solutions. Specializing in machine learning and natural language processing.",
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
    bio: "Creating delightful digital experiences through human-centered design. Bringing creativity and innovation to every pixel and interaction.",
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>Innovating Tomorrow</h1>
        <p>
          At Fikrana Tech, we're not just building technology – we're crafting the future. Our passion lies in transforming 
          complex challenges into elegant solutions that empower businesses and delight users. Through cutting-edge innovation
          and human-centered design, we're setting new standards in digital excellence.
        </p>
      </motion.section>

      <motion.section
        className="team-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="team-member"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.2 * (index + 1),
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <div className="member-image">
                <img src={member.image || "/placeholder.svg"} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <span className="member-role">{member.role}</span>
              <p className="member-bio">{member.bio}</p>
              <div className="social-links">
                <motion.a 
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  whileHover={{ scale: 1.2, color: "#1DA1F2" }}
                  transition={{ duration: 0.2 }}
                >
                  <Twitter size={20} />
                </motion.a>
                <motion.a
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Github"
                  whileHover={{ scale: 1.2, color: "#333" }}
                  transition={{ duration: 0.2 }}
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  whileHover={{ scale: 1.2, color: "#0077B5" }}
                  transition={{ duration: 0.2 }}
                >
                  <Linkedin size={20} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default About
