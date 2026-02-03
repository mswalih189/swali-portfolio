import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Calendar, CheckCircle2, Award, BookOpen, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experienceData = {
  company: 'Besant Technologies',
  location: 'Bengaluru',
  period: '2025 – Present',
  role: 'DevOps & Cloud Trainee',
  responsibilities: [
    'Completed intensive hands-on labs on AWS services including EC2, S3, Lambda, VPC, RDS, IAM, and CloudWatch, focusing on secure and scalable cloud architecture design.',
    'Configured end-to-end Jenkins CI/CD pipelines with GitHub webhooks, Maven builds, Docker image creation, and automated deployments to Kubernetes clusters.',
    'Used Terraform and Ansible for infrastructure automation, creating reusable modules and playbooks for consistent environment provisioning.',
    'Implemented monitoring and observability solutions using Prometheus and Grafana for real-time system health tracking.',
    'Developed Python scripts for AWS resource management and automation of repetitive tasks.',
  ],
};

const skills = [
  'AWS', 'Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Python', 'Prometheus', 'Grafana'
];

const certifications = [
  {
    name: 'AWS Cloud Practitioner',
    status: 'In Progress',
  },
  {
    name: 'Terraform Associate',
    status: 'Planned',
  },
  {
    name: 'Kubernetes Administrator (CKA)',
    status: 'Planned',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showCertifications, setShowCertifications] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title letter cascade
      gsap.fromTo(
        '.experience-title span',
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline line
      gsap.fromTo(
        '.experience-timeline',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Company name slide
      gsap.fromTo(
        '.company-name',
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.experience-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Bullet points stagger
      gsap.fromTo(
        '.responsibility-item',
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.responsibilities-list',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Period badge pop
      gsap.fromTo(
        '.period-badge',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.period-badge',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skill tags
      gsap.fromTo(
        '.exp-skill-tag',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.exp-skills',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split title into letters
  const titleLetters = 'EXPERIENCE'.split('');

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 lg:py-32 bg-dark"
    >
      {/* Timeline line on left */}
      <div className="experience-timeline absolute left-6 lg:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-accent via-red-accent/50 to-transparent origin-top" />

      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="experience-title font-display text-5xl lg:text-6xl font-bold text-white mb-16">
          {titleLetters.map((letter, index) => (
            <span key={index} className="inline-block">
              {letter}
            </span>
          ))}
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Experience Card */}
          <div className="lg:col-span-2">
            <div className="experience-card relative ml-8 lg:ml-16">
              {/* Timeline dot */}
              <div className="absolute -left-8 lg:-left-16 top-0 w-4 h-4 bg-red-accent rounded-full shadow-glow-red-sm -translate-x-1/2" />

              <div className="bg-dark-light rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-red-accent/30 transition-all duration-500">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-red-accent/10 rounded-xl flex items-center justify-center">
                        <Building2 size={24} className="text-red-accent" />
                      </div>
                      <div>
                        <h3 className="company-name font-display text-2xl lg:text-3xl font-bold text-white">
                          {experienceData.company}
                        </h3>
                        <p className="text-white/60">{experienceData.location}</p>
                      </div>
                    </div>
                    <p className="text-red-accent font-medium mt-2">{experienceData.role}</p>
                  </div>

                  {/* Period badge */}
                  <div className="period-badge inline-flex items-center gap-2 px-4 py-2 bg-red-accent/10 rounded-full border border-red-accent/30">
                    <Calendar size={16} className="text-red-accent" />
                    <span className="text-sm font-medium text-red-accent">{experienceData.period}</span>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="responsibilities-list space-y-4">
                  {experienceData.responsibilities.map((item, index) => (
                    <div
                      key={index}
                      className="responsibility-item flex items-start gap-3"
                    >
                      <CheckCircle2 size={20} className="text-red-accent flex-shrink-0 mt-0.5" />
                      <p className="text-white/80 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="exp-skills mt-8 pt-6 border-t border-white/10">
                  <h4 className="text-sm font-medium text-white/60 mb-4">Technologies Mastered</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="exp-skill-tag px-3 py-1.5 bg-dark rounded-full text-sm text-white/80 border border-white/10 hover:border-red-accent hover:text-red-accent transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications & Learning */}
          <div className="space-y-6">
            {/* Certification Tracker */}
            <div className="bg-dark-light rounded-2xl p-6 border border-white/10">
              <button
                onClick={() => setShowCertifications(!showCertifications)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-accent/10 rounded-lg flex items-center justify-center">
                    <Award size={20} className="text-red-accent" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold text-white">Certification Roadmap</h4>
                    <p className="text-sm text-white/50">My learning journey</p>
                  </div>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`text-white/50 transition-transform ${showCertifications ? 'rotate-180' : ''}`}
                />
              </button>

              {showCertifications && (
                <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={cert.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-dark flex items-center justify-center text-xs text-white/50">
                          {index + 1}
                        </span>
                        <span className="text-sm text-white/70">{cert.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        cert.status === 'In Progress' 
                          ? 'bg-yellow-500/20 text-yellow-500' 
                          : 'bg-white/10 text-white/50'
                      }`}>
                        {cert.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Training Highlights */}
            <div className="bg-dark-light rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-accent/10 rounded-lg flex items-center justify-center">
                  <BookOpen size={20} className="text-red-accent" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-white">Training Highlights</h4>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-red-accent rounded-full mt-2 flex-shrink-0" />
                  200+ hours of hands-on lab practice
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-red-accent rounded-full mt-2 flex-shrink-0" />
                  6 production-grade projects completed
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-red-accent rounded-full mt-2 flex-shrink-0" />
                  Real-world scenario simulations
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-red-accent rounded-full mt-2 flex-shrink-0" />
                  Industry mentor guidance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
