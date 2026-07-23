export const filters = [
  'All',
  'Courses',
  'Music',
  'Live',
  'Gaming',
  'News',
  'Coding',
  'Podcasts',
  'Recently uploaded',
];

export type Video = {
  title: string;
  channel: string;
  views: string;
  age: string;
  duration: string;
  thumbnail: string;
};

export const videos: Video[] = [
  {
    title: 'Build a creator workflow that actually ships',
    channel: 'Vaani Studio',
    views: '128K views',
    age: '2 days ago',
    duration: '18:42',
    thumbnail:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'React dashboard patterns for fast product teams',
    channel: 'Frontend Circle',
    views: '81K views',
    age: '5 days ago',
    duration: '24:11',
    thumbnail:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'How modern video platforms organize feeds',
    channel: 'Product School',
    views: '44K views',
    age: '1 week ago',
    duration: '12:09',
    thumbnail:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df0854?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Creator analytics explained without noise',
    channel: 'Growth Notes',
    views: '203K views',
    age: '2 weeks ago',
    duration: '31:34',
    thumbnail:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Authentication, sessions, and refresh token rotation',
    channel: 'Security Desk',
    views: '96K views',
    age: '3 weeks ago',
    duration: '16:28',
    thumbnail:
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Turning lessons into watchable episodes',
    channel: 'Teacher Lab',
    views: '58K views',
    age: '1 month ago',
    duration: '21:06',
    thumbnail:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
  },
];
