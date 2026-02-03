import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Code, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Large name stroke draw
      gsap.fromTo(
        '.footer-name',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Links stagger fade
      gsap.fromTo(
        '.footer-link',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer-links',
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Copyright fade
      gsap.fromTo(
        '.footer-copyright',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.footer-copyright',
            start: 'top 98%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 lg:py-24 bg-dark border-t border-white/5"
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Large Name */}
        <div className="footer-name relative mb-12 text-center overflow-hidden">
          <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold text-outline text-white/10">
            MOHAMMED SWALIH
          </h2>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-lg sm:text-xl text-white/40">DevOps & Cloud Engineer</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links flex flex-wrap justify-center gap-6 lg:gap-8 mb-12">
          {quickLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="footer-link text-white/60 hover:text-red-accent transition-colors duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Back to top */}
        <div className="flex justify-center mb-8">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-6 py-3 bg-dark-light rounded-full border border-white/10 hover:border-red-accent hover:bg-red-accent/10 transition-all duration-300 group"
          >
            <ArrowUp size={18} className="text-white/60 group-hover:text-red-accent transition-colors" />
            <span className="text-sm text-white/60 group-hover:text-red-accent transition-colors">Back to Top</span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Copyright */}
        <div className="footer-copyright flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p className="flex items-center gap-1">
            © 2025 Mohammed Swalih. Made with{' '}
            <Heart size={14} className="text-red-accent fill-red-accent" /> in Bengaluru
          </p>
          <p className="flex items-center gap-2">
            <Code size={14} />
            <span>Built with React, TypeScript, Tailwind CSS & GSAP</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
