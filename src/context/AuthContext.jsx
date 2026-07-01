import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const USERS_KEY = 'postline.auth.users';
const CURRENT_KEY = 'postline.auth.current';

const DEFAULT_USERS = [
  {
    id: 'u_admin',
    name: 'Alex Admin',
    email: 'admin@postline.dev',
    password: 'admin123',
    role: 'admin',
    disabled: false,
    createdAt: '2026-01-05T10:00:00.000Z',
    avatarSeed: 'A',
  },
  {
    id: 'u_demo',
    name: 'Demo User',
    email: 'demo@postline.dev',
    password: 'demo1234',
    role: 'user',
    disabled: false,
    createdAt: '2026-02-11T09:30:00.000Z',
    avatarSeed: 'D',
  },
  {
    id: 'u_recruiter',
    name: 'Riley Chen',
    email: 'riley@acme.co',
    password: 'password',
    role: 'user',
    disabled: false,
    createdAt: '2026-03-01T14:15:00.000Z',
    avatarSeed: 'R',
  },
];

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USERS;
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readCurrentId() {
  try {
    return localStorage.getItem(CURRENT_KEY) || null;
  } catch {
    return null;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readUsers());
  const [currentUserId, setCurrentUserId] = useState(() => readCurrentId());

  useEffect(() => {
    writeUsers(users);
  }, [users]);

  useEffect(() => {
    if (currentUserId) localStorage.setItem(CURRENT_KEY, currentUserId);
    else localStorage.removeItem(CURRENT_KEY);
  }, [currentUserId]);

  const currentUser = useMemo(() => {
    if (!currentUserId) return null;
    const u = users.find((x) => x.id === currentUserId);
    if (!u || u.disabled) return null;
    // Never expose password in the current user surface.
    const { password: _pw, ...rest } = u;
    return rest;
  }, [users, currentUserId]);

  const signIn = useCallback(
    async ({ email, password }) => {
      const norm = email.trim().toLowerCase();
      const match = users.find((u) => u.email.toLowerCase() === norm);
      if (!match) throw new Error('No account matches that email.');
      if (match.disabled)
        throw new Error('This account has been disabled by an admin.');
      if (match.password !== password)
        throw new Error('That password is incorrect.');
      setCurrentUserId(match.id);
      return match;
    },
    [users],
  );

  const signUp = useCallback(
    async ({ name, email, password }) => {
      const norm = email.trim().toLowerCase();
      if (users.some((u) => u.email.toLowerCase() === norm)) {
        throw new Error('An account with that email already exists.');
      }
      const user = {
        id: `u_${Date.now().toString(36)}`,
        name: name.trim(),
        email: norm,
        password,
        role: 'user',
        disabled: false,
        createdAt: new Date().toISOString(),
        avatarSeed: name.trim().charAt(0).toUpperCase() || 'U',
      };
      setUsers((prev) => [...prev, user]);
      setCurrentUserId(user.id);
      return user;
    },
    [users],
  );

  const signOut = useCallback(() => {
    setCurrentUserId(null);
  }, []);

  const updateUser = useCallback((id, patch) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  }, []);

  const removeUser = useCallback(
    (id) => {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      if (currentUserId === id) setCurrentUserId(null);
    },
    [currentUserId],
  );

  const value = useMemo(
    () => ({
      users: users.map(({ password: _pw, ...rest }) => rest),
      currentUser,
      isAuthed: Boolean(currentUser),
      isAdmin: currentUser?.role === 'admin',
      signIn,
      signUp,
      signOut,
      updateUser,
      removeUser,
    }),
    [users, currentUser, signIn, signUp, signOut, updateUser, removeUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
