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

// Placeholder Archetypes
export const archetypes: Record<string, Archetype> = {
  trailblazer: {
    id: "trailblazer",
    label: "The Trailblazer",
    description: "You forge your own path and aren't afraid of the unknown.",
  },
  visionary: {
    id: "visionary",
    label: "The Visionary",
    description: "You see the world not as it is, but as it could be.",
  },
  builder: {
    id: "builder",
    label: "The Builder",
    description: "You love putting things together and making ideas real.",
  },
  storyteller: {
    id: "storyteller",
    label: "The Storyteller",
    description: "You connect with others through shared experiences and empathy.",
  },
};

// Placeholder Speakers
export const speakers: Speaker[] = [
  {
    id: "speaker_01",
    name: "Jane Doe",
    year: 2024,
    archetype_id: "trailblazer",
    photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=600",
    talk_title: "Forging New Paths in Tech",
    result_blurb: "Like Jane, you're not afraid to step into the unknown. You take charge, take risks, and lead the way for others to follow.",
  },
  {
    id: "speaker_02",
    name: "John Smith",
    year: 2023,
    archetype_id: "visionary",
    photo_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=600",
    talk_title: "The Future of Sustainable Living",
    result_blurb: "Like John, you have a unique perspective on the world. You think big and inspire others to see the possibilities of tomorrow.",
  },
  {
    id: "speaker_03",
    name: "Alex Johnson",
    year: 2022,
    archetype_id: "builder",
    photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=600",
    talk_title: "Building Resilient Communities",
    result_blurb: "Like Alex, you are practical and driven. You take abstract concepts and turn them into tangible, impactful realities.",
  },
  {
    id: "speaker_04",
    name: "Sam Lee",
    year: 2024,
    archetype_id: "storyteller",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=600",
    talk_title: "The Power of Vulnerability",
    result_blurb: "Like Sam, you know how to move an audience. You connect deeply with people and use your voice to spark meaningful change.",
  },
];

// Questions Bank
export const questions: Question[] = [
  {
    id: "q1",
    text: "Pick your Friday night",
    options: [
      { text: "Out doing something physical", archetype_ids: ["trailblazer"] },
      { text: "Alone with a project", archetype_ids: ["builder", "visionary"] },
      { text: "Deep conversation with one person", archetype_ids: ["storyteller"] },
      { text: "Center of a big group", archetype_ids: ["storyteller", "trailblazer"] },
    ],
  },
  {
    id: "q2",
    text: "Pick a superpower",
    options: [
      { text: "Saying what no one else will", archetype_ids: ["trailblazer"] },
      { text: "Seeing the future", archetype_ids: ["visionary"] },
      { text: "Fixing what's broken", archetype_ids: ["builder"] },
      { text: "Reading people", archetype_ids: ["storyteller"] },
    ],
  },
  {
    id: "q3",
    text: "Pick a study spot",
    options: [
      { text: "Nowhere, always on the move", archetype_ids: ["trailblazer"] },
      { text: "Library silent zone", archetype_ids: ["builder"] },
      { text: "Café with noise", archetype_ids: ["visionary", "storyteller"] },
      { text: "Wherever the group ends up", archetype_ids: ["storyteller"] },
    ],
  },
  {
    id: "q4",
    text: "Your friends would call you...",
    options: [
      { text: "The wildcard", archetype_ids: ["trailblazer", "visionary"] },
      { text: "The planner", archetype_ids: ["builder"] },
      { text: "The one with the wild idea", archetype_ids: ["visionary"] },
      { text: "The one who shows up", archetype_ids: ["storyteller", "builder"] },
    ],
  },
  {
    id: "q5",
    text: "Pick a way to spend a free Sunday",
    options: [
      { text: "Chasing an adrenaline spike", archetype_ids: ["trailblazer"] },
      { text: "Learning something new", archetype_ids: ["visionary"] },
      { text: "Making something", archetype_ids: ["builder"] },
      { text: "Doing something for someone else", archetype_ids: ["storyteller"] },
    ],
  },
  {
    id: "q6",
    text: "If you had 18 minutes on a stage",
    options: [
      { text: "I'd challenge the audience", archetype_ids: ["trailblazer", "visionary"] },
      { text: "I'd teach something technical", archetype_ids: ["builder"] },
      { text: "I'd make people laugh first, think second", archetype_ids: ["visionary"] },
      { text: "I'd tell a personal story", archetype_ids: ["storyteller"] },
    ],
  },
];
