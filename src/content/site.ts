export const site = {
  name: "Srikanth Katta",
  shortName: "Srikanth",
  tagline: "Lives at sea level. Visits altitude.",
  bio: "IIT Kharagpur '17. Reserve Bank of India, Mumbai. I wanted a small corner of the internet to belong to me, so here it is. A place for runs, mountains, experiments, hobbies, and the things that refused to stay as passing interests.",
  location: "Mumbai, India",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/srikanthkatta17/", handle: "@srikanthkatta17" },
    { label: "Medium", href: "https://medium.com/@srikanthkatta7", handle: "@srikanthkatta7" },
  ],
};

export const masthead = {
  label: "A Corner of the Internet",
  dateline: "Mumbai, India",
};

export const navSections = [
  { id: "hero", label: "Home", short: "Home" },
  { id: "projects", label: "Experiments", short: "Experiments" },
  { id: "after-hours", label: "After Hours", short: "After Hours" },
  { id: "gallery", label: "Gallery", short: "Gallery" },
  { id: "signoff", label: "Contact", short: "Contact" },
];

/* -------------------- Projects -------------------- */

export type Project = {
  slug: string;
  title: string;
  shortTitle?: string;
  editorialTitle: string;
  metaLine: string;
  year: string;
  kind: string;
  blurb: string;
  cover: string;
  coverVideo?: string;
  youtubeId?: string;
  details?: { label: string; value: string }[];
  inventors?: { name: string; role: string }[];
  longText?: string[];
  personalNote?: string[];
  gallery?: { name: string; image: string; note?: string }[];
};

