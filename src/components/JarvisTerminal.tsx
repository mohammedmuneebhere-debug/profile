import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { systemBrand } from '../data/portfolio'
import LiquidGlass from './LiquidGlass'
import { holoTerminalVariants } from '../lib/hologramMotion'

type TerminalLine = {
  id: number
  type: 'input' | 'output' | 'system'
  text: string
}

type JarvisTerminalProps = {
  onNavigate: (section: string) => void
}

const commands: Record<string, { response: string; action?: string }> = {
  help: {
    response:
      'Commands: home, about, projects, experience, skills, education, certificates, contact, status, clear. Aliases like "show projects" also work.',
  },
  home: { response: 'Routing to profile overview...', action: 'home' },
  about: { response: 'Loading professional summary...', action: 'about' },
  projects: { response: 'Loading project matrix...', action: 'projects' },
  experience: { response: 'Accessing experience archives...', action: 'experience' },
  skills: { response: 'Scanning skill subsystems...', action: 'skills' },
  education: { response: 'Opening education records...', action: 'education' },
  certificates: { response: 'Decrypting certification vault...', action: 'certificates' },
  contact: { response: 'Opening contact channel...', action: 'contact' },
  status: {
    response: `${systemBrand.name} online. Neural core active. Portfolio interface ready. Operator: Mohammed Muneeb Rahman.`,
  },
  clear: { response: 'Terminal buffer cleared.' },
}

const commandAliases: Record<string, string> = {
  'show projects': 'projects',
  'find projects': 'projects',
  'go to projects': 'projects',
  'show experience': 'experience',
  'show skills': 'skills',
  'show certificates': 'certificates',
  'show contact': 'contact',
  'show about': 'about',
  'show education': 'education',
}

export default function JarvisTerminal({ onNavigate }: JarvisTerminalProps) {
  const [expanded, setExpanded] = useState(false)
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 0, type: 'system', text: `${systemBrand.name} terminal ready. Type "help" for commands.` },
  ])
  const nextId = useRef(1)
  const inputRef = useRef<HTMLInputElement>(null)
  const logRef = useRef<HTMLDivElement>(null)

  const pushLine = useCallback((type: TerminalLine['type'], text: string) => {
    const id = nextId.current
    nextId.current += 1
    setLines((prev) => [...prev.slice(-14), { id, type, text }])
  }, [])

  const runCommand = useCallback(
    (raw: string) => {
      const rawCmd = raw.trim().toLowerCase()
      if (!rawCmd) return

      const cmd = commandAliases[rawCmd] ?? rawCmd

      pushLine('input', `> ${raw}`)
      const handler = commands[cmd]

      if (!handler) {
        pushLine('output', `Unknown command: "${cmd}". Type "help" for available commands.`)
        return
      }

      pushLine('output', handler.response)

      if (handler.action) {
        window.setTimeout(() => onNavigate(handler.action!), 280)
      }

      if (cmd === 'clear') {
        window.setTimeout(() => setLines([]), 120)
      }
    },
    [onNavigate, pushLine],
  )

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === '`' || (event.ctrlKey && event.key.toLowerCase() === 'j')) {
        event.preventDefault()
        setExpanded((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    if (expanded) inputRef.current?.focus()
  }, [expanded])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [lines, expanded])

  return (
    <div className={`jarvis-terminal ${expanded ? 'is-expanded' : ''}`}>
      <button
        type="button"
        className="terminal-toggle"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        <span className="terminal-pulse" />
        {systemBrand.name.toUpperCase()} COMMAND CONSOLE
        <kbd>Ctrl+J</kbd>
      </button>

      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div className="terminal-panel-wrap" variants={holoTerminalVariants} initial="hidden" animate="visible" exit="exit">
            <LiquidGlass className="terminal-panel" intensity="medium">
              <span className="terminal-holo-beam" aria-hidden="true" />
              <div className="terminal-log" ref={logRef}>
              {lines.map((line) => (
                <p key={line.id} className={`terminal-line terminal-line-${line.type}`}>
                  {line.text}
                </p>
              ))}
            </div>
            <form
              className="terminal-form"
              onSubmit={(event) => {
                event.preventDefault()
                runCommand(input)
                setInput('')
              }}
            >
              <span className="terminal-prompt">&gt;</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Enter command..."
                spellCheck={false}
                autoComplete="off"
              />
            </form>
            </LiquidGlass>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
