import { ArrowRight, ChevronLeft, ChevronRight, Home, UserRound, Cpu, Folder, Mail, Menu, X } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { useEffect, useRef, useState } from 'react';
import InitialsIntro from './components/InitialsIntro.jsx';

function shouldPlayInitialsIntro() {
  if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return true;
}

const aboutHighlights = [
  { title: 'Core Technologies', detail: 'JS, Node, PHP' },
  { title: 'Development Focus', detail: 'Full-stack, REST APIs' },
  { title: 'Problem Solving', detail: 'Clean code, MySQL' },
];

const technicalStack = [
  {
    title: 'Frontend Development',
    description: 'Building modern, responsive front-end interfaces with intuitive user experiences, clean code, and semantic HTML and CSS.',
    technologies: ['HTML', 'CSS', 'JS'],
  },
  {
    title: 'Backend Systems',
    description: 'Developing reliable server-side logic, RESTful API endpoints, and efficient data workflows built for performance and security.',
    technologies: ['Node', 'Express', 'PHP'],
  },
  {
    title: 'Tools & Workflow',
    description: 'Working with relational databases, version control, and Linux environments to support efficient development workflows.',
    technologies: ['MySQL', 'Git', 'Linux'],
  },
];

const featuredProjects = [
  {
    title: 'Pawtopia',
    description: 'Find trusted care for your pet, from daycare and boarding to grooming, all in one place so you can travel or work with peace of mind.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    type: 'Pet care platform',
  },
  {
    title: 'Modern Tech Solutions HR System',
    description: 'One secure HR hub for employee records, payroll, leave, and attendance, replacing scattered spreadsheets and emails with a database-backed system.',
    technologies: ['HTML', 'JavaScript', 'CSS'],
    type: 'HR management system',
  },
  {
    title: 'ApplyDirect-SA',
    description: 'Find the right South African university or college faster. Explore courses and entry requirements, then filter your options in one streamlined guide.',
    technologies: ['Vue', 'JavaScript', 'CSS', 'HTML'],
    type: 'Education directory',
  },
];

