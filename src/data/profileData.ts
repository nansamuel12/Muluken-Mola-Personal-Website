export type ExperienceTrack = 'all' | 'supervision' | 'surveying';
export type CredentialCategory = 'all' | 'academic' | 'employment' | 'ohs';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyNote?: string;
  projectTitle: string;
  location: string;
  period: string;
  durationLabel: string;
  tracks: ('supervision' | 'surveying')[];
  summary: string;
  highlights: string[];
  credentialId: string;
  referenceCode: string;
}

export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  referenceId: string;
  category: Exclude<CredentialCategory, 'all'>;
  categoryLabel: string;
  imageSrc: string;
  orientation: 'landscape' | 'portrait';
  description: string;
}

export interface CapabilityPillar {
  index: string;
  title: string;
  subtitle: string;
  items: string[];
}

export interface ReferencePerson {
  name: string;
  role: string;
  organization: string;
  phone?: string;
  email?: string;
}

export const PROFILE = {
  fullName: 'Muluken Mola Tilahun',
  shortName: 'Muluken Mola',
  headlineTitle: 'Civil & Site Engineer',
  subline: 'B.Sc. Civil Engineering · Haramaya University · Ethiopia',
  location: 'Dire Dawa & Addis Ababa, Ethiopia',
  email: 'mulukenmola14@gmail.com',
  phoneDisplay: '+251 924 374 447',
  phoneHref: 'tel:+251924374447',
  portraitSrc: '/assets/credentials/muluken_portrait.jpg',
  originalPdfSrc:
    '/assets/aistudio/CS_New_Merge_Doc_01-15-2024_19.10_3__a67849df.pdf',
  heroHeadline: 'Precision site execution, quantity surveying, and structural delivery.',
  executiveSummary:
    'Civil Engineer with nearly four years of progressive field leadership delivering multi-story academic complexes, industrial processing facilities, and commercial building packages across Ethiopia. Specialized in structural drawing verification, BOQ & quantity surveying, cost estimation, and OHS-certified site safety compliance—bridging engineering design with on-time, on-budget construction.',
  atsSummary:
    'Detail-oriented B.Sc. Civil Engineer with 3.5+ years of progressive Site Engineering and Quantity Surveying experience across Grade-1 and general construction contractors. Proven record supervising G+4 university academic buildings, industrial processing plants, and multi-building urban packages with strong command of AutoCAD, ArchiCAD, SAP2000, MS Project, and certified Occupational Health & Safety (OHS) protocols.',
  languages: [
    { name: 'Amharic', level: 'Native Proficiency' },
    { name: 'English', level: 'Professional Working Proficiency' },
  ],
  education: {
    degree: 'B.Sc. in Civil Engineering',
    institution: 'Haramaya University — Haramaya Institute of Technology',
    graduationDate: 'July 02, 2019 (2011 E.C.)',
    cgpa: '2.86',
    credentialId: 'degree-haramaya',
  },
};

