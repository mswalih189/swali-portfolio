import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cloud, Server, Container, Code, Terminal, Network } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'Cloud Platforms',
    icon: Cloud,
    skills: ['AWS (EC2, VPC, S3, Lambda, RDS, ALB, CloudWatch, IAM, Route 53)', 'Azure'],
    color: 'from-orange-500 to-yellow-500',
  },
  {
    name: 'IaC & CI/CD',
    icon: Server,
    skills: ['Terraform Cloud', 'Ansible', 'Jenkins', 'Git', 'GitHub', 'GitOps'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Containers & Orchestration',
    icon: Container,
    skills: ['Docker', 'Kubernetes', 'Minikube', 'Deployments', 'Services'],
    color: 'from-blue-600 to-indigo-500',
  },
  {
    name: 'Monitoring & Observability',
    icon: Terminal,
    skills: ['Prometheus', 'Grafana', 'CloudWatch', 'Log Analytics'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Programming & Scripting',
    icon: Code,
    skills: ['Python', 'Bash', 'YAML', 'JSON', 'HCL'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Systems & Networking',
    icon: Network,
    skills: ['Linux (Ubuntu, CentOS)', 'CCNA-level Networking', 'TCP/IP', 'DNS', 'Load Balancing'],
    color: 'from-red-500 to-rose-500',
  },
];

const highlights = [
  {
    value: '6+',
    label: 'Real-world Projects',
    description: 'Production-ready implementations',
  },
  {
    value: '15+',
    label: 'AWS Services',
    description: 'Hands-on experience',
  },
  {
    value: 'IaC',
    label: 'Infrastructure as Code',
    description: 'Terraform & Ansible expert',
  },
  {
    value: 'CI/CD',
    label: 'Pipeline Automation',
    description: 'Jenkins & GitOps workflows',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title vertical reveal
      gsap.fromTo(
        titleRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Bio paragraphs slide in
      gsap.fromTo(
        '.about-paragraph',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skill category cards
      gsap.fromTo(
        '.skill-category-card',
        { y: 50, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Highlights
      gsap.fromTo(
        '.highlight-card',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.highlights-grid',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Red accent bar
      gsap.fromTo(
        '.red-accent-bar',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
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
      id="about"
      className="relative py-24 lg:py-32 bg-dark"
    >
      {/* Red accent bar */}
      <div className="red-accent-bar absolute left-0 top-0 w-1 h-full bg-red-accent origin-bottom" />

      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16">
          {/* Vertical Title */}
          <div className="lg:w-16">
            <h2
              ref={titleRef}
              className="font-display text-4xl lg:text-5xl font-bold text-white lg:writing-mode-vertical lg:rotate-180 whitespace-nowrap"
              style={{ writingMode: 'vertical-rl' }}
            >
              ABOUT ME
            </h2>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* Bio */}
            <div className="space-y-6">
              <p className="about-paragraph text-lg lg:text-xl text-white/80 leading-relaxed">
                Results-driven <span className="text-red-accent font-semibold">DevOps and Cloud Engineer</span> with hands-on experience 
                in cost-optimized AWS infrastructure, CI/CD pipelines, Terraform IaC, Docker containerization, and Kubernetes orchestration. 
                I specialize in building scalable, secure, and highly available systems.
              </p>
              <p className="about-paragraph text-lg text-white/70 leading-relaxed">
                My expertise spans the full DevOps lifecycle—from infrastructure provisioning and configuration management 
                to automated deployments and monitoring. I've successfully implemented 3-tier web applications, serverless 
                data pipelines, and accessibility-focused solutions through intensive project-based training at Besant Technologies.
              </p>
              <p className="about-paragraph text-lg text-white/70 leading-relaxed">
                Passionate about automation, I believe in "Infrastructure as Code" principles and continuously strive to 
                optimize deployment processes, reduce costs, and improve system reliability. I'm always eager to learn 
                new technologies and tackle complex infrastructure challenges.
              </p>
            </div>

            {/* Highlights */}
            <div className="highlights-grid grid grid-cols-2 lg:grid-cols-4 gap-4">
              {highlights.map((stat) => (
                <div
                  key={stat.label}
                  className="highlight-card p-4 bg-dark-light rounded-xl border border-white/5 hover:border-red-accent/30 transition-all duration-300 group"
                >
                  <div className="font-display text-3xl lg:text-4xl font-bold text-red-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-white group-hover:text-red-accent transition-colors">
                    {stat.label}
                  </div>
                  <div className="text-xs text-white/50 mt-1">{stat.description}</div>
                </div>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="skills-grid">
              <h3 className="font-display text-2xl font-bold text-white mb-6">
                Technical Expertise
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.name}
                      className="skill-category-card perspective-1000 group"
                    >
                      <div className="preserve-3d p-5 bg-dark-light rounded-xl border border-white/10 hover:border-red-accent/50 transition-all duration-500 h-full">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <h4 className="font-display text-lg font-bold text-white mb-3 group-hover:text-red-accent transition-colors">
                          {category.name}
                        </h4>
                        <ul className="space-y-1.5">
                          {category.skills.map((skill) => (
                            <li key={skill} className="text-sm text-white/60 flex items-start gap-2">
                              <span className="w-1 h-1 bg-red-accent rounded-full mt-2 flex-shrink-0" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
