import { useState } from 'react';
import { Mail, Phone, Github, Linkedin, MapPin, Send, Clock, Calendar } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ContactWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

export function ContactWindow({ onClose, onMinimize }: ContactWindowProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: Github, label: 'GitHub', value: personalInfo.github.replace('github.com/', ''), href: `https://${personalInfo.github}` },
    { icon: Linkedin, label: 'LinkedIn', value: personalInfo.linkedin.replace('linkedin.com/in/', ''), href: `https://${personalInfo.linkedin}` },
    { icon: MapPin, label: 'Location', value: personalInfo.location, href: null },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message Sent!", {
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
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
          <span className="text-white/80 text-sm font-medium ml-2">Get In Touch</span>
        </div>
      </div>

      {/* Contact Content - Scrollable */}
      <div className="flex-1 overflow-hidden min-h-0">
        <ScrollArea className="h-full w-full" type="always">
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Let's discuss your next project</h2>
                <p className="text-white/60">Available for new opportunities and collaborations</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    {contactInfo.map((item) => {
                      const Icon = item.icon;
                      const content = (
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-white/50 text-sm">{item.label}</p>
                            <p className="text-white truncate">{item.value}</p>
                          </div>
                        </div>
                      );
                      
                      return item.href ? (
                        <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                          {content}
                        </a>
                      ) : (
                        <div key={item.label}>{content}</div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-5 h-5 text-green-400" />
                      <span className="text-white font-medium">Availability</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white/60">
                        <span>Next Available</span>
                        <span className="text-green-400">{personalInfo.availability}</span>
                      </div>
                      <div className="flex justify-between text-white/60">
                        <span>Timezone</span>
                        <span>{personalInfo.timezone}</span>
                      </div>
                      <div className="flex justify-between text-white/60">
                        <span>Working Hours</span>
                        <span>{personalInfo.workingHours}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Send Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-white/60 text-sm mb-1 block">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-1 block">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-1 block">Subject</label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="What's this about?"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-1 block">Message</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[120px]"
                        required
                      />
                    </div>
                    <Button 
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>

                  <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>I typically respond within 24 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
