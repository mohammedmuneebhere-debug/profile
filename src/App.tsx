import { motion } from 'framer-motion'
import { FaDownload, FaEnvelope, FaExternalLinkAlt, FaGithub, FaLinkedin, FaTimes, FaTrophy } from 'react-icons/fa'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
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

const thinkingTokens = [
  'analysing_context()',
  'vector_search',
  'latent_intent',
  'agent_loop',
  'model_router',
  'reasoning_trace',
  'optimise_cost',
  'safe_outputs',
  'embedding_space',
  'memory_state',
  'inference_stack',
  'signal_found',
]

function NeuralThinkingField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { antialias: true, alpha: true })
    if (!gl) return

    let animationFrame = 0
    let width = window.innerWidth
    let height = window.innerHeight
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, energy: 0, targetEnergy: 0 }
    const dotCount = window.innerWidth < 700 ? 2400 : 5200

    const randomPointOnSphere = () => {
      const u = Math.random() * 2 - 1
      const angle = Math.random() * Math.PI * 2
      const radius = Math.sqrt(1 - u * u)
      return [radius * Math.cos(angle), u, radius * Math.sin(angle)]
    }

    const dots = new Float32Array(dotCount * 3)
    for (let index = 0; index < dotCount; index += 1) {
      const point = randomPointOnSphere()
      dots[index * 3] = point[0]
      dots[index * 3 + 1] = point[1]
      dots[index * 3 + 2] = point[2]
    }

    const vertexShaderSource = `
      precision mediump float;
      attribute vec3 aPos;

      uniform float uTime;
      uniform float uAspect;
      uniform vec2 uPointer;
      uniform float uEnergy;
      uniform float uScale;

      varying float vPulse;
      varying float vDepth;
      varying float vHover;
      varying float vTone;

      vec3 rotateY(vec3 p, float a) {
        float c = cos(a);
        float s = sin(a);
        return vec3(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
      }

      vec3 rotateX(vec3 p, float a) {
        float c = cos(a);
        float s = sin(a);
        return vec3(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
      }

      float wavePulse(vec3 n, vec3 c, float sweep, float width) {
        float d = acos(clamp(dot(n, c), -1.0, 1.0));
        return max(0.0, 1.0 - abs(d - sweep) / width);
      }

      void main() {
        float zoom = uScale * (1.0 + sin(uTime * 1.45) * 0.045 + uEnergy * 0.13);
        float ry = uTime * 0.92 + uPointer.x * 0.58;
        float rx = sin(uTime * 0.34) * 0.34 - uPointer.y * 0.38;
        vec3 p = rotateX(rotateY(aPos, ry), rx) * zoom;

        vec3 centerA = normalize(vec3(cos(uTime * 0.62), sin(uTime * 1.05) * 0.45, sin(uTime * 0.62)));
        vec3 centerB = normalize(vec3(cos(uTime * 0.85 + 1.9), sin(uTime * 1.31 + 0.8) * 0.35, sin(uTime * 0.85 + 1.9)));
        float pulseA = wavePulse(normalize(p), centerA, mod(uTime * 1.35, 3.14159265), 0.2);
        float pulseB = wavePulse(normalize(p), centerB, mod(uTime * 1.92 + 0.7, 3.14159265), 0.24);
        vPulse = max(pulseA * 0.95, pulseB * 0.8);

        vec3 view = p + vec3(uPointer.x * 0.15, -uPointer.y * 0.1, -3.55);
        float invZ = 1.0 / max(0.6, -view.z);
        float focal = 1.72;
        vec2 ndc = vec2((view.x * focal * invZ) / uAspect, view.y * focal * invZ);
        gl_Position = vec4(ndc, (3.8 + view.z) * 0.28, 1.0);

        float cursorDist = distance(ndc, uPointer * vec2(0.78, -0.78));
        vHover = (1.0 - smoothstep(0.02, 0.52, cursorDist)) * uEnergy;
        vDepth = clamp(1.0 - (-view.z - 2.2) / 2.2, 0.0, 1.0);
        vTone = 0.5 + 0.5 * sin(uTime * 0.7 + p.y * 3.4 + p.x * 1.8);

        gl_PointSize = (1.25 + vDepth * 3.9 + vPulse * 5.4 + vHover * 9.0) * (0.72 + invZ * 1.15);
      }
    `

    const fragmentShaderSource = `
      precision mediump float;
      varying float vPulse;
      varying float vDepth;
      varying float vHover;
      varying float vTone;

      vec3 hue(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.54, 0.68, 0.88);
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        vec2 uv = gl_PointCoord * 2.0 - 1.0;
        float r = dot(uv, uv);
        if (r > 1.0) discard;

        float core = smoothstep(1.0, 0.02, r);
        float rim = smoothstep(0.86, 0.26, sqrt(r));
        float glow = core * (0.28 + vDepth * 0.5 + vPulse * 0.92 + vHover);
        float tone = 0.58 + vPulse * 0.16 + vHover * 0.18 + vTone * 0.14;

        vec3 base = hue(tone);
        vec3 cyan = vec3(0.45, 0.88, 1.0);
        vec3 gold = vec3(1.0, 0.78, 0.24);
        vec3 col = mix(base, cyan, vPulse * 0.52 + vDepth * 0.26);
        col = mix(col, gold, vHover * 0.26);

        float alpha = glow * rim;
        gl_FragColor = vec4(col * (0.62 + glow * 1.28), alpha);
      }
    `

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) throw new Error('Unable to create shader')
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader)
        gl.deleteShader(shader)
        throw new Error(info || 'Shader compilation failed')
      }
      return shader
    }

    const createProgram = () => {
      const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource)
      const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource)
      const program = gl.createProgram()
      if (!program) throw new Error('Unable to create WebGL program')
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(program)
        throw new Error(info || 'Program linking failed')
      }
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      return program
    }

    const program = createProgram()
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, dots, gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)

    const uniforms = {
      time: gl.getUniformLocation(program, 'uTime'),
      aspect: gl.getUniformLocation(program, 'uAspect'),
      pointer: gl.getUniformLocation(program, 'uPointer'),
      energy: gl.getUniformLocation(program, 'uEnergy'),
      scale: gl.getUniformLocation(program, 'uScale'),
    }

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
    gl.disable(gl.DEPTH_TEST)

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * pixelRatio)
      canvas.height = Math.floor(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const syncPointer = (clientX: number, clientY: number) => {
      pointer.targetX = (clientX / Math.max(width, 1) - 0.5) * 2
      pointer.targetY = (clientY / Math.max(height, 1) - 0.5) * 2
      pointer.targetEnergy = 1
    }

    const handlePointerMove = (event: PointerEvent) => syncPointer(event.clientX, event.clientY)
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (touch) syncPointer(touch.clientX, touch.clientY)
    }

    const render = (now: number) => {
      pointer.x += (pointer.targetX - pointer.x) * 0.08
      pointer.y += (pointer.targetY - pointer.y) * 0.08
      pointer.energy += (pointer.targetEnergy - pointer.energy) * 0.08
      pointer.targetEnergy *= 0.96

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.uniform1f(uniforms.time, now * 0.00055)
      gl.uniform1f(uniforms.aspect, width / Math.max(height, 1))
      gl.uniform2f(uniforms.pointer, pointer.x, pointer.y)
      gl.uniform1f(uniforms.energy, pointer.energy)
      gl.uniform1f(uniforms.scale, width < 700 ? 1.28 : 1.42)
      gl.drawArrays(gl.POINTS, 0, dotCount)

      animationFrame = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    animationFrame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('touchmove', handleTouchMove)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="neural-field" aria-hidden="true" />
      <div className="orb-hud" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="code-streams" aria-hidden="true">
        {thinkingTokens.map((token, index) => (
          <span
            key={token}
            style={
              {
                '--lane': index,
                '--top': `${8 + (index % 12) * 7}%`,
                '--duration': `${15 + (index % 5) * 2.2}s`,
                '--delay': `${index * -1.35}s`,
              } as CSSProperties
            }
          >
            {token}
          </span>
        ))}
      </div>
    </>
  )
}

