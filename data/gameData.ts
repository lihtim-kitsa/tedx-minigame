export type Archetype = {
  id: string;
  label: string;
  description: string;
};

export type Speaker = {
  id: string;
  name: string;
  year: number;
  archetype_id: string;
  photo_url: string;
  talk_title: string;
  result_blurb: string;
};

export type Option = {
  text: string;
  archetype_ids: string[];
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
};

// 13 Unique Archetypes
export const archetypes: Record<string, Archetype> = {
  mohit_tyagi_arch: {
    id: "mohit_tyagi_arch",
    label: "The Mastermind",
    description: "You possess a brilliant strategic mind, carefully building the foundations of knowledge for others.",
  },
  mithoon_arch: {
    id: "mithoon_arch",
    label: "The Maestro",
    description: "You have a deep understanding of rhythm and emotion, composing experiences that resonate on a soulful level.",
  },
  manasa_arch: {
    id: "manasa_arch",
    label: "The Luminary",
    description: "You are a guiding light, radiating positivity and inspiring everyone around you to embrace a world of possibilities.",
  },
  nikhil_arch: {
    id: "nikhil_arch",
    label: "The Disruptor",
    description: "You refuse to accept the status quo, constantly innovating and tearing down old paradigms to build something new.",
  },
  vijendar_arch: {
    id: "vijendar_arch",
    label: "The Conversationalist",
    description: "You have a gift for deep connection, using the art of conversation to bring out the absolute best in others.",
  },
  kritika_arch: {
    id: "kritika_arch",
    label: "The Trailblazer",
    description: "You are fiercely independent, charting your own unique course and refusing to be confined by societal expectations.",
  },
  jayant_arch: {
    id: "jayant_arch",
    label: "The Architect",
    description: "You are a visionary builder, taking raw potential and meticulously constructing the future brick by brick.",
  },
  shashi_arch: {
    id: "shashi_arch",
    label: "The Wordsmith",
    description: "You are a master of language, weaving complex ideas into a beautiful tapestry of words that captivates audiences.",
  },
  vidya_arch: {
    id: "vidya_arch",
    label: "The Iconoclast",
    description: "You fearlessly challenge conventions, redefining roles and breaking stereotypes to pave the way for authenticity.",
  },
  ranveer_arch: {
    id: "ranveer_arch",
    label: "The Artisan",
    description: "You blend passion with technique, elevating everyday elements into unforgettable, masterful experiences.",
  },
  shruti_arch: {
    id: "shruti_arch",
    label: "The Polymath",
    description: "You are wonderfully multifaceted, harmonizing divergent paths and talents to create a truly unique identity.",
  },
  aman_arch: {
    id: "aman_arch",
    label: "The Gladiator",
    description: "You possess relentless determination and grit, grappling with greatness and fighting tirelessly for your goals.",
  },
  will_arch: {
    id: "will_arch",
    label: "The Visionary",
    description: "You have an expansive, global perspective, curating ideas worth spreading to shape the future of society.",
  },
};