export const projects: Project[] = [
  {
    slug: "everest-base-camp-trek",
    title: "Everest Base Camp",
    shortTitle: "Base Camp",
    editorialTitle: "The long walk to Everest Base Camp",
    metaLine: "Everest · Himalaya · 5,364m",
    year: "2025",
    kind: "Trek · Khumbu, Nepal",
    blurb:
      "A slow walk into thinner air, colder mornings, and the backyard of the world's tallest mountain. No grand arrival — just step after step until Everest quietly filled the horizon.",
    cover: "/images/route/everest-final.jpg",
  },
  {
    slug: "pangong-frozen-marathon",
    title: "Pangong Frozen Marathon",
    shortTitle: "Pangong",
    editorialTitle: "Running on a frozen lake",
    metaLine: "Pangong Lake · 42 km · −22°C · 4,350m",
    year: "2026",
    kind: "Run · Ladakh, India",
    blurb:
      "Thin air, hard ice, and 42 kilometres across a lake that may not stay frozen for many more winters. Beautiful, brutal, and impossible to forget.",
    cover: "/images/pangong/pangong-portrait.jpeg",
  },
  {
    slug: "tata-mumbai-marathon",
    title: "Tata Mumbai Marathon",
    shortTitle: "Tata Mumbai",
    editorialTitle: "My first marathon in my home city",
    metaLine: "Marathon · Home City · 42.195 km",
    year: "2026",
    kind: "Run · Mumbai, India",
    blurb:
      "The city I knew became a city I had to earn. Familiar roads, unfamiliar pain, and 42 km of learning that home can still surprise you.",
    cover: "/images/projects/tmm-marine-drive.jpg",
    youtubeId: "4K7FuuS_P7w",
  },
  {
    slug: "cocktails",
    title: "Cocktails",
    shortTitle: "Cocktails",
    editorialTitle: "Experiments in a bottle",
    metaLine: "Bottles · Bitters · Poor judgement",
    year: "Ongoing",
    kind: "Hobby · Kitchen counter",
    blurb:
      "Small experiments with bottles, bitters, patience, and occasionally poor judgement. Some worked, some didn't, but most made for a better story.",
    cover: "/images/cocktails/hot-cinamon-butter-rum.jpg",
    gallery: [
      { name: "Penicillin", image: "/images/cocktails/penicilin.jpg", note: "Honey, ginger, smoke. The most adult drink on this list." },
      { name: "Whisky Sour", image: "/images/cocktails/whisky-sour.jpg", note: "The training-wheels drink. Egg white if you have it." },
      { name: "Margarita", image: "/images/cocktails/margarita.jpg", note: "Salt rim, not optional. Cointreau over triple sec, always." },
      { name: "Bees Knees", image: "/images/cocktails/bees-knees.jpg", note: "Lemon, honey, gin. Looks shy, tastes loud." },
      { name: "Gimlet", image: "/images/cocktails/gimlet.jpg", note: "Two ingredients. Mostly about the lime." },
      { name: "Paloma", image: "/images/cocktails/paloma.jpg", note: "Tequila's underrated partner. Grapefruit, salt, sun." },
      { name: "New York Sour", image: "/images/cocktails/new-york-sour.jpg", note: "Whisky sour wearing a wine cape." },
      { name: "Irish Coffee", image: "/images/cocktails/irish-coffee.jpg", note: "Coffee, whisky, cream. Three layers, two patiences." },
      { name: "Piña Colada", image: "/images/cocktails/pinacolada.jpg", note: "Beach drink, no apology. Blended only when the heat justifies it." },
      { name: "Hot Cinnamon Butter Rum", image: "/images/cocktails/hot-cinamon-butter-rum.jpg", note: "December drink. Tastes like a fireplace." },
    ],
  },
  {
    slug: "micro-edm-patent",
    title: "Micro-EDM Drilling — Indian Patent No. 497751",
    shortTitle: "Patent · 497751",
    editorialTitle: "Micro EDM",
    metaLine: "Patent · Research · IIT Kharagpur",
    year: "2024",
    kind: "Patent · Research",
    blurb:
      "A research idea that survived prototypes, paperwork, and time long enough to become a number.",
    cover: "/images/projects/patent-drill.jpg",
    details: [
      { label: "Patent No.", value: "497751" },
      { label: "Application No.", value: "201831007946" },
      { label: "Filed", value: "03 March 2018" },
      { label: "Granted", value: "11 January 2024" },
      { label: "Term", value: "20 years from 03 March 2018" },
      { label: "Patentee", value: "Indian Institute of Technology, Kharagpur" },
      { label: "Field", value: "Mechanical Engineering" },
      { label: "IPC", value: "B23Q 0017090000, E21B 0047040000, G05B" },
      { label: "Authority", value: "The Patent Office, Government of India" },
    ],
    inventors: [
      { name: "Malayath Ganesh", role: "Research Scholar, Dept. of Mechanical Engineering, IIT Kharagpur" },
      { name: "Katta Srikanth", role: "M.Tech student, Dept. of Mechanical Engineering, IIT Kharagpur" },
      { name: "Sidpara Ajay Muljibhai", role: "Assistant Professor, Dept. of Mechanical Engineering, IIT Kharagpur" },
      { name: "Deb Sankha", role: "Assistant Professor, Dept. of Mechanical Engineering, IIT Kharagpur" },
    ],
    longText: [
      "Micro electro discharge machining (micro-EDM) drills sub-millimetre holes by stepping a tool electrode toward a workpiece and letting a controlled spark erode the material — no mechanical contact. The catch: the tool electrode itself erodes too, and as it shortens, the hole geometry drifts. Compensating for that wear in real time is the difference between a clean cylindrical bore and an out-of-spec part.",
      "This patent describes a system and method for performing micro-EDM drilling with continuous tool-wear compensation — letting the machine measure its own erosion and adjust the feed in-process, so the drilled feature stays accurate end-to-end.",
      "The work was done in the Department of Mechanical Engineering at IIT Kharagpur as part of an M.Tech project supervised by Dr. Ajay Muljibhai Sidpara and Dr. Sankha Deb, alongside research scholar Ganesh Malayath. Filed March 2018, granted January 2024.",
    ],
  },
];

/* -------------------- Waypoints (EBC route, used on the trek page) -------------------- */

export type Waypoint = {
  id: string;
  name: string;
  altitude: number;
  altitudeLabel: string;
  distanceKm: number;
  description: string;
  detail: string;
  image: string;
};

