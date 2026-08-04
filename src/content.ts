export type LinkItem = { label: string; url: string };
export type Project = {
    id: string;
    title: string;
    summary: string;
    tags: string[];
    links: LinkItem[];
    image?: { src: string; alt: string };
};

export const whoami = {
    name: 'Andrea Pallotta',
    location: 'Philadelphia, PA',
    email: 'andreapallotta.dev@gmail.com',
    roleTitle: 'Production & Software Engineer',
    company: 'Susquehanna',
    tagline: 'Production & Software Engineer specializing in standalone Python applications, full-stack internal platforms, and system automation.',
    education: 'RIT B.S. Web & Mobile Computing (Minor in Cyber Security) — Summa Cum Laude (GPA 3.8)',
    resumeUrl: '/Andrea_Pallotta_Resume.pdf',
    profileImage: '/assets/profile.jpg',
};

export const experience = [
    {
        company: 'Susquehanna',
        role: 'Production Engineer, Equities & Futures Desk',
        location: 'Philadelphia, PA',
        when: 'Jan 2025 - Present',
        bullets: [
            'Architect and develop standalone Python applications, REST APIs, and analytical tools for internal engineering and operational teams.',
            'Build and maintain full-stack internal web applications and dashboards featuring custom authentication, job control, and real-time telemetry.',
            'Automate critical production workflows, environment rollouts, and infrastructure hygiene using Python, Bash, and PowerShell.',
            'Partner with trading, development, and infrastructure teams to diagnose, troubleshoot, and stabilize high-availability production applications.',
            'Enhance continuous observability, monitoring, and SLO tracking across production environments.',
        ],
    },
    {
        company: 'Susquehanna',
        role: 'Systems Engineer',
        location: 'Philadelphia, PA',
        when: 'Aug 2023 - Dec 2024',
        bullets: [
            'Managed Linux and Windows enterprise server fleet health, automation scripting, and incident response for high-availability systems.',
            'Developed custom automation utilities (Python/Bash) to eliminate operational toil and accelerate software release pipelines.',
            'Authored operational runbooks and built system metrics dashboards utilized across cross-functional engineering teams.',
        ],
    },
    {
        company: 'Council Rock',
        role: 'Software Engineer Intern',
        location: 'Rochester, NY',
        when: 'Jan 2022 - Jul 2022',
        bullets: [
            'Developed user-facing web interfaces using React and TypeScript, optimizing component rendering and performance.',
            'Consulted directly with clients on technical requirements, software enhancements, and interface design.',
            'Gained hands-on experience in Linux software development, networking protocols, and web security best practices.',
        ],
    },
];

export const education = {
    school: 'Rochester Institute of Technology (RIT)',
    degree: 'Bachelor of Science in Web and Mobile Computing',
    minor: 'Cyber Security',
    honors: 'Summa Cum Laude',
    graduated: 'May 2023',
    gpa: '3.8 / 4.0',
};

export const skills = {
    languages: ['Python', 'TypeScript', 'JavaScript', 'Bash', 'PowerShell', 'C++', 'SQL', 'HTML/CSS'],
    backend: ['Python (FastAPI, Flask)', 'RESTful APIs', 'Node.js', 'Async/Parallel Scripting', 'Standalone Services'],
    dataTasks: ['Python Data Analysis', 'Pandas & Scripting Pipelines', 'Internal Tooling & Dashboards'],
    frontend: ['React', 'Vite', 'Next.js', 'Tailwind CSS', 'Astro', 'Three.js / WebGL'],
    systems: ['Hardware & Memory Optimization', 'Linux Systems & OS Internals', 'High-Availability Infrastructure', 'System Telemetry'],
    practices: ['Automated Job Control', 'CI/CD Rollouts', 'Observability Tooling', 'System Monitoring', 'Operational Runbooks'],
};

export const socials: LinkItem[] = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/andreapallotta9' },
    { label: 'GitHub', url: 'https://github.com/AndreaPallotta' },
    { label: 'Subroutine CS', url: 'https://subroutine-cs.cc' },
    { label: 'Dot', url: 'https://dot.cards/apdev' },
    { label: 'TryHackMe', url: 'https://tryhackme.com/p/andreapallotta.d' },
];

export const contact = {
    email: 'andreapallotta.dev@gmail.com',
    dot: 'https://dot.cards/apdev',
    location: 'Philadelphia, PA',
};