export const speakers: Speaker[] = [
  {
    id: "mohit_tyagi",
    name: "Mohit Tyagi",
    year: 2024,
    archetype_id: "mohit_tyagi_arch",
    photo_url: "/MohitTyagi.jpg",
    talk_title: "Building the Foundations of Knowledge",
    result_blurb: "Like Mohit, you are the Mastermind. You take complex concepts and turn them into tangible, impactful realities for everyone.",
  },
  {
    id: "mithoon",
    name: "Mithoon",
    year: 2024,
    archetype_id: "mithoon_arch",
    photo_url: "/Mithoon.jpeg",
    talk_title: "The Rhythm of Emotion",
    result_blurb: "Like Mithoon, you are the Maestro. You connect deeply with people and use your art to evoke profound feelings.",
  },
  {
    id: "manasa_varanasi",
    name: "Manasa Varanasi",
    year: 2024,
    archetype_id: "manasa_arch",
    photo_url: "/ManasaVaranasi.jpg",
    talk_title: "Embracing a World of Possibilities",
    result_blurb: "Like Manasa, you are a Luminary. You think big and inspire others to see the possibilities of tomorrow.",
  },
  {
    id: "nikhil_kamath",
    name: "Nikhil Kamath",
    year: 2024,
    archetype_id: "nikhil_arch",
    photo_url: "/NikhilKamath.jpg",
    talk_title: "Disrupting the Norm",
    result_blurb: "Like Nikhil, you're a Disruptor. You're not afraid to step into the unknown, take charge, and lead the way for others to follow.",
  },
  {
    id: "vijendar_chauhan",
    name: "Vijendar Chauhan",
    year: 2024,
    archetype_id: "vijendar_arch",
    photo_url: "/VijenderChauhan.jpg",
    talk_title: "The Art of Conversation",
    result_blurb: "Like Vijendar, you are a Conversationalist. You connect with people's stories and bring out the absolute best in them.",
  },
  {
    id: "kritika_avasthi",
    name: "Kritika Avasthi",
    year: 2024,
    archetype_id: "kritika_arch",
    photo_url: "/KritikaAvasthi.jpg",
    talk_title: "Charting Your Own Course",
    result_blurb: "Like Kritika, you act as a Trailblazer. You forge your own path, embrace challenges, and aren't afraid to stand out from the crowd.",
  },
  {
    id: "jayant_khatri",
    name: "Jayant Khatri",
    year: 2024,
    archetype_id: "jayant_arch",
    photo_url: "/JayantKhatri.jpg",
    talk_title: "Constructing the Future",
    result_blurb: "Like Jayant, you are an Architect at heart. You see potential in raw ideas and work hard to transmute them into a golden reality.",
  },
  {
    id: "shashi_tharoor",
    name: "Shashi Tharoor",
    year: 2024,
    archetype_id: "shashi_arch",
    photo_url: "/ShashiTharoor.png",
    talk_title: "A Tapestry of Words",
    result_blurb: "Like Shashi, you are a Wordsmith. You weave complex ideas into compelling stories that captivate audiences worldwide.",
  },
  {
    id: "vidya_balan",
    name: "Vidya Balan",
    year: 2024,
    archetype_id: "vidya_arch",
    photo_url: "/VidyaBalan.jpg",
    talk_title: "Redefining Roles",
    result_blurb: "Like Vidya, you are an Iconoclast. You see beyond stereotypes and redefine what is possible in your field.",
  },
  {
    id: "ranveer_brar",
    name: "Ranveer Brar",
    year: 2024,
    archetype_id: "ranveer_arch",
    photo_url: "/RanveerBrar.jpg",
    talk_title: "Crafting Culinary Experiences",
    result_blurb: "Like Ranveer, you are a true Artisan. You blend passion with technique, building memorable experiences from the simplest ingredients.",
  },
  {
    id: "shruti_haasan",
    name: "Shruti Haasan",
    year: 2024,
    archetype_id: "shruti_arch",
    photo_url: "/ShrutiHaasan.jpg",
    talk_title: "Harmonizing Divergent Paths",
    result_blurb: "Like Shruti, you are a Polymath. You embrace your diverse talents to create something truly unique.",
  },
  {
    id: "aman_sherawat",
    name: "Aman Sherawat",
    year: 2024,
    archetype_id: "aman_arch",
    photo_url: "/AmanSheraWat.jpg",
    talk_title: "Grappling with Greatness",
    result_blurb: "Like Aman, you are a Gladiator. You fight for your goals and inspire others with your fierce spirit.",
  },
  {
    id: "will_davis",
    name: "Will Davis",
    year: 2024,
    archetype_id: "will_arch",
    photo_url: "/WillDavis.jpg",
    talk_title: "Ideas Worth Spreading",
    result_blurb: "Like Will, you are a Visionary. You curate and nurture the visions that will shape our future on a global scale.",
  }
];

// Groupings for questions
const BUILDERS = ["mohit_tyagi_arch", "jayant_arch", "ranveer_arch"];
const DISRUPTORS = ["nikhil_arch", "kritika_arch", "aman_arch"];
const THINKERS = ["manasa_arch", "vidya_arch", "shruti_arch", "will_arch"];
const COMMUNICATORS = ["mithoon_arch", "vijendar_arch", "shashi_arch"];

