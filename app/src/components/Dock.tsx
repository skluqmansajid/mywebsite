import { 
  FolderOpen, 
  User, 
  Cpu, 
  Mail, 
  Terminal, 
  Settings,
  Award,
  type LucideIcon
} from 'lucide-react';

interface DockItem {
  id: string;
  icon: LucideIcon;
  label: string;
  color: string;
}

interface DockProps {
  onItemClick: (id: string) => void;
  openWindows: string[];
}

const dockItems: DockItem[] = [
  { id: 'about', icon: User, label: 'Who am i', color: 'bg-blue-500' },
  { id: 'projects', icon: FolderOpen, label: 'Portfolio Projects', color: 'bg-yellow-500' },
  { id: 'skills', icon: Cpu, label: 'My Skills', color: 'bg-purple-500' },
  { id: 'certificates', icon: Award, label: 'Certificates', color: 'bg-orange-500' },
  { id: 'contact', icon: Mail, label: 'Contact Me', color: 'bg-green-500' },
  { id: 'terminal', icon: Terminal, label: 'Terminal', color: 'bg-gray-700' },
  { id: 'settings', icon: Settings, label: 'Settings', color: 'bg-gray-500' },
];

export function Dock({ onItemClick, openWindows }: DockProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end gap-2 px-4 py-3 glass rounded-2xl">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isOpen = openWindows.includes(item.id);
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className="group relative dock-item"
            >
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                ${item.color} shadow-lg
                transition-all duration-200
                group-hover:shadow-xl
              `}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Label tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 rounded-lg text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.label}
              </div>
              
              {/* Open indicator */}
              {isOpen && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
