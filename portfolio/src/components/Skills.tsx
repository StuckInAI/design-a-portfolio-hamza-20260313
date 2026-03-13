'use client';

import { useEffect, useRef, useState } from 'react';

const skillCategories = [
  {
    category: 'Frontend',
    color: 'blue',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 92 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Vue.js', level: 75 },
    ],
  },
  {
    category: 'Backend',
    color: 'purple',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 82 },
      { name: 'Express.js', level: 88 },
      { name: 'FastAPI', level: 78 },
      { name: 'GraphQL', level: 80 },
    ],
  },
  {
    category: 'Database & Cloud',
    color: 'green',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 82 },
      { name: 'Redis', level: 75 },
      { name: 'AWS', level: 78 },
      { name: 'Docker', level: 85 },
    ],
  },
];

const techBadges = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
  'MongoDB', 'Redis', 'Docker', 'AWS', 'Git', 'GraphQL', 'Tailwind',
  'Express', 'FastAPI', 'Prisma', 'Jest', 'Linux',
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  green: 'bg-emerald-500',
};

const borderMap: Record<string, string> = {
  blue: 'border-blue-200',
  purple: 'border-purple-200',
  green: 'border-emerald-200',
};

const bgMap: Record<string, string> = {
  blue: 'bg-blue-50',
  purple: 'bg-purple-50',
  green: 'bg-emerald-50',
};

const textMap: Record<string, string> = {
  blue: 'text-blue-700',
  purple: 'text-purple-700',
  green: 'text-emerald-700',
};

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section-padding bg-slate-50">
      <div className="container-max" ref={ref}>
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Skills & Technologies</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto" />
            <p className="text-slate-600 mt-4 max-w-xl mx-auto">
              Here&apos;s a snapshot of my technical toolkit and proficiency levels.
            </p>
          </div>

          {/* Skill bars */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((cat) => (
              <div
                key={cat.category}
                className={`bg-white rounded-2xl p-6 border ${borderMap[cat.color]} shadow-sm`}
              >
                <h3 className={`text-lg font-semibold mb-5 ${textMap[cat.color]}`}>
                  {cat.category}
                </h3>
                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                        <span className="text-sm text-slate-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${colorMap[cat.color]} transition-all duration-1000 ease-out`}
                          style={{ width: visible ? `${skill.level}%` : '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tech badges */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-700 mb-6">Also familiar with</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techBadges.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
