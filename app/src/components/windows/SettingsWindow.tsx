import { useState } from 'react';
import { Image, Monitor } from 'lucide-react';
import { backgrounds } from '@/data/portfolioData';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SettingsWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  currentBackground: string;
  onBackgroundChange: (url: string) => void;
  opacity: number;
  onOpacityChange: (opacity: number) => void;
}

export function SettingsWindow({ 
  onClose, 
  onMinimize, 
  currentBackground, 
  onBackgroundChange,
  opacity,
  onOpacityChange
}: SettingsWindowProps) {
  const [activeTab, setActiveTab] = useState<'appearance'>('appearance');

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
          <span className="text-white/80 text-sm font-medium ml-2">System Settings</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Sidebar */}
        <div className="w-48 bg-black/30 border-r border-white/10 p-3 overflow-y-auto shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('appearance')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                activeTab === 'appearance'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4" />
              Appearance
            </button>
          </nav>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-hidden min-h-0">
          <ScrollArea className="h-full w-full" type="always">
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Customize your desktop environment</h3>
                  <p className="text-white/60 text-sm">Personalize your portfolio experience</p>
                </div>

                {/* Opacity Control */}
                <div className="p-5 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Image className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Background Opacity</p>
                        <p className="text-white/50 text-sm">Adjust transparency for optimal visibility</p>
                      </div>
                    </div>
                    <span className="text-white/80 font-mono">{opacity}%</span>
                  </div>
                  <Slider
                    value={[opacity]}
                    onValueChange={(value) => onOpacityChange(value[0])}
                    min={10}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-white/40 text-xs mt-2">
                    <span>10%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Background Selection */}
                <div>
                  <h4 className="text-white font-medium mb-4">Available Backgrounds</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {backgrounds.map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => onBackgroundChange(bg.url)}
                        className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                          currentBackground === bg.url
                            ? 'border-blue-500 ring-2 ring-blue-500/30'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <img
                          src={bg.url}
                          alt={bg.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-sm font-medium">{bg.name}</p>
                          <p className="text-white/50 text-xs">{bg.type === 'image' ? 'Static' : 'Video'}</p>
                        </div>
                        {currentBackground === bg.url && (
                          <div className="absolute top-2 right-2 px-2 py-1 bg-blue-500 rounded-md text-white text-xs font-medium">
                            ACTIVE
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-white/40 text-sm mt-4">
                    Select thumbnail to apply background. All backgrounds are high-quality static images.
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
