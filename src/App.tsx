import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Key, Instagram, Github, Mail, Menu, X, Award, Code, Palette } from 'lucide-react';

const BASE_URL = ((import.meta as any).env?.BASE_URL as string) || '/';
const resolvePublicPath = (src: string) => src.startsWith('/') ? `${BASE_URL}${src.slice(1)}` : src;

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

// --- Components ---

const StarryBackground = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);
  const [fallingStars, setFallingStars] = useState<{ id: number; top: string; left: string; duration: string; delay: string }[]>([]);
  const [decorStars, setDecorStars] = useState<{ id: number; top: string; left: string; size: number; rotate: string; opacity: number }[]>([]);
  const [decorKeys, setDecorKeys] = useState<{ id: number; top: string; left: string; size: number; rotate: string; opacity: number }[]>([]);
  const [decorButtons, setDecorButtons] = useState<{ id: number; top: string; left: string; size: number; rotate: string; opacity: number }[]>([]);
  const [decorWebs, setDecorWebs] = useState<{ id: number; top: string; left: string; size: number; rotate: string; opacity: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 1}px`,
      duration: `${Math.random() * 4 + 2}s`,
    }));
    setStars(newStars);

    const newFallingStars = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 50}%`,
      left: `${Math.random() * 100 + 50}%`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 10}s`,
    }));
    setFallingStars(newFallingStars);

    const newDecorStars = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 10,
      rotate: `${Math.random() * 360}deg`,
      opacity: Math.random() * 0.15 + 0.05,
    }));
    setDecorStars(newDecorStars);

    const newDecorKeys = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 18 + 16,
      rotate: `${Math.random() * 360}deg`,
      opacity: Math.random() * 0.15 + 0.05,
    }));
    setDecorKeys(newDecorKeys);

    const newDecorButtons = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 22 + 18,
      rotate: `${Math.random() * 360}deg`,
      opacity: Math.random() * 0.15 + 0.05,
    }));
    setDecorButtons(newDecorButtons);

    const newDecorWebs = Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 28 + 18,
      rotate: `${Math.random() * 360}deg`,
      opacity: Math.random() * 0.15 + 0.05,
    }));
    setDecorWebs(newDecorWebs);
  }, []);

  return (
    <div className="starry-bg">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            '--duration': star.duration,
          } as any}
        />
      ))}
      {fallingStars.map((star) => (
        <div
          key={star.id}
          className="falling-star"
          style={{
            top: star.top,
            left: star.left,
            '--duration': star.duration,
            animationDelay: star.delay,
          } as any}
        />
      ))}
      {decorStars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute pointer-events-none text-star"
          style={{
            top: star.top,
            left: star.left,
            transform: `rotate(${star.rotate})`,
            opacity: star.opacity,
            filter: 'drop-shadow(0 0 5px rgba(247, 208, 96, 0.5))',
          }}
        >
          <Star size={star.size} fill="currentColor" />
        </div>
      ))}
      {decorKeys.map((item) => (
        <div
          key={`key-${item.id}`}
          className="absolute pointer-events-none text-star/80"
          style={{
            top: item.top,
            left: item.left,
            transform: `rotate(${item.rotate})`,
            opacity: item.opacity,
          }}
        >
          <Key size={item.size} />
        </div>
      ))}
      {decorButtons.map((item) => (
        <div
          key={`button-${item.id}`}
          className="absolute pointer-events-none"
          style={{
            top: item.top,
            left: item.left,
            transform: `rotate(${item.rotate})`,
            opacity: item.opacity,
          }}
        >
          <ClothesButton style={{ width: item.size, height: item.size }} variant="white" />
        </div>
      ))}
      {decorWebs.map((item) => (
        <div
          key={`web-${item.id}`}
          className="absolute spider-web pointer-events-none"
          style={{
            top: item.top,
            left: item.left,
            width: item.size,
            height: item.size,
            transform: `rotate(${item.rotate})`,
            opacity: item.opacity,
          }}
        />
      ))}
    </div>
  );
};

const ClothesButton = ({ 
  className = "", 
  style = {}, 
  variant = "white" 
}: { 
  className?: string; 
  style?: React.CSSProperties;
  variant?: 'white' | 'black' | 'yellow' | 'blue' | 'red';
}) => (
  <div className={`clothes-button button-${variant} ${className}`} style={style}>
    <div className="grid grid-cols-2 gap-1.5 relative z-10">
      <div className="button-hole" />
      <div className="button-hole" />
      <div className="button-hole" />
      <div className="button-hole" />
    </div>
  </div>
);

const Header = ({ activePage, setActivePage }: { activePage: string; setActivePage: (p: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-navy/80 backdrop-blur-md border-b border-star/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-star font-serif text-4xl font-bold tracking-tighter flex items-center gap-3"
        >
          🪡🐈‍⬛𝓱𝓮𝓵𝓵𝓸  ִֶָ𓂃 ࣪˖ ִֶָ⚉་༘࿐
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {['Home', 'Portfolio'].map((item) => (
            <button
              key={item}
              onClick={() => setActivePage(item.toLowerCase())}
              className={`text-sm uppercase tracking-widest transition-colors ${
                activePage === item.toLowerCase() ? 'text-star font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
          <a href="#contact" className="text-sm uppercase tracking-widest text-white/60 hover:text-white">Contact</a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-star" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-purple-deep border-b border-star/20 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {['Home', 'Portfolio'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActivePage(item.toLowerCase());
                    setIsOpen(false);
                  }}
                  className="text-left text-lg text-white/80"
                >
                  {item}
                </button>
              ))}
              <a href="#contact" onClick={() => setIsOpen(false)} className="text-lg text-white/80">Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer id="contact" className="bg-purple-deep/30 border-t border-star/10 py-16 px-6 relative overflow-hidden">
    <div className="polka-dot absolute inset-0 opacity-10 pointer-events-none" />
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
      <div>
        <h2 className="font-serif text-4xl text-star mb-6">Let's connect</h2>
        <p className="text-white/60 mb-8 max-w-md">
          I'm always open to new ideas and collaborations. Feel free to reach out through any of these platforms!
        </p>
        <div className="flex gap-4">
          <a href="https://github.com/mariest0-v" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-star/20 transition-colors">
            <Github className="text-star" />
          </a>
          <a href="https://instagram.com/mariiiiest" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-star/20 transition-colors">
            <Instagram className="text-star" />
          </a>
          <a href="mailto:esthimbd838@gmail.com" className="p-3 bg-white/5 rounded-full hover:bg-star/20 transition-colors">
            <Mail className="text-star" />
          </a>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-white/80">
          <Mail className="text-star w-5 h-5" />
          <span>esthimbd838@gmail.com</span>
        </div>
        <div className="flex items-center gap-4 text-white/80">
          <Instagram className="text-star w-5 h-5" />
          <span>@mariiiiest (personal)</span>
        </div>
        <div className="flex items-center gap-4 text-white/80">
          <Instagram className="text-star w-5 h-5" />
          <span>@moryuhuhu (art)</span>
        </div>
      </div>
    </div>
    <div className="text-center mt-16 text-white/30 text-xs tracking-widest uppercase">
      © 2026 Maria Ngesthi Buana Dewanti • Stitched with love
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ setActivePage }: { setActivePage: (p: string) => void }) => (
  <div className="pt-24">
    {/* Hero Section */}
    <section className="min-h-[80vh] flex flex-col justify-center px-6 max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-block px-4 py-1 rounded-full bg-star/10 border border-star/30 text-star text-xs uppercase tracking-widest mb-6">
          MEET THE CREATIVE SOUL
        </div>
        <h1 className="font-serif text-6xl md:text-8xl mb-6 leading-tight">
          Maria Ngesthi <br />
          <span className="text-star italic flex items-center gap-4">
            Buana Dewanti
            <span className="text-5xl leading-none">★</span>
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-white/70 max-w-2xl mb-10 font-light italic">
          "Where ideas, visuals, and strategy spark."
        </p>
        <div className="flex flex-wrap gap-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => setActivePage('portfolio')}
            className="btn-glow inline-flex items-center gap-3"
          >
            Explore My World <ClothesButton className="w-6 h-6" />
          </motion.div>
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-dashed border-star/40 text-star font-bold uppercase tracking-widest hover:bg-star/10 transition-all"
          >
            Get In Touch <Star size={16} />
          </motion.a>
        </div>
      </motion.div>
      <div className="hidden xl:block absolute right-8 top-24 w-[260px] h-[260px] window-frame rounded-[2rem] border-8 border-star/20 opacity-95 pointer-events-none">
        <div className="window-pane rounded-tl-2xl bg-white/10" />
        <div className="window-pane rounded-tr-2xl bg-white/10" />
        <div className="window-pane rounded-bl-2xl bg-white/10" />
        <div className="window-pane rounded-br-2xl bg-white/10" />
      </div>
    </section>

    {/* About Me */}
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="w-full aspect-[3/4] window-frame rounded-xl stitched-border">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-2">
              <div className="window-pane rounded-tl-lg overflow-hidden border-2 border-black">
                <img src={resolvePublicPath('/uploads/home-1.jpeg')} className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-300" referrerPolicy="no-referrer" />
              </div>
              <div className="window-pane rounded-tr-lg overflow-hidden border-2 border-black">
                <img src={resolvePublicPath('/uploads/home-2.jpeg')} className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-300" referrerPolicy="no-referrer" />
              </div>
              <div className="window-pane rounded-bl-lg overflow-hidden border-2 border-black">
                <img src={resolvePublicPath('/uploads/home-3.jpeg')} className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-300" referrerPolicy="no-referrer" />
              </div>
              <div className="window-pane rounded-br-lg overflow-hidden border-2 border-black">
                <img src={resolvePublicPath('/uploads/home-4.jpeg')} className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-300" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 flex flex-col gap-2 z-20">
            <ClothesButton className="w-14 h-14" />
            <div className="bg-purple-deep p-4 rounded-2xl border-2 border-dashed border-star/20 shadow-xl">
              <Palette className="text-star w-8 h-8" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-serif text-6xl mb-8 flex items-center gap-4 text-star">
            About Me
          </h2>
          <p className="text-2xl text-white/80 leading-relaxed mb-6 font-sans">
            My name is Maria. Since childhood, I’ve loved drawing, even the walls of my room were once filled with my sketches.
          </p>
          <p className="text-2xl text-white/80 leading-relaxed font-sans">
            Now, as a student at SMA Katolik Frateran Surabaya, I continue to nurture my passion while growing both academically and creatively supported by strong communication, discipline, and a high level of ambition to keep improving and exploring new ideas.
          </p>
        </div>
      </div>
    </section>

    {/* Experience */}
    <section className="py-24 px-6 bg-purple-deep/20 relative overflow-hidden">
      <div className="polka-dot absolute inset-0 opacity-10" />
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="font-serif text-6xl mb-16 text-center text-star">Achievements & Experience</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "1st Winner - Phygital Challenge", desc: "Communication Department Petra Christian University", icon: <Award /> },
            { title: "2nd Winner - Monospace Story Template Design", desc: "VCD Universitas Ciputra Surabaya", icon: <Palette /> },
            { title: "Top 10 - Design Bullet Journal", desc: "Insight Youth Education Festival 2022", icon: <Star /> },
            { title: "Team & Creative Lead", desc: "Led multiple school projects, including class curator for Fr.Artz 2026.", icon: <Code /> },
          ].map((exp, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, rotate: i % 2 === 0 ? 1 : -1 }}
              className="p-8 bg-navy/50 border-2 border-dashed border-star/20 rounded-2xl glow-hover flex gap-6"
            >
              <div className="text-star mt-1">
                <ClothesButton className="w-8 h-8 mb-2" />
                {exp.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white font-serif">{exp.title}</h3>
                <p className="text-xl text-white/60 font-sans">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const PortfolioPage = () => {
  const projects: Project[] = [
    { id: 1, title: 'School Group Project', description: 'Python based game for school exam', image_url: '/uploads/satee.jpeg', category: 'School' },
    { id: 2, title: 'Foodtopia Campaign', description: 'Class posters for Fr.Artz Exhibition 2026', image_url: '/uploads/foodtopia.jpeg', category: 'Campaign' },
    { id: 3, title: 'UI Design for Informatics', description: 'School projects', image_url: '/uploads/ui-design.jpeg', category: 'UI Design' },
  ];

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto pb-24">
      {/* Skills Section */}
      <section className="mb-24">
        <h2 className="font-serif text-6xl mb-12 flex items-center gap-4 text-star">
          Skills <ClothesButton className="w-10 h-10" />
        </h2>
        <div className="flex flex-wrap gap-4">
          {[
            { name: "Canva", type: "Design" },
            { name: "Ibispaint", type: "Design & Illustration" },
            { name: "Adobe Photoshop", type: "Design" },
            { name: "UI Design", type: "Design" },
            { name: "KompoZer", type: "UI Design" },
          ].map((skill, i) => (
            <div key={i} className="px-6 py-3 bg-purple-deep/40 border-2 border-dashed border-star/20 rounded-full flex items-center gap-3 hover:scale-105 transition-transform">
              <ClothesButton className="w-4 h-4" />
              <span className="font-bold text-2xl text-white/90 font-sans">{skill.name}</span>
              <span className="text-sm text-white/40 uppercase tracking-widest font-sans">{skill.type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <div className="mb-12">
          <h2 className="font-serif text-6xl text-star">Selected Works</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -1 : 1 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="group relative bg-navy/40 border-4 border-black rounded-2xl overflow-hidden stitched-border"
            >
              <div className="aspect-[4/3] overflow-hidden border-b-4 border-black">
                <img
                  src={resolvePublicPath(project.image_url)}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 bg-purple-deep/20">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-star font-sans">{project.category}</span>
                  <ClothesButton className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold mb-2 font-serif">{project.title}</h3>
                <p className="text-xl text-white/60 font-sans line-clamp-2">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');

  return (
    <div className="min-h-screen selection:bg-star selection:text-navy">
      <StarryBackground />
      <Header activePage={activePage} setActivePage={setActivePage} />
      
      <main>
        <AnimatePresence mode="wait">
          {activePage === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HomePage setActivePage={setActivePage} />
            </motion.div>
          ) : (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PortfolioPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
