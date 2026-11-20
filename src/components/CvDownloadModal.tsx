import { useEffect, useState } from 'react';
import { Check, Download, FileText, X } from 'lucide-react';
import { PROFILE } from '../data/profileData';
import { downloadModernCvPdf } from '../utils/generateCvPdf';

interface CvDownloadModalProps {
  open: boolean;
  onClose: () => void;
}

const CV_PREVIEW_DATA = {
  skills: [
    'Microsoft Office tools',
    'AutoCAD',
    'MS Project',
    'Quantity Surveying',
    'Cost Estimation',
  ],
  languages: [
    { name: 'Amharic', level: 'Native', filled: 5 },
    { name: 'English', level: 'Good', filled: 4 },
  ],
  interests: ['Sport', 'Participating in social activities'],
  references: [
    {
      name: 'Daniel Biru',
      org: 'Project Manager, Amal General Construction Company',
      contact: '0933 440 280',
    },
    {
      name: 'Abdrehman Ali',
      org: 'Project Manager, Mohamed Ahmed Serhaye General Construction Company',
      contact: '0912 667 666',
    },
    {
      name: 'Belate Tefera',
      org: 'Head of Civil Engineering, Haramaya University',
      contact: 'belecivileng2012@gmail.com',
    },
  ],
  experiences: [
    {
      role: 'Site Engineer',
      period: 'Jan 2022 – May 2023',
      company: 'Mohamed Ahmed Serhaye General Construction Company · Jigjiga',
      bullets: [
        'Oversaw day-to-day site works on several building projects in Jigjiga city.',
        'Reviewed technical designs and drawings to confirm works were built as specified, and gave on-site technical advice to resolve problems.',
        'Supervised site staff to deliver work packages on schedule and within budget.',
      ],
    },
    {
      role: 'Site Engineer',
      period: 'Jan 2021 – Jan 2022',
      company: 'Mohamed Ahmed Serhaye General Construction Company · Kebridehar',
      bullets: [
        'Site engineer on the Kebridehar University G+4 classroom building project.',
        'Prepared quantity surveys and checked designs and drawings to ensure correct execution.',
        'Supervised site staff and provided technical advice, keeping packages on time and within budget.',
      ],
    },
    {
      role: 'Junior Site Engineer',
      period: 'Dec 2019 – Jan 2021',
      company: 'Amal General Construction Company · Degehabur',
      bullets: [
        'Supported construction of a milk processing factory in Degehabur, Somali Region.',
        'Prepared quantity surveys, managed parts of the project and checked technical designs and drawings.',
        'Identified site problems and developed practical solutions.',
      ],
    },
  ],
  certifications: [
    'Diploma in Microsoft Office tools',
    'Certificate in AutoCAD',
    'Certification in Risk Assessment',
    'Certification in First Aid',
    'Certification in Fire Safety',
    'Certification in Electrical Safety',
  ],
};

