'use client';

import { useEffect, useRef, useState } from 'react';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: 'Years Experience', value: '6+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Technologies', value: '20+' },
    { label: 'Happy Clients', value: '30+' },
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-max" ref={ref}>
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">About Me</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Avatar + Stats */}
            <div className="flex flex-col items-center lg:items-start gap-8">
              <div className="relative">
                <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-7xl font-bold shadow-2xl">
                  AJ
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  💻
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100"
                  >
                    <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Bio */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-slate-800">
                Passionate about building great software
              </h3>
              <p className="text-slate-600 leading-relaxed">
                I&apos;m a Full-Stack Developer with over 6 years of experience crafting
                web applications that are both beautiful and technically sound. I
                specialize in React, Next.js, and Node.js ecosystems, with a strong
                foundation in database design and cloud infrastructure.
              </p>
              <p className="text-slate-600 leading-relaxed">
                My journey started with a Computer Science degree, followed by working
                with startups and established tech companies. I thrive in environments
                where I can wear multiple hats — from architecting systems to pixel-perfect
                UI implementation.
              </p>
              <p className="text-slate-600 leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me contributing to open-source projects,
                writing technical blog posts, or exploring the latest developments in
                AI and machine learning.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {['Problem Solver', 'Team Player', 'Fast Learner', 'Detail-Oriented'].map((trait) => (
                  <span
                    key={trait}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
