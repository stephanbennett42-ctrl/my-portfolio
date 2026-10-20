import { Store, Cpu, Users, Shield, ArrowRight } from 'lucide-react';

export default function App() {
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
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');
        .font-futuristic {
          font-family: 'Orbitron', sans-serif;
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
            <a href="#about" className="hover:text-white transition py-1">About</a>
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
            <span className="text-xs tracking-[0.3em] text-gray-400 uppercase font-bold">SOFTWARE DEVELOPER</span>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-white font-futuristic uppercase">
              STEPHAN BENNETT
            </h2>

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
      <section id="about" className="py-28 max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid md:grid-cols-2 items-center gap-16">
          <div className="relative flex justify-center items-center order-2 md:order-1">
            <div className="w-72 h-72 md:w-[380px] md:h-[380px] animate-morph transition-all duration-700" />
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <span className="text-xs tracking-[0.3em] text-gray-400 uppercase font-bold">WHO I AM</span>
            <h3 className="text-2xl md:text-3xl font-bold leading-snug">
              Passionate software developer building polished digital solutions with modern frameworks.
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transitioning into advanced software development engineering, combining rigorous technical discipline with high-end interactive visual design.
            </p>
            <button className="px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/20 transition text-xs font-semibold uppercase">
              Read More
            </button>
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