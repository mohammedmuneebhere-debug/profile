import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaExternalLinkAlt, FaEnvelope, FaTrophy } from 'react-icons/fa'
import { useMemo, useRef } from 'react'
import type { Group } from 'three'
import profileImage from './assets/profile.png'
import trainSmallModelBadge from './assets/train-small-language-model-badge.png'
import ijrasetCertificate from './assets/ijraset-certificate.png'
import powerBiWorkshopCertificate from './assets/certificates/power-bi-workshop.png'
import bsregCertificate from './assets/certificates/bsreg113968.png'
import additionalCertificate from './assets/certificates/b474f161-certificate.png'
import mcetGotTalentCertificate from './assets/certificates/mcet-got-talent.png'
import ltMetroProjectCertificate from './assets/certificates/lt-metro-project-appreciation.png'
import prodigyInternshipCertificate from './assets/certificates/prodigy-internship-completion.png'
import iitRoorkeeFinalistCertificate from './assets/certificates/iit-roorkee-national-finalist.png'
import './App.css'

function FloatingGeometry() {
  const group = useRef<Group>(null)

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.18
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08
  })

  return (
    <group ref={group}>
      <Float speed={2} floatIntensity={1.2}>
        <mesh position={[-2.2, 1.1, -1]}>
          <torusKnotGeometry args={[0.45, 0.12, 160, 18]} />
          <meshStandardMaterial color="#8d5bff" metalness={0.7} roughness={0.15} />
        </mesh>
      </Float>
      <Float speed={2.3} floatIntensity={1.1}>
        <mesh position={[1.8, -0.4, -0.6]}>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial color="#35d4ff" wireframe />
        </mesh>
      </Float>
      <Float speed={1.8} floatIntensity={1.6}>
        <mesh position={[0, 1.8, -1.8]}>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#ff6ba2" metalness={0.6} roughness={0.35} />
        </mesh>
      </Float>
    </group>
  )
}

const featuredProjects = [
  {
    title: 'SYAL - Smart Youth Analytics & Learning Platform',
    desc: 'GenAI-driven platform using Gemini APIs, contextual prompts, and scalable AI content workflows.',
    tech: 'Gemini LLMs, Prompt Engineering, Python, JavaScript, Cloud APIs',
  },
  {
    title: 'CryptoVista - AI-Powered Crypto Analytics',
    desc: 'Real-time analytics platform with scheduled ML pipelines, indicators, predictive models, and dashboards.',
    tech: 'React + Vite, Python, Scikit-learn, TensorFlow, REST APIs',
  },
  {
    title: 'CredGenie AI - Credit Intelligence Platform',
    desc: 'Autonomous credit decisioning engine with document intelligence, explainable ML, and CAM generation.',
    tech: 'FastAPI, OCR, LangChain, LLMs, XGBoost, Neo4j',
  },
  {
    title: 'GreenMind AI',
    desc: 'Built an optimizer that reduces prompt tokens while preserving semantic meaning and model quality.',
    tech: 'Python, XAI, Deep Learning, Reinforcement Learning',
  },
  {
    title: 'Shardeum AI Risk Manager',
    desc: 'Explored AI-assisted risk management for decentralized blockchain ecosystems with Web3 integration.',
    tech: 'Web3, Blockchain Fundamentals, AI Risk Analysis',
  },
]

const experience = [
  {
    role: 'AI Intern',
    org: 'Alfido Tech',
    period: '4 Months',
    impact:
      'Built and evaluated machine learning and deep learning pipelines, and integrated Python AI workflows into real applications.',
    highlights: ['Model experimentation', 'Evaluation pipelines', 'AI workflow integration'],
  },
  {
    role: 'Web Development Lead',
    org: 'GDGC MCET',
    period: 'Leadership Role',
    impact:
      'Led the web development vertical, mentored contributors, and delivered scalable event/community web platforms.',
    highlights: ['Team mentoring', 'Production web delivery', 'Modern engineering standards'],
  },
  {
    role: 'Student Project Associate - AI/ML & Data Analytics',
    org: 'L&T Metro Rail Hyderabad',
    period: '5-Month Project',
    impact:
      'Executed AI/ML-driven ridership survey and prediction workflows for Hyderabad red-line corridors using real-time field data.',
    highlights: ['Field data collection', 'Predictive analytics', 'Stakeholder-aligned reporting'],
  },
  {
    role: 'Freelance AI Developer',
    org: 'Independent Projects',
    period: 'Ongoing',
    impact:
      'Developing automated MT5 bridge platforms with AI chatbot-based trade execution and secure broker/server connectivity.',
    highlights: ['Automation architecture', 'AI chatbot execution', 'Secure integration design'],
  },
]

