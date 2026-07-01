export const STORAGE_KEYS = {
  jobs: 'postline.jobs',
  bookmarks: 'postline.bookmarks',
  myJobs: 'postline.myJobs',
  theme: 'postline.theme',
  seedVersion: 'postline.seedVersion',
};

// Bump this if seed data is meaningfully updated. Seed only runs when the
// stored version differs AND the user has not posted any custom jobs.
export const SEED_VERSION = 1;
