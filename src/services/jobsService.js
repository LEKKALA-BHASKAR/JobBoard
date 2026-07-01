import { SEED_JOBS } from '../data/seedJobs';
import { STORAGE_KEYS, SEED_VERSION } from '../constants/storage';

// Simulated latency so skeleton states are actually testable.
const LATENCY_MS = 180;

function delay(ms = LATENCY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function safeRead(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage may be unavailable (private mode, quota). Silently drop.
  }
}

/**
 * Seeds jobs the first time the app runs. Preserves user-created jobs (`isCustom`)
 * so the seed never overwrites custom content, even after a seed version bump.
 */
function ensureSeeded() {
  const currentJobs = safeRead(STORAGE_KEYS.jobs, null);
  const seededVersion = safeRead(STORAGE_KEYS.seedVersion, 0);

  if (!currentJobs) {
    safeWrite(STORAGE_KEYS.jobs, SEED_JOBS);
    safeWrite(STORAGE_KEYS.seedVersion, SEED_VERSION);
    return;
  }

  if (seededVersion !== SEED_VERSION) {
    const customs = currentJobs.filter((j) => j.isCustom);
    const merged = [...customs, ...SEED_JOBS];
    // Dedupe by id, preferring the custom copy (which came first).
    const seen = new Set();
    const deduped = merged.filter((j) => {
      if (seen.has(j.id)) return false;
      seen.add(j.id);
      return true;
    });
    safeWrite(STORAGE_KEYS.jobs, deduped);
    safeWrite(STORAGE_KEYS.seedVersion, SEED_VERSION);
  }
}

ensureSeeded();

function readJobs() {
  return safeRead(STORAGE_KEYS.jobs, []);
}

function writeJobs(jobs) {
  safeWrite(STORAGE_KEYS.jobs, jobs);
}

function readBookmarks() {
  return safeRead(STORAGE_KEYS.bookmarks, []);
}

function writeBookmarks(ids) {
  safeWrite(STORAGE_KEYS.bookmarks, ids);
}

function readMyJobs() {
  return safeRead(STORAGE_KEYS.myJobs, []);
}

function writeMyJobs(ids) {
  safeWrite(STORAGE_KEYS.myJobs, ids);
}

// --- Public API. Swap this file for a REST/GraphQL client and nothing else changes. ---

export async function getJobs() {
  await delay();
  return readJobs();
}

export async function getJobById(id) {
  await delay(80);
  return readJobs().find((j) => j.id === id) ?? null;
}

export async function createJob(input) {
  await delay(120);
  const jobs = readJobs();
  const id = `usr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  const now = new Date().toISOString();
  const job = {
    ...input,
    id,
    postedAt: now,
    updatedAt: now,
    isCustom: true,
    salaryUnit: input.salaryUnit || 'year',
  };
  jobs.unshift(job);
  writeJobs(jobs);
  const mine = readMyJobs();
  mine.unshift(id);
  writeMyJobs(mine);
  return job;
}

export async function updateJob(id, patch) {
  await delay(120);
  const jobs = readJobs();
  const idx = jobs.findIndex((j) => j.id === id);
  if (idx === -1) throw new Error('Job not found');
  const updated = { ...jobs[idx], ...patch, id, updatedAt: new Date().toISOString() };
  jobs[idx] = updated;
  writeJobs(jobs);
  return updated;
}

export async function deleteJob(id) {
  await delay(120);
  const jobs = readJobs().filter((j) => j.id !== id);
  writeJobs(jobs);
  const bms = readBookmarks().filter((b) => b !== id);
  writeBookmarks(bms);
  const mine = readMyJobs().filter((m) => m !== id);
  writeMyJobs(mine);
  return true;
}

export async function getBookmarks() {
  await delay(60);
  return readBookmarks();
}

export async function toggleBookmark(id) {
  const current = readBookmarks();
  const has = current.includes(id);
  const next = has ? current.filter((b) => b !== id) : [id, ...current];
  writeBookmarks(next);
  return { bookmarked: !has, bookmarks: next };
}

export async function getMyJobIds() {
  await delay(40);
  return readMyJobs();
}

// Escape hatch for tests / dev tools.
export function _resetAll() {
  try {
    localStorage.removeItem(STORAGE_KEYS.jobs);
    localStorage.removeItem(STORAGE_KEYS.bookmarks);
    localStorage.removeItem(STORAGE_KEYS.myJobs);
    localStorage.removeItem(STORAGE_KEYS.seedVersion);
  } catch {}
  ensureSeeded();
}
