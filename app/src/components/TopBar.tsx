import { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, Sun, Moon } from 'lucide-react';

interface TopBarProps {
  portfolioName: string;
}

export function TopBar({ portfolioName }: TopBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-black/40 backdrop-blur-md z-50 flex items-center justify-between px-4 text-white/90 text-sm">
      {/* Left side - Portfolio name */}
      <div className="flex items-center gap-4">
        <span className="font-semibold">{portfolioName}</span>
      </div>

      {/* Center - Date and Time */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <span>{formatDate(currentTime)}</span>
        <span>{formatTime(currentTime)}</span>
      </div>

      {/* Right side - System icons */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="hover:bg-white/10 p-1 rounded transition-colors"
        >
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
        <Wifi className="w-4 h-4" />
        <Volume2 className="w-4 h-4" />
        <Battery className="w-4 h-4" />
      </div>
    </div>
  );
}