export default function App() {
  const [formState, handleContactSubmit, resetContactForm] = useForm('mwlvgjkq');
  const [showInitialsIntro, setShowInitialsIntro] = useState(shouldPlayInitialsIntro);
  const [aboutIsVisible, setAboutIsVisible] = useState(false);
  const [aboutAnimationStarted, setAboutAnimationStarted] = useState(false);
  const [techStackAnimationActive, setTechStackAnimationActive] = useState(false);
  const [featuredProjectsAnimationActive, setFeaturedProjectsAnimationActive] = useState(false);
  const [contactAnimationActive, setContactAnimationActive] = useState(false);
  const contactThankYouOpen = formState.succeeded;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSidebarExpanded, setDesktopSidebarExpanded] = useState(false);
  const [desktopSidebarPinned, setDesktopSidebarPinned] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeNavigationSection, setActiveNavigationSection] = useState('home');
  const aboutSectionRef = useRef(null);
  const technicalStackRef = useRef(null);
  const featuredProjectsRef = useRef(null);
  const contactSectionRef = useRef(null);
  const contactFormRef = useRef(null);
  const projectSwipeStartRef = useRef(null);
  const aboutDustCanvasRef = useRef(null);
  const aboutPortraitRef = useRef(null);
  const aboutAssetsReadyRef = useRef(Promise.resolve());

  useEffect(() => {
    if (!showInitialsIntro) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => setShowInitialsIntro(false), 3400);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [showInitialsIntro]);

  const skipInitialsIntro = () => setShowInitialsIntro(false);

  const moveProject = (direction) => {
    setActiveProjectIndex((currentIndex) => (
      currentIndex + direction + featuredProjects.length
    ) % featuredProjects.length);
  };

  const handleProjectPointerDown = (event) => {
    projectSwipeStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleProjectPointerUp = (event) => {
    const start = projectSwipeStartRef.current;
    projectSwipeStartRef.current = null;
    if (!start) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;
    moveProject(deltaX < 0 ? 1 : -1);
  };

  const handleProjectKeyDown = (event) => {
    if (event.key === 'ArrowRight') moveProject(1);
    if (event.key === 'ArrowLeft') moveProject(-1);
  };

  useEffect(() => {
    const portraitImage = aboutPortraitRef.current;
    const fontReady = document.fonts.load('400 180px Molgan').catch(() => undefined);
    const portraitReady = portraitImage?.decode
      ? portraitImage.decode().catch(() => undefined)
      : Promise.resolve();

    aboutAssetsReadyRef.current = Promise.all([fontReady, portraitReady]);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'stack', 'projects', 'contact'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      const currentSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (currentSection) setActiveNavigationSection(currentSection.target.id);
    }, {
      rootMargin: '-42% 0px -42% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75],
    });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const aboutComposition = aboutSectionRef.current?.querySelector('.about-composition');
    if (!aboutComposition) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setAboutIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting) setAboutAnimationStarted(false);
      },
      { threshold: 0.15 }
    );

    observer.observe(aboutComposition);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stackSection = technicalStackRef.current;
    if (!stackSection || techStackAnimationActive) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setTechStackAnimationActive(true);
      observer.disconnect();
    }, { threshold: 0.2 });

    observer.observe(stackSection);
    return () => observer.disconnect();
  }, [techStackAnimationActive]);

  useEffect(() => {
    const projectsSection = featuredProjectsRef.current;
    if (!projectsSection || featuredProjectsAnimationActive) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setFeaturedProjectsAnimationActive(true);
      observer.disconnect();
    }, { threshold: 0.15 });

    observer.observe(projectsSection);
    return () => observer.disconnect();
  }, [featuredProjectsAnimationActive]);

  useEffect(() => {
    const contactSection = contactSectionRef.current;
    if (!contactSection || contactAnimationActive) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setContactAnimationActive(true);
      observer.disconnect();
    }, { threshold: 0.2 });

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, [contactAnimationActive]);

  useEffect(() => {
    if (!formState.succeeded) return;
    contactFormRef.current?.reset();
  }, [formState.succeeded]);

  useEffect(() => {
    if (!contactThankYouOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        resetContactForm();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [contactThankYouOpen, resetContactForm]);

  useEffect(() => {
    if (!aboutIsVisible) return;

    const canvas = aboutDustCanvasRef.current;
    const stage = canvas?.parentElement;
    if (!canvas || !stage) return;

    let animationFrame;
    let cancelled = false;

    const assembleWord = async () => {
      await aboutAssetsReadyRef.current;
      if (cancelled) return;
      const portraitImage = aboutPortraitRef.current;
      if (!portraitImage) return;

      const { width, height } = stage.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);

      const context = canvas.getContext('2d');
      if (!context) return;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const textCanvas = document.createElement('canvas');
      textCanvas.width = Math.ceil(width);
      textCanvas.height = Math.ceil(height);
      const textContext = textCanvas.getContext('2d');
      if (!textContext) return;

      const fontSize = Math.min(256, Math.max(54, window.innerWidth * 0.18));
      const titleTop = window.innerWidth >= 1024
        ? Math.min(56, Math.max(16, window.innerWidth * 0.04))
        : 112;
      textContext.font = `400 ${fontSize}px Molgan, sans-serif`;
      textContext.textAlign = 'center';
      textContext.textBaseline = 'top';
      const gradient = textContext.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.42, '#e9d5ff');
      gradient.addColorStop(0.72, '#7030ef');
      gradient.addColorStop(1, '#db1fff');
      textContext.fillStyle = gradient;
      textContext.fillText('ABOUT', width / 2, titleTop);

      const portraitCanvas = document.createElement('canvas');
      portraitCanvas.width = Math.ceil(width);
      portraitCanvas.height = Math.ceil(height);
      const portraitContext = portraitCanvas.getContext('2d');
      if (!portraitContext) return;
      const portraitWidth = Math.min(430, Math.max(260, window.innerWidth * 0.32));
      const portraitHeight = Math.min(height, 560) + 24;
      const portraitScale = Math.min(
        portraitWidth / portraitImage.naturalWidth,
        portraitHeight / portraitImage.naturalHeight
      );
      const drawnPortraitWidth = portraitImage.naturalWidth * portraitScale;
      const drawnPortraitHeight = portraitImage.naturalHeight * portraitScale;
      const portraitX = (width - drawnPortraitWidth) / 2;
      const portraitY = height - drawnPortraitHeight;
      portraitContext.drawImage(
        portraitImage,
        portraitX,
        portraitY,
        drawnPortraitWidth,
        drawnPortraitHeight
      );

      const solidGradient = context.createLinearGradient(0, 0, width, 0);
      solidGradient.addColorStop(0, '#ffffff');
      solidGradient.addColorStop(0.42, '#e9d5ff');
      solidGradient.addColorStop(0.72, '#7030ef');
      solidGradient.addColorStop(1, '#db1fff');

      const { data } = textContext.getImageData(0, 0, textCanvas.width, textCanvas.height);
      const points = [];
      const sampleSpacing = 6;
      for (let y = 0; y < textCanvas.height; y += sampleSpacing) {
        for (let x = 0; x < textCanvas.width; x += sampleSpacing) {
          const pixel = (y * textCanvas.width + x) * 4;
          if (data[pixel + 3] > 160) {
            points.push({
              x,
              y,
              color: `rgb(${data[pixel]}, ${data[pixel + 1]}, ${data[pixel + 2]})`,
              startX: width + Math.random() * width * 0.35,
              startY: Math.random() * height,
              delay: Math.random() * 0.32,
              radius: 0.4 + Math.random() * 0.55,
              gust: (Math.random() - 0.5) * 24,
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }

      const textParticleLimit = 1900;
      const particles = points.length > textParticleLimit
        ? points.filter((_, index) => index % Math.ceil(points.length / textParticleLimit) === 0)
        : points;
      const portraitPixels = portraitContext.getImageData(0, 0, portraitCanvas.width, portraitCanvas.height).data;
      const portraitPoints = [];
      const portraitSampleSpacing = 6;
      for (let y = 0; y < portraitCanvas.height; y += portraitSampleSpacing) {
        for (let x = 0; x < portraitCanvas.width; x += portraitSampleSpacing) {
          const pixel = (y * portraitCanvas.width + x) * 4;
          const red = portraitPixels[pixel];
          const green = portraitPixels[pixel + 1];
          const blue = portraitPixels[pixel + 2];
          const alpha = portraitPixels[pixel + 3] / 255;
          if (alpha > 0.32 && red + green + blue > 24) {
            portraitPoints.push({
              x,
              y,
              color: `rgba(${red}, ${green}, ${blue}, ${alpha})`,
              startX: width + Math.random() * width * 0.35,
              startY: Math.random() * height,
              delay: Math.random() * 0.3,
              radius: 0.45 + Math.random() * 0.55,
              gust: (Math.random() - 0.5) * 24,
            });
          }
        }
      }
      const portraitParticleLimit = 2300;
      const portraitParticles = portraitPoints.length > portraitParticleLimit
        ? portraitPoints.filter((_, index) => index % Math.ceil(portraitPoints.length / portraitParticleLimit) === 0)
        : portraitPoints;
      const startedAt = performance.now();
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const draw = (now) => {
        if (cancelled) return;
        context.clearRect(0, 0, width, height);
        const elapsed = reducedMotion ? 3100 : now - startedAt;
        const assembly = Math.min(1, elapsed / 2200);
        const solidProgress = reducedMotion ? 1 : Math.max(0, Math.min(1, (elapsed - 1900) / 900));
        const portraitAssembly = Math.min(1, elapsed / 2500);
        const portraitSolidProgress = reducedMotion ? 1 : Math.max(0, Math.min(1, (elapsed - 2200) / 900));

        if (solidProgress < 1) {
          for (const particle of particles) {
            const localProgress = Math.max(0, Math.min(1, (assembly - particle.delay) / (1 - particle.delay)));
            const eased = 1 - (1 - localProgress) ** 3;
            const x = particle.startX + (particle.x - particle.startX) * eased;
            const y = particle.startY + (particle.y - particle.startY) * eased + Math.sin(eased * Math.PI) * particle.gust;
            context.globalAlpha = (0.38 + localProgress * 0.62) * (1 - solidProgress);
            context.fillStyle = particle.color;
            context.beginPath();
            context.arc(x, y, particle.radius, 0, Math.PI * 2);
            context.fill();
          }
        }
        context.globalAlpha = 1;
        context.shadowBlur = 0;
        context.font = `400 ${fontSize}px Molgan, sans-serif`;
        context.textAlign = 'center';
        context.textBaseline = 'top';
        context.fillStyle = solidGradient;
        context.globalAlpha = solidProgress;
        context.fillText('ABOUT', width / 2, titleTop);
        context.globalAlpha = 1;

        if (portraitSolidProgress < 1) {
          for (const particle of portraitParticles) {
            const localProgress = Math.max(0, Math.min(1, (portraitAssembly - particle.delay) / (1 - particle.delay)));
            const eased = 1 - (1 - localProgress) ** 3;
            const x = particle.startX + (particle.x - particle.startX) * eased;
            const y = particle.startY + (particle.y - particle.startY) * eased + Math.sin(eased * Math.PI) * particle.gust;
            context.globalAlpha = (0.3 + localProgress * 0.7) * (1 - portraitSolidProgress);
            context.fillStyle = particle.color;
            context.beginPath();
            context.arc(x, y, particle.radius, 0, Math.PI * 2);
            context.fill();
          }
        }
        context.globalAlpha = portraitSolidProgress;
        context.shadowBlur = 0;
        context.drawImage(portraitCanvas, 0, 0, width, height);
        context.globalAlpha = 1;

        if (!reducedMotion && (solidProgress < 1 || portraitSolidProgress < 1)) {
          animationFrame = requestAnimationFrame(draw);
        }
      };

      draw(startedAt);
      setAboutAnimationStarted(true);
    };

    assembleWord();
    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
    };
  }, [aboutIsVisible]);

  return (
    <div className="min-h-screen bg-[#07030d] text-white selection:bg-purple-500 selection:text-white font-sans relative overflow-x-hidden pt-6">
      {showInitialsIntro && <InitialsIntro onSkip={skipInitialsIntro} />}
      <div inert={showInitialsIntro || undefined}>
      {/* Google Fonts - Orbitron */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anta&family=Audiowide&family=Michroma&family=Orbitron:wght@700;900&family=Outfit:wght@400;700;800;900&display=swap');
        .font-futuristic {
          font-family: 'Orbitron', sans-serif;
        }
        .font-logo {
          font-family: 'Audiowide', sans-serif;
        }
        .font-about-gradient {
          font-family: 'Molgan', sans-serif;
          font-weight: 400;
          background: linear-gradient(105deg, #ffffff 8%, #e9d5ff 42%, #7030ef 72%, #db1fff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .font-about-copy {
          font-family: 'Outfit', sans-serif;
        }
        .font-anta {
          font-family: 'Anta', sans-serif;
          font-weight: 400;
          font-style: normal;
        }
      `}</style>

      {/* Dynamic Background Ambient Lighting */}
      <div className="fixed top-1/4 -right-20 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-1/3 -left-20 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Pill Glass Navbar */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 max-w-7xl mx-auto">
        <div
          className={`desktop-sidebar-shell ${desktopSidebarExpanded ? 'is-expanded' : ''}`}
          onMouseEnter={() => setDesktopSidebarExpanded(true)}
          onMouseLeave={() => { if (!desktopSidebarPinned) setDesktopSidebarExpanded(false); }}
          onFocus={() => setDesktopSidebarExpanded(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget) && !desktopSidebarPinned) {
              setDesktopSidebarExpanded(false);
            }
          }}
        >
          <nav className="desktop-sidebar-rail" aria-label="Quick navigation">
            <a href="#home" className="desktop-sidebar-brand" aria-label="Stephan Bennett, home"><span>S</span><span>B</span></a>
            <button
              type="button"
              className="desktop-sidebar-toggle"
              aria-label={desktopSidebarPinned ? 'Collapse navigation sidebar' : 'Keep navigation sidebar open'}
              aria-expanded={desktopSidebarExpanded}
              onClick={() => {
                const shouldPinOpen = !desktopSidebarPinned;
                setDesktopSidebarPinned(shouldPinOpen);
                setDesktopSidebarExpanded(shouldPinOpen);
              }}
            >
              {desktopSidebarExpanded ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
            <span className="desktop-sidebar-divider" />
            <a href="#home" onClick={() => setActiveNavigationSection('home')} className={`desktop-sidebar-icon ${activeNavigationSection === 'home' ? 'is-current' : ''}`} aria-label="Home" title="Home"><Home aria-hidden="true" /></a>
            <a href="#about" onClick={() => { setAboutIsVisible(true); setActiveNavigationSection('about'); }} className={`desktop-sidebar-icon ${activeNavigationSection === 'about' ? 'is-current' : ''}`} aria-label="About" title="About"><UserRound aria-hidden="true" /></a>
            <a href="#stack" onClick={() => { setTechStackAnimationActive(true); setActiveNavigationSection('stack'); }} className={`desktop-sidebar-icon ${activeNavigationSection === 'stack' ? 'is-current' : ''}`} aria-label="Tech Stack" title="Tech Stack"><Cpu aria-hidden="true" /></a>
            <a href="#projects" onClick={() => setActiveNavigationSection('projects')} className={`desktop-sidebar-icon ${activeNavigationSection === 'projects' ? 'is-current' : ''}`} aria-label="Projects" title="Projects"><Folder aria-hidden="true" /></a>
            <a href="#contact" onClick={() => setActiveNavigationSection('contact')} className={`desktop-sidebar-icon ${activeNavigationSection === 'contact' ? 'is-current' : ''}`} aria-label="Contact" title="Contact"><Mail aria-hidden="true" /></a>
          </nav>

          <nav className="desktop-sidebar-panel" aria-label="Main navigation" aria-hidden={!desktopSidebarExpanded}>
            <div className="desktop-sidebar-panel-brand"><span className="desktop-sidebar-brand-mark">SB</span><span>Stephan Bennett</span></div>
            <span className="desktop-sidebar-panel-label">Navigation</span>
            <a href="#home" onClick={() => setActiveNavigationSection('home')} className={`desktop-sidebar-link ${activeNavigationSection === 'home' ? 'is-current' : ''}`}><Home aria-hidden="true" /><span>Home</span></a>
            <a href="#about" onClick={() => { setAboutIsVisible(true); setActiveNavigationSection('about'); }} className={`desktop-sidebar-link ${activeNavigationSection === 'about' ? 'is-current' : ''}`}><UserRound aria-hidden="true" /><span>About</span></a>
            <a href="#stack" onClick={() => { setTechStackAnimationActive(true); setActiveNavigationSection('stack'); }} className={`desktop-sidebar-link ${activeNavigationSection === 'stack' ? 'is-current' : ''}`}><Cpu aria-hidden="true" /><span>Tech Stack</span></a>
            <a href="#projects" onClick={() => setActiveNavigationSection('projects')} className={`desktop-sidebar-link ${activeNavigationSection === 'projects' ? 'is-current' : ''}`}><Folder aria-hidden="true" /><span>Projects</span></a>
            <a href="#contact" onClick={() => setActiveNavigationSection('contact')} className={`desktop-sidebar-link ${activeNavigationSection === 'contact' ? 'is-current' : ''}`}><Mail aria-hidden="true" /><span>Contact</span></a>
            <a href="#contact" onClick={() => setActiveNavigationSection('contact')} className="desktop-sidebar-cta"><span>Start A Project</span><ArrowRight aria-hidden="true" /></a>
          </nav>
        </div>

        <nav className="portfolio-navbar" aria-label="Main navigation">
          <a href="#home" className="navbar-brand" aria-label="Stephan Bennett, home"><span>S</span><span>B</span></a>
          <button
            type="button"
            className="navbar-mobile-toggle"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          >
            {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div id="mobile-navigation" className="navbar-mobile-panel">
            <span className="navbar-mobile-label">Navigation</span>
            <a href="#home" className={`navbar-mobile-link ${activeNavigationSection === 'home' ? 'is-current' : ''}`} onClick={() => { setActiveNavigationSection('home'); setMobileMenuOpen(false); }}>
              <Home aria-hidden="true" /><span>Home</span>
            </a>
            <a href="#about" className={`navbar-mobile-link ${activeNavigationSection === 'about' ? 'is-current' : ''}`} onClick={() => { setAboutIsVisible(true); setActiveNavigationSection('about'); setMobileMenuOpen(false); }}>
              <UserRound aria-hidden="true" /><span>About</span>
            </a>
            <a href="#stack" className={`navbar-mobile-link ${activeNavigationSection === 'stack' ? 'is-current' : ''}`} onClick={() => { setTechStackAnimationActive(true); setActiveNavigationSection('stack'); setMobileMenuOpen(false); }}>
              <Cpu aria-hidden="true" /><span>Tech Stack</span>
            </a>
            <a href="#projects" className={`navbar-mobile-link ${activeNavigationSection === 'projects' ? 'is-current' : ''}`} onClick={() => { setActiveNavigationSection('projects'); setMobileMenuOpen(false); }}>
              <Folder aria-hidden="true" /><span>Projects</span>
            </a>
            <a href="#contact" className={`navbar-mobile-link ${activeNavigationSection === 'contact' ? 'is-current' : ''}`} onClick={() => { setActiveNavigationSection('contact'); setMobileMenuOpen(false); }}>
              <Mail aria-hidden="true" /><span>Contact</span>
            </a>
            <a href="#contact" className="navbar-mobile-cta" onClick={() => setMobileMenuOpen(false)}>Start A Project</a>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center max-w-7xl mx-auto px-8 pt-24 relative z-10">
        <div className="grid md:grid-cols-2 items-center gap-12 w-full">
          <div className="space-y-6 font-about-copy">
            <div className="space-y-1">
              <span className="text-sm tracking-[0.3em] text-gray-400 uppercase font-bold font-aquire">SOFTWARE DEVELOPER</span>
              <h2 className="text-[clamp(1.5rem,5.2vw,3.25rem)] tracking-[-0.04em] leading-none [word-spacing:0.12em] font-about-gradient uppercase">
                STEPHAN BENNETT
              </h2>
            </div>

            <p className="text-gray-400 max-w-md text-sm leading-relaxed">
              Developing scalable web applications and digital platforms with clean architecture, modern UI performance, and innovative design.
            </p>
            <div className="hero-actions flex flex-wrap items-center gap-3 pt-2">
              <a href="#projects" className="inline-flex px-7 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/20 transition text-xs font-semibold tracking-wider uppercase shadow-lg shadow-purple-900/20 text-white no-underline">
                Explore Work
              </a>
              <a
                className="hero-social-link"
                href="https://github.com/stephanbennett42-ctrl"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit my GitHub profile"
                title="GitHub"
              >
                <svg viewBox="0 0 19 19" aria-hidden="true" focusable="false">
                  <use href="/icons.svg#github-icon" />
                </svg>
              </a>
              <a
                className="hero-social-link"
                href="https://www.linkedin.com/in/stephan-bennett-a38351347/"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit my LinkedIn profile"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side: Seamless Looping Video Visual */}
          <div className="relative flex justify-center items-center">
            <video
              src="/ball-liquid-nobg.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-80 h-80 md:w-[520px] md:h-[520px] object-cover pointer-events-none drop-shadow-[0_0_60px_rgba(168,85,247,0.4)]"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutSectionRef} id="about" className="py-28 max-w-7xl mx-auto px-8 relative z-10">
        <div className="about-composition">
          <span aria-hidden="true" className={`about-watermark ${aboutAnimationStarted ? 'is-hidden' : ''}`}>ABOUT</span>
          <img
            ref={aboutPortraitRef}
            src="/stephan-bennett.png"
            alt="Portrait of Stephan Bennett"
            className={`about-overlay-portrait ${aboutAnimationStarted ? 'is-hidden' : ''}`}
          />
          <canvas ref={aboutDustCanvasRef} aria-hidden="true" className={`about-dust-canvas ${aboutAnimationStarted ? 'is-active' : ''}`} />
        </div>
        <p className="about-bio max-w-3xl mx-auto text-sm md:text-base leading-relaxed text-gray-300 font-about-copy font-normal">
          I am a full-stack software developer passionate about solving complex logical problems and transforming them into smooth, responsive digital experiences. Building on a strong foundational programming background, I am currently sharpening my technical toolkit through intensive full-stack training at Life Choices Academy. I love bridging the gap between robust backend logic and user-friendly frontend design.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {aboutHighlights.map((highlight) => (
            <article key={highlight.title} className="about-highlight-card">
              <h3 className="about-highlight-title">{highlight.title}</h3>
              <p className="about-highlight-detail">{highlight.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Technical Stack Section */}
      <section ref={technicalStackRef} id="stack" className={`technical-stack-section max-w-7xl mx-auto px-8 py-24 relative z-10 ${techStackAnimationActive ? 'is-active' : ''}`}>
        <header className="technical-stack-header">
          <h3 className="technical-stack-title" aria-label="Technical Skillset">
            <span className="technical-stack-word" aria-hidden="true">
              {'Technical'.split('').map((letter, index) => (
                <span key={`technical-${index}`} className="technical-stack-letter" style={{ '--flash-delay': `${index * 0.17}s` }}>{letter}</span>
              ))}
            </span>
            <span className="technical-stack-word" aria-hidden="true">
              {'Skillset'.split('').map((letter, index) => (
                <span key={`skillset-${index}`} className="technical-stack-letter" style={{ '--flash-delay': `${(7 - index) * 0.17}s` }}>{letter}</span>
              ))}
            </span>
          </h3>
        </header>

        <div className="technical-stack-grid">
          {technicalStack.map((group) => (
            <article key={group.title} className="technical-stack-card">
              <h4 className="technical-stack-card-title" aria-label={group.title} data-title={group.title}>
                {group.title.split(' ').map((word, wordIndex, words) => (
                  <span key={`${group.title}-${wordIndex}`} className="technical-stack-card-word" aria-hidden="true">
                    {word.split('').map((letter, letterIndex) => {
                      const isFirstWord = wordIndex === 0;
                      const isLastWord = wordIndex === words.length - 1;
                      const step = isFirstWord
                        ? letterIndex
                        : isLastWord
                          ? word.length - 1 - letterIndex
                          : Math.ceil(Math.max(...words.map((part) => part.length)) / 2);

                      return (
                        <span
                          key={`${group.title}-${wordIndex}-${letterIndex}`}
                          className={`technical-stack-card-letter ${letter === '&' ? 'is-ampersand' : ''}`}
                          style={{ '--flash-delay': `${step * 0.17}s` }}
                        >
                          {letter}
                        </span>
                      );
                    })}
                  </span>
                ))}
              </h4>
              <p className="technical-stack-description">{group.description}</p>
              <ul className="technical-stack-tags" aria-label={`${group.title} technologies`}>
                {group.technologies.map((technology) => (
                  <li key={technology} className="technical-stack-tag">{technology}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section ref={featuredProjectsRef} id="projects" className={`featured-projects-section max-w-7xl mx-auto px-8 py-24 relative z-10 ${featuredProjectsAnimationActive ? 'is-active' : ''}`}>
        <header className="featured-projects-header">
          <h3 className="featured-projects-title" aria-label="Featured Projects">
            {['Featured', 'Projects'].map((word, wordIndex) => (
              <span key={word} className="featured-projects-word" aria-hidden="true">
                {word.split('').map((letter, letterIndex) => {
                  const flashStep = wordIndex === 0
                    ? letterIndex
                    : word.length - 1 - letterIndex;

                  return (
                    <span
                      key={`${word}-${letterIndex}`}
                      className="featured-projects-letter"
                      style={{ '--flash-delay': `${flashStep * 0.17}s` }}
                    >
                      {letter}
                    </span>
                  );
                })}
              </span>
            ))}
          </h3>
          <p className="featured-projects-intro">A selection of applications built to solve practical problems with thoughtful design and reliable code.</p>
        </header>

        <div
          className="featured-projects-carousel"
          role="region"
          aria-label="Featured projects carousel"
          tabIndex={0}
          onKeyDown={handleProjectKeyDown}
          onPointerDown={handleProjectPointerDown}
          onPointerUp={handleProjectPointerUp}
          onPointerCancel={() => { projectSwipeStartRef.current = null; }}
        >
          <div className="featured-projects-ring">
          {featuredProjects.map((project, index) => {
            let cardPosition = index - activeProjectIndex;
            if (cardPosition > featuredProjects.length / 2) cardPosition -= featuredProjects.length;
            if (cardPosition < -featuredProjects.length / 2) cardPosition += featuredProjects.length;
            const isActive = cardPosition === 0;
            return (
              <article
                key={project.title}
                className={`featured-project-card ${isActive ? 'is-active' : ''}`}
                aria-hidden={!isActive}
                style={{
                  '--card-position': cardPosition,
                  '--card-shift': `${cardPosition * 72}%`,
                  '--card-depth': isActive ? '45px' : '-55px',
                  '--card-tilt': cardPosition < 0 ? '12deg' : cardPosition > 0 ? '-12deg' : '0deg',
                  '--card-scale': isActive ? '1' : '0.78',
                  zIndex: featuredProjects.length - Math.abs(cardPosition),
                }}
              >
                <div className="featured-project-content">
                  <span className="featured-project-type">{project.type}</span>
                  <h4 className="featured-project-name">{project.title}</h4>
                  <p className="featured-project-description">{project.description}</p>
                  <ul className="featured-project-tags" aria-label={`${project.title} technologies`}>
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
          </div>
        </div>

        <div className="featured-project-controls" aria-label="Project navigation">
          <button type="button" className="featured-project-control" onClick={() => moveProject(-1)} aria-label="Previous project">
            <ChevronLeft aria-hidden="true" />
          </button>
          <span className="featured-project-count" aria-live="polite">
            {String(activeProjectIndex + 1).padStart(2, '0')} <span>/</span> {String(featuredProjects.length).padStart(2, '0')}
          </span>
          <button type="button" className="featured-project-control" onClick={() => moveProject(1)} aria-label="Next project">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactSectionRef} id="contact" className={`contact-section max-w-7xl mx-auto px-8 py-24 relative z-10 ${contactAnimationActive ? 'is-active' : ''}`}>
        <div className="contact-intro">
          <span className="contact-eyebrow">HAVE A PROJECT IN MIND?</span>
          <h3 className="contact-title" aria-label="Let’s Connect">
            {['Let’s', 'Connect'].map((word, wordIndex) => (
              <span key={word} className="contact-title-word" aria-hidden="true">
                {word.split('').map((letter, letterIndex) => {
                  const flashStep = wordIndex === 0
                    ? letterIndex
                    : word.length - 1 - letterIndex;

                  return (
                    <span
                      key={`${word}-${letterIndex}`}
                      className="contact-title-letter"
                      style={{ '--flash-delay': `${flashStep * 0.17}s` }}
                    >
                      {letter}
                    </span>
                  );
                })}
              </span>
            ))}
          </h3>
          <p className="contact-description">
            Tell me a little about what you’re building. I’d love to hear about your idea and explore how I can help.
          </p>
        </div>

        <form ref={contactFormRef} className="contact-form" onSubmit={handleContactSubmit}>
          <div className="contact-form-heading">
            <span className="contact-form-status" aria-hidden="true" />
            <span>Send a message</span>
          </div>

          <div className="contact-fields-row">
            <label className="contact-field">
              <span>Your name</span>
              <input type="text" name="name" autoComplete="name" placeholder="Name" required />
              <ValidationError field="name" errors={formState.errors} className="contact-validation-error" />
            </label>
            <label className="contact-field">
              <span>Email address</span>
              <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
              <ValidationError field="email" errors={formState.errors} className="contact-validation-error" />
            </label>
          </div>

          <label className="contact-field">
            <span>Subject</span>
            <input type="text" name="subject" placeholder="What would you like to discuss?" required />
            <ValidationError field="subject" errors={formState.errors} className="contact-validation-error" />
          </label>

          <label className="contact-field">
            <span>Message</span>
            <textarea name="message" rows="5" placeholder="Share a few details about your project..." required />
            <ValidationError field="message" errors={formState.errors} className="contact-validation-error" />
          </label>

          <ValidationError errors={formState.errors} className="contact-validation-error" role="alert" />

          <button className="contact-submit" type="submit" disabled={formState.submitting}>
            {formState.submitting ? 'Sending...' : 'Send Message'}
            {!formState.submitting && <ArrowRight aria-hidden="true" />}
          </button>
        </form>
      </section>

      {contactThankYouOpen && (
        <div
          className="contact-thank-you-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              resetContactForm();
            }
          }}
        >
          <section className="contact-thank-you-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-thank-you-title">
            <button
              type="button"
              className="contact-thank-you-close"
              aria-label="Close thank-you message"
              onClick={() => resetContactForm()}
              autoFocus
            >
              <X aria-hidden="true" />
            </button>
            <span className="contact-thank-you-check" aria-hidden="true">✓</span>
            <h2 id="contact-thank-you-title">Thank you!</h2>
            <p>Your message has been sent successfully. Thanks for getting in touch!</p>
            <p className="contact-thank-you-note">I’ll get back to you as soon as I can.</p>
            <button type="button" className="contact-thank-you-button" onClick={() => resetContactForm()}>
              Got it
            </button>
          </section>
        </div>
      )}

      </div>
    </div>
  );
}