export const ebcRoute: Waypoint[] = [
  {
    id: "lukla",
    name: "Lukla",
    altitude: 2860,
    altitudeLabel: "2,860 m",
    distanceKm: 0,
    description: "A runway hanging between cliffs and clouds.",
    detail: "The chaotic little flight in. The shortest commercial runway on earth, tilted nine degrees so gravity helps the brakes. As if someone had forgotten to finish building the airport.",
    image: "/images/route/lukla.jpg",
  },
  {
    id: "phakding",
    name: "Phakding",
    altitude: 2610,
    altitudeLabel: "2,610 m",
    distanceKm: 8,
    description: "The Dudh Koshi follows you everywhere.",
    detail: "Sometimes far below, sometimes roaring beside you, but always there — restless, silver, alive. Suspension bridges swaying. Prayer flags snapping. The first ginger lemon teas.",
    image: "/images/route/phakding.jpg",
  },
  {
    id: "namche",
    name: "Namche Bazaar",
    altitude: 3440,
    altitudeLabel: "3,440 m",
    distanceKm: 19,
    description: "The last place where the world feels familiar.",
    detail: "A tiny mountain town alive in the middle of nowhere: cafes, bakeries, trekking shops. It appears after a climb longer than the map had promised. It sits in the mountains like a secret.",
    image: "/images/route/namche.jpg",
  },
  {
    id: "tengboche",
    name: "Tengboche",
    altitude: 3860,
    altitudeLabel: "3,860 m",
    distanceKm: 30,
    description: "And then — Ama Dablam.",
    detail: "Not all at once. The Himalayas are cruel like that. They never reveal beauty immediately. A pale edge through the clouds, a sharp ridge between darker slopes, a glimpse that vanishes before you are even sure you saw anything at all.",
    image: "/images/route/tengboche.jpg",
  },
  {
    id: "dingboche",
    name: "Dingboche",
    altitude: 4410,
    altitudeLabel: "4,410 m",
    distanceKm: 41,
    description: "Frosted glass. Rub a circle. Watch the light hit.",
    detail: "Windows coated in frost, rooms holding the night's cold as if the walls had absorbed it. The first light on Ama Dablam — first pale, then gold, then blazing. It looked as if someone were slowly lighting the mountains from within.",
    image: "/images/route/dingboche.jpg",
  },
  {
    id: "lobuche",
    name: "Lobuche",
    altitude: 4910,
    altitudeLabel: "4,910 m",
    distanceKm: 49,
    description: "The trail quietly changes its mood.",
    detail: "Past Thukla, the memorials begin. Stone structures wrapped in prayer flags, dedicated to climbers who never returned. Ambition, courage, miscalculation, luck — all resting under the same enormous sky.",
    image: "/images/route/lobuche.jpg",
  },
  {
    id: "gorak-shep",
    name: "Gorak Shep",
    altitude: 5164,
    altitudeLabel: "5,164 m",
    distanceKm: 56,
    description: "3 AM. The Milky Way was waiting.",
    detail: "The stars did not seem above us. They were around us. The sky had depth. It had texture. It felt alive. Even the mountains looked smaller beneath that sky. For a moment, no one moved.",
    image: "/images/route/tents-night.jpg",
  },
  {
    id: "ebc",
    name: "Everest Base Camp",
    altitude: 5364,
    altitudeLabel: "5,364 m",
    distanceKm: 62,
    description: "Tired legs. Dry lips. Water bottles half frozen.",
    detail: "Standing in Everest's backyard. Not the summit. Not above the world. But close enough to feel the gravity of its myth. Some things cannot be carried back in images — they can only be experienced once, and then missed forever.",
    image: "/images/route/tents-night.jpg",
  },
];

export const ebcFinaleImage = "/images/route/everest-final.jpg";

/* -------------------- After Hours (replaces hobbies) -------------------- */

export type AfterHoursKind =
  | "spanish"
  | "piano"
  | "climbing"
  | "swimming"
  | "skating";

export type AfterHoursCard = {
  slug: string;
  kind: AfterHoursKind;
  title: string;
  subtitle: string;
  body: string;
  transfer: string;
  workLink: string;
  trait: string;
  verb: string;
  frequency?: string;
  started?: string;
  currentFocus?: string;
  mood?: string;
};

