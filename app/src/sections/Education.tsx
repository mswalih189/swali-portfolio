import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, BookOpen, School } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    degree: 'Bachelor of Engineering, Information Science',
    institution: 'Visvesvaraya Technological University, Bangalore',
    details: '7.6 CGPA',
    icon: GraduationCap,
    year: '2021',
  },
  {
    degree: 'Cloud Computing and DevOps Certification',
    institution: 'Besant Technologies, Bengaluru',
    details: '2025',
    icon: Award,
    year: '2025',
  },
  {
    degree: 'PUC',
    institution: 'Vidhyanikethana PU College, Kodagu',
    details: '75.5%',
    icon: BookOpen,
    year: '2019',
  },
  {
    degree: 'SSLC',
    institution: 'Anglo Vernacular Composite High School, Kodagu',
    details: '83.2%',
    icon: School,
    year: '2017',
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.education-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline draw
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards 3D flip entrance
      gsap.fromTo(
        '.education-card',
        { rotateY: -90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Connector lines
      gsap.fromTo(
        '.connector-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.4,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 60%',
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
      id="education"
      className="relative py-24 lg:py-32 bg-dark-light"
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="education-title font-display text-5xl lg:text-6xl font-bold text-white mb-16 text-center">
          EDUCATION
        </h2>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Central timeline line */}
          <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-accent via-red-accent/50 to-transparent origin-top hidden lg:block" />

          {/* Education cards */}
          <div className="space-y-8 lg:space-y-0">
            {educationData.map((edu, index) => {
              const Icon = edu.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={edu.degree}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                    index !== 0 ? 'lg:mt-8' : ''
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`education-card perspective-1000 ${
                      isLeft ? 'lg:pr-12' : 'lg:col-start-2 lg:pl-12'
                    }`}
                  >
                    <div
                      className={`preserve-3d p-6 bg-dark rounded-xl border border-white/10 hover:border-red-accent/50 transition-all duration-300 group hover:shadow-glow-red-sm ${
                        isLeft ? 'lg:text-right' : ''
                      }`}
                    >
                      <div className={`flex items-start gap-4 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                        <div className="flex-shrink-0 w-12 h-12 bg-red-accent/10 rounded-lg flex items-center justify-center group-hover:bg-red-accent/20 transition-colors">
                          <Icon size={24} className="text-red-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-xl font-bold text-white group-hover:text-red-accent transition-colors">
                            {edu.degree}
                          </h3>
                          <p className="text-white/70 mt-1">{edu.institution}</p>
                          <div className={`flex items-center gap-4 mt-3 ${isLeft ? 'lg:justify-end' : ''}`}>
                            <span className="px-3 py-1 bg-dark-lighter rounded-full text-sm text-white/80">
                              {edu.details}
                            </span>
                            <span className="text-sm text-red-accent font-medium">
                              {edu.year}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-red-accent rounded-full shadow-glow-red-sm" />
                  </div>

                  {/* Connector line */}
                  <div
                    className={`connector-line hidden lg:block absolute top-1/2 w-12 h-0.5 bg-red-accent/50 origin-left ${
                      isLeft
                        ? 'left-1/2 -translate-x-full'
                        : 'right-1/2 translate-x-full origin-right'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