export const projects: Project[] = [
    {
        id: 'antimatter',
        title: 'antimatter',
        summary: 'Remote bridge and reverse proxy for Google Antigravity featuring local Wi-Fi auto-discovery, Cloudflare Tunnels, mobile PWA dashboard, live log streaming, and a WiX MSI installer.',
        tags: ['Go', 'Reverse Proxy', 'Google Antigravity', 'PWA', 'WiX MSI', 'Windows'],
        links: [
            { label: 'GitHub', url: 'https://github.com/AndreaPallotta/antimatter' },
        ],
    },
    {
        id: 'confignition',
        title: 'confignition',
        summary: 'TypeScript configuration loader supporting JSON, YAML, INI, .env, and TOML with hot-reloading, custom parsing, Express middleware, and AWS S3 / Azure Blob storage support.',
        tags: ['TypeScript', 'NPM', 'Configuration', 'YAML', 'TOML', 'Hot-Reload', 'Express'],
        links: [
            { label: 'NPM Package', url: 'https://www.npmjs.com/package/confignition' },
            { label: 'GitHub', url: 'https://github.com/AndreaPallotta/confignition' },
        ],
    },
    {
        id: 'cmake-gui-editor',
        title: 'cmake-gui-editor',
        summary: 'VS Code extension providing a visual, lossless editor for CMakeLists.txt and *.cmake files to manage metadata, target dependencies, and include directories without breaking raw CMake syntax.',
        tags: ['TypeScript', 'VS Code Extension', 'CMake', 'Visual Editor', 'Developer Tools'],
        links: [
            { label: 'VS Code Marketplace', url: 'https://marketplace.visualstudio.com/items?itemName=AndreaPallotta.cmake-gui-editor&ssr=false#overview' },
            { label: 'GitHub', url: 'https://github.com/AndreaPallotta/cmake-gui-editor' },
        ],
    },
    {
        id: 'btplus',
        title: 'btplus',
        summary: 'Windows background utility that automatically connects Bluetooth audio devices (A2DP & HFP) upon powering on using Win32 device arrival events, Task Scheduler, and a WiX MSI installer.',
        tags: ['C++', 'Win32 API', 'Bluetooth', 'Windows', 'WiX MSI', 'Task Scheduler'],
        links: [
            { label: 'GitHub', url: 'https://github.com/AndreaPallotta/btplus' },
        ],
    },
    {
        id: 'subroutine',
        title: 'subroutine cs',
        summary: 'Subroutine CS (subroutine-cs.cc) is an interactive computer science and systems blog covering algorithms, low-level systems, C++, and networking with audio-visual simulations.',
        tags: ['TypeScript', 'MDX', 'Astro', 'CSS', 'React', 'Web Audio API'],
        links: [
            { label: 'Subroutine CS (Live Site)', url: 'https://subroutine-cs.cc' },
            { label: 'GitHub', url: 'https://github.com/AndreaPallotta/subroutine' },
        ],
        image: { src: '/assets/subroutine.svg', alt: 'Subroutine CS Blog' },
    },
    {
        id: 'strathub',
        title: 'strathub',
        summary: 'Full-stack tool to develop, backtest, and manage trading strategies with real-time analytics.',
        tags: ['TypeScript', 'Python', 'Rust', 'JavaScript'],
        links: [
            { label: 'GitHub', url: 'https://github.com/AndreaPallotta/strat_hub' },
        ],
        image: { src: '/assets/strathub.svg', alt: 'StratHub Trading Tool' },
    },
    {
        id: 'zyra',
        title: 'zyra',
        summary: 'Statically-typed compiled programming language featuring a 100% self-hosted compiler that combines the performance and memory safety of Rust with the velocity of Go.',
        tags: ['Zyra', 'Rust', 'Self-Hosted Compiler', 'Native Code', 'CLI', 'VS Code Extension'],
        links: [
            { label: 'Documentation (Live Site)', url: 'https://zyra-lang.dev' },
            { label: 'GitHub', url: 'https://github.com/AndreaPallotta/zyra' },
        ],
    },
    {
        id: 'ez-templates',
        title: 'ez-templates',
        summary: 'CLI tool to bootstrap pre-configured project templates rapidly with zero boilerplate setup.',
        tags: ['TypeScript', 'Rust', 'JavaScript', 'Elixir', 'Node.js', 'CLI'],
        links: [
            { label: 'NPM', url: 'https://www.npmjs.com/package/ez-templates' },
            { label: 'GitHub', url: 'https://www.github.com/AndreaPallotta/EzWebTemplate#readme' },
        ],
        image: { src: '/assets/ezt_logo.svg', alt: 'Ez-templates Logo' },
    },
    {
        id: 'qex',
        title: 'qex',
        summary: 'Lightweight experiment-runner and lab notebook for quantum computing experiments.',
        tags: ['HTML', 'Python', 'Shell', 'Quantum Computing'],
        links: [
            { label: 'PyPI', url: 'https://pypi.org/project/qex/' },
            { label: 'GitHub', url: 'https://github.com/AndreaPallotta/qex' },
        ],
        image: { src: '/assets/qex.svg', alt: 'QEX Quantum Engine' },
    },
    {
        id: 'qlego',
        title: 'qlego',
        summary: 'Modular Python framework providing quantum computing building blocks and simulation primitives.',
        tags: ['Python', 'Quantum Computing', 'Simulation', 'Modular'],
        links: [
            { label: 'GitHub', url: 'https://github.com/AndreaPallotta/qlego' },
        ],
    },
    {
        id: 'oura-whatsapp-bot',
        title: 'oura-whatsapp-bot',
        summary: 'Automated bot to forward daily health & biometric metrics from Oura ring directly to WhatsApp.',
        tags: ['JavaScript', 'Shell', 'PowerShell', 'Automation', 'API Integration'],
        links: [
            { label: 'GitHub', url: 'https://github.com/AndreaPallotta/oura-whatsapp-bot' },
        ],
        image: { src: '/assets/oura.svg', alt: 'Oura WhatsApp Bot' },
    },
    {
        id: 'gp_forecast',
        title: 'gp_forecast',
        summary: 'Grand Prix prediction dashboard analyzing telemetry and race statistics.',
        tags: ['Dart', 'C++', 'CMake', 'Swift', 'Analytics'],
        links: [
            { label: 'GitHub', url: 'https://github.com/AndreaPallotta/gp_forecast' },
        ],
        image: { src: '/assets/gp.svg', alt: 'GP Forecast' },
    },
];