const hackathons = [
  {
    name: 'Shardeum - Proof of Community Hackathon',
    result: '2nd Place',
    detail: 'Built a Web3 + AI solution and ranked among top teams for innovation and execution.',
  },
  {
    name: "IIT Roorkee E-Cell E-Summit - Mind the Product",
    result: '4th Place (National Level)',
    detail: 'Designed an IoT-integrated AI system for managing 1M+ railway assets.',
  },
  {
    name: "Hack'Forge - ISL College of Engineering & Technology",
    result: '2nd Place',
    detail: 'Created an LLM optimizer chatbot that routes prompts to suitable LLM/SLM models.',
  },
  {
    name: 'Innomatics Research Labs Hackathon',
    result: 'Finalist Prototype',
    detail: 'Delivered a technology-driven prototype under tight time constraints.',
  },
]

const certificates = [
  {
    title: 'Train a Small Language Model - Google DeepMind Skill Badge',
    image: trainSmallModelBadge,
    caption: 'Advanced Google DeepMind skill badge for training and fine-tuning small language models.',
  },
  {
    title: 'IJRASET Research Publication Certificate',
    image: ijrasetCertificate,
    caption: 'Recognizes publication of "HiveMind AI" in IJRASET, April 2026, Volume 14 Issue IV.',
  },
  {
    title: 'Power BI Workshop Certificate',
    image: powerBiWorkshopCertificate,
    caption: 'Awarded for successful participation in Power BI workshop and BI visualization practice.',
  },
  {
    title: 'Alfido Tech Internship Completion',
    image: bsregCertificate,
    caption: 'Successfully completed a 4-month internship in Artificial Intelligence at Alfido Tech.',
  },
  {
    title: 'Additional Professional Certificate',
    image: additionalCertificate,
    caption: 'Professional upskilling certificate demonstrating continuous technical learning and participation.',
  },
  {
    title: 'MCET Got Talent - 1st Position',
    image: mcetGotTalentCertificate,
    caption: 'Certificate of Appreciation for securing first position in "MCET\'s Got Talent" (April 2026).',
  },
  {
    title: 'L&T Metro AI/ML Project Appreciation',
    image: ltMetroProjectCertificate,
    caption: 'Appreciation certificate for completing AI/ML-based Metro ridership survey and prediction project.',
  },
  {
    title: 'Prodigy InfoTech Internship Completion',
    image: prodigyInternshipCertificate,
    caption: 'Completion certificate for 1-month Generative AI internship at Prodigy InfoTech.',
  },
  {
    title: 'IIT Roorkee E-Summit National Finalist',
    image: iitRoorkeeFinalistCertificate,
    caption: 'Certificate of Achievement for emerging as a national finalist in Mind The Product (E-Summit 26).',
  },
]

