export interface Member {
  name: string;
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
  description: "A synergistic duo dedicated to crafting bespoke, premium web applications. We combine pixel-perfect frontend design with highly scalable, secure backend systems.",
  members: {
    kevin: {
      name: "Kevin Pratama",
      role: "UI/UX Designer & Frontend Dev",
      avatar: "/avatar-kevin.png",
      bio: "Passionate about creating fluid interfaces, interactive animations, and responsive frontend systems that deliver delightful user experiences. Believes that code should be as clean as the design.",
      skills: ["React / Next.js", "Tailwind CSS v4", "TypeScript", "Figma Design", "UI/UX Architecture", "SEO & Core Web Vitals"],
      stats: [
        { label: "Design Experience", value: "4+ Years" },
        { label: "Completed Projects", value: "24+" },
        { label: "Coffee Consumed", value: "850+ Cups" }
      ],
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        dribbble: "https://dribbble.com",
        email: "kevin@lumisync.dev"
      }
    } as Member,
    aris: {
      name: "Aris Setiawan",
      role: "Backend Architect & DevOps",
      avatar: "/avatar-aris.png",
      bio: "Specializing in designing secure, scalable databases, high-throughput APIs, cloud infrastructure, and robust automated pipelines. Passionate about system optimization and 99.99% uptime.",
      skills: ["Node.js / Express / Go", "PostgreSQL / Redis", "Docker & Kubernetes", "AWS & Google Cloud", "CI/CD & Github Actions", "REST & GraphQL APIs"],
      stats: [
        { label: "DevOps Experience", value: "5+ Years" },
        { label: "Systems Deployed", value: "15+" },
        { label: "Server Uptime Target", value: "99.99%" }
      ],
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "aris@lumisync.dev"
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
        kevin: "Created design system, interactive UI, custom cart animations, and landing pages.",
        aris: "Designed database schema, built high-performance Go API, and orchestrated Docker deployment."
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
        kevin: "Engineered high-fidelity charts, UI components, dashboard responsiveness, and dark mode.",
        aris: "Implemented secure backend authentication, PDF parser worker, and API endpoint optimizations."
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
        kevin: "Built dashboard interface layout, terminal view component, and status notifications.",
        aris: "Integrated direct Kubernetes API Client, built high-speed logs streaming, and set up InfluxDB."
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
        kevin: "Led the visual direction, Figma prototyping, copywriting, and interactive scroll engineering.",
        aris: "Optimized server rendering, CDN caching, image processing pipelines, and asset compression."
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
      title: "UI/UX & Schema Design",
      lead: "Kevin & Aris",
      description: "Kevin designs high-fidelity prototypes in Figma, establishing the visual aesthetic. Simultaneously, Aris designs the database schema and defines API contracts."
    },
    {
      number: "03",
      title: "Development Sprint",
      lead: "Parallel Coding",
      description: "We build. Kevin structures the Next.js frontend with pixel-perfect components, while Aris crafts the performant backend endpoints. We integrate continuously."
    },
    {
      number: "04",
      title: "Testing & Deployment",
      lead: "Launch & Support",
      description: "We run automated tests, analyze Core Web Vitals, and optimize load speeds. Aris deploys the app to AWS/GCP with automated SSL and monitoring, ready for users."
    }
  ] as SynergyStep[]
};
