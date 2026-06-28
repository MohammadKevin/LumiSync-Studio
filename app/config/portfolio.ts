export interface Member {
  name: string;
  nickname?: string;
  role: string;
  avatar: string;
  bio: string;
  skills: string[];
  stats: { label: string; value: string }[];
  socials: {
    github?: string;
    linkedin?: string;
    dribbble?: string;
    twitter?: string;
    email: string;
  };
}

export interface Service {
  title: string;
  description: string;
  iconName: string; // Used to determine which Lucide icon to render
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "webapp" | "uiux" | "backend" | "fullstack";
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  roleDistribution: {
    kevin: string;
    aris: string;
  };
}

export interface SynergyStep {
  number: string;
  title: string;
  lead: string;
  description: string;
}

export const portfolioConfig = {
  teamName: "LumiSync Studio",
  tagline: "Bridging Elegant Design and Robust Architecture",
  description: "A synergistic duo dedicated to crafting bespoke, premium web applications. We combine end-to-end fullstack development with highly automated, secure cloud infrastructure.",
  members: {
    kevin: {
      name: "Mohammad Kevin",
      nickname: "Kevin",
      role: "Fullstack Developer",
      avatar: "/avatar-mohammad-kevin.png",
      bio: "Fokus pada pengembangan aplikasi web end-to-end dengan performa tinggi, mulai dari antarmuka pengguna yang responsif hingga backend yang kuat.",
      skills: ["React / Next.js", "Node.js / Express / NestJS", "TypeScript", "PostgreSQL / MongoDB / Redis", "RESTful & GraphQL APIs", "State Management & Optimization"],
      stats: [
        { label: "Pengalaman Coding", value: "2+ Tahun" },
        { label: "Proyek Selesai", value: "40+" },
        { label: "Uptime Aplikasi", value: "99.9%" }
      ],
      socials: {
        github: "https://github.com/MohammadKevin",
        linkedin: "https://www.linkedin.com/in/mohammad-kevin-arif-rudianto-945733347",
        email: "kvn4.200581@gmail.com"
      }
    } as Member,
    aris: {
      name: "Danendra Athallah",
      nickname: "Danendra",
      role: "DevOps Engineer",
      avatar: "/avatar-danendra-athallah.png",
      bio: "Spesialis dalam merancang infrastruktur cloud yang andal, otomatisasi CI/CD, kontainerisasi, dan memastikan keandalan serta keamanan sistem secara menyeluruh.",
      skills: ["Docker & Kubernetes", "CI/CD & GitHub Actions", "AWS / Google Cloud / VPS", "Linux Admin & Scripting", "Nginx & Reverse Proxy", "Prometheus & Grafana"],
      stats: [
        { label: "Pengalaman DevOps", value: "1+ Tahun" },
        { label: "Server Dikelola", value: "5+" },
        { label: "Uptime Target", value: "99.99%" }
      ],
      socials: {
        github: "https://github.com/DanendraIndiarto",
        linkedin: "https://www.linkedin.com/in/danendra-indiarto",
        email: "indiartodanendra@gmail.com"
      }
    } as Member
  },
  services: [
    {
      title: "Interactive UI/UX Design",
      description: "Bespoke high-fidelity Figma designs, user journeys, wireframing, and custom interactive prototypes that match your brand identity.",
      iconName: "Palette"
    },
    {
      title: "Premium Frontend Engineering",
      description: "Blazing fast web apps built using Next.js, React, and Tailwind CSS. Clean semantics, responsive layouts, and SEO-optimized structures.",
      iconName: "Layout"
    },
    {
      title: "Scalable API & Backend",
      description: "Robust REST and GraphQL APIs using Go and Node.js. High concurrency handling, secure authentication (JWT/OAuth), and rate limiting.",
      iconName: "Server"
    },
    {
      title: "Database Design & Optimization",
      description: "Relational (PostgreSQL) and Non-Relational (MongoDB/Redis) database modeling, query tuning, indexing, and scalable caching mechanisms.",
      iconName: "Database"
    },
    {
      title: "DevOps & Cloud Infrastructure",
      description: "Containerization (Docker), deployment automation (CI/CD), hosting on AWS/GCP, SSL set-up, custom server configs, and monitoring.",
      iconName: "Cloud"
    },
    {
      title: "Full-Stack Integrations",
      description: "Seamless end-to-end integration from payment gateways (Stripe, Midtrans) to email providers, headless CMS, and third-party services.",
      iconName: "Cpu"
    }
  ] as Service[],
  projects: [
    {
      id: "proj-1",
      title: "VeloCommerce - High-Perf Storefront",
      description: "Next-gen headless e-commerce application focusing on sub-second load times, instant search integration, and custom checkout flows.",
      category: "fullstack",
      image: "/project-velo.png",
      techStack: ["Next.js", "Tailwind CSS", "Go", "PostgreSQL", "Redis", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      features: [
        "Sub-second page load times with Server Component caching",
        "Instant search using Typesense/Elasticsearch",
        "Secure payments integration with Stripe Webhooks",
        "Automated inventory sync and backend task scheduling"
      ],
      roleDistribution: {
        kevin: "Membangun sistem e-commerce secara full-stack (Next.js & API Go) serta integrasi payment gateway Stripe.",
        aris: "Mengkonfigurasi container Docker, database PostgreSQL & Redis, dan menyiapkan environment deployment."
      }
    },
    {
      id: "proj-2",
      title: "FinSync - SaaS Wealth Dashboard",
      description: "Financial analytics dashboard for small businesses. Real-time transaction ingestion, visualization graphs, and automated monthly reporting.",
      category: "webapp",
      image: "/project-finsync.png",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Express.js", "Chart.js", "PostgreSQL"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      features: [
        "Interactive canvas-based charting for real-time finance tracker",
        "Secure CSV/PDF bank statement import and parsing",
        "Role-based access control (Admin, Editor, Viewer)",
        "Instant dark/light theme options and custom dashboard widgets"
      ],
      roleDistribution: {
        kevin: "Mendesain dashboard, mengembangkan visualisasi Chart.js, dan memprogram API Express.js & otentikasi.",
        aris: "Mengatur pipeline CI/CD, mengoptimalkan query database, dan mengonfigurasi autoscaling server."
      }
    },
    {
      id: "proj-3",
      title: "Novaship - DevOps Dashboard",
      description: "A centralized dashboard to monitor Kubernetes clusters, check pod states, restart services, and view real-time log aggregates.",
      category: "backend",
      image: "/project-novaship.png",
      techStack: ["Next.js", "WebSockets", "Go", "Kubernetes API", "Docker", "InfluxDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      features: [
        "Real-time WebSocket logs and cluster health updates",
        "One-click actions to scale replicas and roll back deployments",
        "Low latency time-series graphs of CPU/Memory usage",
        "Custom webhook alerts for server health warning thresholds"
      ],
      roleDistribution: {
        kevin: "Mengimplementasikan frontend dashboard, integrasi WebSocket, dan modul monitoring server.",
        aris: "Menyediakan data mock, setup InfluxDB, dan mengamankan Kubernetes API integration."
      }
    },
    {
      id: "proj-4",
      title: "Kreo - Modern Agency Brand & Site",
      description: "Creative agency rebranding project, featuring immersive 3D scroll animations, smooth page transitions, and modern landing layouts.",
      category: "uiux",
      image: "/project-kreo.png",
      techStack: ["Figma", "Next.js", "Framer Motion", "Tailwind CSS", "GSAP"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      features: [
        "Bespoke typography design and vector branding assets",
        "Immersive scroll-linked animation timelines",
        "Perfect 100/100 Google Lighthouse SEO and performance scores",
        "Custom cursor, grid overlays, and magnetic hover nodes"
      ],
      roleDistribution: {
        kevin: "Mendevelop seluruh website Next.js, animasi GSAP/Framer Motion, dan integrasi headless CMS.",
        aris: "Optimalisasi Web Vitals, kompresi aset otomatis pada server, setup CDN, dan integrasi domain."
      }
    }
  ] as Project[],
  synergySteps: [
    {
      number: "01",
      title: "Discovery & Strategy",
      lead: "Joint Collaboration",
      description: "We meet with the client to define the project scope, technical requirements, and target goals. We sketch the initial architectural outline and UX map."
    },
    {
      number: "02",
      title: "UI & Architecture Design",
      lead: "Kevin & Danendra",
      description: "Kevin designs the user interface and database models. Simultaneously, Danendra plans the cloud infrastructure, CI/CD pipeline, and server topology."
    },
    {
      number: "03",
      title: "Development Sprint",
      lead: "Parallel Coding",
      description: "We build. Kevin structures the Next.js frontend and implements the robust backend endpoints, while Danendra sets up development environment, security protocols, and databases."
    },
    {
      number: "04",
      title: "Automated Deployment",
      lead: "Launch & Support",
      description: "We run automated tests and security audits. Danendra deploys the application using Docker & Kubernetes with automated CI/CD pipelines, SSL, and monitoring systems."
    }
  ] as SynergyStep[],
  contactFormUrl: "" // Silakan isi dengan URL Web App Google Apps Script Anda (misal: https://script.google.com/macros/s/.../exec)
};