export const HERO_METRICS = [
  {
    value: '3.5+ Years',
    label: 'Field Engineering Tenure',
    detail: 'Dec 2019 – May 2023',
  },
  {
    value: '3 Major Builds',
    label: 'Delivered Construction Scopes',
    detail: 'Industrial · G+4 Academic · Urban',
  },
  {
    value: '11 Verified Docs',
    label: 'Authenticated Credential Vault',
    detail: 'Degree · Letters · CAD · OHS',
  },
  {
    value: '2.86 CGPA',
    label: 'B.Sc. Civil Engineering',
    detail: 'Haramaya University, 2019',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'sarhaye-jigjiga',
    role: 'Site Engineer',
    company: 'Mohamed Ahmed Sarhaye General Construction Company',
    projectTitle: 'Multi-Building Commercial & Urban Development Packages',
    location: 'Jigjiga City, Ethiopia',
    period: 'Jan 29, 2022 – May 19, 2023',
    durationLabel: '1 yr 4 mos',
    tracks: ['supervision'],
    summary:
      'Directed site engineering operations across concurrent building projects in Jigjiga, translating structural blueprints into compliant field execution while safeguarding schedule and budget baselines.',
    highlights: [
      'Supervised multidisciplinary site crews and subcontractors across structural concrete, masonry, and finishing packages.',
      'Audited architectural and structural working drawings on site, issuing immediate technical guidance to prevent rework.',
      'Monitored work-package progress against project milestones and cost targets to achieve on-time, within-budget delivery.',
    ],
    credentialId: 'rec-sarhaye-2023',
    referenceCode: 'Ref. MAS/0219/23',
  },
  {
    id: 'sarhaye-kebridehar',
    role: 'Site Engineer',
    company: 'Mohamed Ahmed Sarhaye General Construction Company',
    projectTitle: 'Kebridehar University — G+4 Classroom Building Project',
    location: 'Kebridehar, Ethiopia',
    period: 'Jan 20, 2021 – Jan 09, 2022',
    durationLabel: '1 yr',
    tracks: ['supervision', 'surveying'],
    summary:
      'Served as lead Site Engineer on the five-story (G+4) Kebridehar University Classroom Complex, combining full-cycle quantity surveying with daily structural quality assurance.',
    highlights: [
      'Prepared detailed Quantity Surveys (BOQs), material take-offs, and interim payment valuations for structural and finishing works.',
      'Verified reinforcement placement, formwork geometry, and concrete pours against structural engineering specifications.',
      'Coordinated site engineering teams and labor schedules to keep multi-story construction packages on time and within budget.',
    ],
    credentialId: 'rec-sarhaye-2022',
    referenceCode: 'Ref. MAS/0009/22',
  },
  {
    id: 'amal-degehabour',
    role: 'Project Site Engineer (Junior Site Engineer)',
    company: 'Amal General Construction Company',
    companyNote: 'Grade-1 Contractor (GC-1)',
    projectTitle: 'Degehabour Industrial Milk Processing Factory',
    location: 'Degehabour, Somali Region',
    period: 'Dec 28, 2019 – Jan 06, 2021',
    durationLabel: '1 yr',
    tracks: ['supervision', 'surveying'],
    summary:
      'Executed site supervision and quantity surveying duties on an industrial Milk Processing Factory under a Grade-1 General Contractor, building a rigorous foundation in field problem-solving.',
    highlights: [
      'Prepared accurate Quantity Surveys and managed assigned civil construction packages from foundation through superstructure.',
      'Checked technical drawings and site layouts to guarantee dimensional accuracy and specification compliance.',
      'Recognized in official employer reference for analytical problem-solving, field initiative, and collaborative team coordination.',
    ],
    credentialId: 'rec-amal-2021',
    referenceCode: 'Ref. AC/925/021',
  },
];

export const CAPABILITY_PILLARS: CapabilityPillar[] = [
  {
    index: '01.',
    title: 'Site Supervision & Structural QA/QC',
    subtitle: 'Field Execution & Compliance',
    items: [
      'Structural & architectural drawing verification',
      'Reinforcement, formwork & concrete QA/QC',
      'Subcontractor & field crew supervision',
      'On-site constructability troubleshooting',
    ],
  },
  {
    index: '02.',
    title: 'Quantity Surveying & Cost Control',
    subtitle: 'Commercial & Schedule Discipline',
    items: [
      'Bill of Quantities (BOQ) preparation',
      'Material take-offs & interim valuations',
      'Construction cost estimation & budgeting',
      'Schedule tracking & package control (MS Project)',
    ],
  },
  {
    index: '03.',
    title: 'CAD, Modeling & Analysis Software',
    subtitle: 'Certified Technical Toolset',
    items: [
      'AutoCAD — 2D structural & site drafting',
      'ArchiCAD — architectural modeling & plans',
      'SAP2000 (v14) — structural analysis & design',
      'MS Project, Excel, Word & Access',
    ],
  },
  {
    index: '04.',
    title: 'Occupational Health & Safety (OHS)',
    subtitle: 'Certified Site Safety Standards',
    items: [
      'Construction site risk assessment',
      'Industrial fire prevention & emergency response',
      'Electrical hazard control on active sites',
      'Workplace first aid & safety compliance',
    ],
  },
];

