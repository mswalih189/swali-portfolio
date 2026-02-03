import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Layers, Cpu, Database, Image, LineChart, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: '3-Tier AWS Web Application',
    shortDesc: 'Scalable web app with VPC, EC2, RDS, and ALB',
    fullDesc: 'Architected and deployed a production-ready 3-tier web application on AWS with complete infrastructure automation. Implemented VPC with public/private subnets across multiple availability zones for high availability. Configured EC2 instances with Auto Scaling Groups, RDS MySQL database with Multi-AZ deployment, and Application Load Balancer with health checks.',
    image: '/project-1.jpg',
    tags: ['VPC', 'EC2', 'RDS', 'ALB', 'IAM', 'MFA', 'Prometheus', 'Grafana', 'Jenkins', 'CI/CD'],
    github: 'https://github.com/mswalih189',
    icon: Layers,
    achievements: [
      'Achieved 99.9% uptime with Multi-AZ deployment',
      'Reduced infrastructure costs by 40% using Reserved Instances',
      'Implemented automated backups with 7-day retention',
    ],
  },
  {
    id: 2,
    title: 'Jenkins–Docker–Kubernetes CI/CD',
    shortDesc: 'End-to-end automated deployment pipeline',
    fullDesc: 'Built a complete CI/CD pipeline using Jenkins, Docker, and Kubernetes for microservice deployments. Provisioned EC2 instances with Amazon Linux 2, installed and configured Git, Docker, Maven, and Jenkins. Created Jenkins pipeline with GitHub webhooks for automatic builds.',
    image: '/project-2.jpg',
    tags: ['EC2', 'Git', 'Docker', 'Maven', 'Jenkins', 'Kubernetes', 'Minikube'],
    github: 'https://github.com/mswalih189',
    icon: Cpu,
    achievements: [
      'Reduced deployment time by 60% through automation',
      'Achieved zero-downtime deployments with rolling updates',
      'Implemented automated rollback on failure',
    ],
  },
  {
    id: 3,
    title: 'Infrastructure Automation with Terraform & Ansible',
    shortDesc: 'IaC for scalable and repeatable infrastructure',
    fullDesc: 'Developed reusable Terraform modules for provisioning complete AWS infrastructure including VPC, EC2 instances, RDS databases, load balancers, and security groups. Combined with Ansible playbooks for consistent server configuration management.',
    image: '/project-3.jpg',
    tags: ['Terraform', 'Ansible', 'VPC', 'EC2', 'RDS', 'Jenkins', 'GitOps'],
    github: 'https://github.com/mswalih189',
    icon: Database,
    achievements: [
      'Reduced infrastructure provisioning time from days to minutes',
      'Achieved 100% configuration consistency across environments',
      'Implemented GitOps workflow for infrastructure changes',
    ],
  },
  {
    id: 4,
    title: 'Serverless Image Processing Pipeline',
    shortDesc: 'Event-driven architecture with Lambda and S3',
    fullDesc: 'Designed and implemented an event-driven serverless architecture for automated image processing. Built using AWS Lambda with Python and Pillow library for image transformations including resizing, cropping, and compression. S3 triggers automatically invoke Lambda functions on image upload.',
    image: '/project-4.jpg',
    tags: ['Lambda', 'S3', 'Python', 'Pillow', 'IAM', 'Terraform'],
    github: 'https://github.com/mswalih189',
    icon: Image,
    achievements: [
      'Processed 1000+ images with 99.9% success rate',
      'Reduced storage costs by 70% through optimization',
      'Achieved sub-second processing latency',
    ],
  },
  {
    id: 5,
    title: 'Scheduled Web Scraper for Market Data',
    shortDesc: 'Real-time data collection and analysis pipeline',
    fullDesc: 'Built a robust web scraping pipeline for gathering real-time market data using AWS Lambda with CloudWatch Events (cron scheduling). Implemented Python-based scrapers with error handling and retry mechanisms. Stored raw data in S3 for archival and processed insights in DynamoDB for fast querying.',
    image: '/project-5.jpg',
    tags: ['Lambda', 'CloudWatch', 'Python', 'S3', 'DynamoDB'],
    github: 'https://github.com/mswalih189',
    icon: LineChart,
    achievements: [
      'Collected data from 50+ sources daily',
      'Achieved 99.5% data accuracy with validation',
      'Built real-time dashboards for data visualization',
    ],
  },
  {
    id: 6,
    title: 'AI Accessibility Assistant',
    shortDesc: 'Computer vision tool for visually impaired users',
    fullDesc: 'Developed an AI-powered desktop assistant using Python and Flask to help visually impaired users navigate their environment. Implemented computer vision features including object detection, color recognition, currency identification, OCR text reading, and barcode scanning using OpenCV and Tesseract.',
    image: '/project-6.jpg',
    tags: ['Python', 'Flask', 'OpenCV', 'OCR', 'AWS', 'Text-to-Speech'],
    github: 'https://github.com/mswalih189',
    icon: Eye,
    achievements: [
      'Achieved 95%+ accuracy in object detection',
      'Supported 10+ Indian currency denominations',
      'Integrated text-to-speech for voice feedback',
    ],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.projects-title',
        { opacity: 0, scale: 0.8 },
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

      // Cards entrance
      gsap.fromTo(
        '.project-card',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.querySelectorAll('.project-card');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : projects.length - 1;
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex < projects.length - 1 ? activeIndex + 1 : 0;
    scrollToCard(newIndex);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 lg:py-32 bg-dark overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <h2 className="projects-title font-display text-5xl lg:text-6xl font-bold text-white">
              PROJECTS
            </h2>
            <p className="text-white/60 mt-2">Click on any project to see full details</p>
          </div>
          
          {/* Navigation arrows */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-red-accent hover:border-red-accent transition-all duration-300"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-red-accent hover:border-red-accent transition-all duration-300"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Projects Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className="project-card flex-shrink-0 w-[85vw] sm:w-[60vw] lg:w-[45vw] snap-center cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="group relative bg-dark-light rounded-2xl overflow-hidden border border-white/10 hover:border-red-accent/50 transition-all duration-500 hover:shadow-glow-red-sm h-full">
                  {/* Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-light via-transparent to-transparent" />
                    
                    {/* Icon badge */}
                    <div className="absolute top-4 left-4 w-10 h-10 bg-red-accent/90 rounded-lg flex items-center justify-center">
                      <Icon size={20} className="text-white" />
                    </div>
                    
                    {/* Overlay links */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 bg-dark/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-accent transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github size={18} />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 bg-dark/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-accent transition-colors"
                        aria-label="View project"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-red-accent transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/70 mb-4 text-sm">
                      {project.shortDesc}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-dark rounded-full text-xs text-white/70 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2.5 py-1 bg-dark rounded-full text-xs text-white/50">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                    
                    {/* View details hint */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-red-accent text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Click for details</span>
                      <ExternalLink size={14} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-red-accent'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-dark-light rounded-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-dark/80 rounded-full flex items-center justify-center text-white hover:bg-red-accent transition-colors z-10"
            >
              ×
            </button>

            {/* Modal content */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-light via-transparent to-transparent" />
            </div>

            <div className="p-6 lg:p-8">
              <h3 className="font-display text-3xl font-bold text-white mb-4">
                {selectedProject.title}
              </h3>
              
              <p className="text-white/70 leading-relaxed mb-6">
                {selectedProject.fullDesc}
              </p>

              {/* Key Achievements */}
              <div className="mb-6">
                <h4 className="font-display text-lg font-bold text-white mb-3">Key Achievements</h4>
                <ul className="space-y-2">
                  {selectedProject.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70">
                      <span className="w-2 h-2 bg-red-accent rounded-full mt-2 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="font-display text-lg font-bold text-white mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-dark rounded-full text-sm text-white/80 border border-white/10 hover:border-red-accent/50 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-red-accent text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
                >
                  <Github size={18} />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
