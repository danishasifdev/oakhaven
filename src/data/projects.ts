import { metrics } from './company'

const developments = [
  {
    slug: 'the-solenne',
    name: 'The Solenne',
    place: 'Palm Jumeirah',
    status: 'Handover in progress',
    promisedHandover: '30 Nov 2026',
    homes: '86 apartments and 6 penthouses',
    area: '412,000 sq ft',
    architect: 'Atelier Rhein',
    img: '/img/solenne.avif',
    features: 'Curved terraces. Every home has a private terrace. Sea view from every floor.',
    homeTypes: [
      { type: 'Apartments', homes: 86 },
      { type: 'Penthouses', homes: 6 },
    ],
    milestones: [
      { date: 'Jan 2024', stage: 'Foundation', image: '/img/wall.avif' },
      { date: 'Jan 2025', stage: 'Structure complete', image: '/img/tree.avif' },
      { date: 'Jul 2025', stage: 'Facade complete', image: '/img/facade.avif' },
      { date: 'Jan 2026', stage: 'Interiors', image: '/img/philosophy.avif' },
      { date: 'Nov 2026', stage: 'Handover', image: '/img/skyline.avif' },
    ],
  },
  {
    slug: 'maison-aria',
    name: 'Maison Aria',
    place: 'Dubai Hills',
    status: 'Under construction',
    promisedHandover: '15 Jun 2027',
    homes: '24 villas',
    area: '168,000 sq ft',
    architect: 'Studio Maren',
    img: '/img/maison.avif',
    features: 'Villas around shared courtyards. Private pools. Plot sizes 6,200 to 9,800 sq ft.',
    homeTypes: [
      { type: 'Villas', homes: 24, detail: 'Plot sizes 6,200 to 9,800 sq ft' },
    ],
    milestones: [
      { date: 'Mar 2025', stage: 'Foundation', image: '/img/tree.avif' },
      { date: 'Feb 2026', stage: 'Structure', image: '/img/wall.avif' },
      { date: 'Sep 2026', stage: 'Facade', image: '/img/maison.avif' },
      { date: 'Jan 2027', stage: 'Interiors', image: '/img/philosophy.avif' },
      { date: 'Jun 2027', stage: 'Handover', image: '/img/skyline.avif' },
    ],
  },
  {
    slug: 'the-residences-08',
    name: 'The Residences 08',
    place: 'Downtown Dubai',
    status: 'Early construction',
    promisedHandover: '30 Sep 2028',
    homes: '312 residences across eight towers',
    area: '1.1M sq ft',
    architect: 'Atelier Rhein with Studio Maren',
    img: '/img/residences.avif',
    features: '',
    homeTypes: [
      { type: 'Residences', homes: 312, detail: 'Across eight towers' },
    ],
    milestones: [
      { date: 'Oct 2025', stage: 'Foundation', image: '/img/residences.avif' },
      { date: 'Apr 2027', stage: 'Structure', image: '/img/wall.avif' },
      { date: 'Jan 2028', stage: 'Facade', image: '/img/facade.avif' },
      { date: 'Jun 2028', stage: 'Interiors', image: '/img/philosophy.avif' },
      { date: 'Sep 2028', stage: 'Handover', image: '/img/skyline.avif' },
    ],
  },
] as const

export const projects = developments.map((project) => ({
  ...project,
  year: Number(project.promisedHandover.slice(-4)),
  vantage: project.status,
  line: project.features,
  facts: {
    Homes: project.homes,
    Area: project.area,
    Architect: project.architect,
    'Promised handover': project.promisedHandover,
    Status: project.status,
  },
  timeline: project.milestones.map(({ date, stage }) => ({
    time: date,
    title: stage,
    text: `${stage}: ${date}.`,
  })),
}))

const parseMonth = (value: string) => {
  const [month, year] = value.split(' ')
  return new Date(Number(year), new Date(`${month} 1, 2000`).getMonth(), 1).getTime()
}

// Shared by the home developments row and the developments page so both show
// the same elapsed-versus-planned progress for each project.
export const projectProgress = (
  milestones: ReadonlyArray<{ date: string }>,
  now = new Date(),
) => {
  if (milestones.length < 2) return 0
  const start = parseMonth(milestones[0].date)
  const end = parseMonth(milestones[milestones.length - 1].date)
  const current = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
  return Math.min(100, Math.max(0, Math.round(((current - start) / (end - start)) * 100)))
}

export const projectCurrentMilestone = (
  milestones: ReadonlyArray<{ date: string; stage: string }>,
  now = new Date(),
) => {
  const current = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
  const reached = milestones.filter((milestone) => parseMonth(milestone.date) <= current)
  return reached.at(-1)?.stage ?? 'Foundation'
}

export { metrics }
