import { useState } from 'react';
import { User, GraduationCap, Trophy, Briefcase, FileText, Download } from 'lucide-react';
import { personalInfo, education, experiences, achievements, publications, certificates } from '@/data/portfolioData';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AboutWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

type TabType = 'overview' | 'education' | 'achievements' | 'experience';

export function AboutWindow({ onClose, onMinimize }: AboutWindowProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: User },
    { id: 'education' as TabType, label: 'Education', icon: GraduationCap },
    { id: 'achievements' as TabType, label: 'Achievements', icon: Trophy },
    { id: 'experience' as TabType, label: 'Experience', icon: Briefcase },
  ];

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
          <span className="text-white/80 text-sm font-medium ml-2">About</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Sidebar */}
        <div className="w-48 bg-black/30 border-r border-white/10 p-3 overflow-y-auto shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden min-h-0">
          <ScrollArea className="h-full w-full" type="always">
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="flex items-start gap-6">
                    <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl shrink-0">
                      <img 
                        src={personalInfo.avatar} 
                        alt={personalInfo.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-1">{personalInfo.name}</h2>
                      <p className="text-white/70 text-lg mb-3">{personalInfo.title}</p>
                      <div className="flex items-center gap-2 text-white/50 text-sm">
                        <span>{personalInfo.location}</span>
                      </div>
                      <a 
                        href={personalInfo.resume}
                        download
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download Resume
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Overview</h3>
                    <p className="text-white/70 leading-relaxed">{personalInfo.summary}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Publications</h3>
                    <div className="space-y-3">
                      {publications.map((pub, idx) => (
                        <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-white font-medium">{pub.title}</p>
                              <p className="text-white/50 text-sm">{pub.journal}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Academic Journey</h3>
                  <div className="space-y-4">
                    {education.map((edu, idx) => (
                      <div key={idx} className="p-5 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-semibold text-lg">{edu.degree}</h4>
                          <span className="text-white/50 text-sm">{edu.year}</span>
                        </div>
                        <p className="text-white/70">{edu.institution}</p>
                        <div className="mt-3 inline-block px-3 py-1 bg-blue-500/20 rounded-full">
                          <span className="text-blue-300 text-sm font-medium">{edu.grade}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-white font-medium mb-3">Relevant Coursework</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Data Structures', 'Algorithms', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'Database Systems', 'Operating Systems', 'Computer Networks'].map((course) => (
                        <span key={course} className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-sm">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Achievements & Recognition</h3>
                  <div className="grid gap-4">
                    {achievements.map((achievement, idx) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-start gap-4">
                        <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center shrink-0">
                          <Trophy className="w-5 h-5 text-yellow-400" />
                        </div>
                        <p className="text-white/80">{achievement}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h4 className="text-white font-medium mb-3">Certifications</h4>
                    <div className="space-y-3">
                      {certificates.slice(0, 4).map((cert, idx) => (
                        <div key={cert.id} className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-green-400 text-xs font-bold">{idx + 1}</span>
                          </div>
                          <span className="text-white/80 text-sm">{cert.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Research & Industrial Experience</h3>
                  <div className="space-y-6">
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="p-5 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-semibold text-lg">{exp.title}</h4>
                          <span className="text-white/50 text-sm">{exp.period}</span>
                        </div>
                        <p className="text-blue-400 mb-4">{exp.company}</p>
                        <ul className="space-y-2">
                          {exp.description.map((desc, dIdx) => (
                            <li key={dIdx} className="text-white/60 text-sm flex items-start gap-2">
                              <span className="text-blue-400 mt-1 shrink-0">•</span>
                              {desc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
