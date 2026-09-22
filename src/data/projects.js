// Technical projects. Each card follows problem → solution → tech → outcome.
export const projects = [
  {
    id: 'smart-energy-meter',
    title: 'Smart Energy Meter',
    year: '2025',
    tags: ['Embedded', 'IoT'],
    problem:
      'Households had no easy way to see real-time power consumption, making it hard to cut waste.',
    solution:
      'Built an ESP32-based meter that reads current/voltage sensors and streams usage to a live dashboard with threshold alerts.',
    tech: ['ESP32', 'C++', 'MQTT', 'Node.js'],
    role: 'Hardware + firmware',
    outcome: 'Reduced monitored-load standby draw by ~18% in test homes.',
    links: { demo: '#', code: '#' },
    image: 'https://picsum.photos/seed/energy-meter/800/560',
  },
  {
    id: 'fault-tolerant-link',
    title: 'Fault-Tolerant Comm Link',
    year: '2024',
    tags: ['Telecom', 'DSP'],
    problem:
      'A short-range data link dropped packets under noisy RF conditions on campus.',
    solution:
      'Designed an adaptive modulation scheme with forward error correction and tested BER across SNR levels in MATLAB.',
    tech: ['MATLAB', 'DSP', 'Simulink'],
    role: 'Simulation & analysis',
    outcome: 'Held BER under 1e-4 at 3 dB lower SNR than the baseline.',
    links: { demo: '#', code: '#' },
    image: 'https://picsum.photos/seed/comm-link/800/560',
  },
  {
    id: 'gesture-controller',
    title: 'Gesture-Controlled Interface',
    year: '2024',
    tags: ['Embedded', 'ML'],
    problem: 'Touchless control was needed for a shared lab instrument.',
    solution:
      'Combined an IMU + lightweight classifier on-device to map five hand gestures to control commands.',
    tech: ['Arduino', 'Python', 'TinyML'],
    role: 'End-to-end',
    outcome: '94% gesture accuracy with <120 ms latency.',
    links: { demo: '#', code: '#' },
    image: 'https://picsum.photos/seed/gesture/800/560',
  },
  {
    id: 'portfolio-site',
    title: 'Canvas & Circuit Portfolio',
    year: '2026',
    tags: ['Frontend', 'Design'],
    problem: 'Needed one site to hold both an engineering and an art identity.',
    solution:
      'Designed and built a dual-world React site with route-based world switching and a shared design system.',
    tech: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    role: 'Design + build',
    outcome: 'This site — a proof of frontend + design ability.',
    links: { demo: '#', code: '#' },
    image: 'https://picsum.photos/seed/portfolio/800/560',
  },
]
