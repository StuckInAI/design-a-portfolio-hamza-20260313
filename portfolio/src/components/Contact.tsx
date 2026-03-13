'use client';

import { useEffect, useRef, useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  body: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  body?: string;
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    body: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.body.trim()) {
      newErrors.body = 'Message is required';
    } else if (formData.body.trim().length < 10) {
      newErrors.body = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setApiMessage(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', body: '' });
      } else {
        setStatus('error');
        setApiMessage(data.error || 'Failed to send message.');
      }
    } catch {
      setStatus('error');
      setApiMessage('Network error. Please try again.');
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl border text-slate-800 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-red-300 focus:ring-red-200 bg-red-50'
        : 'border-slate-200 focus:ring-blue-200 focus:border-blue-400 bg-white'
    }`;

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-max" ref={ref}>
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Get In Touch</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto" />
            <p className="text-slate-600 mt-4 max-w-xl mx-auto">
              Have a project in mind or just want to say hello? I&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-6">Let&apos;s Connect</h3>

              {[
                {
                  icon: '📧',
                  label: 'Email',
                  value: 'alex@example.com',
                  href: 'mailto:alex@example.com',
                },
                {
                  icon: '💼',
                  label: 'LinkedIn',
                  value: 'linkedin.com/in/alexjohnson',
                  href: 'https://linkedin.com',
                },
                {
                  icon: '🐙',
                  label: 'GitHub',
                  value: 'github.com/alexjohnson',
                  href: 'https://github.com',
                },
                {
                  icon: '📍',
                  label: 'Location',
                  value: 'San Francisco, CA',
                  href: null,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-slate-700 font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-100 mt-8">
                <p className="text-sm text-slate-600 leading-relaxed">
                  I&apos;m currently open to new opportunities. Whether it&apos;s a full-time role,
                  consulting project, or just a chat — don&apos;t hesitate to reach out!
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">{apiMessage}</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={inputClass('name')}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={inputClass('email')}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      className={inputClass('subject')}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-600">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="body"
                      value={formData.body}
                      onChange={handleChange}
                      placeholder="Tell me about your project or just say hi..."
                      rows={5}
                      className={inputClass('body')}
                    />
                    {errors.body && (
                      <p className="mt-1 text-xs text-red-600">{errors.body}</p>
                    )}
                  </div>

                  {status === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-sm text-red-700">{apiMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
