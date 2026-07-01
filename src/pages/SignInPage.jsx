import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { SEO } from '../components/SEO';
import { Button } from '../components/Button';
import { Field, Input } from '../components/Input';
import { Logo } from '../components/Logo';

const DEMO_ACCOUNTS = [
  { label: 'Admin', email: 'admin@postline.dev', password: 'admin123' },
  { label: 'User', email: 'demo@postline.dev', password: 'demo1234' },
];

export default function SignInPage() {
  const { signIn } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError('Enter both email and password.');
      return;
    }
    setSubmitting(true);
    try {
      const user = await signIn({ email, password });
      toast.success(`Welcome back, ${user.name.split(' ')[0]}.`);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Sign in failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const useDemo = (acct) => {
    setEmail(acct.email);
    setPassword(acct.password);
    setError(null);
  };

  return (
    <>
      <SEO title="Sign in" description="Sign in to your Postline account." />
      <AuthShell>
        <div className="mb-7 flex flex-col items-center gap-2 text-center">
          <Logo />
          <h1 className="mt-2 text-[24px] font-semibold tracking-[-0.01em] text-[color:var(--color-text)]">
            Welcome back
          </h1>
          <p className="text-[13.5px] text-[color:var(--color-text-muted)]">
            Sign in to bookmark roles, post jobs, and manage your account.
          </p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
          <Field label="Email" htmlFor="signin-email" required>
            <Input
              id="signin-email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              leftIcon={<Mail size={14} aria-hidden="true" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <Field label="Password" htmlFor="signin-password" required>
            <Input
              id="signin-password"
              type={showPw ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                  className="text-[color:var(--color-text-subtle)] transition hover:text-[color:var(--color-text)]"
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              }
            />
          </Field>

          {error && (
            <div
              role="alert"
              className="rounded-[var(--radius)] border border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger-soft)] px-3 py-2 text-[13px] text-[color:var(--color-danger)]"
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            loading={submitting}
            leftIcon={!submitting ? <LogIn size={14} aria-hidden="true" /> : null}
          >
            Sign in
          </Button>
        </form>

        <p className="mt-5 text-center text-[13px] text-[color:var(--color-text-muted)]">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-[color:var(--color-secondary)] hover:text-[color:var(--color-secondary-hover)]"
          >
            Create one
          </Link>
        </p>

        <div className="mt-6 rounded-[var(--radius-md)] border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] p-3">
          <div className="mb-2 text-[11.5px] font-medium uppercase tracking-wider text-[color:var(--color-text-subtle)]">
            Demo accounts
          </div>
          <div className="flex flex-wrap gap-2">
            {DEMO_ACCOUNTS.map((a) => (
              <button
                key={a.email}
                type="button"
                onClick={() => useDemo(a)}
                className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-2.5 py-1 text-[12px] text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-text)]"
              >
                Use {a.label}: {a.email}
              </button>
            ))}
          </div>
        </div>
      </AuthShell>
    </>
  );
}

function AuthShell({ children }) {
  return (
    <div className="relative flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 50% at 20% 10%, rgba(249, 115, 22, 0.14), transparent 70%), radial-gradient(40% 50% at 90% 90%, rgba(37, 99, 235, 0.10), transparent 70%)',
        }}
      />
      <div className="relative w-full max-w-md rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-7 shadow-[var(--shadow-elev-2)]">
        {children}
      </div>
    </div>
  );
}
