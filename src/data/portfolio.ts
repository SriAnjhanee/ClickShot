export interface ReelItem {
  id: string;
  title: string;
  category: 'weddings' | 'celebrations' | 'brands' | 'lifestyle' | 'parties';
  categoryLabel: string;
  videoUrl: string;
  turnaroundTime: string;
  client: string;
  eventDescription: string;
  viewsCount: string;
  aspectRatio: string;
  musicTrack: string;
  featured?: boolean;
}

export const PORTFOLIO_CATEGORIES = [
  { id: 'all', label: 'All Reels' },
  { id: 'weddings', label: 'Weddings & Sangeet' },
  { id: 'celebrations', label: 'Birthdays & Parties' },
  { id: 'brands', label: 'Brands & Launches' },
  { id: 'lifestyle', label: 'Creator & Lifestyle' },
] as const;

export const PORTFOLIO_REELS: ReelItem[] = [];

// Hero Reels spotlight composition
export const HERO_REELS = [
  {
    id: 'hero-center',
    title: 'PMJ Jewels Grand Store Opening',
    category: 'Brand & Launches',
    videoUrl: 'pmj.mp4',
    turnaround: '⚡ Delivered in 38m',
    badge: 'LIVE EVENT REEL',
  },
  {
    id: 'hero-left',
    title: 'Birthday Celebration',
    category: 'Birthdays & Nightlife',
    videoUrl: 'birthday.mp4',
    turnaround: '⚡ Delivered in 25m',
    badge: 'PARTY VIBE',
  },
  {
    id: 'hero-right',
    title: 'Her Cinematic Moment',
    category: 'Personal & Creators',
    videoUrl: 'pink.mp4',
    turnaround: '⚡ Delivered in 40m',
    badge: 'Cinematic Reel',
  }
];
