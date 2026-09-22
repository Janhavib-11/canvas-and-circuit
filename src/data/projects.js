// Technical projects (from résumé). Each card follows problem → solution → tech → outcome.
export const projects = [
  {
    id: 'six-wheel-rover',
    title: '6-Wheel Rover with Robotic Arm & Camera',
    year: '2025',
    tags: ['Embedded', 'Robotics'],
    problem:
      'Hazardous and hard-to-reach terrain needs remote navigation and object handling without a human on site.',
    solution:
      'Designed a 6-wheel rover with an integrated robotic arm and camera, adding real-time monitoring and obstacle detection via embedded systems and sensor fusion.',
    tech: ['Embedded C', 'Arduino', 'Sensors', 'Robotics'],
    role: 'Team project — hardware & controls',
    outcome:
      'Enhanced mobility across diverse terrains for search & rescue, agriculture and industrial inspection.',
    links: { demo: '#', code: '#' },
    image: 'https://picsum.photos/seed/rover/800/560',
  },
  {
    id: 'ai-fish-farm',
    title: 'AI-Driven Fish Farm Monitoring System',
    year: '2025',
    tags: ['AI', 'IoT'],
    problem:
      'Fish farms need constant water-quality monitoring; manual checks miss abnormal conditions until it is too late.',
    solution:
      'Built an AI-powered IoT system that tracks temperature, TDS and light intensity continuously, with AI-driven analysis and intelligent alerts for abnormal conditions.',
    tech: ['IoT', 'Sensors', 'Embedded C', 'AI'],
    role: 'Team project — sensing & alerts',
    outcome:
      'Supports predictive monitoring and more efficient, lower-loss fish-farm management.',
    links: { demo: '#', code: '#' },
    image: 'https://picsum.photos/seed/fishfarm/800/560',
  },
  {
    id: 'smart-hay-cutter',
    title: 'Smart Hay Cutter',
    year: '2024',
    tags: ['Embedded', 'Agriculture'],
    problem:
      'Manual farm labour for cutting and sowing is slow, tiring and hard to scale.',
    solution:
      'Engineered an Embedded-C automation vehicle on Arduino Uno with an automated seed-sowing mechanism and a fire-extinguishing function.',
    tech: ['Arduino Uno', 'Embedded C', 'Actuators'],
    role: 'Independent project — full HW/SW integration',
    outcome: 'Reduced manual labour while adding sowing and safety functions in one build.',
    links: { demo: '#', code: '#' },
    image: 'https://picsum.photos/seed/haycutter/800/560',
  },
  {
    id: 'smart-queue',
    title: 'Intelligent Digital Queue & Smart Calling System',
    year: '2024',
    tags: ['Embedded', 'Systems'],
    problem:
      'Institutional and healthcare queues rely on manual calling and displays, which is slow and error-prone.',
    solution:
      'Designed an embedded solution for automated queue management and real-time digital call display with intelligent notifications and microcontroller-based control.',
    tech: ['Microcontroller', 'Display Interfacing', 'Embedded C'],
    role: 'Team project — control & display',
    outcome:
      'A scalable, reliable calling system that cuts manual intervention and improves flow.',
    links: { demo: '#', code: '#' },
    image: 'https://picsum.photos/seed/queue/800/560',
  },
  {
    id: 'my-cafe-web',
    title: 'My Café — Responsive Frontend Web App',
    year: '2025',
    tags: ['Frontend', 'Web'],
    problem: 'A small café needed a modern, mobile-friendly web presence.',
    solution:
      'Developed a responsive café website with an intuitive UI, using the Replit AI-assisted environment to accelerate development, testing and deployment.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Replit'],
    role: 'Independent project — design & build',
    outcome: 'A responsive, deployable site following modern frontend practices.',
    links: { demo: '#', code: '#' },
    image: 'https://picsum.photos/seed/cafeweb/800/560',
  },
  {
    id: 'ev-smart-platform',
    title: 'EV Smart Platform — Intelligent EV Infrastructure',
    year: '2026',
    tags: ['Research', 'AI · IoT · GIS'],
    problem:
      'EV adoption is limited by poor charging discovery, range anxiety and unplanned battery health.',
    solution:
      'Researched an AI-powered EV ecosystem: GIS-based route optimization, predictive battery-health monitoring and intelligent charging-station discovery, integrating AI, IoT, GIS, Cloud and ITS.',
    tech: ['AI', 'GIS', 'IoT', 'Cloud'],
    role: 'IEEE-format research paper — author',
    outcome:
      'Authored the full paper: literature review, system design, technical analysis and evaluation.',
    links: { demo: '#', code: '#' },
    image: 'https://picsum.photos/seed/evsmart/800/560',
  },
]
