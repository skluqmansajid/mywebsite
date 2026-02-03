import { useState, useRef, useEffect } from 'react';
import { personalInfo, projects, skills, education, certificates } from '@/data/portfolioData';

interface TerminalWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

interface Command {
  input: string;
  output: React.ReactNode;
}

const commandShortcuts: Record<string, string> = {
  'a': 'about',
  's': 'skills',
  'p': 'projects',
  'e': 'education',
  'c': 'certificates',
  'co': 'contact',
  'ex': 'experience',
  'cl': 'clear',
  'h': 'help',
};

export function TerminalWindow({ onClose, onMinimize }: TerminalWindowProps) {
  const [commands, setCommands] = useState<Command[]>([
    { 
      input: '', 
      output: (
        <div className="text-green-400">
          <p>Welcome to Luqman's Professional Terminal!</p>
          <p className="text-white/60">Ubuntu 22.04 LTS - Type 'help' or 'h' for available commands</p>
          <p className="text-blue-400">Software Development Engineer — Applied AI & Machine Learning</p>
          <p className="text-yellow-400 mt-2">Quick Shortcuts: a=about, s=skills, p=projects, c=certificates, h=help</p>
        </div>
      )
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [commands]);

  const getCommandOutput = (cmd: string): React.ReactNode => {
    switch (cmd) {
      case 'help':
        return (
          <div className="space-y-2">
            <p className="text-yellow-400 font-semibold">Available Commands & Shortcuts:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <span className="text-green-400">about (a)</span>
              <span className="text-white/60">- Personal information</span>
              <span className="text-green-400">skills (s)</span>
              <span className="text-white/60">- Technical skills</span>
              <span className="text-green-400">projects (p)</span>
              <span className="text-white/60">- Project portfolio</span>
              <span className="text-green-400">education (e)</span>
              <span className="text-white/60">- Education history</span>
              <span className="text-green-400">certificates (c)</span>
              <span className="text-white/60">- Certifications</span>
              <span className="text-green-400">contact (co)</span>
              <span className="text-white/60">- Contact info</span>
              <span className="text-green-400">experience (ex)</span>
              <span className="text-white/60">- Work experience</span>
              <span className="text-green-400">clear (cl)</span>
              <span className="text-white/60">- Clear terminal</span>
              <span className="text-green-400">help (h)</span>
              <span className="text-white/60">- Show commands</span>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-2">
            <p className="text-blue-400 font-semibold">{personalInfo.name}</p>
            <p className="text-white/80">{personalInfo.title}</p>
            <p className="text-white/60 text-sm">{personalInfo.summary}</p>
            <p className="text-white/60 text-sm mt-2">Location: {personalInfo.location}</p>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-2">
            <p className="text-yellow-400 font-semibold">Technical Skills:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {skills.slice(0, 12).map((skill) => (
                <div key={skill.name} className="flex justify-between">
                  <span className="text-white/80">{skill.name}</span>
                  <span className={`${skill.level === 'Expert' ? 'text-purple-400' : skill.level === 'Advanced' ? 'text-blue-400' : 'text-green-400'}`}>
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-sm mt-2">... and {skills.length - 12} more skills</p>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-2">
            <p className="text-yellow-400 font-semibold">Projects:</p>
            {projects.map((project) => (
              <div key={project.id} className="border-l-2 border-blue-500 pl-3">
                <p className="text-white font-medium">{project.title}</p>
                <p className="text-white/60 text-sm">{project.description}</p>
                <p className="text-green-400 text-xs">{project.technologies.join(', ')}</p>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-xs hover:underline">
                  {project.githubUrl}
                </a>
              </div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="space-y-2">
            <p className="text-yellow-400 font-semibold">Education:</p>
            {education.map((edu, idx) => (
              <div key={idx} className="border-l-2 border-purple-500 pl-3">
                <p className="text-white font-medium">{edu.degree}</p>
                <p className="text-white/60 text-sm">{edu.institution}</p>
                <p className="text-green-400 text-xs">{edu.year} • {edu.grade}</p>
              </div>
            ))}
          </div>
        );

      case 'certificates':
        return (
          <div className="space-y-2">
            <p className="text-yellow-400 font-semibold">Certificates:</p>
            {certificates.map((cert) => (
              <div key={cert.id} className="border-l-2 border-orange-500 pl-3">
                <p className="text-white font-medium">{cert.name}</p>
                <p className="text-white/60 text-sm">{cert.issuer}</p>
                <p className="text-green-400 text-xs">{cert.date} • {cert.category}</p>
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-xs hover:underline">
                  Verify: {cert.url}
                </a>
              </div>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-2">
            <p className="text-yellow-400 font-semibold">Contact Information:</p>
            <div className="space-y-1 text-sm">
              <p className="text-white/80">Email: <span className="text-blue-400">{personalInfo.email}</span></p>
              <p className="text-white/80">Phone: <span className="text-blue-400">{personalInfo.phone}</span></p>
              <p className="text-white/80">GitHub: <span className="text-blue-400">{personalInfo.github}</span></p>
              <p className="text-white/80">LinkedIn: <span className="text-blue-400">{personalInfo.linkedin}</span></p>
              <p className="text-white/80">Location: <span className="text-blue-400">{personalInfo.location}</span></p>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-2">
            <p className="text-yellow-400 font-semibold">Work Experience:</p>
            <div className="space-y-3">
              <div className="border-l-2 border-green-500 pl-3">
                <p className="text-white font-medium">Research Intern - KAUST</p>
                <p className="text-white/60 text-sm">Feb 2025 - Jun 2025</p>
                <p className="text-white/40 text-xs">Deep learning experiments for computer vision</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-3">
                <p className="text-white font-medium">ML Engineer Intern - Infosys</p>
                <p className="text-white/60 text-sm">Nov 2025 - Dec 2025</p>
                <p className="text-white/40 text-xs">FWI prediction using regression models</p>
              </div>
              <div className="border-l-2 border-purple-500 pl-3">
                <p className="text-white font-medium">AI Engineer Intern - Innomatics</p>
                <p className="text-white/60 text-sm">Feb 2024 - Apr 2024</p>
                <p className="text-white/40 text-xs">RAG pipelines and LLM workflows</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <span className="text-red-400">Command not found: '{cmd}'. Type 'help' or 'h' for available commands.</span>
        );
    }
  };

  const handleCommand = (input: string) => {
    const rawCmd = input.trim().toLowerCase();
    
    if (rawCmd === '') {
      setCommands(prev => [...prev, { input, output: '' }]);
      setCurrentInput('');
      return;
    }

    // Handle clear command
    if (rawCmd === 'clear' || rawCmd === 'cl') {
      setCommands([
        { 
          input: '', 
          output: (
            <div className="text-green-400">
              <p>Terminal cleared. Type 'help' or 'h' for commands.</p>
              <p className="text-yellow-400">Quick Shortcuts: a=about, s=skills, p=projects, c=certificates, h=help</p>
            </div>
          )
        }
      ]);
      setCurrentInput('');
      return;
    }

    // Expand shortcut to full command
    const cmd = commandShortcuts[rawCmd] || rawCmd;
    const output = getCommandOutput(cmd);

    setCommands(prev => [...prev, { input, output }]);
    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
    }
  };

  return (
    <div className="w-full h-full flex flex-col glass rounded-xl overflow-hidden window-animate">
      {/* Window Header - Draggable */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/10 window-header cursor-default shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button 
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            />
            <button 
              onClick={onMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            />
          </div>
          <span className="text-white/80 text-sm font-medium ml-2">Terminal</span>
        </div>
      </div>

      {/* Terminal Content - Scrollable */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 font-mono text-sm overflow-auto bg-black/60"
        onClick={() => inputRef.current?.focus()}
      >
        {commands.map((cmd, idx) => (
          <div key={idx} className="mb-4">
            {cmd.input && (
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-400">luqman@ubuntu:~$</span>
                <span>{cmd.input}</span>
              </div>
            )}
            {cmd.output && (
              <div className="mt-1 text-white/80">
                {cmd.output}
              </div>
            )}
          </div>
        ))}
        
        <div className="flex items-center gap-2">
          <span className="text-green-400">luqman@ubuntu:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none"
            autoFocus
            spellCheck={false}
          />
          <span className="w-2 h-5 bg-white/80 terminal-cursor" />
        </div>
      </div>
    </div>
  );
}
