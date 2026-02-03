import { useState, useMemo } from 'react';
import { Search, ExternalLink, Folder, Code2, Brain, Cloud, Github } from 'lucide-react';
import { projects } from '@/data/portfolioData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

interface ProjectsWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

type CategoryType = 'all' | 'web' | 'ai' | 'saas';

export function ProjectsWindow({ onClose, onMinimize }: ProjectsWindowProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all' as CategoryType, label: 'All', count: projects.length, icon: Folder },
    { id: 'web' as CategoryType, label: 'Web', count: projects.filter(p => p.category === 'web').length, icon: Code2 },
    { id: 'ai' as CategoryType, label: 'AI/ML', count: projects.filter(p => p.category === 'ai').length, icon: Brain },
    { id: 'saas' as CategoryType, label: 'SaaS', count: projects.filter(p => p.category === 'saas').length, icon: Cloud },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'ongoing': return 'bg-yellow-500/20 text-yellow-400';
      case 'in development': return 'bg-orange-500/20 text-orange-400';
      case 'published': return 'bg-blue-500/20 text-blue-400';
      case 'live': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
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
          <span className="text-white/80 text-sm font-medium ml-2">Projects</span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="px-4 py-3 bg-black/20 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                  activeCategory === cat.id
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
                <span className="text-xs opacity-60">({cat.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid - Scrollable */}
      <div className="flex-1 overflow-hidden min-h-0">
        <ScrollArea className="h-full w-full" type="always">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id}
                  className="p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-white/10 rounded-md text-white/70 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <span>+{project.technologies.length}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 hover:text-white text-sm transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Code</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-white/40">
                <Folder className="w-12 h-12 mb-4 opacity-50" />
                <p>No projects found matching your criteria</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
