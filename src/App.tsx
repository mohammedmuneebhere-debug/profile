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
import HoloGrid from './components/HoloGrid'
import LiquidGlass from './components/LiquidGlass'
import LiquidGlassFilters from './components/LiquidGlassFilters'
import HologramFrame from './components/HologramFrame'
import SpatialDock from './components/SpatialDock'
import GlassSection from './components/GlassSection'
import SpatialBackground from './components/SpatialBackground'
import HUDOverlay from './components/HUDOverlay'
import HUDCursor from './components/HUDCursor'
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
import {
  holoHeaderVariants,
  holoHeroPanelVariants,
  holoHeroProfileVariants,
  holoModalBackdropVariants,
  holoModalVariants,
} from './lib/hologramMotion'
import './styles/liquid-glass.css'
import './App.css'

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <motion.div
      className="section-header"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={holoHeaderVariants}
    >
      <motion.p className="section-eyebrow" variants={holoHeaderVariants}>
        <FaMicrochip /> {eyebrow}
      </motion.p>
      <motion.h2 variants={holoHeaderVariants}>{title}</motion.h2>
      {text ? <motion.span variants={holoHeaderVariants}>{text}</motion.span> : null}
      <span className="section-header-line" aria-hidden="true" />
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
      <LiquidGlassFilters />
      <HUDCursor />
      {!booted ? <BootSequence onComplete={() => setBooted(true)} /> : null}

      <main className={`jarvis-shell ${booted ? 'is-booted' : ''}`}>
        {booted ? (
          <>
            <JarvisScene />
            <SpatialBackground />
            <HUDOverlay />
          </>
        ) : null}

        <div className="jarvis-content">
          <SpatialDock
            brand={systemBrand.name}
            items={navItems}
            activeId={activeNav}
            onSelect={setActiveNav}
            booted={booted}
          />

          <header id="home" className="jarvis-hero">
            <motion.section
              className="hero-panel"
              initial="hidden"
              animate={booted ? 'visible' : 'hidden'}
              variants={holoHeroPanelVariants}
            >
              <LiquidGlass className="hero-liquid-panel" intensity="strong">
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
                <LiquidGlass className="metric-chip" intensity="soft" variant="lite">
                  <span>AI/ML PIPELINES</span>
                  <strong>GenAI + ML</strong>
                </LiquidGlass>
                <LiquidGlass className="metric-chip" intensity="soft" variant="lite">
                  <span>FEATURED BUILDS</span>
                  <strong>6+</strong>
                </LiquidGlass>
                <LiquidGlass className="metric-chip" intensity="soft" variant="lite">
                  <span>LOCATION</span>
                  <strong>Hyderabad</strong>
                </LiquidGlass>
                <LiquidGlass className="metric-chip" intensity="soft" variant="lite">
                  <span>PHONE</span>
                  <strong>{profile.phone}</strong>
                </LiquidGlass>
              </div>
              </LiquidGlass>
            </motion.section>

            <motion.aside
              className="profile-hologram"
              initial="hidden"
              animate={booted ? 'visible' : 'hidden'}
              variants={holoHeroProfileVariants}
            >
              <LiquidGlass className="profile-liquid-panel" intensity="strong">
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
              </LiquidGlass>
            </motion.aside>
          </header>

          <GlassSection id="about" from="left">
            <SectionHeader
              eyebrow="Professional Summary"
              title="Who I Am & What I Build"
              text="AI & DS engineering student with applied experience across GenAI, ML pipelines, full-stack development, and technical leadership."
            />
            <HoloGrid className="summary-grid">
              {professionalSummary.map((paragraph) => (
                <HologramFrame key={paragraph.slice(0, 32)} className="summary-card" staggered>
                  <p>{paragraph}</p>
                </HologramFrame>
              ))}
            </HoloGrid>
          </GlassSection>

          <GlassSection id="projects" from="right">
            <SectionHeader
              eyebrow="Selected Work"
              title="Projects With Product Shape"
              text="AI systems, analytics tools, Web3 risk prototypes, credit intelligence platforms, and applied ML builds."
            />
            <HoloGrid className="project-grid">
              {featuredProjects.map((project, index) => (
                <HologramFrame
                  key={project.title}
                  className="project-card"
                  staggered
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
            </HoloGrid>
          </GlassSection>

          <GlassSection from="bottom">
            <SectionHeader
              eyebrow="Currently Exploring"
              title="What I Am Building Toward"
              text="A focused learning track around production-grade AI systems, infrastructure, and intelligent automation."
            />
            <HoloGrid className="explore-grid">
              {currentlyExploring.map((item) => (
                <HologramFrame key={item.title} className="explore-card" staggered>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </HologramFrame>
              ))}
            </HoloGrid>
          </GlassSection>

          <GlassSection id="experience" className="split-section" from="left">
            <div>
              <SectionHeader
                eyebrow="Experience"
                title="Where The Work Happened"
                text="Internships, leadership roles, real-world projects, and freelance builds across AI, web, and data analytics."
              />
              <HoloGrid className="timeline">
                {experience.map((item) => (
                  <HologramFrame key={`${item.role}-${item.org}`} className="timeline-card" staggered>
                    <div className="timeline-head">
                      <h3>{item.role}</h3>
                      <span>{item.period}</span>
                    </div>
                    <p className="timeline-org">{item.org}</p>
                    <p>{item.impact}</p>
                  </HologramFrame>
                ))}
              </HoloGrid>
            </div>

            <div id="skills">
              <SectionHeader
                eyebrow="Skills"
                title="Core Strengths"
                text="Generative AI, machine learning, full-stack engineering, deep learning research, and Web3-AI integration."
              />
              <HoloGrid className="skills-grid">
                {skillTracks.map((skill) => (
                  <HologramFrame key={skill.name} className="skill-card" staggered>
                    <div className="skill-head">
                      <h3>{skill.name}</h3>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="skill-meter">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 45, damping: 22, mass: 1, delay: 0.15 }}
                      />
                    </div>
                    <div className="tag-row">
                      {skill.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </HologramFrame>
                ))}
              </HoloGrid>
            </div>
          </GlassSection>

          <GlassSection id="education" from="right">
            <SectionHeader
              eyebrow="Education"
              title="Academic Foundation"
              text="B.Tech in Artificial Intelligence & Data Science with a strong academic track across engineering and pre-university studies."
            />
            <HoloGrid className="education-grid">
              {education.map((item) => (
                <HologramFrame key={item.degree} className="education-card" staggered>
                  <div className="timeline-head">
                    <h3>{item.degree}</h3>
                    <span>{item.period}</span>
                  </div>
                  <p className="timeline-org">{item.school}</p>
                  <p>{item.detail}</p>
                </HologramFrame>
              ))}
            </HoloGrid>
          </GlassSection>

          <GlassSection from="left">
            <SectionHeader
              eyebrow="Recognition"
              title="Hackathons & Competitive Achievements"
              text="National-level hackathons, Web3 competitions, and rapid prototyping under time pressure."
            />
            <HoloGrid className="achievement-grid">
              {hackathons.map((hackathon) => (
                <HologramFrame key={hackathon.name} className="achievement-card" staggered>
                  <p className="result-chip">
                    <FaTrophy /> {hackathon.result}
                  </p>
                  <h3>{hackathon.name}</h3>
                  <p>{hackathon.detail}</p>
                </HologramFrame>
              ))}
            </HoloGrid>
          </GlassSection>

          <GlassSection id="certificates" from="bottom">
            <SectionHeader
              eyebrow="Proof Of Work"
              title="Certificates & Licenses"
              text="Google Cloud AI badges, research publication, internship completions, workshop certifications, and competition achievements."
            />
            <HoloGrid className="certificate-grid">
              {certificates.map((certificate) => (
                <HologramFrame
                  key={certificate.title}
                  className="certificate-card"
                  staggered
                  onClick={() => setSelectedCertificate(certificate)}
                >
                  <img src={certificate.image} alt={certificate.title} />
                  <div>
                    <h3>{certificate.title}</h3>
                    <p>{certificate.caption}</p>
                  </div>
                </HologramFrame>
              ))}
            </HoloGrid>
          </GlassSection>

          <GlassSection id="contact" className="closing-section" from="right">
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
          </GlassSection>
        </div>

        <JarvisTerminal onNavigate={navigateTo} />

        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div
              className="modal-backdrop"
              variants={holoModalBackdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelectedProject(null)}
            >
              <motion.section
                className="jarvis-modal holo-modal"
                role="dialog"
                aria-modal="true"
                aria-label={selectedProject.title}
                variants={holoModalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(event) => event.stopPropagation()}
              >
                <LiquidGlass className="modal-liquid-fill" intensity="strong">
                <span className="holo-modal-ring" aria-hidden="true" />
                <span className="holo-modal-scan" aria-hidden="true" />
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
                </LiquidGlass>
              </motion.section>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {selectedCertificate ? (
            <motion.div
              className="modal-backdrop"
              variants={holoModalBackdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelectedCertificate(null)}
            >
              <motion.section
                className="jarvis-modal certificate-modal holo-modal"
                role="dialog"
                aria-modal="true"
                aria-label={selectedCertificate.title}
                variants={holoModalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(event) => event.stopPropagation()}
              >
                <LiquidGlass className="modal-liquid-fill certificate-liquid-fill" intensity="strong">
                <span className="holo-modal-ring" aria-hidden="true" />
                <span className="holo-modal-scan" aria-hidden="true" />
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
                </LiquidGlass>
              </motion.section>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </>
  )
}

export default App
