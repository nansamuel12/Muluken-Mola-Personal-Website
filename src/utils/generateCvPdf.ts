import { jsPDF } from 'jspdf';
import { PROFILE } from '../data/profileData';

interface GenerateCvOptions {
  includePhoto?: boolean;
}

const CV_COPY = {
  firstName: 'Muluken',
  lastName: ' Mola Tilahun',
  subtitle: 'CIVIL ENGINEER  ·  SITE ENGINEER  ·  QUANTITY SURVEY',
  profile:
    'Results-driven Civil Engineer who has worked in the field since graduating in 2019, holding different site engineering positions on building, educational and industrial projects. Skilled in quantity surveying, cost estimation, design and drawing review, and site supervision, with a proven record of keeping work packages on schedule and within budget. Strong communicator who builds lasting working relationships with staff, clients, contractors and stakeholders.',
  phone: '0924 374 447',
  location: 'Dire Dawa / Addis Ababa',
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
      company: 'Mohamed Ahmed Serhaye General Construction Company  ·  Jigjiga',
      bullets: [
        'Oversaw day-to-day site works on several building projects in Jigjiga city.',
        'Reviewed technical designs and drawings to confirm works were built as specified, and gave on-site technical advice to resolve problems.',
        'Supervised site staff to deliver work packages on schedule and within budget.',
      ],
    },
    {
      role: 'Site Engineer',
      period: 'Jan 2021 – Jan 2022',
      company: 'Mohamed Ahmed Serhaye General Construction Company  ·  Kebridehar',
      bullets: [
        'Site engineer on the Kebridehar University G+4 classroom building project.',
        'Prepared quantity surveys and checked designs and drawings to ensure correct execution.',
        'Supervised site staff and provided technical advice, keeping packages on time and within budget.',
      ],
    },
    {
      role: 'Junior Site Engineer',
      period: 'Dec 2019 – Jan 2021',
      company: 'Amal General Construction Company  ·  Degehabur',
      bullets: [
        'Supported construction of a milk processing factory in Degehabur, Somali Region.',
        'Prepared quantity surveys, managed parts of the project and checked technical designs and drawings.',
        'Identified site problems and developed practical solutions.',
      ],
    },
  ],
  education: {
    degree: 'B.Sc. in Civil Engineering',
    school: 'Haramaya University',
    year: '2019 (2011 EC)',
    cgpa: 'CGPA 2.86',
  },
  certifications: [
    'Diploma in Microsoft Office tools',
    'Certificate in AutoCAD',
    'Certification in Risk Assessment',
    'Certification in First Aid',
    'Certification in Fire Safety',
    'Certification in Electrical Safety',
  ],
};

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function registerModernFonts(doc: jsPDF): Promise<{
  display: string;
  body: string;
}> {
  const fontFiles = [
    { url: '/fonts/Outfit-Light.ttf', vfs: 'Outfit-Light.ttf', family: 'Outfit', style: 'light' },
    { url: '/fonts/Outfit-SemiBold.ttf', vfs: 'Outfit-SemiBold.ttf', family: 'Outfit', style: 'semibold' },
    { url: '/fonts/Outfit-Bold.ttf', vfs: 'Outfit-Bold.ttf', family: 'Outfit', style: 'bold' },
    { url: '/fonts/DMSans-Regular.ttf', vfs: 'DMSans-Regular.ttf', family: 'DMSans', style: 'normal' },
    { url: '/fonts/DMSans-Italic.ttf', vfs: 'DMSans-Italic.ttf', family: 'DMSans', style: 'italic' },
    { url: '/fonts/DMSans-SemiBold.ttf', vfs: 'DMSans-SemiBold.ttf', family: 'DMSans', style: 'semibold' },
    { url: '/fonts/DMSans-Bold.ttf', vfs: 'DMSans-Bold.ttf', family: 'DMSans', style: 'bold' },
  ];

  try {
    const loaded = await Promise.all(
      fontFiles.map(async (f) => {
        const res = await fetch(f.url);
        if (!res.ok) throw new Error(`Failed font ${f.url}`);
        const buf = await res.arrayBuffer();
        return { ...f, base64: arrayBufferToBase64(buf) };
      })
    );

    for (const f of loaded) {
      doc.addFileToVFS(f.vfs, f.base64);
      doc.addFont(f.vfs, f.family, f.style);
    }

    return { display: 'Outfit', body: 'DMSans' };
  } catch {
    return { display: 'helvetica', body: 'helvetica' };
  }
}

