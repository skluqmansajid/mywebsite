import { useState } from 'react';
import { Award, ExternalLink, Search, Layers, Cloud, Database, Code, Brain } from 'lucide-react';
import { certificates } from '@/data/portfolioData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

interface CertificatesWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

type CategoryType = 'all' | 'cloud' | 'ai' | 'database' | 'programming' | 'data';

export function CertificatesWindow({ onClose, onMinimize }: CertificatesWindowProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all' as CategoryType, label: 'All', count: certificates.length, icon: Layers },
    { id: 'cloud' as CategoryType, label: 'Cloud', count: certificates.filter(c => c.category === 'cloud').length, icon: Cloud },
    { id: 'ai' as CategoryType, label: 'AI/ML', count: certificates.filter(c => c.category === 'ai').length, icon: Brain },
    { id: 'database' as CategoryType, label: 'Database', count: certificates.filter(c => c.category === 'database').length, icon: Database },
    { id: 'programming' as CategoryType, label: 'Programming', count: certificates.filter(c => c.category === 'programming').length, icon: Code },
    { id: 'data' as CategoryType, label: 'Data', count: certificates.filter(c => c.category === 'data').length, icon: Database },
  ];

  const filteredCertificates = certificates.filter(cert => {
    const matchesCategory = activeCategory === 'all' || cert.category === activeCategory;
    const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cloud': return 'bg-orange-500/20 text-orange-400';
      case 'ai': return 'bg-purple-500/20 text-purple-400';
      case 'database': return 'bg-green-500/20 text-green-400';
      case 'programming': return 'bg-blue-500/20 text-blue-400';
      case 'data': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getIssuerIcon = (icon: string) => {
    switch (icon) {
      case 'oracle': return '🔶';
      case 'mongodb': return '🍃';
      case 'google': return '🔍';
      case 'aws': return '☁️';
      case 'code': return '💻';
      case 'database': return '📊';
      default: return '📜';
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
          <span className="text-white/80 text-sm font-medium ml-2">Certificates</span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="px-4 py-3 bg-black/20 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Search certificates..."
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
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${activeCategory === cat.id
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

      {/* Certificates Grid - Scrollable */}
      <div className="flex-1 overflow-hidden min-h-0">
        <ScrollArea className="h-full w-full" type="always">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCertificates.map((cert) => (
                <a
                  key={cert.id}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-2xl shrink-0">
                      {getIssuerIcon(cert.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors line-clamp-2">
                          {cert.name}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-white/40 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-white/60 text-sm mt-1">{cert.issuer}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(cert.category)}`}>
                          {cert.category}
                        </span>
                        <span className="text-white/40 text-sm">{cert.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Award className="w-4 h-4" />
                    <span>Click to verify certificate</span>
                  </div>
                </a>
              ))}
            </div>

            {filteredCertificates.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-white/40">
                <Award className="w-12 h-12 mb-4 opacity-50" />
                <p>No certificates found matching your criteria</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