export const CREDENTIALS: CredentialItem[] = [
  {
    id: 'degree-haramaya',
    title: 'B.Sc. Degree in Civil Engineering',
    issuer: 'Haramaya University · Office of the Registrar',
    date: 'July 02, 2019 (2011 E.C.)',
    referenceId: 'CGPA 2.86',
    category: 'academic',
    categoryLabel: 'Academic Degree',
    imageSrc: '/assets/credentials/degree_haramaya.jpg',
    orientation: 'landscape',
    description:
      'Official Temporary Certificate of Graduation issued by Haramaya University confirming completion of the B.Sc. Degree in Civil Engineering on July 02, 2019 with a final CGPA of 2.86.',
  },
  {
    id: 'rec-sarhaye-2023',
    title: 'Letter of Recommendation — Jigjiga Building Projects',
    issuer: 'Mohamed Ahmed Sarhaye General Construction',
    date: 'May 24, 2023',
    referenceId: 'MAS/0219/23',
    category: 'employment',
    categoryLabel: 'Employer Recommendation',
    imageSrc: '/assets/credentials/rec_sarhaye_2023.jpg',
    orientation: 'portrait',
    description:
      'Certifies service as Site Engineer across building projects in Jigjiga City (Jan 29, 2022 – May 19, 2023), commending strong responsibility, technical passion, and team collaboration.',
  },
  {
    id: 'rec-sarhaye-2022',
    title: 'Employment Certificate — Kebridehar Univ. G+4 Classroom',
    issuer: 'Mohamed Ahmed Sarhaye General Construction',
    date: 'January 22, 2022',
    referenceId: 'MAS/0009/22',
    category: 'employment',
    categoryLabel: 'Employer Certificate',
    imageSrc: '/assets/credentials/rec_sarhaye_2022.jpg',
    orientation: 'portrait',
    description:
      'Confirms employment as Site Engineer on the Kebridehar University G+4 Classroom Project (Jan 20, 2021 – Jan 09, 2022), highlighting individual accountability and teamwork.',
  },
  {
    id: 'rec-amal-2021',
    title: 'Recommendation Letter — Degehabour Milk Processing Factory',
    issuer: 'Amal General Construction Company (GC-1)',
    date: 'January 10, 2021',
    referenceId: 'AC/925/021',
    category: 'employment',
    categoryLabel: 'Employer Recommendation',
    imageSrc: '/assets/credentials/rec_amal_2021.jpg',
    orientation: 'portrait',
    description:
      'Issued by Grade-1 Contractor Amal Construction confirming Site Engineer service on the Degehabour Milk Processing Factory (Dec 28, 2019 – Jan 06, 2021) and noting strong problem-solving talent.',
  },
  {
    id: 'cert-autocad-archicad',
    title: 'AutoCAD & ArchiCAD Software Training (80 Hours)',
    issuer: 'Haramaya Institute of Technology · ECESA',
    date: 'July 01, 2019',
    referenceId: '80 Contact Hours',
    category: 'academic',
    categoryLabel: 'Engineering Software',
    imageSrc: '/assets/credentials/cert_autocad_archicad.jpg',
    orientation: 'landscape',
    description:
      'Jointly certified by the Department of Civil Engineering (Haramaya Institute of Technology) and the Ethiopian Civil Engineering Students Association for 80 hours of AutoCAD and ArchiCAD training.',
  },
  {
    id: 'cert-sap2000',
    title: 'Structural Analysis & Design Software (SAP2000 v14)',
    issuer: 'Haramaya University · Career Development Directorate',
    date: 'May 22–24, 2019',
    referenceId: 'SAP2000 v14',
    category: 'academic',
    categoryLabel: 'Engineering Software',
    imageSrc: '/assets/credentials/cert_sap2000.jpg',
    orientation: 'landscape',
    description:
      'Certificate of Participation confirming completion of intensive structural modeling, analysis, and design training in SAP2000 v14 at Haramaya University.',
  },
  {
    id: 'diploma-alt-computer',
    title: 'Computer & Office Systems Diploma',
    issuer: 'ALT Computer & Consultancy',
    date: 'December 2012',
    referenceId: 'MS Office Suite',
    category: 'academic',
    categoryLabel: 'IT & Office Systems',
    imageSrc: '/assets/credentials/diploma_alt_computer.jpg',
    orientation: 'landscape',
    description:
      'Diploma covering Introduction to Computer, MS-DOS, Windows, MS Word, MS Excel, and MS Access.',
  },
  {
    id: 'cert-ohs-risk',
    title: 'OHS Training Certificate — Risk Assessment',
    issuer: 'TS Environment Technology P.L.C. (Addis Ababa)',
    date: 'June 26, 2023',
    referenceId: 'ID-OMN-001000142',
    category: 'ohs',
    categoryLabel: 'OHS Safety',
    imageSrc: '/assets/credentials/cert_ohs_risk_assessment.jpg',
    orientation: 'landscape',
    description:
      'Occupational Health & Safety training certificate in Risk Assessment (CN-TS22-RA-001620), valid through June 26, 2025.',
  },
  {
    id: 'cert-ohs-fire',
    title: 'OHS Training Certificate — Fire Safety',
    issuer: 'TS Environment Technology P.L.C. (Addis Ababa)',
    date: 'June 27, 2023',
    referenceId: 'ID-OMN-001000143',
    category: 'ohs',
    categoryLabel: 'OHS Safety',
    imageSrc: '/assets/credentials/cert_ohs_fire_safety.jpg',
    orientation: 'landscape',
    description:
      'Occupational Health & Safety training certificate in Fire Safety (CN-TS22-FS-001620), valid through June 27, 2025.',
  },
  {
    id: 'cert-ohs-electrical',
    title: 'OHS Training Certificate — Electrical Safety',
    issuer: 'TS Environment Technology P.L.C. (Addis Ababa)',
    date: 'June 28, 2023',
    referenceId: 'ID-OMN-001000149',
    category: 'ohs',
    categoryLabel: 'OHS Safety',
    imageSrc: '/assets/credentials/cert_ohs_electrical_safety.jpg',
    orientation: 'landscape',
    description:
      'Occupational Health & Safety training certificate in Electrical Safety (CN-TS22-ES-001620), valid through June 28, 2025.',
  },
  {
    id: 'cert-ohs-first-aid',
    title: 'OHS Training Certificate — First Aid',
    issuer: 'TS Environment Technology P.L.C. (Addis Ababa)',
    date: 'June 29, 2023',
    referenceId: 'ID-OMN-001000151',
    category: 'ohs',
    categoryLabel: 'OHS Safety',
    imageSrc: '/assets/credentials/cert_ohs_first_aid.jpg',
    orientation: 'landscape',
    description:
      'Occupational Health & Safety training certificate in Workplace First Aid (CN-TS22-FA-001620), valid through June 29, 2025.',
  },
];

export const REFERENCES: ReferencePerson[] = [
  {
    name: 'Daniel Biru',
    role: 'Project Manager',
    organization: 'Amal General Construction Company (GC-1)',
    phone: '+251 933 440 280',
  },
  {
    name: 'Abdrehman Ali',
    role: 'Project Manager',
    organization: 'Mohamed Ahmed Sarhaye General Construction Company',
    phone: '+251 912 667 666',
  },
  {
    name: 'Belate Tefera',
    role: 'Head of Civil Engineering Department',
    organization: 'Haramaya University',
    email: 'Belecivileng2012@gmail.com',
  },
];