async function loadCircularPortraitDataUrl(src: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const size = 320;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        // Navy background outside ring, crisp white border, circular photo
        ctx.fillStyle = '#101E2E';
        ctx.fillRect(0, 0, size, size);

        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
        ctx.fillStyle = '#13B5A2';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - 12, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - 18, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        const scale = 1.09;
        const drawSize = size * scale;
        const offset = (size - drawSize) / 2;
        ctx.drawImage(img, offset, offset, drawSize, drawSize);
        ctx.restore();

        resolve(canvas.toDataURL('image/jpeg', 0.94));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export async function downloadModernCvPdf(
  options: GenerateCvOptions = { includePhoto: true }
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const fonts = await registerModernFonts(doc);
  const portraitDataUrl =
    options.includePhoto !== false
      ? await loadCircularPortraitDataUrl(PROFILE.portraitSrc)
      : null;

  const pageWidth = 210;
  const pageHeight = 297;
  const sidebarW = 72.5;
  const topBarH = 2.2;

  // Colors
  const NAVY: [number, number, number] = [16, 30, 46];
  const NAVY_DIVIDER: [number, number, number] = [34, 53, 74];
  const NAVY_MUTED_BAR: [number, number, number] = [36, 56, 78];
  const TEAL: [number, number, number] = [19, 181, 162];
  const WHITE: [number, number, number] = [255, 255, 255];
  const SIDEBAR_SUB: [number, number, number] = [194, 206, 219];
  const INK: [number, number, number] = [15, 23, 42];
  const SLATE: [number, number, number] = [51, 65, 85];
  const MUTED: [number, number, number] = [100, 116, 139];
  const LINE_LIGHT: [number, number, number] = [226, 232, 240];
  const PILL_BG: [number, number, number] = [241, 245, 249];

  // Background layout
  doc.setFillColor(...WHITE);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setFillColor(...NAVY);
  doc.rect(0, topBarH, sidebarW, pageHeight - topBarH, 'F');

  doc.setFillColor(...TEAL);
  doc.rect(0, 0, pageWidth, topBarH, 'F');

  // ================= LEFT SIDEBAR =================
  const sbLeft = 9;
  const sbWidth = sidebarW - 18;
  let sy = 13;

  if (portraitDataUrl) {
    const imgSize = 40;
    doc.addImage(
      portraitDataUrl,
      'JPEG',
      (sidebarW - imgSize) / 2,
      sy,
      imgSize,
      imgSize
    );
    sy += imgSize + 9;
  } else {
    sy += 4;
  }

  const drawSidebarHeader = (label: string) => {
    doc.setDrawColor(...NAVY_DIVIDER);
    doc.setLineWidth(0.25);
    doc.line(sbLeft, sy, sbLeft + sbWidth, sy);
    sy += 5.5;
    doc.setFont(fonts.display, fonts.display === 'Outfit' ? 'semibold' : 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(...TEAL);
    doc.text(label, sbLeft, sy, { charSpace: 1.1 });
    doc.setCharSpace(0);
    sy += 6;
  };

  // CONTACT
  drawSidebarHeader('CONTACT');
  const contactItems = [
    { label: 'EMAIL', val: PROFILE.email },
    { label: 'PHONE', val: CV_COPY.phone },
    { label: 'LOCATION', val: CV_COPY.location },
  ];
  for (const item of contactItems) {
    doc.setFont(fonts.body, 'bold');
    doc.setFontSize(6.6);
    doc.setTextColor(...TEAL);
    doc.text(item.label, sbLeft, sy, { charSpace: 0.7 });
    doc.setCharSpace(0);
    sy += 3.6;

    doc.setFont(fonts.body, 'normal');
    doc.setFontSize(8.3);
    doc.setTextColor(...WHITE);
    doc.text(item.val, sbLeft, sy);
    sy += 6.2;
  }
  sy += 2;

  // SKILLS
  drawSidebarHeader('SKILLS');
  for (const skill of CV_COPY.skills) {
    doc.setFillColor(...TEAL);
    doc.circle(sbLeft + 1.1, sy - 1.1, 0.85, 'F');
    doc.setFont(fonts.body, 'normal');
    doc.setFontSize(8.4);
    doc.setTextColor(...WHITE);
    doc.text(skill, sbLeft + 4.2, sy);
    sy += 5.8;
  }
  sy += 3.2;

  // LANGUAGES
  drawSidebarHeader('LANGUAGES');
  for (const lang of CV_COPY.languages) {
    doc.setFont(fonts.body, 'bold');
    doc.setFontSize(8.4);
    doc.setTextColor(...WHITE);
    doc.text(lang.name, sbLeft, sy);

    doc.setFont(fonts.body, 'normal');
    doc.setFontSize(7.6);
    doc.setTextColor(...SIDEBAR_SUB);
    doc.text(lang.level, sbLeft + sbWidth, sy, { align: 'right' });
    sy += 2.6;

    const segGap = 1.6;
    const segW = (sbWidth - segGap * 4) / 5;
    for (let i = 0; i < 5; i++) {
      doc.setFillColor(...(i < lang.filled ? TEAL : NAVY_MUTED_BAR));
      doc.roundedRect(sbLeft + i * (segW + segGap), sy, segW, 1.5, 0.7, 0.7, 'F');
    }
    sy += 7.2;
  }
  sy += 1.8;

  // INTERESTS
  drawSidebarHeader('INTERESTS');
  for (const interest of CV_COPY.interests) {
    doc.setFillColor(...TEAL);
    doc.circle(sbLeft + 1.1, sy - 1.1, 0.85, 'F');
    doc.setFont(fonts.body, 'normal');
    doc.setFontSize(8.3);
    doc.setTextColor(...WHITE);
    doc.text(interest, sbLeft + 4.2, sy);
    sy += 5.5;
  }
  sy += 3.2;

  // REFERENCES
  drawSidebarHeader('REFERENCES');
  for (const ref of CV_COPY.references) {
    doc.setFont(fonts.body, 'bold');
    doc.setFontSize(8.3);
    doc.setTextColor(...WHITE);
    doc.text(ref.name, sbLeft, sy);
    sy += 3.6;

    doc.setFont(fonts.body, 'normal');
    doc.setFontSize(7.3);
    doc.setTextColor(...SIDEBAR_SUB);
    const orgLines = doc.splitTextToSize(ref.org, sbWidth);
    doc.text(orgLines, sbLeft, sy);
    sy += orgLines.length * 3.2 + 0.6;

    doc.setFont(fonts.body, 'normal');
    doc.setFontSize(7.6);
    doc.setTextColor(...TEAL);
    doc.text(ref.contact, sbLeft, sy);
    sy += 5.8;
  }

  // ================= RIGHT MAIN CONTENT =================
  const mainLeft = 83;
  const mainRight = 198;
  const mainWidth = mainRight - mainLeft;
  let my = 21.5;

  // Name: Bold First + Light Rest
  doc.setFont(fonts.display, 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...INK);
  doc.text(CV_COPY.firstName, mainLeft, my);
  const firstW = doc.getTextWidth(CV_COPY.firstName);

  doc.setFont(fonts.display, fonts.display === 'Outfit' ? 'light' : 'normal');
  doc.setFontSize(22);
  doc.setTextColor(...SLATE);
  doc.text(CV_COPY.lastName, mainLeft + firstW, my);
  my += 7;

  // Subtitle
  doc.setFont(fonts.display, fonts.display === 'Outfit' ? 'semibold' : 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(...TEAL);
  doc.text(CV_COPY.subtitle, mainLeft, my, { charSpace: 0.7 });
  doc.setCharSpace(0);
  my += 4.5;

  doc.setDrawColor(...LINE_LIGHT);
  doc.setLineWidth(0.35);
  doc.line(mainLeft, my, mainRight, my);
  my += 8.5;

  const drawMainHeading = (title: string) => {
    doc.setFillColor(...TEAL);
    doc.rect(mainLeft, my - 3.6, 1.2, 4.4, 'F');
    doc.setFont(fonts.display, 'bold');
    doc.setFontSize(9.2);
    doc.setTextColor(...INK);
    doc.text(title, mainLeft + 3.6, my, { charSpace: 1.2 });
    doc.setCharSpace(0);
    my += 6.2;
  };

  // PROFILE
  drawMainHeading('PROFILE');
  doc.setFont(fonts.body, 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(...SLATE);
  const profileLines = doc.splitTextToSize(CV_COPY.profile, mainWidth);
  doc.text(profileLines, mainLeft, my, { lineHeightFactor: 1.42 });
  my += profileLines.length * 4.35 + 6.5;

  // EXPERIENCE
  drawMainHeading('EXPERIENCE');
  const timelineX = mainLeft + 1.5;
  const contentX = mainLeft + 6.5;
  const contentW = mainRight - contentX;

  const nodeYPositions: number[] = [];

  for (let i = 0; i < CV_COPY.experiences.length; i++) {
    const exp = CV_COPY.experiences[i];
    const nodeY = my - 1.2;
    nodeYPositions.push(nodeY);

    // Role & Date
    doc.setFont(fonts.body, 'bold');
    doc.setFontSize(9.6);
    doc.setTextColor(...INK);
    doc.text(exp.role, contentX, my);

    doc.setFont(fonts.body, fonts.body === 'DMSans' ? 'semibold' : 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...TEAL);
    doc.text(exp.period, mainRight, my, { align: 'right' });
    my += 4.3;

    // Company · City
    doc.setFont(fonts.body, 'italic');
    doc.setFontSize(8.2);
    doc.setTextColor(...MUTED);
    doc.text(exp.company, contentX, my);
    my += 4.8;

    // Bullets
    for (const bullet of exp.bullets) {
      doc.setFillColor(...TEAL);
      doc.circle(contentX + 1.2, my - 1.1, 0.7, 'F');

      doc.setFont(fonts.body, 'normal');
      doc.setFontSize(8.4);
      doc.setTextColor(...SLATE);
      const bLines = doc.splitTextToSize(bullet, contentW - 4.5);
      doc.text(bLines, contentX + 4.2, my, { lineHeightFactor: 1.38 });
      my += bLines.length * 3.95 + 1.4;
    }

    my += i < CV_COPY.experiences.length - 1 ? 4.2 : 5.5;
  }

  // Draw connecting vertical timeline line behind nodes, then crisp hollow teal nodes
  if (nodeYPositions.length >= 2) {
    doc.setDrawColor(...LINE_LIGHT);
    doc.setLineWidth(0.35);
    doc.line(
      timelineX,
      nodeYPositions[0] + 2,
      timelineX,
      nodeYPositions[nodeYPositions.length - 1] - 2
    );
  }
  for (const ny of nodeYPositions) {
    doc.setFillColor(...WHITE);
    doc.setDrawColor(...TEAL);
    doc.setLineWidth(0.55);
    doc.circle(timelineX, ny, 1.65, 'FD');
  }

  // EDUCATION
  drawMainHeading('EDUCATION');
  doc.setFont(fonts.body, 'bold');
  doc.setFontSize(9.6);
  doc.setTextColor(...INK);
  doc.text(CV_COPY.education.degree, mainLeft, my);

  doc.setFont(fonts.body, fonts.body === 'DMSans' ? 'semibold' : 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(...TEAL);
  doc.text(CV_COPY.education.year, mainRight, my, { align: 'right' });
  my += 4.6;

  doc.setFont(fonts.body, 'italic');
  doc.setFontSize(8.4);
  doc.setTextColor(...MUTED);
  doc.text(CV_COPY.education.school, mainLeft, my);

  // CGPA badge pill
  doc.setFont(fonts.body, 'bold');
  doc.setFontSize(7.6);
  const cgpaText = CV_COPY.education.cgpa;
  const cgpaW = doc.getTextWidth(cgpaText) + 5.5;
  doc.setFillColor(...PILL_BG);
  doc.roundedRect(mainRight - cgpaW, my - 3.6, cgpaW, 5, 1.2, 1.2, 'F');
  doc.setTextColor(...SLATE);
  doc.text(cgpaText, mainRight - cgpaW / 2, my - 0.1, { align: 'center' });
  my += 10;

  // CERTIFICATIONS (2 columns)
  drawMainHeading('CERTIFICATIONS');
  const colW = mainWidth / 2;
  for (let i = 0; i < CV_COPY.certifications.length; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = mainLeft + col * colW;
    const cy = my + row * 7.2;

    doc.setFillColor(...TEAL);
    doc.roundedRect(cx, cy - 2.9, 1.0, 3.2, 0.4, 0.4, 'F');

    doc.setFont(fonts.body, 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(...INK);
    doc.text(CV_COPY.certifications[i], cx + 3.4, cy);
  }

  doc.save('Muluken_Mola_Tilahun_CV.pdf');
}
