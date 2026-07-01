import { useMemo, useState } from 'react';
import { Search, Shield, ShieldOff, Trash2, UserCheck, UserX } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../../components/Badge';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { LogoAvatar } from '../../components/LogoAvatar';
import { formatRelative } from '../../utils/format';

export default function AdminUsersPage() {
  const { users, currentUser, updateUser, removeUser } = useAuth();
  const toast = useToast();

  const [query, setQuery] = useState('');
  const [confirmDel, setConfirmDel] = useState(null); // {id, name}

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [...users].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    if (!q) return list;
    return list.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    );
  }, [users, query]);

  const isSelf = (id) => id === currentUser?.id;

  const toggleRole = (u) => {
    if (isSelf(u.id)) {
      toast.error('You cannot demote your own admin account.');
      return;
    }
    updateUser(u.id, { role: u.role === 'admin' ? 'user' : 'admin' });
    toast.success(
      u.role === 'admin' ? `${u.name} is now a user.` : `${u.name} is now an admin.`,
    );
  };

  const toggleDisabled = (u) => {
    if (isSelf(u.id)) {
      toast.error('You cannot disable your own account.');
      return;
    }
    updateUser(u.id, { disabled: !u.disabled });
    toast.success(u.disabled ? `${u.name} enabled.` : `${u.name} disabled.`);
  };

  const doDelete = () => {
    if (!confirmDel) return;
    if (isSelf(confirmDel.id)) {
      toast.error('You cannot delete your own account.');
      setConfirmDel(null);
      return;
    }
    removeUser(confirmDel.id);
    toast.success('User deleted.');
    setConfirmDel(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-wider text-[color:var(--color-text-subtle)]">
            Users
          </p>
          <h1 className="mt-1 text-[24px] font-semibold tracking-[-0.01em] text-[color:var(--color-text)]">
            Manage accounts
          </h1>
          <p className="mt-1 text-[13px] text-[color:var(--color-text-muted)]">
            {users.length} total · {users.filter((u) => u.role === 'admin').length} admins ·{' '}
            {users.filter((u) => u.disabled).length} disabled
          </p>
        </div>
        <div className="w-full max-w-xs">
          <Input
            leftIcon={<Search size={14} aria-hidden="true" />}
            placeholder="Search name or email…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
        <div className="hidden grid-cols-[1.4fr_1fr_.6fr_.7fr_auto] gap-3 border-b border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] px-4 py-2.5 text-[11.5px] font-medium uppercase tracking-wider text-[color:var(--color-text-subtle)] md:grid">
          <span>User</span>
          <span>Email</span>
          <span>Role</span>
          <span>Joined</span>
          <span className="text-right">Actions</span>
        </div>
        <ul>
          {filtered.map((u) => (
            <li
              key={u.id}
              className="grid grid-cols-1 gap-2 border-b border-[color:var(--color-border)] px-4 py-3 last:border-b-0 md:grid-cols-[1.4fr_1fr_.6fr_.7fr_auto] md:items-center md:gap-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <LogoAvatar name={u.name} size={32} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-[14px] font-medium text-[color:var(--color-text)]">
                      {u.name}
                    </span>
                    {isSelf(u.id) && <Badge variant="outline">You</Badge>}
                    {u.disabled && <Badge variant="warning">Disabled</Badge>}
                  </div>
                  <div className="truncate text-[12px] text-[color:var(--color-text-subtle)] md:hidden">
                    {u.email}
                  </div>
                </div>
              </div>
              <div className="hidden truncate text-[13px] text-[color:var(--color-text-muted)] md:block">
                {u.email}
              </div>
              <div className="hidden md:block">
                {u.role === 'admin' ? (
                  <Badge variant="accent">Admin</Badge>
                ) : (
                  <Badge variant="neutral">User</Badge>
                )}
              </div>
              <div className="hidden text-[12.5px] text-[color:var(--color-text-subtle)] md:block">
                {formatRelative(u.createdAt)}
              </div>
              <div className="flex items-center gap-1 md:justify-end">
                <button
                  type="button"
                  onClick={() => toggleRole(u)}
                  disabled={isSelf(u.id)}
                  aria-label={u.role === 'admin' ? 'Demote to user' : 'Promote to admin'}
                  title={u.role === 'admin' ? 'Demote to user' : 'Promote to admin'}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[color:var(--color-border)] text-[color:var(--color-text-muted)] transition hover:text-[color:var(--color-text)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {u.role === 'admin' ? (
                    <ShieldOff size={14} aria-hidden="true" />
                  ) : (
                    <Shield size={14} aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => toggleDisabled(u)}
                  disabled={isSelf(u.id)}
                  aria-label={u.disabled ? 'Enable user' : 'Disable user'}
                  title={u.disabled ? 'Enable user' : 'Disable user'}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[color:var(--color-border)] text-[color:var(--color-text-muted)] transition hover:text-[color:var(--color-text)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {u.disabled ? (
                    <UserCheck size={14} aria-hidden="true" />
                  ) : (
                    <UserX size={14} aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDel({ id: u.id, name: u.name })}
                  disabled={isSelf(u.id)}
                  aria-label="Delete"
                  title="Delete"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[color:var(--color-border)] text-[color:var(--color-danger)] transition hover:bg-[color:var(--color-danger-soft)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 size={14} aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
          {!filtered.length && (
            <li className="px-4 py-10 text-center text-[13px] text-[color:var(--color-text-subtle)]">
              No matching users.
            </li>
          )}
        </ul>
      </div>

      <Modal
        open={Boolean(confirmDel)}
        onClose={() => setConfirmDel(null)}
        title="Delete user?"
      >
        <p className="text-[14px] text-[color:var(--color-text-muted)]">
          Delete <strong className="text-[color:var(--color-text)]">{confirmDel?.name}</strong>?
          The account cannot be signed into again.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmDel(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={doDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