const featuredProjects = [
  {
    title: 'SYAL - Smart Youth Analytics & Learning Platform',
    desc: 'GenAI learning platform that tailors analytics and guidance to each user context.',
    detail:
      'Focused on safe key handling, session continuity, and a structure that can grow with more users without rewriting core flows.',
    highlights: ['Responsible-use guardrails', 'Stateful reply flows', 'Clear orchestration and UI layers'],
    outcome:
      'Designed as a practical learning assistant that can preserve context, adapt responses, and support future expansion into analytics dashboards and role-based learning flows.',
    tech: 'Gemini LLMs, Prompt Engineering, Python, JavaScript, Cloud APIs',
  },
  {
    title: 'CryptoVista - AI-Powered Crypto Analytics',
    desc: 'Cryptocurrency analytics using ML to turn market data into forecasts, signals, and dashboard insights.',
    detail:
      'Separated ingestion, model refresh, and UI contracts so predictions can stay tied to fresh exchange data.',
    highlights: ['Live and historical crypto series', 'Normalized exchange pipelines', 'Contract-first analytics API'],
    outcome:
      'Built around maintainable ML operations: data feeds, retraining logic, forecast outputs, and front-end consumption stay cleanly separated.',
    tech: 'React + Vite, Python, Scikit-learn, TensorFlow, REST APIs',
  },
  {
    title: 'CredGenie AI - Credit Intelligence Platform',
    desc: 'Corporate credit workflow from documents and external signals to scored decisions and written memos.',
    detail:
      'Bridges scanned filings, structured ledgers, and third-party context into one grounded credit narrative.',
    highlights: ['Multi-source ingestion', 'Promoter relationship views', 'Fact-grounded narrative memos'],
    outcome:
      'Frames credit decisions with explainability: extracted facts, relationship context, model signals, and generated memos work as one decision-support flow.',
    tech: 'FastAPI, OCR, LangChain, LLMs, XGBoost, Neo4j',
  },
  {
    title: 'GreenMind AI',
    desc: 'Inference stack that trims cost by shrinking inputs and choosing the right model tier per request.',
    detail:
      'Trained compression policies and layered a router that selects model capacity based on task difficulty.',
    highlights: ['Cost-quality evaluation', 'Tiered LLM routing', 'Interpretability hooks'],
    outcome:
      'Explores lower-cost inference by reducing prompt weight and routing tasks to suitable model tiers while preserving answer quality.',
    tech: 'Python, XAI, Deep Learning, Reinforcement Learning',
  },
  {
    title: 'Shardeum AI Risk Manager',
    desc: 'Web3 prototype combining on-chain data, oracle-style bridges, and AI to reason about network risk.',
    detail:
      'Framed verified external signals and chain state into risk analysis for a second-place hackathon solution.',
    highlights: ['Web3 architecture', 'On-chain/off-chain boundaries', 'Risk narrative for judges'],
    outcome:
      'Delivered a hackathon-ready prototype that connected decentralized data concepts with AI reasoning and a clear judging narrative.',
    tech: 'Web3, Blockchain, Oracles, AI Risk Analysis',
  },
]

