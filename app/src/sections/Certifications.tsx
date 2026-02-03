import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    title: 'Cloud Computing and DevOps',
    organization: 'Besant Technologies',
    year: '2025',
    description: 'Comprehensive training in AWS, Terraform, Docker, Kubernetes, and CI/CD pipelines.',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.cert-title',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Card 3D flip
      gsap.fromTo(
        '.cert-card',
        { rotateY: 180, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cert-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Border draw
      gsap.fromTo(
        '.cert-border',
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cert-card',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-light"
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="cert-title font-display text-5xl lg:text-6xl font-bold text-white mb-16 text-center">
          CERTIFICATIONS
        </h2>

        {/* Certification Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="cert-card perspective-1000 md:col-span-2 lg:col-span-1 lg:col-start-2"
            >
              <div className="relative preserve-3d group">
                {/* SVG Border */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ overflow: 'visible' }}
                >
                  <rect
                    className="cert-border"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    rx="16"
                    ry="16"
                    fill="none"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeDasharray="1000"
                    strokeDashoffset="1000"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.3))' }}
                  />
                </svg>

                <div className="relative p-6 lg:p-8 bg-dark rounded-2xl border border-white/10 hover:border-red-accent/50 transition-all duration-500 group-hover:shadow-glow-red-sm">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-red-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-accent/20 transition-colors">
                    <Award size={32} className="text-red-accent" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-red-accent transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-white/60 mb-4">{cert.organization}</p>
                  <p className="text-white/70 text-sm mb-6">{cert.description}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-red-accent/10 rounded-full text-sm text-red-accent font-medium">
                      {cert.year}
                    </span>
                    <button
                      className="flex items-center gap-2 text-white/60 hover:text-red-accent transition-colors"
                      onClick={() => alert('Certificate details coming soon!')}
                    >
                      <span className="text-sm">View Certificate</span>
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <p className="text-white/50 text-sm">
            More certifications in progress. Always learning and growing.
          </p>
        </div>
      </div>
    </section>
  );
}