export const afterHours: AfterHoursCard[] = [
  {
    slug: "spanish",
    kind: "spanish",
    title: "Learning to stay in the conversation.",
    subtitle: "Spanish · poco a poco",
    body: "Still far from fluent, but getting better at small conversations without reaching for Google Translate.",
    transfer: "Learning a new language changes how we show up. It makes us slower to assume, quicker to listen, and more aware of what lives between the words.",
    workLink: "UX writing · research · communication",
    trait: "Empathy",
    verb: "translate",
    frequency: "Daily · 10 min",
    started: "2025",
    currentFocus: "Speaking without translating",
    mood: "Slow but satisfying",
  },
  {
    slug: "piano",
    kind: "piano",
    title: "Wrong notes, better rhythm.",
    subtitle: "Piano · practice log",
    body: "Trying to turn noise into music, one awkward repetition at a time.",
    transfer: "Piano teaches rhythm beyond music. It reminds us when to move, when to pause, and when to let things breathe.",
    workLink: "Motion design · interaction pacing",
    trait: "Rhythm",
    verb: "listen",
    frequency: "2–3x / week",
    started: "2023",
    currentFocus: "Left-hand independence",
    mood: "Humbling",
  },
  {
    slug: "climbing",
    kind: "climbing",
    title: "Chalk, fear, repeat.",
    subtitle: "Bouldering · problem solving",
    body: "Solving problems with fingertips, footwork and a lot of failed attempts on the mat.",
    transfer: "Climbing is debugging made physical: read the problem, form a hypothesis, fall, adjust, try again.",
    workLink: "Systems thinking · debugging · persistence",
    trait: "Problem-solving",
    verb: "grip",
    frequency: "1x / week",
    started: "2025",
    currentFocus: "V4s · slab footwork",
    mood: "Frustrating and addictive",
  },
  {
    slug: "swimming",
    kind: "swimming",
    title: "Lap after lap.",
    subtitle: "Freestyle · breathwork",
    body: "Pool mornings before the city wakes up. Repetition until the day feels easier to enter.",
    transfer: "Swimming teaches that most progress is invisible until suddenly it isn't. Consistency over intensity.",
    workLink: "Long-term thinking · process over output",
    trait: "Consistency",
    verb: "breathe",
    frequency: "3x / week · 8:30 am",
    started: "2026",
    currentFocus: "Bilateral breathing",
    mood: "Meditative",
  },
  {
    slug: "skating",
    kind: "skating",
    title: "Balance at speed.",
    subtitle: "Inline · Marine Drive",
    body: "Wheels over concrete, sea air on one side, and just enough instability to keep it interesting.",
    transfer: "Skating at speed requires committing to the turn before you can see where it leads. So do good product decisions.",
    workLink: "Decisiveness · momentum · trust",
    trait: "Commitment",
    verb: "balance",
    frequency: "Weekends · pre-dawn",
    started: "2015s",
    currentFocus: "Crossovers · faster turns",
    mood: "Cinematic",
  },
];

/* -------------------- Gallery -------------------- */

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export const gallery: GalleryImage[] = [
  { src: "/images/ebc/ebc-amadablam-wide.jpg", alt: "Ama Dablam from the trail", caption: "Khumbu morning" },
  { src: "/images/hero/hero-amadablam.jpg", alt: "Standing beneath Ama Dablam", caption: "Ama Dablam · Tengboche" },
  { src: "/images/pangong/pangong-portrait.jpeg", alt: "Walking across Pangong Lake", caption: "Pangong · 4,350 m" },
  { src: "/images/ebc/ebc-icefall.jpg", alt: "Khumbu icefall", caption: "The icefall, from EBC" },
  { src: "/images/ebc/ebc-14.jpg", alt: "Base Camp arrival", caption: "EBC · 5,364 m" },
  { src: "/images/pangong/pangong-03.jpeg", alt: "On the frozen lake", caption: "The Last Run" },
  { src: "/images/ebc/ebc-08.jpg", alt: "Prayer flags in wind", caption: "Tengboche flags" },
  { src: "/images/ebc/ebc-11.jpg", alt: "Dingboche morning", caption: "Dingboche · frosted glass" },
  { src: "/images/pangong/pangong-05.jpeg", alt: "Race morning on ice", caption: "Race start, Pangong" },
  { src: "/images/ebc/ebc-06.jpg", alt: "Khumbu trail", caption: "Between Namche and Tengboche" },
  { src: "/images/ebc/ebc-07.jpg", alt: "On the trail", caption: "The trail north" },
  { src: "/images/ebc/ebc-13.jpg", alt: "Closer to EBC", caption: "Almost there" },
];

/* -------------------- Footer / Colophon -------------------- */

export const colophon = {
  builtWith: "Next.js, React, Three.js, Framer Motion, Lenis, Tailwind CSS.",
};