function App() {
  const skillTracks = useMemo(
    () => [
      { name: 'Generative AI & LLM Systems', level: 92, tags: ['RAG', 'Prompt Engineering', 'LangChain', 'Gemini'] },
      { name: 'Machine Learning & Data Science', level: 90, tags: ['Scikit-learn', 'EDA', 'Model Evaluation', 'Pipelines'] },
      { name: 'Full-Stack Engineering', level: 88, tags: ['React', 'FastAPI', 'MERN', 'REST APIs'] },
      { name: 'Deep Learning & AI Research', level: 84, tags: ['Transformers', 'XAI', 'RL', 'Neural Networks'] },
      { name: 'Web3 + AI Integration', level: 76, tags: ['Blockchain Basics', 'Risk Modeling', 'Decentralized Systems'] },
    ],
    [],
  )

  const hobbies = useMemo(
    () => [
      { title: 'Sports & Fitness', text: 'Regular workouts, athletic activities, and discipline-driven fitness routines.' },
      { title: 'Literature & Poetry', text: 'Strong interest in reading, reflective writing, and expressive literature.' },
      { title: 'MUN & Public Speaking', text: 'Model United Nations participation with confident stage and communication presence.' },
      { title: 'NSS & Community Work', text: 'Active involvement in social service initiatives and community-led events.' },
      { title: 'Event Leadership', text: 'Organizing workshops, hackathons, and collaborative student tech activities.' },
    ],
    [],
  )

  const neuralNodes = useMemo(
    () => [
      { id: 'n1', x: 10, y: 18, size: 9 },
      { id: 'n2', x: 24, y: 30, size: 7 },
      { id: 'n3', x: 40, y: 20, size: 8 },
      { id: 'n4', x: 58, y: 34, size: 9 },
      { id: 'n5', x: 72, y: 18, size: 7 },
      { id: 'n6', x: 84, y: 30, size: 8 },
      { id: 'n7', x: 18, y: 58, size: 8 },
      { id: 'n8', x: 34, y: 70, size: 10 },
      { id: 'n9', x: 52, y: 62, size: 8 },
      { id: 'n10', x: 69, y: 74, size: 9 },
      { id: 'n11', x: 86, y: 60, size: 7 },
    ],
    [],
  )

  const neuralLinks = useMemo(
    () => [
      ['n1', 'n2'],
      ['n2', 'n3'],
      ['n3', 'n4'],
      ['n4', 'n5'],
      ['n5', 'n6'],
      ['n2', 'n7'],
      ['n3', 'n8'],
      ['n4', 'n9'],
      ['n5', 'n10'],
      ['n6', 'n11'],
      ['n7', 'n8'],
      ['n8', 'n9'],
      ['n9', 'n10'],
      ['n10', 'n11'],
      ['n3', 'n9'],
      ['n1', 'n8'],
      ['n4', 'n10'],
      ['n6', 'n9'],
    ],
    [],
  )

  const nodeMap = useMemo(() => Object.fromEntries(neuralNodes.map((node) => [node.id, node])), [neuralNodes])

  return (
    <div className="page">
      <div className="canvas-wrap" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 5], fov: 58 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 3, 2]} intensity={1.4} />
          <pointLight position={[-4, -2, 1]} intensity={1} color="#35d4ff" />
          <FloatingGeometry />
          <Stars radius={50} depth={50} count={1200} factor={4} saturation={0.9} fade speed={0.8} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
        </Canvas>
      </div>
      <div className="ai-thinking-overlay" aria-hidden="true">
        <svg className="neural-network" viewBox="0 0 100 100" preserveAspectRatio="none">
          {neuralLinks.map(([from, to], index) => {
            const a = nodeMap[from]
            const b = nodeMap[to]
            if (!a || !b) return null
            return (
              <line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className="neural-link"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            )
          })}
          {neuralNodes.map((node, index) => (
            <circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={node.size / 10}
              className="neural-node"
              style={{ animationDelay: `${index * 0.35}s` }}
            />
          ))}
        </svg>
        {['analyze()', 'reason()', 'predict()', 'optimize()', 'learn()', 'infer()', 'chain_of_thought', 'agent_loop'].map(
          (token, index) => (
            <span key={token} style={{ animationDelay: `${index * 1.2}s` }}>
              {token}
            </span>
          ),
        )}
        <div className="neural-orb orb-1"></div>
        <div className="neural-orb orb-2"></div>
        <div className="neural-orb orb-3"></div>
      </div>

      <header className="hero-section">
        <motion.div
          className="hero-content glass-card"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow">AI Engineer | Developer | Builder</p>
          <h1>Mohammed Muneeb ur Rahman</h1>
          <p className="subtitle">
            Building production-grade AI applications with modern full-stack engineering and immersive user experiences.
          </p>
          <div className="hero-actions">
            <a href="mailto:mohammedmuneebhere@gmail.com" className="btn primary">
              <FaEnvelope />
              Contact Me
            </a>
            <a
              href="https://github.com/mohammedmuneebhere-debug"
              target="_blank"
              rel="noreferrer"
              className="btn ghost"
            >
              <FaGithub />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mohammed-muneeb-ur-rahman-a2b02b265/"
              target="_blank"
              rel="noreferrer"
              className="btn ghost"
            >
              <FaLinkedin />
              LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.div
          className="profile-card glass-card"
          initial={{ opacity: 0, scale: 0.88, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
        >
          <img src={profileImage} alt="Mohammed Muneeb ur Rahman portrait" />
          <div className="profile-meta">
            <h3>Open to AI/ML + Full-Stack Roles</h3>
            <p>Hyderabad, India</p>
          </div>
        </motion.div>
      </header>

      <section className="section">
        <h2>Featured Projects</h2>
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <motion.article
              key={project.title}
              className="project-card glass-card"
              whileHover={{ y: -10, rotateX: 5, rotateY: -5 }}
              transition={{ type: 'spring', stiffness: 180, damping: 16 }}
            >
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <small>{project.tech}</small>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section two-col">
        <div className="glass-card">
          <h2>Experience Narrative</h2>
          <p className="experience-intro">
            Roles where I combined AI engineering, product thinking, and leadership to deliver measurable outcomes.
          </p>
          <div className="timeline">
            {experience.map((item) => (
              <motion.article
                key={`${item.role}-${item.org}`}
                className="timeline-item"
                whileHover={{ x: 6, y: -2 }}
                transition={{ type: 'spring', stiffness: 180, damping: 16 }}
              >
                <div className="timeline-head">
                  <h3>{item.role}</h3>
                  <span>{item.period}</span>
                </div>
                <p className="timeline-org">{item.org}</p>
                <p className="timeline-impact">{item.impact}</p>
                <div className="timeline-tags">
                  {item.highlights.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
        <div className="glass-card">
          <h2>Skills Intelligence Dashboard</h2>
          <div className="skills-grid">
            {skillTracks.map((skill) => (
              <motion.article
                key={skill.name}
                className="skill-card"
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 180, damping: 15 }}
              >
                <div className="skill-head">
                  <h3>{skill.name}</h3>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-meter" role="presentation">
                  <motion.div
                    className="skill-meter-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  />
                </div>
                <div className="skill-tags">
                  {skill.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Hackathons & Competitive Achievements</h2>
        <div className="hackathon-grid">
          {hackathons.map((hackathon) => (
            <motion.article
              key={hackathon.name}
              className="hackathon-card glass-card"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 170, damping: 15 }}
            >
              <p className="result-chip">
                <FaTrophy /> {hackathon.result}
              </p>
              <h3>{hackathon.name}</h3>
              <p>{hackathon.detail}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Certificates & Licenses</h2>
        <div className="certificate-grid">
          {certificates.map((certificate) => (
            <motion.article
              key={certificate.title}
              className="certificate-card glass-card"
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 190, damping: 16 }}
            >
              <img src={certificate.image} alt={certificate.title} />
              <div className="certificate-meta">
                <h3>{certificate.title}</h3>
                <p>{certificate.caption}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Hobbies & Extracurricular Activities</h2>
        <div className="hobbies-grid">
          {hobbies.map((hobby) => (
            <motion.article
              key={hobby.title}
              className="hobby-card glass-card"
              whileHover={{ y: -8, rotateX: 4 }}
              transition={{ type: 'spring', stiffness: 170, damping: 14 }}
            >
              <h3>{hobby.title}</h3>
              <p>{hobby.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <footer className="section footer glass-card">
        <h2>Let us build something exceptional.</h2>
        <p>
          Reach me at <a href="mailto:mohammedmuneebhere@gmail.com">mohammedmuneebhere@gmail.com</a> or explore my
          work profiles.
        </p>
        <div className="footer-links">
          <a href="https://github.com/mohammedmuneebhere-debug" target="_blank" rel="noreferrer">
            GitHub <FaExternalLinkAlt />
          </a>
          <a href="https://www.linkedin.com/in/mohammed-muneeb-ur-rahman-a2b02b265/" target="_blank" rel="noreferrer">
            LinkedIn <FaExternalLinkAlt />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
