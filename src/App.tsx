import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Eye,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sun,
} from 'lucide-react';
import {
  CAPABILITY_PILLARS,
  CREDENTIALS,
  EXPERIENCES,
  HERO_METRICS,
  PROFILE,
  REFERENCES,
  type CredentialCategory,
  type ExperienceTrack,
} from './data/profileData';
import { CredentialLightbox } from './components/CredentialLightbox';
import { CvDownloadModal } from './components/CvDownloadModal';
import { ContactSection } from './components/ContactSection';
import { downloadModernCvPdf } from './utils/generateCvPdf';

type ThemeMode = 'light' | 'dark';

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem('muluken-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch {
    // Ignore storage access errors
  }
  return 'light';
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [experienceTrack, setExperienceTrack] = useState<ExperienceTrack>('all');
  const [credentialFilter, setCredentialFilter] = useState<CredentialCategory>('all');
  const [activeLightboxId, setActiveLightboxId] = useState<string | null>(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [downloadingCv, setDownloadingCv] = useState(false);
  const [downloadedCv, setDownloadedCv] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('muluken-theme', theme);
    } catch {
      // Ignore storage access errors
    }
  }, [theme]);

  const filteredExperiences = useMemo(() => {
    if (experienceTrack === 'all') return EXPERIENCES;
    return EXPERIENCES.filter((exp) => exp.tracks.includes(experienceTrack));
  }, [experienceTrack]);

  const filteredCredentials = useMemo(() => {
    if (credentialFilter === 'all') return CREDENTIALS;
    return CREDENTIALS.filter((item) => item.category === credentialFilter);
  }, [credentialFilter]);

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 1800);
    } catch {
      // Clipboard fallback not required when mailto/tel links exist
    }
  };

  const handleDirectCvDownload = async () => {
    setDownloadingCv(true);
    try {
      await downloadModernCvPdf({ includePhoto: true });
      setDownloadedCv(true);
      window.setTimeout(() => setDownloadedCv(false), 2400);
    } finally {
      setDownloadingCv(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#09090B] transition-colors duration-200 dark:bg-[#0B0B0E] dark:text-[#FAFAFA]">
      {/* Top Bar Contract: 3 zones, 1 row, gap-8 */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-[#FAFAFA]/95 backdrop-blur-md dark:border-zinc-800 dark:bg-[#0B0B0E]/95">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-4">
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-zinc-950 whitespace-nowrap shrink-0 dark:text-white"
          >
            {PROFILE.shortName}
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            <a
              href="#experience"
              className="transition-colors hover:text-zinc-950 hover:underline underline-offset-4 whitespace-nowrap shrink-0 dark:hover:text-white"
            >
              Experience
            </a>
            <a
              href="#capabilities"
              className="transition-colors hover:text-zinc-950 hover:underline underline-offset-4 whitespace-nowrap shrink-0 dark:hover:text-white"
            >
              Capabilities
            </a>
            <a
              href="#credentials"
              className="transition-colors hover:text-zinc-950 hover:underline underline-offset-4 whitespace-nowrap shrink-0 dark:hover:text-white"
            >
              Credentials
            </a>
            <a
              href="#references"
              className="transition-colors hover:text-zinc-950 hover:underline underline-offset-4 whitespace-nowrap shrink-0 dark:hover:text-white"
            >
              References
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-zinc-950 hover:underline underline-offset-4 whitespace-nowrap shrink-0 dark:hover:text-white"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleDirectCvDownload}
              disabled={downloadingCv}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-zinc-950 px-4 text-xs font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:opacity-60 whitespace-nowrap shrink-0 dark:bg-white dark:text-zinc-950 dark:hover:bg-blue-500 dark:hover:text-white"
            >
              {downloadedCv ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>CV Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{downloadingCv ? 'Preparing...' : 'Download CV'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero Split */}
        <section className="mx-auto max-w-[1200px] px-6 pt-8 pb-10 md:pt-12 md:pb-14">
          {/* Workspace Toolbar: Day / Night Mode Switch */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
            <p className="text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
              <span>{PROFILE.headlineTitle}</span>
              <span className="mx-2 text-zinc-300 dark:text-zinc-700" aria-hidden="true">·</span>
              <span>B.Sc. Haramaya University</span>
              <span className="mx-2 text-zinc-300 dark:text-zinc-700" aria-hidden="true">·</span>
              <span>Ethiopia</span>
            </p>

            <div
              role="group"
              aria-label="Theme appearance"
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <button
                type="button"
                onClick={() => setTheme('light')}
                aria-pressed={theme === 'light'}
                className={`inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  theme === 'light'
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Day</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                aria-pressed={theme === 'dark'}
                className={`inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  theme === 'dark'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Night</span>
              </button>
            </div>
          </div>

          <div className="grid items-stretch gap-10 lg:grid-cols-12">
            {/* Left Typographic Column */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <h1
                  className="font-display text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.07] dark:text-white"
                  style={{ textWrap: 'balance' }}
                >
                  {PROFILE.heroHeadline}
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {PROFILE.executiveSummary}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleDirectCvDownload}
                  disabled={downloadingCv}
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-blue-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-60 whitespace-nowrap shrink-0 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  {downloadedCv ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>CV Downloaded (PDF)</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" aria-hidden="true" />
                      <span>{downloadingCv ? 'Preparing CV...' : 'Download Modern CV (PDF)'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setCvModalOpen(true)}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 whitespace-nowrap shrink-0 dark:border-zinc-700 dark:bg-[#141419] dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
                >
                  <Eye className="h-4 w-4 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                  <span>Preview CV</span>
                </button>
              </div>
            </div>

            {/* Right Architectural Dossier Card */}
            <div className="lg:col-span-5">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 md:p-7 dark:border-zinc-800 dark:bg-[#141419]">
                <div className="flex items-start gap-5">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                    <img
                      src={PROFILE.portraitSrc}
                      alt={`${PROFILE.fullName} portrait`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full scale-[1.08] object-cover"
                    />
                  </div>

                  <div className="min-w-0 pt-1">
                    <h2 className="font-display text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                      {PROFILE.fullName}
                    </h2>
                    <p className="mt-0.5 text-sm font-medium text-blue-700 dark:text-blue-400">
                      Site Engineer &amp; Quantity Surveyor
                    </p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                      <span>{PROFILE.location}</span>
                    </p>
                  </div>
                </div>

                <div className="my-6 border-t border-zinc-100 pt-5 dark:border-zinc-800">
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    Core Engineering Toolset
                  </p>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
                    AutoCAD · ArchiCAD · SAP2000 v14 · MS Project · Quantity Surveying · Cost Estimation
                  </p>
                </div>

                <div className="space-y-2.5 border-t border-zinc-100 pt-5 dark:border-zinc-800">
                  <div className="flex items-center justify-between gap-3">
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="flex min-w-0 items-center gap-2 text-sm font-medium text-zinc-800 transition-colors hover:text-blue-700 dark:text-zinc-200 dark:hover:text-blue-400"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                      <span className="truncate">{PROFILE.email}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(PROFILE.email, 'email')}
                      aria-label="Copy email address"
                      className="inline-flex h-8 items-center gap-1 rounded-md border border-zinc-200 px-2.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 whitespace-nowrap shrink-0 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      {copiedField === 'email' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <a
                      href={PROFILE.phoneHref}
                      className="flex min-w-0 items-center gap-2 font-mono text-sm tabular-nums text-zinc-800 transition-colors hover:text-blue-700 dark:text-zinc-200 dark:hover:text-blue-400"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                      <span>{PROFILE.phoneDisplay}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(PROFILE.phoneDisplay, 'phone')}
                      aria-label="Copy phone number"
                      className="inline-flex h-8 items-center gap-1 rounded-md border border-zinc-200 px-2.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 whitespace-nowrap shrink-0 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      {copiedField === 'phone' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width 4-Column KPI Strip below Hero Split */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-y border-zinc-200 py-6 lg:grid-cols-4 lg:gap-8 dark:border-zinc-800">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label} className="space-y-1">
                <p className="font-display text-2xl font-bold tracking-tight tabular-nums text-zinc-950 sm:text-3xl dark:text-white">
                  {metric.value}
                </p>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {metric.label}
                </p>
                <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1: Progressive Engineering Experience */}
        <section
          id="experience"
          className="mx-auto max-w-[1200px] px-6 py-14"
        >
          <div className="flex flex-col justify-between gap-6 border-b border-zinc-200 pb-6 md:flex-row md:items-end dark:border-zinc-800">
            <div>
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                Verified Career Record
              </p>
              <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                Progressive Site &amp; Project Experience
              </h2>
            </div>

            <div
              role="group"
              aria-label="Filter experience by focus"
              className="flex items-center gap-1 self-start rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900"
            >
              {[
                { id: 'all', label: 'All Roles' },
                { id: 'supervision', label: 'Site Supervision' },
                { id: 'surveying', label: 'Quantity Surveying' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setExperienceTrack(tab.id as ExperienceTrack)}
                  className={`rounded-md px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    experienceTrack === tab.id
                      ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-white'
                      : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {filteredExperiences.map((exp, idx) => (
              <article
                key={exp.id}
                className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8 dark:border-zinc-800 dark:bg-[#141419]"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-zinc-100 pb-5 md:flex-row md:items-start dark:border-zinc-800">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="font-mono tabular-nums">0{idx + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">
                        {exp.company}
                      </span>
                      {exp.companyNote && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{exp.companyNote}</span>
                        </>
                      )}
                      <span aria-hidden="true">·</span>
                      <span>{exp.location}</span>
                    </div>

                    <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white">
                      {exp.role} — {exp.projectTitle}
                    </h3>
                  </div>

                  <div className="flex flex-col items-start gap-2 md:items-end shrink-0">
                    <span className="font-mono text-xs font-medium tabular-nums text-zinc-700 dark:text-zinc-300">
                      {exp.period}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveLightboxId(exp.credentialId)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 transition-colors hover:text-blue-800 hover:underline underline-offset-4 whitespace-nowrap dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <span>Inspect Letter ({exp.referenceCode})</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-6 lg:grid-cols-12">
                  <p className="text-sm leading-relaxed text-zinc-600 lg:col-span-5 dark:text-zinc-400">
                    {exp.summary}
                  </p>
                  <ul className="space-y-2.5 text-sm leading-relaxed text-zinc-800 lg:col-span-7 dark:text-zinc-200">
                    {exp.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-700 dark:bg-blue-400"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 2: Core Engineering Capabilities & Academic Foundation */}
        <section
          id="capabilities"
          className="border-y border-zinc-200 bg-white py-14 dark:border-zinc-800 dark:bg-[#111115]"
        >
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                  Technical Disciplines
                </p>
                <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  Core Engineering Capabilities
                </h2>
              </div>
              <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">
                Grounded in civil engineering fundamentals from Haramaya University and validated across four years of active construction delivery.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {CAPABILITY_PILLARS.map((pillar) => (
                <div
                  key={pillar.index}
                  className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-6 dark:border-zinc-800 dark:bg-[#18181E]"
                >
                  <div>
                    <p className="font-mono text-xs font-medium text-blue-700 dark:text-blue-400">
                      {pillar.index}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {pillar.subtitle}
                    </p>
                  </div>

                  <ul className="mt-5 space-y-2 border-t border-zinc-200 pt-4 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
                    {pillar.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Academic Anchor Strip */}
            <div className="mt-8 flex flex-col justify-between gap-6 rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-6 md:flex-row md:items-center md:p-8 dark:border-zinc-800 dark:bg-[#18181E]">
              <div>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Academic Qualification · {PROFILE.education.graduationDate}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  {PROFILE.education.degree} — {PROFILE.education.institution}
                </h3>
                <p className="mt-1 font-mono text-xs tabular-nums text-zinc-600 dark:text-zinc-400">
                  Final Cumulative GPA: {PROFILE.education.cgpa} · Office of the Registrar Verified
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveLightboxId(PROFILE.education.credentialId)}
                className="inline-flex h-10 items-center gap-2 self-start rounded-lg border border-zinc-300 bg-white px-4 text-xs font-semibold text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-50 md:self-auto whitespace-nowrap shrink-0 dark:border-zinc-700 dark:bg-[#141419] dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
              >
                <span>View University Degree</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Verified Credentials & Document Vault */}
        <section
          id="credentials"
          className="mx-auto max-w-[1200px] px-6 py-14"
        >
          <div className="flex flex-col justify-between gap-6 border-b border-zinc-200 pb-6 lg:flex-row lg:items-end dark:border-zinc-800">
            <div>
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                Authenticated Document Vault
              </p>
              <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                Degrees, Employer Letters &amp; Certifications
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
                Select any document below to open the full-resolution verified scan in the document inspector.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter documents by category"
              className="flex flex-wrap items-center gap-1 self-start rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900"
            >
              {[
                { id: 'all', label: 'All Documents (11)' },
                { id: 'employment', label: 'Employer Letters (3)' },
                { id: 'academic', label: 'Degree & CAD (4)' },
                { id: 'ohs', label: 'OHS Safety (4)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCredentialFilter(tab.id as CredentialCategory)}
                  className={`rounded-md px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    credentialFilter === tab.id
                      ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-white'
                      : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCredentials.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => setActiveLightboxId(doc.id)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left transition-colors hover:border-blue-700/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-zinc-800 dark:bg-[#141419] dark:hover:border-blue-500/50"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-zinc-100 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                  <img
                    src={doc.imageSrc}
                    alt={doc.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span>{doc.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{doc.referenceId}</span>
                    </div>
                    <h3 className="mt-1.5 font-display text-base font-bold leading-snug text-zinc-950 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                      {doc.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                      {doc.issuer}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs dark:border-zinc-800">
                    <span className="font-mono tabular-nums text-zinc-500 dark:text-zinc-400">
                      {doc.date}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-blue-700 dark:text-blue-400">
                      <span>Inspect</span>
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Section 4: Executive References */}
        <section
          id="references"
          className="border-t border-zinc-200 bg-white py-14 dark:border-zinc-800 dark:bg-[#111115]"
        >
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                  Professional Endorsements
                </p>
                <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  Executive References
                </h2>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Languages: {PROFILE.languages.map((l) => `${l.name} (${l.level})`).join(' · ')}
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {REFERENCES.map((ref) => (
                <div
                  key={ref.name}
                  className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-6 dark:border-zinc-800 dark:bg-[#18181E]"
                >
                  <div>
                    <h3 className="font-display text-lg font-bold text-zinc-950 dark:text-white">
                      {ref.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {ref.role}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                      {ref.organization}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-zinc-200 pt-4 font-mono text-xs tabular-nums dark:border-zinc-800">
                    {ref.phone ? (
                      <a
                        href={`tel:${ref.phone.replace(/\s+/g, '')}`}
                        className="font-medium text-blue-700 hover:underline dark:text-blue-400"
                      >
                        {ref.phone}
                      </a>
                    ) : ref.email ? (
                      <a
                        href={`mailto:${ref.email}`}
                        className="font-medium text-blue-700 hover:underline dark:text-blue-400"
                      >
                        {ref.email}
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Let's Build Something Great Contact Form */}
        <ContactSection />
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-[#111115]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 px-6 text-xs text-zinc-500 sm:flex-row sm:items-center dark:text-zinc-400">
          <p>
            {PROFILE.fullName} · Civil &amp; Site Engineer · {PROFILE.location}
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={handleDirectCvDownload}
              className="inline-flex items-center gap-1.5 font-medium text-zinc-800 transition-colors hover:text-blue-700 whitespace-nowrap dark:text-zinc-200 dark:hover:text-blue-400"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download Modern CV (PDF)</span>
            </button>
            <a
              href={PROFILE.originalPdfSrc}
              download="Muluken_Mola_Verified_Credentials_Packet.pdf"
              className="inline-flex items-center gap-1.5 font-medium text-zinc-800 transition-colors hover:text-blue-700 whitespace-nowrap dark:text-zinc-200 dark:hover:text-blue-400"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download 12-Page Credential Packet</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Lightbox & Download-Only CV Modal */}
      <CredentialLightbox
        items={CREDENTIALS}
        activeId={activeLightboxId}
        onClose={() => setActiveLightboxId(null)}
        onSelect={(id) => setActiveLightboxId(id)}
      />

      <CvDownloadModal
        open={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />
    </div>
  );
}
