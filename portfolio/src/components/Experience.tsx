'use client';

import { useEffect, useRef, useState } from 'react';

interface Experience {
  id: number;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string | null;
  sortOrder: number;
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch('/api/experiences')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch experiences');
        return res.json();
      })
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section id="experience" className="section-padding bg-slate-50">
      <div className="container-max" ref={ref}>
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Work Experience</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto" />
            <p className="text-slate-600 mt-4 max-w-xl mx-auto">
              My professional journey and the companies I&apos;ve had the pleasure of working with.
            </p>
          </div>

          {loading && (
            <div className="space-y-6 max-w-3xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl h-32 animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-500">Failed to load experiences. Please refresh the page.</p>
            </div>
          )}

          {!loading && !error && (
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    <div
                      key={exp.id}
                      className={`relative pl-16 transition-all duration-500 ${
                        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-3.5 top-5 w-5 h-5 rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 shadow-md" />

                      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-hover">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                            <p className="text-blue-600 font-medium">{exp.company}</p>
                          </div>
                          <div className="flex items-center gap-1 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                exp.endDate === null
                                  ? 'bg-green-100 text-green-700 border border-green-200'
                                  : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}
                            >
                              {exp.startDate} – {exp.endDate ?? 'Present'}
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
