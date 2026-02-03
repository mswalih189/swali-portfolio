import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const languages = [
  { name: 'English', proficiency: 95 },
  { name: 'Hindi', proficiency: 90 },
  { name: 'Malayalam', proficiency: 100 },
  { name: 'Kannada', proficiency: 85 },
  { name: 'Tamil', proficiency: 70 },
];

export default function Languages() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.languages-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Language pills pop in
      gsap.fromTo(
        '.language-pill',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.languages-container',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Progress rings draw
      gsap.fromTo(
        '.progress-ring-circle',
        { strokeDashoffset: 283 },
        {
          strokeDashoffset: (i: number) => 283 - (283 * languages[i].proficiency) / 100,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.languages-container',
            start: 'top 80%',
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
      className="relative py-24 lg:py-32 bg-dark"
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="languages-title font-display text-5xl lg:text-6xl font-bold text-white mb-16 text-center">
          LANGUAGES
        </h2>

        {/* Languages Grid */}
        <div className="languages-container flex flex-wrap justify-center gap-8 lg:gap-12">
          {languages.map((lang) => {
            const circumference = 2 * Math.PI * 45; // radius = 45
            const strokeDashoffset = circumference - (circumference * lang.proficiency) / 100;

            return (
              <div
                key={lang.name}
                className="language-pill flex flex-col items-center gap-4"
              >
                {/* Circular Progress */}
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#1a1a1a"
                      strokeWidth="8"
                    />
                    {/* Progress circle */}
                    <circle
                      className="progress-ring-circle"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#ff0000"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      style={{ filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.5))' }}
                    />
                  </svg>
                  {/* Percentage */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-xl font-bold text-white">
                      {lang.proficiency}%
                    </span>
                  </div>
                </div>

                {/* Language name */}
                <span className="font-medium text-white/80">{lang.name}</span>
              </div>
            );
          })}
        </div>

        {/* Description */}
        <p className="text-center text-white/50 mt-12 max-w-2xl mx-auto">
          Multilingual professional with strong communication skills in English, Hindi, 
          Malayalam, Kannada, and Tamil. Able to collaborate effectively across diverse teams.
        </p>
      </div>
    </section>
  );
}
