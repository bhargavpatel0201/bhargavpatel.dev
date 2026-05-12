import { useEffect, useState } from "react"
import { FaPython, FaJava, FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaGitAlt, FaGithub, FaInstagram, FaLinux, FaNetworkWired, FaCode, FaPhone, FaMapMarkerAlt } from "react-icons/fa"
import { SiDjango, SiMysql, SiSqlite } from "react-icons/si"
import { DiDatabase } from "react-icons/di"
import { MdEmail } from "react-icons/md"
import { IoSend } from "react-icons/io5"

const FORMSPREE_FORM_ID = "mdalwwvy"
const isFormConfigured = FORMSPREE_FORM_ID && FORMSPREE_FORM_ID !== "YOUR_FORMSPREE_FORM_ID"

function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("General Inquiry")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("idle")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    if (!isFormConfigured) {
      setStatus("sending")
      const mailto = `mailto:bhargav.patel.ce@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
      window.location.href = mailto
      setStatus("success")
      setName(""); setEmail(""); setSubject("General Inquiry"); setMessage("")
      return
    }
    setStatus("sending")
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, message, _replyto: email, _subject: subject }),
      })
      if (res.ok) {
        setStatus("success")
        setName(""); setEmail(""); setSubject("General Inquiry"); setMessage("")
      } else setStatus("error")
    } catch (_) {
      setStatus("error")
    }
  }

  return (
    <div className="jules-contact-form">
      {status === "success" && (
        <div className="jules-form-success" role="alert">
          {isFormConfigured ? "Thanks! Your message was sent." : "Your email app should open—click Send there to email me."}
        </div>
      )}
      {status === "error" && (
        <div className="jules-form-error" role="alert">
          Something went wrong. Please email bhargav.patel.ce@gmail.com
        </div>
      )}
      <form onSubmit={handleSubmit} className="jules-form">
        <label htmlFor="jules-name">Name *</label>
        <input id="jules-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
        <label htmlFor="jules-email">Email *</label>
        <input id="jules-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        <label htmlFor="jules-subject">Subject</label>
        <select id="jules-subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Job Opportunity">Job Opportunity</option>
          <option value="Collaboration">Collaboration</option>
          <option value="Other">Other</option>
        </select>
        <label htmlFor="jules-message">Message *</label>
        <textarea id="jules-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message..." rows={5} required />
        <button type="submit" className="jules-btn jules-btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send Message"}
          {status !== "sending" && <IoSend className="jules-btn-icon" aria-hidden />}
        </button>
      </form>
    </div>
  )
}

const SECTION_CONTENT = {
  about: {
    objective: "Detail-oriented Python and software developer with a strong foundation in Java, modern web technologies (HTML, CSS, JavaScript), advanced database management, and data analysis. Experienced in Agile software engineering principles and seeking an entry-level role where I can build reliable, scalable, and data-driven applications.",
    highlights: [
      "Job portal web application built with Django, Python, and MySQL.",
      "Inventory management system designed with SQL-heavy database modeling.",
      "Data mining and earthquake risk analysis project using Python, R, and RapidMiner.",
      "Cloud computing & IoT coursework using Microsoft Azure for practical deployments.",
    ],
    education: [
      { degree: "Master of Science in Computer Science (3.475 GPA)", school: "Rowan University", period: "Aug. 2024 – May 2026" },
      { degree: "Bachelor of Engineering in Computer Engineering (9.07 CGPA)", school: "Gujarat Technological University", period: "March 2021 – May 2024" },
    ],
    experience: [
      { role: "Full Stack Developer (Web Developer)", company: "CREST INFOTECH", period: "Jan. 2024 – April 2024", points: ["Developed responsive web pages using HTML, CSS, and JavaScript.", "Integrated backend services using Python and MySQL.", "Assisted in building dynamic web applications following industry standards.", "Collaborated with team members to debug and enhance application performance."] },
      { role: "Full Stack Developer (Web Developer)", company: "QSpiders", period: "Jul. 2023 – Aug. 2023", points: ["Built an online laptop shopping cart system using HTML, CSS, and JavaScript.", "Strengthened knowledge of SQL, Java, and web technologies.", "Performed basic manual testing to ensure application quality."] },
    ],
    certifications: [
      { name: "Data Science & Machine Learning Basic to Advance", pdf: "Data-Science-and-Machine-Learning-Basic-to-Advance.pdf" },
      { name: "Python for beginners – Learn all the basics of python", pdf: "Python for Beginners.pdf" },
      { name: "HTML and CSS for Beginners from Basic to Advance", pdf: "HTML and CSS for Beginners from Basic to Advance.pdf" },
      { name: "Network Ethical Hacking for Beginners (Kali-Hands-on)", pdf: "Network Ethical Hacking for beginners(Kali-Hands-on).pdf" },
      { name: "Practical Cisco Networking Labs in Cisco Packet Tracer", pdf: "Practical Cisco Networking.pdf" },
      { name: "CSS for Beginners", pdf: "CSS for Beginners.pdf" },
    ],
  },
  projects: [
    { title: "Job Portal Web Application", tech: "Python, Django", highlight: "GitHub", description: "Django job portal where recruiters post jobs and job seekers apply with resumes—includes role-based auth, profiles, search, and application tracking.", url: "https://github.com/bhargavpatel0201/JobPortal" },
    { title: "Inventory Management System", tech: "PHP, MySQL, HTML/CSS/JavaScript", highlight: "GitHub", description: "Full-stack project focused on MySQL database design and PHP frontend. Manages inventory, orders, and customer records with normalized tables, stored procedures, and efficient queries.", url: "https://github.com/bhargavpatel0201/InventoryManagementSystem" },
    { title: "Earthquake Prediction and Risk Analysis", tech: "Data Mining, Python, R", highlight: "Data mining & risk", description: "Data mining project analyzing historical earthquake data to identify patterns, predict magnitudes, and highlight high-risk regions for improved disaster preparedness.", url: "https://github.com/bhargavpatel0201/Earthquake-Prediction-and-Risk-Analysis" },
    { title: "Chef-Centric Website Redesign", tech: "React, AI-Assisted Redesign", highlight: "Live Demo", description: "Redesigned Julius Silvert's chef-focused website in class using AI-assisted design and React implementation, with an emphasis on modern UI, visual hierarchy, and responsive layout.", url: "https://redesign-react.vercel.app/" },
  ],
  skills: {
    Languages: [
      { icon: FaPython, name: "Python" },
      { icon: FaJava, name: "Java" },
      { icon: DiDatabase, name: "SQL" },
    ],
    Framework: [
      { icon: SiDjango, name: "Django" },
    ],
    Frontend: [
      { icon: FaHtml5, name: "HTML" },
      { icon: FaCss3Alt, name: "CSS" },
      { icon: FaJs, name: "JavaScript" },
      { icon: FaBootstrap, name: "Bootstrap" },
    ],
    Database: [
      { icon: SiMysql, name: "MySQL" },
      { icon: SiSqlite, name: "SQLite" },
    ],
    "Tools & Platforms": [
      { icon: FaGitAlt, name: "Git" },
      { icon: FaGithub, name: "GitHub" },
      { icon: FaLinux, name: "Linux" },
      { icon: FaCode, name: "Microsoft Azure" },
      { icon: FaCode, name: "RapidMiner" },
    ],
    "Core Concepts": [
      { icon: FaCode, name: "Data Structures" },
      { icon: FaCode, name: "OOP" },
      { icon: FaNetworkWired, name: "Computer Networks" },
      { icon: FaCode, name: "Agile Methodology" },
      { icon: FaCode, name: "Functional Programming (Decorators, higher-order functions)" },
    ],
  },
  contact: [
    { label: "GitHub", url: "https://github.com/bhargavpatel0201", icon: FaGithub },
    { label: "Instagram", url: "https://www.instagram.com/bhargav0201/", icon: FaInstagram },
    { label: "Email", url: "mailto:bhargav.patel.ce@gmail.com", icon: MdEmail },
    { label: "Phone", url: "tel:+18565264244", icon: FaPhone },
    { label: "Location", url: "https://www.google.com/maps/search/?api=1&query=Mount+Laurel+New+Jersey+USA", icon: FaMapMarkerAlt },
  ],
}

export default function PageContent({ scrollToId }) {
  const content = SECTION_CONTENT

  useEffect(() => {
    const els = document.querySelectorAll(".jules-section-head, .jules-lead, .jules-card, .jules-work-card, .jules-skill-category, .jules-contact-form")
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("jules-visible")
        })
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    )
    els.forEach((el) => {
      io.observe(el)
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.9) el.classList.add("jules-visible")
    })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <section id="about" className="jules-section">
        <div className="jules-container">
          <h2 className="jules-section-head">About me</h2>
          <p className="jules-lead">{content.about.objective}</p>
          <div className="jules-highlights">
            {content.about.highlights.map((h, i) => (
              <div key={i} className="jules-highlight-pill">
                <span>{h}</span>
              </div>
            ))}
          </div>
          <div className="jules-about-grid">
            <section className="jules-card jules-card-education">
              <div className="jules-card-header">
                <h3 className="jules-h3">Education</h3>
              </div>
              <div className="jules-edu-list">
                {content.about.education.map((e, i) => (
                  <article key={i} className="jules-edu-item">
                    <div className="jules-edu-accent" aria-hidden="true" />
                    <div className="jules-edu-body">
                      <strong className="jules-edu-school">{e.school}</strong>
                      <span className="jules-edu-degree">{e.degree}</span>
                      <span className="jules-edu-period">{e.period}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="jules-card jules-card-experience">
              <div className="jules-card-header">
                <h3 className="jules-h3">Experience</h3>
              </div>
              <div className="jules-exp-list">
                {content.about.experience.map((exp, i) => (
                  <article key={i} className="jules-exp-item">
                    <header className="jules-exp-header">
                      <div>
                        <h4 className="jules-exp-role">{exp.role}</h4>
                        <p className="jules-exp-company">{exp.company}</p>
                      </div>
                      <span className="jules-exp-period">{exp.period}</span>
                    </header>
                    <ul className="jules-exp-points">
                      {exp.points.map((p, j) => <li key={j}>{p}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <section className="jules-card jules-card-certifications">
            <div className="jules-card-header">
              <h3 className="jules-h3">Certifications (Udemy)</h3>
            </div>
            <ul className="jules-cert-list">
              {content.about.certifications.map((c, i) => (
                <li key={i} className="jules-cert-item">
                  <span className="jules-cert-name">{typeof c === "string" ? c : c.name}</span>
                  {typeof c === "object" && c.pdf && (
                    <a
                      href={`/udemy-certificates/${encodeURIComponent(c.pdf)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="jules-cert-link"
                    >
                      View certificate
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section id="work" className="jules-section jules-section-alt">
        <div className="jules-container">
          <h2 className="jules-section-head">Selected work</h2>
          <p className="jules-lead">Complete projects in Python & Django</p>
          <div className="jules-work-grid">
            {content.projects.map((p, i) => {
              const Wrapper = p.url ? "a" : "article"
              const wrapperProps = p.url
                ? { href: p.url, target: "_blank", rel: "noopener noreferrer", className: "jules-work-card" }
                : { className: "jules-work-card" }
              return (
                <Wrapper key={i} {...wrapperProps}>
                  <span className="jules-work-tech">{p.tech}</span>
                  {p.inProgress && <span className="jules-work-badge">Work in progress</span>}
                  <h3 className="jules-work-title">{p.title}</h3>
                  <p>{p.description}</p>
                </Wrapper>
              )
            })}
          </div>
        </div>
      </section>

      <section id="skills" className="jules-section">
        <div className="jules-container">
          <h2 className="jules-section-head">Tech stack & tools I use</h2>
          <div className="jules-skills-grid">
            {Object.entries(content.skills).map(([categoryName, skillList]) => (
              <div key={categoryName} className="jules-skill-category">
                <h3 className="jules-h3">{categoryName}</h3>
                <div className="jules-skill-icons">
                  {skillList.map((skill, idx) => {
                    const Icon = skill.icon
                    return (
                      <div key={idx} className="jules-skill-item">
                        <Icon className="jules-skill-icon" />
                        <span>{skill.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="jules-section jules-section-contact">
        <div className="jules-container jules-contact-wrap">
          <div className="jules-contact-intro">
            <h2 className="jules-section-head">Connect <em>with me</em></h2>
            <p className="jules-lead">Whether you have a project in mind, a question, or just want to say hello — I'm here and would love to hear from you.</p>
            <ContactForm />
          </div>
          <div className="jules-connect">
            <p className="jules-connect-label">Or connect with me</p>
            <div className="jules-connect-grid">
              {content.contact.map((c, i) => {
                const Icon = c.icon
                const isDownload = c.download != null
                return (
                  <a
                    key={i}
                    href={c.url}
                    {...(isDownload ? { download: c.download } : { target: "_blank", rel: "noopener noreferrer" })}
                    className="jules-connect-card"
                  >
                    <Icon className="jules-connect-icon" />
                    <span>{c.label}</span>
                  </a>
                )
              })}
            </div>
            <p className="jules-contact-details">bhargav.patel.ce@gmail.com · <a href="tel:+18565264244">+1 856-526-4244</a> · Mount Laurel, NJ</p>
          </div>
        </div>
      </section>

      <footer className="jules-footer">
        <div className="jules-container jules-footer-inner">
          <nav className="jules-footer-links">
            <span>Work</span>
            <button type="button" onClick={() => scrollToId("work")}>Projects</button>
          </nav>
          <nav className="jules-footer-connect">
            <span>Connect</span>
            <a href="mailto:bhargav.patel.ce@gmail.com">Email</a>
            <a href="https://www.instagram.com/bhargav0201/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://github.com/bhargavpatel0201" target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
          <p className="jules-footer-credit">© {new Date().getFullYear()} Bhargav Patel · The Code Architect</p>
        </div>
      </footer>
    </>
  )
}
