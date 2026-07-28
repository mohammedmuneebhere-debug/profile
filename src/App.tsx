import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import {
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
  FaMicrochip,
  FaTimes,
  FaTrophy,
} from 'react-icons/fa'
import BootSequence from './components/BootSequence'
import GlitchText from './components/GlitchText'
import HologramFrame from './components/HologramFrame'
import HUDOverlay from './components/HUDOverlay'
import JarvisScene from './components/JarvisScene'
import JarvisTerminal from './components/JarvisTerminal'
import { certificates } from './data/certificates'
import {
  currentlyExploring,
  education,
  experience,
  extracurricular,
  featuredProjects,
  hackathons,
  hobbies,
  professionalSummary,
  profile,
  skillTracks,
  systemBrand,
} from './data/portfolio'
import profileImage from './assets/profile.png'
import './App.css'

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="section-eyebrow">
        <FaMicrochip /> {eyebrow}
      </p>
      <h2>{title}</h2>
      {text ? <span>{text}</span> : null}
    </motion.div>
  )
}

function App() {
  const gmailComposeUrl =
    'https://mail.google.com/mail/?view=cm&fs=1&to=mohammedmuneebhere%40gmail.com&su=Portfolio%20Inquiry'
  const [booted, setBooted] = useState(false)
  const [selectedProject, setSelectedProject] = useState<(typeof featuredProjects)[number] | null>(null)
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificates)[number] | null>(null)
  const [activeNav, setActiveNav] = useState('home')

  const navigateTo = useCallback((section: string) => {
    setActiveNav(section)
    const el = document.getElementById(section)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const navItems = [
    { id: 'home', label: 'Overview' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <>
      {!booted ? <BootSequence onComplete={() => setBooted(true)} /> : null}

      <main className={`jarvis-shell ${booted ? 'is-booted' : ''}`}>
        <JarvisScene />
        <HUDOverlay />

        <div className="jarvis-content">
          <nav className="jarvis-nav">
            <a href="#home" className="jarvis-brand" onClick={() => setActiveNav('home')}>
              <span className="brand-arc" />
              {systemBrand.name}
            </a>
            <div className="jarvis-nav-links">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={activeNav === item.id ? 'is-active' : ''}
                  onClick={() => setActiveNav(item.id)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <header id="home" className="jarvis-hero">
            <motion.section
              className="hero-panel"
              initial={{ opacity: 0, y: 40 }}
              animate={booted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="hero-eyebrow">{profile.tagline}</p>
              <GlitchText text={profile.name} className="hero-title" />
              <p className="hero-subtitle">{profile.title}</p>
              <p className="hero-lead">{profile.summary}</p>

              <div className="hero-actions">
                <a href={gmailComposeUrl} target="_blank" rel="noreferrer" className="jarvis-btn jarvis-btn-primary">
                  <FaEnvelope /> Contact
                </a>
                <a href="/Muneeb-CV.pdf" download className="jarvis-btn">
                  <FaDownload /> Resume
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="jarvis-btn">
                  <FaGithub /> GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="jarvis-btn">
                  <FaLinkedin /> LinkedIn
                </a>
              </div>

              <div className="hero-metrics">
                <div className="metric-chip">
                  <span>AI/ML PIPELINES</span>
                  <strong>GenAI + ML</strong>
                </div>
                <div className="metric-chip">
                  <span>FEATURED BUILDS</span>
                  <strong>6+</strong>
                </div>
                <div className="metric-chip">
                  <span>LOCATION</span>
                  <strong>Hyderabad</strong>
                </div>
                <div className="metric-chip">
                  <span>PHONE</span>
                  <strong>{profile.phone}</strong>
                </div>
              </div>
            </motion.section>

            <motion.aside
              className="profile-hologram"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={booted ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="profile-ring">
                <div className="profile-ring-inner">
                  <img src={profileImage} alt={`${profile.name} portrait`} />
                </div>
              </div>
              <div className="profile-data">
                <span className="profile-status">{profile.status}</span>
                <h2>{profile.bio}</h2>
                <div className="profile-vitals">
                  <span>ID: {systemBrand.operatorId}</span>
                  <span>INTERFACE: {systemBrand.name}</span>
                </div>
              </div>
            </motion.aside>
          </header>

          <section id="about" className="jarvis-section">
            <SectionHeader
              eyebrow="Professional Summary"
              title="Who I Am & What I Build"
              text="AI & DS engineering student with applied experience across GenAI, ML pipelines, full-stack development, and technical leadership."
            />
            <div className="summary-grid">
              {professionalSummary.map((paragraph, index) => (
                <HologramFrame key={paragraph.slice(0, 32)} className="summary-card" delay={index * 0.06}>
                  <p>{paragraph}</p>
                </HologramFrame>
              ))}
            </div>
          </section>

          <section id="projects" className="jarvis-section">
            <SectionHeader
              eyebrow="Selected Work"
              title="Projects With Product Shape"
              text="AI systems, analytics tools, Web3 risk prototypes, credit intelligence platforms, and applied ML builds."
            />
            <div className="project-grid">
              {featuredProjects.map((project, index) => (
                <HologramFrame
                  key={project.title}
                  className="project-card"
                  delay={index * 0.06}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="card-index">0{index + 1}</div>
                  <h3>{project.title}</h3>
                  <p className="card-lead">{project.desc}</p>
                  <p>{project.detail}</p>
                  <ul>
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <small>{project.tech}</small>
                  <p className="card-outcome">{project.outcome}</p>
                  <span className="card-cta">View full dossier →</span>
                </HologramFrame>
              ))}
            </div>
          </section>

          <section className="jarvis-section">
            <SectionHeader
              eyebrow="Currently Exploring"
              title="What I Am Building Toward"
              text="A focused learning track around production-grade AI systems, infrastructure, and intelligent automation."
            />
            <div className="explore-grid">
              {currentlyExploring.map((item, index) => (
                <HologramFrame key={item.title} className="explore-card" delay={index * 0.05}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </HologramFrame>
              ))}
            </div>
          </section>

          <section id="experience" className="jarvis-section split-section">
            <div>
              <SectionHeader
                eyebrow="Experience"
                title="Where The Work Happened"
                text="Internships, leadership roles, real-world projects, and freelance builds across AI, web, and data analytics."
              />
              <div className="timeline">
                {experience.map((item, index) => (
                  <HologramFrame key={`${item.role}-${item.org}`} className="timeline-card" delay={index * 0.05}>
                    <div className="timeline-head">
                      <h3>{item.role}</h3>
                      <span>{item.period}</span>
                    </div>
                    <p className="timeline-org">{item.org}</p>
                    <p>{item.impact}</p>
                  </HologramFrame>
                ))}
              </div>
            </div>

            <div id="skills">
              <SectionHeader
                eyebrow="Skills"
                title="Core Strengths"
                text="Generative AI, machine learning, full-stack engineering, deep learning research, and Web3-AI integration."
              />
              <div className="skills-grid">
                {skillTracks.map((skill, index) => (
                  <HologramFrame key={skill.name} className="skill-card" delay={index * 0.05}>
                    <div className="skill-head">
                      <h3>{skill.name}</h3>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="skill-meter">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                    <div className="tag-row">
                      {skill.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </HologramFrame>
                ))}
              </div>
            </div>
          </section>

          <section id="education" className="jarvis-section">
            <SectionHeader
              eyebrow="Education"
              title="Academic Foundation"
              text="B.Tech in Artificial Intelligence & Data Science with a strong academic track across engineering and pre-university studies."
            />
            <div className="education-grid">
              {education.map((item, index) => (
                <HologramFrame key={item.degree} className="education-card" delay={index * 0.05}>
                  <div className="timeline-head">
                    <h3>{item.degree}</h3>
                    <span>{item.period}</span>
                  </div>
                  <p className="timeline-org">{item.school}</p>
                  <p>{item.detail}</p>
                </HologramFrame>
              ))}
            </div>
          </section>

          <section className="jarvis-section">
            <SectionHeader
              eyebrow="Recognition"
              title="Hackathons & Competitive Achievements"
              text="National-level hackathons, Web3 competitions, and rapid prototyping under time pressure."
            />
            <div className="achievement-grid">
              {hackathons.map((hackathon, index) => (
                <HologramFrame key={hackathon.name} className="achievement-card" delay={index * 0.05}>
                  <p className="result-chip">
                    <FaTrophy /> {hackathon.result}
                  </p>
                  <h3>{hackathon.name}</h3>
                  <p>{hackathon.detail}</p>
                </HologramFrame>
              ))}
            </div>
          </section>

          <section id="certificates" className="jarvis-section">
            <SectionHeader
              eyebrow="Proof Of Work"
              title="Certificates & Licenses"
              text="Google Cloud AI badges, research publication, internship completions, workshop certifications, and competition achievements."
            />
            <div className="certificate-grid">
              {certificates.map((certificate, index) => (
                <HologramFrame
                  key={certificate.title}
                  className="certificate-card"
                  delay={index * 0.04}
                  onClick={() => setSelectedCertificate(certificate)}
                >
                  <img src={certificate.image} alt={certificate.title} />
                  <div>
                    <h3>{certificate.title}</h3>
                    <p>{certificate.caption}</p>
                  </div>
                </HologramFrame>
              ))}
            </div>
          </section>

          <section id="contact" className="jarvis-section closing-section">
            <div>
              <SectionHeader
                eyebrow="Beyond Code"
                title="The Person Around The Work"
                text="Interests, community involvement, and extracurricular activities that shape how I collaborate and lead."
              />
              <div className="hobby-row">
                {hobbies.map((hobby) => (
                  <span key={hobby}>{hobby}</span>
                ))}
              </div>
              <div className="hobby-row extracurricular-row">
                {extracurricular.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <HologramFrame className="contact-panel">
              <h2>Let us build something exceptional.</h2>
              <p>
                Reach me at{' '}
                <a href={gmailComposeUrl} target="_blank" rel="noreferrer">
                  {profile.email}
                </a>{' '}
                or call {profile.phone}. Explore my work profiles below.
              </p>
              <div className="footer-links">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub <FaExternalLinkAlt />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <FaExternalLinkAlt />
                </a>
                <a href="/Muneeb-CV.pdf" download>
                  Resume <FaDownload />
                </a>
              </div>
            </HologramFrame>
          </section>
        </div>

        <JarvisTerminal onNavigate={navigateTo} />

        <AnimatePresence>
          {selectedProject ? (
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.section
                className="jarvis-modal"
                role="dialog"
                aria-modal="true"
                aria-label={selectedProject.title}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  className="modal-close"
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                >
                  <FaTimes />
                </button>
                <p className="section-eyebrow">Project Dossier</p>
                <h2>{selectedProject.title}</h2>
                <p className="modal-lead">{selectedProject.desc}</p>
                <div className="modal-grid">
                  <div>
                    <h3>Approach</h3>
                    <p>{selectedProject.detail}</p>
                  </div>
                  <div>
                    <h3>Outcome</h3>
                    <p>{selectedProject.outcome}</p>
                  </div>
                </div>
                <div className="modal-tags">
                  {selectedProject.highlights.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <small>{selectedProject.tech}</small>
              </motion.section>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {selectedCertificate ? (
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
            >
              <motion.section
                className="jarvis-modal certificate-modal"
                role="dialog"
                aria-modal="true"
                aria-label={selectedCertificate.title}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  className="modal-close"
                  type="button"
                  onClick={() => setSelectedCertificate(null)}
                  aria-label="Close certificate preview"
                >
                  <FaTimes />
                </button>
                <img src={selectedCertificate.image} alt={selectedCertificate.title} />
                <div>
                  <p className="section-eyebrow">Certificate Preview</p>
                  <h2>{selectedCertificate.title}</h2>
                  <p>{selectedCertificate.caption}</p>
                </div>
              </motion.section>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </>
  )
}

export default App