export const questions: Question[] = [
  {
    id: "q1",
    text: "Pick your Friday night",
    options: [
      { text: "Out doing something physical", archetype_ids: DISRUPTORS },
      { text: "Alone with a project", archetype_ids: [...BUILDERS, ...THINKERS] },
      { text: "Deep conversation with one person", archetype_ids: COMMUNICATORS },
      { text: "Center of a big group", archetype_ids: [...COMMUNICATORS, ...DISRUPTORS] },
    ],
  },
  {
    id: "q2",
    text: "Pick a superpower",
    options: [
      { text: "Saying what no one else will", archetype_ids: DISRUPTORS },
      { text: "Seeing the future", archetype_ids: THINKERS },
      { text: "Fixing what's broken", archetype_ids: BUILDERS },
      { text: "Reading people", archetype_ids: COMMUNICATORS },
    ],
  },
  {
    id: "q3",
    text: "Pick a study spot",
    options: [
      { text: "Nowhere, always on the move", archetype_ids: DISRUPTORS },
      { text: "Library silent zone", archetype_ids: BUILDERS },
      { text: "Café with noise", archetype_ids: [...THINKERS, ...COMMUNICATORS] },
      { text: "Wherever the group ends up", archetype_ids: COMMUNICATORS },
    ],
  },
  {
    id: "q4",
    text: "Your friends would call you...",
    options: [
      { text: "The wildcard", archetype_ids: [...DISRUPTORS, ...THINKERS] },
      { text: "The planner", archetype_ids: BUILDERS },
      { text: "The one with the wild idea", archetype_ids: THINKERS },
      { text: "The one who shows up", archetype_ids: [...COMMUNICATORS, ...BUILDERS] },
    ],
  },
  {
    id: "q5",
    text: "Pick a way to spend a free Sunday",
    options: [
      { text: "Chasing an adrenaline spike", archetype_ids: DISRUPTORS },
      { text: "Learning something new", archetype_ids: THINKERS },
      { text: "Making something", archetype_ids: BUILDERS },
      { text: "Doing something for someone else", archetype_ids: COMMUNICATORS },
    ],
  },
  {
    id: "q6",
    text: "If you had 18 minutes on a stage",
    options: [
      { text: "I'd challenge the audience", archetype_ids: [...DISRUPTORS, ...THINKERS] },
      { text: "I'd teach something technical", archetype_ids: BUILDERS },
      { text: "I'd make people laugh first, think second", archetype_ids: THINKERS },
      { text: "I'd tell a personal story", archetype_ids: COMMUNICATORS },
    ],
  },
  {
    id: "q7",
    text: "When faced with a complex problem, you...",
    options: [
      { text: "Break it down into pieces", archetype_ids: BUILDERS },
      { text: "Ask 'why are we doing this?'", archetype_ids: THINKERS },
      { text: "Gather the team to discuss", archetype_ids: COMMUNICATORS },
      { text: "Throw out the rulebook", archetype_ids: DISRUPTORS },
    ],
  },
  {
    id: "q8",
    text: "Your ideal workspace looks like...",
    options: [
      { text: "A messy desk full of prototypes", archetype_ids: BUILDERS },
      { text: "A quiet room with a whiteboard", archetype_ids: THINKERS },
      { text: "A bustling open office", archetype_ids: [...COMMUNICATORS, ...DISRUPTORS] },
      { text: "Whatever coffee shop I'm in today", archetype_ids: DISRUPTORS },
    ],
  },
  {
    id: "q9",
    text: "What’s your communication style?",
    options: [
      { text: "Straight to the point", archetype_ids: DISRUPTORS },
      { text: "Thoughtful and philosophical", archetype_ids: THINKERS },
      { text: "Warm and engaging", archetype_ids: COMMUNICATORS },
      { text: "Detailed and practical", archetype_ids: BUILDERS },
    ],
  },
  {
    id: "q10",
    text: "How do you prefer to leave your mark?",
    options: [
      { text: "By building something that lasts", archetype_ids: BUILDERS },
      { text: "By changing how people think", archetype_ids: THINKERS },
      { text: "By the relationships I've nurtured", archetype_ids: COMMUNICATORS },
      { text: "By disrupting the status quo", archetype_ids: DISRUPTORS },
    ],
  },
];
