import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Github, Linkedin, Send, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '8050244531', href: 'tel:8050244531' },
  { icon: Mail, label: 'Email', value: 'swalihm189@gmail.com', href: 'mailto:swalihm189@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Bengaluru, Karnataka', href: '#' },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/mswalih189' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/mohd-swalih189' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title split words animation
      gsap.fromTo(
        '.contact-title-word',
        { opacity: 0, x: (i: number) => (i === 0 ? -50 : 50) },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact info stagger
      gsap.fromTo(
        '.contact-info-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Social icons pop
      gsap.fromTo(
        '.social-icon',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.social-links',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form fields slide up
      gsap.fromTo(
        '.form-field',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Submit button bounce
      gsap.fromTo(
        '.submit-btn',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.submit-btn',
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent successfully! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 bg-dark-light"
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="font-display text-5xl lg:text-6xl font-bold text-white mb-16 text-center">
          <span className="contact-title-word inline-block">LET'S</span>{' '}
          <span className="contact-title-word inline-block text-red-accent">CONNECT</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <div className="contact-info space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="contact-info-item flex items-center gap-4 p-4 bg-dark rounded-xl border border-white/10 hover:border-red-accent/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-red-accent/10 rounded-lg flex items-center justify-center group-hover:bg-red-accent/20 transition-colors">
                      <Icon size={24} className="text-red-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">{item.label}</p>
                      <p className="text-white font-medium group-hover:text-red-accent transition-colors">
                        {item.value}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="ml-auto text-white/30 group-hover:text-red-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    />
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="social-links mt-8">
              <p className="text-sm text-white/50 mb-4">Follow me on</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon w-12 h-12 bg-dark rounded-xl border border-white/10 flex items-center justify-center text-white hover:bg-red-accent hover:border-red-accent transition-all duration-300 hover:scale-110"
                      aria-label={social.label}
                    >
                      <Icon size={22} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="contact-form space-y-6">
            <div className="form-field">
              <label htmlFor="name" className="block text-sm text-white/60 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark rounded-xl border border-white/10 text-white placeholder-white/30 focus:border-red-accent focus:outline-none focus:ring-2 focus:ring-red-accent/20 transition-all"
                placeholder="John Doe"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="block text-sm text-white/60 mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark rounded-xl border border-white/10 text-white placeholder-white/30 focus:border-red-accent focus:outline-none focus:ring-2 focus:ring-red-accent/20 transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div className="form-field">
              <label htmlFor="message" className="block text-sm text-white/60 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-dark rounded-xl border border-white/10 text-white placeholder-white/30 focus:border-red-accent focus:outline-none focus:ring-2 focus:ring-red-accent/20 transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn w-full py-4 bg-red-accent text-white font-semibold rounded-xl hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
