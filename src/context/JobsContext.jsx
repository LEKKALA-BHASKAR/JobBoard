import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import * as jobsService from '../services/jobsService';

const JobsContext = createContext(null);

const initialState = {
  jobs: [],
  bookmarks: [],
  myJobIds: [],
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'load/start':
      return { ...state, loading: true, error: null };
    case 'load/success':
      return {
        ...state,
        loading: false,
        jobs: action.jobs,
        bookmarks: action.bookmarks,
        myJobIds: action.myJobIds,
      };
    case 'load/error':
      return { ...state, loading: false, error: action.error };
    case 'jobs/set':
      return { ...state, jobs: action.jobs };
    case 'jobs/add':
      return {
        ...state,
        jobs: [action.job, ...state.jobs],
        myJobIds: [action.job.id, ...state.myJobIds],
      };
    case 'jobs/update':
      return {
        ...state,
        jobs: state.jobs.map((j) => (j.id === action.job.id ? action.job : j)),
      };
    case 'jobs/remove':
      return {
        ...state,
        jobs: state.jobs.filter((j) => j.id !== action.id),
        bookmarks: state.bookmarks.filter((b) => b !== action.id),
        myJobIds: state.myJobIds.filter((m) => m !== action.id),
      };
    case 'bookmarks/set':
      return { ...state, bookmarks: action.bookmarks };
    default:
      return state;
  }
}

export function JobsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      dispatch({ type: 'load/start' });
      try {
        const [jobs, bookmarks, myJobIds] = await Promise.all([
          jobsService.getJobs(),
          jobsService.getBookmarks(),
          jobsService.getMyJobIds(),
        ]);
        if (!cancelled) {
          dispatch({ type: 'load/success', jobs, bookmarks, myJobIds });
        }
      } catch (error) {
        if (!cancelled) dispatch({ type: 'load/error', error });
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const createJob = useCallback(async (input) => {
    const job = await jobsService.createJob(input);
    dispatch({ type: 'jobs/add', job });
    return job;
  }, []);

  const updateJob = useCallback(async (id, patch) => {
    const job = await jobsService.updateJob(id, patch);
    dispatch({ type: 'jobs/update', job });
    return job;
  }, []);

  const deleteJob = useCallback(async (id) => {
    await jobsService.deleteJob(id);
    dispatch({ type: 'jobs/remove', id });
  }, []);

  const toggleBookmark = useCallback(async (id) => {
    const { bookmarks } = await jobsService.toggleBookmark(id);
    dispatch({ type: 'bookmarks/set', bookmarks });
    return bookmarks.includes(id);
  }, []);

  const isBookmarked = useCallback(
    (id) => state.bookmarks.includes(id),
    [state.bookmarks],
  );

  const isMine = useCallback(
    (id) => state.myJobIds.includes(id),
    [state.myJobIds],
  );

  const value = useMemo(
    () => ({
      ...state,
      createJob,
      updateJob,
      deleteJob,
      toggleBookmark,
      isBookmarked,
      isMine,
    }),
    [state, createJob, updateJob, deleteJob, toggleBookmark, isBookmarked, isMine],
  );

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error('useJobs must be used inside JobsProvider');
  return ctx;
}
