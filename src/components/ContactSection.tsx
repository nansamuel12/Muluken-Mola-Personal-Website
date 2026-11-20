import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Copy, Check, Mail } from 'lucide-react';
import { PROFILE } from '../data/profileData';

const INQUIRY_TOPICS = [
  'Project Collaboration',
  'Site Supervision & Project Delivery',
  'Quantity Surveying & Cost Estimation',
  'Structural QA/QC & Blueprint Review',
  'Full-Time Civil Engineering Role',
];

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState(INQUIRY_TOPICS[0]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setError('Please enter your name.');
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!trimmedMessage) {
      setError('Please share a brief note about your project or inquiry.');
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `[${interest}] Inquiry from ${name.trim()}`
  )}&body=${encodeURIComponent(
    `Name: ${name.trim()}\nEmail: ${email.trim()}\nTopic: ${interest}\n\n${message.trim()}`
  )}`;

  const handleCopySummary = async () => {
    const text = `To: ${PROFILE.email}\nTopic: ${interest}\nFrom: ${name.trim()} (${email.trim()})\n\n${message.trim()}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setInterest(INQUIRY_TOPICS[0]);
    setMessage('');
    setError(null);
  };

  return (
    <section
      id="contact"
      className="border-t border-zinc-200 bg-[#FAFAFA] py-16 dark:border-zinc-800 dark:bg-[#0B0B0E]"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-[780px]">
          <h2
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.06]"
            style={{ textWrap: 'balance' }}
          >
            <span className="block text-zinc-950 dark:text-white">
              Let&apos;s Build
            </span>
            <span className="block text-zinc-400 dark:text-zinc-500">
              Something Great
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Whether it&apos;s a construction project, site supervision engagement,
            quantity surveying scope, or a technical consultation — I&apos;m here.
          </p>

          {submitted ? (
            <div className="mt-10 rounded-xl border border-zinc-200 bg-white p-6 md:p-8 dark:border-zinc-800 dark:bg-[#121217]">
              <div className="flex items-start gap-3.5">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-blue-700 dark:text-blue-400"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-bold text-zinc-950 dark:text-white">
                    Inquiry Ready to Dispatch
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Thank you, <span className="font-medium text-zinc-900 dark:text-zinc-200">{name}</span>. Your message regarding{' '}
                    <span className="font-medium text-zinc-900 dark:text-zinc-200">{interest}</span> is prepared below for direct delivery to{' '}
                    <span className="font-mono text-xs">{PROFILE.email}</span>.
                  </p>

                  <div className="mt-5 rounded-lg border border-zinc-200 bg-[#FAFAFA] p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-[#0B0B0E] dark:text-zinc-300">
                    <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      From: {name} · {email}
                    </p>
                    <p className="mt-2 whitespace-pre-line">{message}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={mailtoUrl}
                      className="inline-flex h-10 items-center gap-2 rounded-lg bg-zinc-950 px-4 text-xs font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-zinc-200 dark:text-zinc-950 dark:hover:bg-white whitespace-nowrap"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Send via Email App</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 whitespace-nowrap"
                    >
                      {copiedSummary ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                          <span>Message Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex h-10 items-center px-3 text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white whitespace-nowrap"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-[11px] font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Kebede Alemu"
                    className="mt-2 h-11 w-full rounded-lg border border-zinc-300 bg-white px-4 text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors focus:border-blue-700 focus:outline-none dark:border-zinc-800 dark:bg-[#111115] dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-[11px] font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kebede@example.com"
                    className="mt-2 h-11 w-full rounded-lg border border-zinc-300 bg-white px-4 text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors focus:border-blue-700 focus:outline-none dark:border-zinc-800 dark:bg-[#111115] dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-interest"
                  className="block font-mono text-[11px] font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400"
                >
                  What Are You Interested In?
                </label>
                <div className="relative mt-2">
                  <select
                    id="contact-interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-zinc-300 bg-white px-4 pr-10 text-sm font-medium text-zinc-950 transition-colors focus:border-blue-700 focus:outline-none dark:border-zinc-800 dark:bg-[#111115] dark:text-white dark:focus:border-blue-500"
                  >
                    {INQUIRY_TOPICS.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-zinc-500"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-[11px] font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project, site location, or engineering scope..."
                  className="mt-2 w-full rounded-lg border border-zinc-300 bg-white p-4 text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors focus:border-blue-700 focus:outline-none dark:border-zinc-800 dark:bg-[#111115] dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-blue-500"
                />
              </div>

              {error && (
                <p role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-zinc-950 px-6 font-mono text-xs font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-zinc-200 dark:text-zinc-950 dark:hover:bg-white"
              >
                <span>Send Message</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