const experience = [
  {
    role: 'AI Intern',
    org: 'Alfido Tech',
    period: '4 Months',
    impact:
      'Built and evaluated machine learning and deep learning pipelines, then integrated Python AI workflows into application-ready prototypes. Worked across data preparation, model experimentation, performance comparison, and practical deployment thinking so the outputs were not only accurate, but usable inside real product flows.',
  },
  {
    role: 'Web Development Lead',
    org: 'Google Developer Groups on Campus (GDGC MCET)',
    period: 'Leadership Role',
    impact:
      'Led the web technology vertical for Google Developer Groups on Campus at MCET, focusing on modern web development practices, community learning, and hands-on project building. Organized and supported workshops, trained student contributors, guided teams on frontend fundamentals and modern tooling, and helped coordinate community initiatives, technical sessions, and web platforms for events and student engagement.',
  },
  {
    role: 'Student Project Associate - AI/ML & Data Analytics',
    org: 'L&T Metro Rail Hyderabad',
    period: '5-Month Project',
    impact:
      'Executed AI/ML-driven ridership survey and prediction workflows for Hyderabad red-line corridors using field data and analytics methods. Contributed to collection planning, data interpretation, model-oriented analysis, and stakeholder-ready reporting for understanding metro usage patterns.',
  },
  {
    role: 'Freelance AI Developer',
    org: 'Independent Projects',
    period: 'Ongoing',
    impact:
      'Developing automated MT5 bridge platforms with AI chatbot-based trade execution and secure broker/server connectivity. The work combines conversational interfaces, automation logic, external system integration, and reliability-focused architecture for tools that need to respond clearly and safely.',
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
    result: '4th Place, National Level',
    detail: 'Designed an IoT-integrated AI system for managing more than 1M railway assets.',
  },
  {
    name: "Hack'Forge - ISL College of Engineering & Technology",
    result: '2nd Place',
    detail: 'Created an LLM optimizer chatbot that routes prompts to suitable LLM or SLM models.',
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
    caption: 'Advanced skill badge for training and fine-tuning small language models.',
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
    title: 'Professional Upskilling Certificate',
    image: additionalCertificate,
    caption: 'Professional upskilling certificate demonstrating continuous technical learning.',
  },
  {
    title: 'MCET Got Talent - 1st Position',
    image: mcetGotTalentCertificate,
    caption: 'Certificate of Appreciation for securing first position in MCET Got Talent.',
  },
  {
    title: 'L&T Metro AI/ML Project Appreciation',
    image: ltMetroProjectCertificate,
    caption: 'Appreciation certificate for completing an AI/ML-based metro ridership prediction project.',
  },
  {
    title: 'Prodigy InfoTech Internship Completion',
    image: prodigyInternshipCertificate,
    caption: 'Completion certificate for a 1-month Generative AI internship at Prodigy InfoTech.',
  },
  {
    title: 'IIT Roorkee E-Summit National Finalist',
    image: iitRoorkeeFinalistCertificate,
    caption: 'Certificate of Achievement for emerging as a national finalist in Mind The Product.',
  },
]

