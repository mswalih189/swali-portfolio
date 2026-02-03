import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, MapPin, Phone, Mail, Github, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Headline animation
      tl.fromTo(
        '.hero-line',
        { rotateX: 90, y: 100, opacity: 0 },
        { rotateX: 0, y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }
      );

      // Role text reveal
      tl.fromTo(
        '.hero-role',
        { width: 0, opacity: 0 },
        { width: '100%', opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // Profile image
      tl.fromTo(
        imageRef.current,
        { scale: 0.5, rotateY: -15, opacity: 0 },
        { scale: 1, rotateY: 0, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)' },
        '-=0.5'
      );

      // Red line draw
      tl.fromTo(
        '.red-line',
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 1.2 },
        '-=0.8'
      );

      // Location and CTA
      tl.fromTo(
        '.hero-meta',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        '-=0.6'
      );

      // Social links
      tl.fromTo(
        '.hero-social',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
        '-=0.3'
      );

      // Scroll-triggered parallax
      gsap.to('.hero-line', {
        y: -80,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '30% top',
          scrub: 1,
        },
      });

      gsap.to(imageRef.current, {
        rotateY: 25,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '30% top',
          scrub: 1,
        },
      });

      gsap.to(contentRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: '20% top',
          end: '50% top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse-follow 3D tilt effect for image
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    
    gsap.to(imageRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-dark"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-dark">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-accent/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Red accent line SVG */}
      <svg
        className="absolute bottom-0 right-0 w-full h-full pointer-events-none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        <path
          className="red-line"
          d="M1920 800 Q 1600 600, 1200 700 T 600 500 T 0 600"
          fill="none"
          stroke="#ff0000"
          strokeWidth="3"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          style={{ filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.5))' }}
        />
      </svg>

      <div className="relative z-10 w-full px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <div ref={headlineRef} className="perspective-1000">
              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight">
                <span className="hero-line block origin-left">MOHAMMED</span>
                <span className="hero-line block origin-left text-red-accent">SWALIH</span>
              </h1>
            </div>

            <div className="mt-6 overflow-hidden">
              <p className="hero-role font-body text-xl sm:text-2xl text-white/90 whitespace-nowrap overflow-hidden">
                DevOps & Cloud Engineer
              </p>
            </div>

            <p className="hero-meta mt-4 text-white/60 max-w-lg">
              Building scalable infrastructure, automating deployments, and optimizing cloud resources 
              with AWS, Terraform, Docker, and Kubernetes.
            </p>

            <div className="hero-meta mt-6 flex items-center gap-2 text-white/60">
              <MapPin size={18} className="text-red-accent" />
              <span className="text-sm sm:text-base">Bengaluru, Karnataka</span>
            </div>

            {/* Quick contact */}
            <div className="hero-meta mt-6 flex flex-wrap gap-4">
              <a
                href="tel:8050244531"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-red-accent transition-colors"
              >
                <Phone size={16} />
                <span>8050244531</span>
              </a>
              <a
                href="mailto:swalihm189@gmail.com"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-red-accent transition-colors"
              >
                <Mail size={16} />
                <span>swalihm189@gmail.com</span>
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hero-meta mt-8 flex flex-wrap gap-4">
              <a
                href="/CV.pdf"
                download
                className="inline-flex items-center gap-3 px-6 py-3 bg-red-accent text-white font-semibold rounded-full hover:bg-red-600 transition-all duration-300 group"
              >
                <span>Download CV</span>
                <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white hover:text-dark transition-all duration-300"
              >
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="hero-meta mt-8 flex gap-3">
              <a
                href="https://github.com/mswalih189"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social w-10 h-10 bg-dark-light rounded-full flex items-center justify-center text-white/60 hover:bg-red-accent hover:text-white transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/mohd-swalih189"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social w-10 h-10 bg-dark-light rounded-full flex items-center justify-center text-white/60 hover:bg-red-accent hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={imageRef}
              className="relative preserve-3d"
              style={{ perspective: '1000px' }}
            >
              <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] lg:w-96 lg:h-[500px] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <img 
                  src="/hero-profile.jpg"
                  alt="Mohammed Swalih - DevOps & Cloud Engineer"
                  className="w-full h-full object-cover object-top"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                
                {/* Badge */}
                <div className="absolute bottom-4 left-4 px-4 py-2 bg-red-accent/90 backdrop-blur-sm rounded-full">
                  <span className="text-sm font-semibold text-white">Available for Work</span>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-accent/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -top-6 -left-6 w-20 h-20 border-2 border-red-accent/30 rounded-full animate-float" />
              
              {/* Experience badge */}
              <div className="absolute -right-4 top-1/4 px-4 py-3 bg-dark-light border border-white/10 rounded-xl shadow-xl">
                <div className="font-display text-2xl font-bold text-red-accent">1+</div>
                <div className="text-xs text-white/60">Year Exp.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-red-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
