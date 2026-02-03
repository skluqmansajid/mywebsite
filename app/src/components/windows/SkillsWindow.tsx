import { useState } from 'react';
import { Search, Cpu, Code, Database, Globe, Wrench, Layers } from 'lucide-react';
import { skills } from '@/data/portfolioData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

interface SkillsWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

type CategoryType = 'all' | 'programming' | 'ai' | 'backend' | 'frontend' | 'database' | 'tools';

export function SkillsWindow({ onClose, onMinimize }: SkillsWindowProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all' as CategoryType, label: 'All', count: skills.length, icon: Layers },
    { id: 'programming' as CategoryType, label: 'Programming', count: skills.filter(s => s.category === 'programming').length, icon: Code },
    { id: 'ai' as CategoryType, label: 'AI/ML', count: skills.filter(s => s.category === 'ai').length, icon: Cpu },
    { id: 'backend' as CategoryType, label: 'Backend', count: skills.filter(s => s.category === 'backend').length, icon: Database },
    { id: 'frontend' as CategoryType, label: 'Frontend', count: skills.filter(s => s.category === 'frontend').length, icon: Globe },
    { id: 'database' as CategoryType, label: 'Database', count: skills.filter(s => s.category === 'database').length, icon: Database },
    { id: 'tools' as CategoryType, label: 'Tools', count: skills.filter(s => s.category === 'tools').length, icon: Wrench },
  ];

  const filteredSkills = skills.filter(skill => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'text-purple-400';
      case 'Advanced': return 'text-blue-400';
      case 'Intermediate': return 'text-green-400';
      case 'Beginner': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 85) return 'bg-purple-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-green-500';
    return 'bg-yellow-500';
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
          <span className="text-white/80 text-sm font-medium ml-2">Skills & Expertise</span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="px-4 py-3 bg-black/20 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Search skills..."
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

      {/* Skills List - Scrollable */}
      <div className="flex-1 overflow-hidden min-h-0">
        <ScrollArea className="h-full w-full" type="always">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSkills.map((skill, idx) => (
                <div 
                  key={skill.name}
                  className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-semibold">{skill.name}</h4>
                      <span className={`text-sm ${getLevelColor(skill.level)}`}>{skill.level}</span>
                    </div>
                    <span className="text-white/40 text-sm">{skill.percentage}%</span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getProgressColor(skill.percentage)} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${skill.percentage}%`,
                          animationDelay: `${idx * 50}ms`
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white/40 text-sm">
                    <span>{skill.years} years</span>
                    <span>•</span>
                    <span>{skill.projects} projects</span>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredSkills.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-white/40">
                <Cpu className="w-12 h-12 mb-4 opacity-50" />
                <p>No skills found matching your criteria</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