const currentlyExploring = [
  {
    title: 'Agentic AI Systems',
    text: 'Designing multi-step AI workflows with tool use, memory, planning, evaluation loops, and safer task execution.',
  },
  {
    title: 'Expert Systems',
    text: 'Combining rules, knowledge bases, decision trees, and LLM reasoning for explainable domain-specific assistants.',
  },
  {
    title: 'DevOps & Deployment',
    text: 'Learning production workflows across CI/CD, environment management, monitoring, and reliable release practices.',
  },
  {
    title: 'Docker & Kubernetes',
    text: 'Containerizing applications, composing services, and understanding orchestration patterns for scalable AI products.',
  },
]

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-header">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <span>{text}</span> : null}
    </div>
  )
}

function App() {
  const gmailComposeUrl =
    'https://mail.google.com/mail/?view=cm&fs=1&to=mohammedmuneebhere%40gmail.com&su=Portfolio%20Inquiry'
  const [selectedProject, setSelectedProject] = useState<(typeof featuredProjects)[number] | null>(null)
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificates)[number] | null>(null)

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
      'Sports & fitness',
      'Literature & poetry',
      'MUN & public speaking',
      'NSS & community work',
      'Event leadership',
    ],
    [],
  )

  return (
    <main className="page-shell">
      <NeuralThinkingField />

      <nav className="topbar">
        <a href="#home" className="brand">Mohammed Muneeb</a>
        <div>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#certificates">Certificates</a>
        </div>
      </nav>

      <header id="home" className="hero">
        <motion.section
          className="hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">AI Engineer | Developer | Builder</p>
          <h1>Mohammed Muneeb ur Rahman</h1>
          <p className="hero-lead">
            I build production-minded AI applications, ML workflows, and modern full-stack products with a strong
            focus on practical user experience.
          </p>
          <div className="hero-actions">
            <a href={gmailComposeUrl} target="_blank" rel="noreferrer" className="button button-primary">
              <FaEnvelope /> Contact
            </a>
            <a href="/Muneeb-CV.pdf" download className="button">
              <FaDownload /> Resume
            </a>
            <a href="https://github.com/mohammedmuneebhere-debug" target="_blank" rel="noreferrer" className="button">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/mohammed-muneeb-ur-rahman-a2b02b265/" target="_blank" rel="noreferrer" className="button">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
          <div className="metric-row" aria-label="Portfolio highlights">
            <span><strong>AI/ML</strong> pipelines and GenAI apps</span>
            <span><strong>5+</strong> featured builds</span>
            <span><strong>Hyderabad</strong> India</span>
          </div>
        </motion.section>

        <motion.aside
          className="profile-panel"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          <img src={profileImage} alt="Mohammed Muneeb ur Rahman portrait" />
          <div>
            <p>Open to AI/ML + Full-Stack Roles</p>
            <h2>AI intern, web lead, hackathon builder, and research-minded developer.</h2>
          </div>
        </motion.aside>
      </header>

      <section id="projects" className="content-section">
        <SectionHeader
          eyebrow="Selected Work"
          title="Projects With Product Shape"
          text="AI systems, analytics tools, Web3 risk prototypes, and applied ML platforms."
        />
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <motion.article key={project.title} className="card project-card" whileHover={{ y: -5 }}>
              <h3>{project.title}</h3>
              <p className="project-lead">{project.desc}</p>
              <p>{project.detail}</p>
              <ul>
                {project.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <small>{project.tech}</small>
              <button className="card-action" type="button" onClick={() => setSelectedProject(project)}>
                View details
              </button>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <SectionHeader
          eyebrow="Currently Exploring"
          title="What I Am Building Toward"
          text="A focused learning track around production-grade AI systems, infrastructure, and intelligent automation."
        />
        <div className="explore-grid">
          {currentlyExploring.map((item) => (
            <article key={item.title} className="card explore-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="content-section split-layout">
        <div>
          <SectionHeader eyebrow="Experience" title="Where The Work Happened" />
          <div className="timeline">
            {experience.map((item) => (
              <article key={`${item.role}-${item.org}`} className="timeline-item">
                <div>
                  <h3>{item.role}</h3>
                  <span>{item.period}</span>
                </div>
                <p className="timeline-org">{item.org}</p>
                <p>{item.impact}</p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader eyebrow="Skills" title="Core Strengths" />
          <div className="skills-grid">
            {skillTracks.map((skill) => (
              <article key={skill.name} className="skill-card">
                <div className="skill-head">
                  <h3>{skill.name}</h3>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-meter">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <div className="tag-row">
                  {skill.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <SectionHeader eyebrow="Recognition" title="Hackathons & Competitive Achievements" />
        <div className="achievement-grid">
          {hackathons.map((hackathon) => (
            <article key={hackathon.name} className="card achievement-card">
              <p className="result-chip"><FaTrophy /> {hackathon.result}</p>
              <h3>{hackathon.name}</h3>
              <p>{hackathon.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="certificates" className="content-section">
        <SectionHeader eyebrow="Proof Of Work" title="Certificates & Licenses" />
        <div className="certificate-grid">
          {certificates.map((certificate) => (
            <button
              key={certificate.title}
              className="card certificate-card"
              type="button"
              onClick={() => setSelectedCertificate(certificate)}
            >
              <img src={certificate.image} alt={certificate.title} />
              <div>
                <h3>{certificate.title}</h3>
                <p>{certificate.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="content-section closing-section">
        <div>
          <SectionHeader eyebrow="Beyond Code" title="The Person Around The Work" />
          <div className="hobby-row">
            {hobbies.map((hobby) => <span key={hobby}>{hobby}</span>)}
          </div>
        </div>
        <div className="contact-card">
          <h2>Let us build something exceptional.</h2>
          <p>
            Reach me at <a href={gmailComposeUrl} target="_blank" rel="noreferrer">mohammedmuneebhere@gmail.com</a>
            {' '}or explore my work profiles.
          </p>
          <div className="footer-links">
            <a href="https://github.com/mohammedmuneebhere-debug" target="_blank" rel="noreferrer">GitHub <FaExternalLinkAlt /></a>
            <a href="https://www.linkedin.com/in/mohammed-muneeb-ur-rahman-a2b02b265/" target="_blank" rel="noreferrer">LinkedIn <FaExternalLinkAlt /></a>
            <a href="/Muneeb-CV.pdf" download>Resume <FaDownload /></a>
          </div>
        </div>
      </section>

      {selectedProject ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}>
          <section className="detail-modal" role="dialog" aria-modal="true" aria-label={selectedProject.title} onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details">
              <FaTimes />
            </button>
            <p className="eyebrow">Project Detail</p>
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
              {selectedProject.highlights.map((item) => <span key={item}>{item}</span>)}
            </div>
            <small>{selectedProject.tech}</small>
          </section>
        </div>
      ) : null}

      {selectedCertificate ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelectedCertificate(null)}>
          <section className="certificate-modal" role="dialog" aria-modal="true" aria-label={selectedCertificate.title} onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setSelectedCertificate(null)} aria-label="Close certificate preview">
              <FaTimes />
            </button>
            <img src={selectedCertificate.image} alt={selectedCertificate.title} />
            <div>
              <p className="eyebrow">Certificate Preview</p>
              <h2>{selectedCertificate.title}</h2>
              <p>{selectedCertificate.caption}</p>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  )
}

export default App
