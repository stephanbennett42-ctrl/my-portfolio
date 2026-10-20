import { Store, Cpu, Users, Shield, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function App() {
  const [aboutGlowPulse, setAboutGlowPulse] = useState(0);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    const aboutSection = aboutSectionRef.current;
    if (!aboutSection) return;

    let wasVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasVisible) {
          setAboutGlowPulse((pulse) => pulse + 1);
          wasVisible = true;
        } else if (!entry.isIntersecting) {
          wasVisible = false;
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(aboutSection);
    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <Store className="w-6 h-6 text-purple-400" />,
      title: "Consumer Markets",
      desc: "With a track record of success across diverse industries, we deliver tailored web solutions that drive growth."
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      title: "Technology Consulting",
      desc: "Building long-term tech solutions centered on scalable architecture, clean code, and modern UI performance."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "Consulting Service",
      desc: "Providing strategic development insights enabling you to offer innovative digital experiences."
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      title: "Private Consulting",
      desc: "Dedicated personal consultation for bespoke software applications tailored to unique brand needs."
    }
  ];

  return (
    <div className="min-h-screen bg-[#07030d] text-white selection:bg-purple-500 selection:text-white font-sans relative overflow-x-hidden pt-6">
      
      {/* Google Fonts - Orbitron */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anta&family=Audiowide&family=Orbitron:wght@700;900&display=swap');
        .font-futuristic {
          font-family: 'Orbitron', sans-serif;
        }
        .font-logo {
          font-family: 'Audiowide', sans-serif;
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
        <nav className="bg-[#120a1c]/70 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-2xl shadow-purple-950/40">
          
          {/* Brand Initials: S (Pink) and B (White) */}
          <div className="flex items-center space-x-0.5">
            <span className="text-pink-500 font-futuristic text-xl font-black">S</span>
            <span className="text-white font-futuristic text-xl font-black">B</span>
          </div>

          {/* Clean Navigation Links: Home & About only */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-medium text-gray-300">
            <a href="#home" className="relative text-white font-semibold py-1 group">
              Home
              <span className="absolute left-0 right-0 -bottom-1 h-[2.5px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
            </a>
            <a href="#about" onClick={() => setAboutGlowPulse((pulse) => pulse + 1)} className="hover:text-white transition py-1">About</a>
          </div>

          {/* Pill Action Button */}
          <button className="px-5 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md transition text-xs font-medium tracking-wide text-white">
            Start A Project
          </button>
        </nav>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center max-w-7xl mx-auto px-8 pt-24 relative z-10">
        <div className="grid md:grid-cols-2 items-center gap-12 w-full">
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs tracking-[0.3em] text-gray-400 uppercase font-bold">SOFTWARE DEVELOPER</span>
              <h2 className="text-[clamp(1.5rem,5.2vw,3.25rem)] font-black tracking-[-0.04em] leading-none [word-spacing:0.12em] text-white font-logo uppercase">
                STEPHAN BENNETT
              </h2>
            </div>

            <p className="text-gray-400 max-w-md text-sm leading-relaxed">
              Developing scalable web applications and digital platforms with clean architecture, modern UI performance, and innovative design.
            </p>
            <div className="pt-2">
              <button className="px-7 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/20 transition text-xs font-semibold tracking-wider uppercase shadow-lg shadow-purple-900/20">
                Explore Work
              </button>
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
        <div className="grid md:grid-cols-2 items-center gap-16">
          <div className="about-portrait-frame w-72 h-96 md:w-[420px] md:h-[540px] order-2 md:order-1 md:translate-x-12 animate-heroFloat">
            <img
              src="/stephan-bennett.png"
              alt="Portrait of Stephan Bennett"
              className="about-portrait-image"
            />
          </div>

          <div className="space-y-6 order-1 md:order-2 relative">
            <span key={aboutGlowPulse} aria-hidden="true" className={`about-watermark ${aboutGlowPulse ? 'about-watermark-pulse' : ''}`}>ABOUT</span>
            <p className="relative z-10 max-w-xl text-sm md:text-base leading-relaxed text-gray-300 font-anta">
              I am a full-stack software developer passionate about solving complex logical problems and transforming them into smooth, responsive digital experiences. Building on a strong foundational programming background, I am currently sharpening my technical toolkit through intensive full-stack training at Life Choices Academy. I love bridging the gap between robust backend logic and user-friendly frontend design.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-8 relative z-10">
        <div className="space-y-3 mb-12">
          <span className="text-xs tracking-[0.3em] text-gray-400 uppercase font-bold">WHAT I DO</span>
          <h3 className="text-3xl md:text-4xl font-bold">
            Elevate Your Platform With <br />
            <span className="text-purple-400">Tailored Modern Solutions</span>
          </h3>
        </div>

        {/* Glassmorphism Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:bg-white/[0.07] hover:border-purple-500/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-purple-950/40 w-fit border border-purple-500/20">
                  {s.icon}
                </div>
                <h4 className="font-bold text-lg text-white group-hover:text-purple-300 transition">{s.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
              </div>

              <div className="pt-8 flex justify-end">
                <button className="p-2 rounded-full border border-white/10 group-hover:border-purple-400 group-hover:bg-purple-500/20 transition">
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
