import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Dock } from './components/Dock';
import { AboutWindow } from './components/windows/AboutWindow';
import { ProjectsWindow } from './components/windows/ProjectsWindow';
import { SkillsWindow } from './components/windows/SkillsWindow';
import { CertificatesWindow } from './components/windows/CertificatesWindow';
import { ContactWindow } from './components/windows/ContactWindow';
import { TerminalWindow } from './components/windows/TerminalWindow';
import { SettingsWindow } from './components/windows/SettingsWindow';
import { Toaster } from '@/components/ui/sonner';
import { backgrounds, personalInfo } from './data/portfolioData';

interface WindowPosition {
  x: number;
  y: number;
}

interface OpenWindow {
  id: string;
  zIndex: number;
  position: WindowPosition;
  isMinimized: boolean;
}

const windowSizes: Record<string, { width: string; height: string }> = {
  about: { width: '800px', height: '600px' },
  projects: { width: '900px', height: '650px' },
  skills: { width: '850px', height: '600px' },
  certificates: { width: '900px', height: '650px' },
  contact: { width: '800px', height: '650px' },
  terminal: { width: '700px', height: '500px' },
  settings: { width: '700px', height: '550px' },
};

function App() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [backgroundUrl, setBackgroundUrl] = useState(backgrounds[0].url);
  const [backgroundOpacity, setBackgroundOpacity] = useState(100);
  const [highestZIndex, setHighestZIndex] = useState(100);
  const [draggedWindow, setDraggedWindow] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const desktopRef = useRef<HTMLDivElement>(null);

  const bringToFront = useCallback((windowId: string) => {
    setOpenWindows(prev => {
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);
      return prev.map(w => 
        w.id === windowId ? { ...w, zIndex: newZIndex } : w
      );
    });
  }, [highestZIndex]);

  const openWindow = useCallback((id: string) => {
    setOpenWindows(prev => {
      const existing = prev.find(w => w.id === id);
      if (existing) {
        if (existing.isMinimized) {
          const newZIndex = highestZIndex + 1;
          setHighestZIndex(newZIndex);
          return prev.map(w => 
            w.id === id ? { ...w, isMinimized: false, zIndex: newZIndex } : w
          );
        }
        bringToFront(id);
        return prev;
      }
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);
      return [...prev, { 
        id, 
        zIndex: newZIndex,
        isMinimized: false,
        position: { 
          x: 100 + (prev.length * 30), 
          y: 80 + (prev.length * 30) 
        }
      }];
    });
  }, [highestZIndex, bringToFront]);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  }, []);

  const handleDockClick = useCallback((id: string) => {
    openWindow(id);
  }, [openWindow]);

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent, windowId: string) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('textarea') || target.closest('a')) {
      return;
    }
    
    const windowEl = e.currentTarget as HTMLElement;
    const rect = windowEl.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setDraggedWindow(windowId);
    bringToFront(windowId);
  }, [bringToFront]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggedWindow || !desktopRef.current) return;
    
    const desktopRect = desktopRef.current.getBoundingClientRect();
    const newX = e.clientX - desktopRect.left - dragOffset.x;
    const newY = e.clientY - desktopRect.top - dragOffset.y;
    
    setOpenWindows(prev => prev.map(w => 
      w.id === draggedWindow 
        ? { ...w, position: { x: Math.max(0, newX), y: Math.max(0, newY) } }
        : w
    ));
  }, [draggedWindow, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setDraggedWindow(null);
  }, []);

  useEffect(() => {
    if (draggedWindow) {
      const handleGlobalMouseUp = () => setDraggedWindow(null);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [draggedWindow]);

  const renderWindow = (window: OpenWindow) => {
    if (window.isMinimized) return null;

    const commonProps = {
      onClose: () => closeWindow(window.id),
      onMinimize: () => minimizeWindow(window.id),
    };

    const content = (() => {
      switch (window.id) {
        case 'about':
          return <AboutWindow {...commonProps} />;
        case 'projects':
          return <ProjectsWindow {...commonProps} />;
        case 'skills':
          return <SkillsWindow {...commonProps} />;
        case 'certificates':
          return <CertificatesWindow {...commonProps} />;
        case 'contact':
          return <ContactWindow {...commonProps} />;
        case 'terminal':
          return <TerminalWindow {...commonProps} />;
        case 'settings':
          return (
            <SettingsWindow 
              {...commonProps}
              currentBackground={backgroundUrl}
              onBackgroundChange={setBackgroundUrl}
              opacity={backgroundOpacity}
              onOpacityChange={setBackgroundOpacity}
            />
          );
        default:
          return null;
      }
    })();

    const size = windowSizes[window.id];

    return (
      <div
        key={window.id}
        className="absolute cursor-move"
        style={{
          left: window.position.x,
          top: window.position.y,
          width: size.width,
          height: size.height,
          zIndex: window.zIndex,
        }}
        onMouseDown={(e) => handleMouseDown(e, window.id)}
        onClick={() => bringToFront(window.id)}
      >
        {content}
      </div>
    );
  };

  const openWindowIds = useMemo(() => openWindows.filter(w => !w.isMinimized).map(w => w.id), [openWindows]);

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ 
          backgroundImage: `url(${backgroundUrl})`,
        }}
      />
      
      {/* Dark overlay with adjustable opacity */}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-300"
        style={{ opacity: (100 - backgroundOpacity) / 100 * 0.7 }}
      />

      {/* Top Bar */}
      <TopBar portfolioName={`${personalInfo.name.split(' ')[0]} Folio`} />

      {/* Desktop Area with Windows */}
      <div 
        ref={desktopRef}
        className="absolute inset-0 pt-8 pb-24 px-4"
      >
        {openWindows.map(renderWindow)}
      </div>

      {/* Dock */}
      <Dock onItemClick={handleDockClick} openWindows={openWindowIds} />

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}

export default App;