export function CvDownloadModal({ open, onClose }: CvDownloadModalProps) {
  const [includePhoto, setIncludePhoto] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadModernCvPdf({ includePhoto });
      setDownloaded(true);
      window.setTimeout(() => setDownloaded(false), 2400);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/80 p-4 md:p-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Modern Executive CV Download Preview"
    >
      <div className="mx-auto mb-4 flex max-w-[850px] flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-zinc-100 shadow-lg">
        <div className="flex items-center gap-4">
          <span className="font-display text-sm font-semibold text-white">
            CV Preview (A4 Format)
          </span>
          <button
            type="button"
            onClick={() => setIncludePhoto((prev) => !prev)}
            className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-700 whitespace-nowrap"
          >
            {includePhoto ? 'Hide Portrait' : 'Show Portrait'}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={PROFILE.originalPdfSrc}
            download="Muluken_Mola_Verified_Credentials_Packet.pdf"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-700 whitespace-nowrap"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            <span>12-Page Packet (PDF)</span>
          </a>

          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#13B5A2] px-4 text-xs font-semibold text-zinc-950 transition-colors hover:bg-[#19cbb6] disabled:opacity-60 whitespace-nowrap"
          >
            {downloaded ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span>CV Downloaded</span>
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{downloading ? 'Preparing PDF...' : 'Download CV (PDF)'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close CV preview"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-200 transition-colors hover:bg-zinc-700"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Exact Two-Column Navy & Teal A4 Sheet Preview */}
      <article className="mx-auto max-w-[850px] overflow-hidden rounded-lg border border-zinc-200 bg-white text-slate-900 shadow-2xl">
        {/* Top Teal Accent Bar */}
        <div className="h-2 w-full bg-[#13B5A2]" />

        <div className="grid md:grid-cols-[34.5%_65.5%]">
          {/* Left Navy Sidebar */}
          <aside className="bg-[#101E2E] px-6 py-8 text-white">
            {includePhoto && (
              <div className="mb-8 flex justify-center">
                <div className="h-36 w-36 overflow-hidden rounded-full border-[3px] border-[#13B5A2] bg-white p-1">
                  <div className="h-full w-full overflow-hidden rounded-full">
                    <img
                      src={PROFILE.portraitSrc}
                      alt={PROFILE.fullName}
                      referrerPolicy="no-referrer"
                      className="h-full w-full scale-[1.09] object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="border-t border-[#22354A] pt-4">
              <h2 className="font-display text-[11px] font-semibold tracking-[0.16em] text-[#13B5A2] uppercase">
                Contact
              </h2>
              <div className="mt-3 space-y-3 text-xs">
                <div>
                  <p className="text-[9px] font-semibold tracking-wider text-[#13B5A2] uppercase">
                    Email
                  </p>
                  <p className="mt-0.5 text-white">{PROFILE.email}</p>
                </div>
                <div>
                  <p className="text-[9px] font-semibold tracking-wider text-[#13B5A2] uppercase">
                    Phone
                  </p>
                  <p className="mt-0.5 tabular-nums text-white">0924 374 447</p>
                </div>
                <div>
                  <p className="text-[9px] font-semibold tracking-wider text-[#13B5A2] uppercase">
                    Location
                  </p>
                  <p className="mt-0.5 text-white">Dire Dawa / Addis Ababa</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6 border-t border-[#22354A] pt-4">
              <h2 className="font-display text-[11px] font-semibold tracking-[0.16em] text-[#13B5A2] uppercase">
                Skills
              </h2>
              <ul className="mt-3 space-y-2 text-xs text-white">
                {CV_PREVIEW_DATA.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#13B5A2]" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div className="mt-6 border-t border-[#22354A] pt-4">
              <h2 className="font-display text-[11px] font-semibold tracking-[0.16em] text-[#13B5A2] uppercase">
                Languages
              </h2>
              <div className="mt-3 space-y-3 text-xs">
                {CV_PREVIEW_DATA.languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex items-baseline justify-between">
                      <span className="font-semibold text-white">{lang.name}</span>
                      <span className="text-[11px] text-[#C2CEDB]">{lang.level}</span>
                    </div>
                    <div className="mt-1.5 grid grid-cols-5 gap-1.5">
                      {[0, 1, 2, 3, 4].map((idx) => (
                        <span
                          key={idx}
                          className={`h-1.5 rounded-full ${
                            idx < lang.filled ? 'bg-[#13B5A2]' : 'bg-[#24384E]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="mt-6 border-t border-[#22354A] pt-4">
              <h2 className="font-display text-[11px] font-semibold tracking-[0.16em] text-[#13B5A2] uppercase">
                Interests
              </h2>
              <ul className="mt-3 space-y-2 text-xs text-white">
                {CV_PREVIEW_DATA.interests.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#13B5A2]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* References */}
            <div className="mt-6 border-t border-[#22354A] pt-4">
              <h2 className="font-display text-[11px] font-semibold tracking-[0.16em] text-[#13B5A2] uppercase">
                References
              </h2>
              <div className="mt-3 space-y-3.5 text-xs">
                {CV_PREVIEW_DATA.references.map((ref) => (
                  <div key={ref.name}>
                    <p className="font-semibold text-white">{ref.name}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-[#C2CEDB]">
                      {ref.org}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#13B5A2]">{ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Main White Column */}
          <div className="px-8 py-9 md:px-10">
            {/* Name & Title */}
            <header className="border-b border-slate-200 pb-4">
              <h1 className="font-display text-[28px] leading-tight tracking-tight text-slate-900 sm:text-[32px]">
                <span className="font-bold">Muluken</span>{' '}
                <span className="font-light text-slate-700">Mola Tilahun</span>
              </h1>
              <p className="mt-1.5 font-display text-[11px] font-semibold tracking-[0.14em] text-[#13B5A2] uppercase">
                Civil Engineer · Site Engineer · Quantity Survey
              </p>
            </header>

            {/* Profile */}
            <section className="mt-6">
              <h2 className="flex items-center gap-2.5 font-display text-xs font-bold tracking-[0.16em] text-slate-900 uppercase">
                <span className="h-4 w-1 bg-[#13B5A2]" />
                <span>Profile</span>
              </h2>
              <p className="mt-3 text-[12.5px] leading-[1.6] text-slate-700">
                Results-driven Civil Engineer who has worked in the field since graduating in 2019,
                holding different site engineering positions on building, educational and industrial
                projects. Skilled in quantity surveying, cost estimation, design and drawing review,
                and site supervision, with a proven record of keeping work packages on schedule and
                within budget. Strong communicator who builds lasting working relationships with
                staff, clients, contractors and stakeholders.
              </p>
            </section>

            {/* Experience Timeline */}
            <section className="mt-7">
              <h2 className="flex items-center gap-2.5 font-display text-xs font-bold tracking-[0.16em] text-slate-900 uppercase">
                <span className="h-4 w-1 bg-[#13B5A2]" />
                <span>Experience</span>
              </h2>

              <div className="relative mt-4 space-y-5 pl-6">
                <span
                  aria-hidden="true"
                  className="absolute top-2 bottom-2 left-[5px] w-px bg-slate-200"
                />

                {CV_PREVIEW_DATA.experiences.map((exp) => (
                  <div key={`${exp.role}-${exp.period}`} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute top-1 -left-6 h-3 w-3 rounded-full border-2 border-[#13B5A2] bg-white"
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-[13px] font-bold text-slate-900">{exp.role}</h3>
                      <span className="text-[11px] font-semibold text-[#13B5A2]">
                        {exp.period}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11.5px] italic text-slate-500">{exp.company}</p>
                    <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-slate-700">
                      {exp.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#13B5A2]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="mt-7">
              <h2 className="flex items-center gap-2.5 font-display text-xs font-bold tracking-[0.16em] text-slate-900 uppercase">
                <span className="h-4 w-1 bg-[#13B5A2]" />
                <span>Education</span>
              </h2>

              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-[13px] font-bold text-slate-900">
                    B.Sc. in Civil Engineering
                  </h3>
                  <p className="text-[12px] italic text-slate-500">Haramaya University</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-semibold text-[#13B5A2]">2019 (2011 EC)</p>
                  <span className="mt-1 inline-block rounded bg-slate-100 px-2 py-0.5 text-[10.5px] font-semibold text-slate-600">
                    CGPA 2.86
                  </span>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section className="mt-7">
              <h2 className="flex items-center gap-2.5 font-display text-xs font-bold tracking-[0.16em] text-slate-900 uppercase">
                <span className="h-4 w-1 bg-[#13B5A2]" />
                <span>Certifications</span>
              </h2>

              <div className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {CV_PREVIEW_DATA.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2.5 text-[12px] text-slate-800">
                    <span className="h-3.5 w-1 shrink-0 rounded-full bg-[#13B5A2]" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
