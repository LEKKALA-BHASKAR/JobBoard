import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, User, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { SEO } from '../components/SEO';
import { Button } from '../components/Button';
import { Field, Input } from '../components/Input';
import { Logo } from '../components/Logo';

function passwordScore(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0..4
}

const SCORE_LABEL = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];

export default function SignUpPage() {
  const { signUp } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const score = passwordScore(password);

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (name.trim().length < 2) errs.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) errs.email = 'Enter a valid email.';
    if (password.length < 8) errs.password = 'At least 8 characters.';
    if (password !== confirm) errs.confirm = 'Passwords do not match.';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    try {
      const user = await signUp({ name, email, password });
      toast.success(`Account created — welcome, ${user.name.split(' ')[0]}.`);
      navigate('/', { replace: true });
    } catch (err) {
      setErrors({ form: err.message || 'Sign up failed.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Create account" description="Create a Postline account." />
      <div className="relative flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(50% 50% at 80% 10%, rgba(224, 134, 97, 0.18), transparent 70%), radial-gradient(40% 50% at 10% 90%, rgba(122, 157, 224, 0.10), transparent 70%)',
          }}
        />
        <div className="relative w-full max-w-md rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-7 shadow-[var(--shadow-elev-2)]">
          <div className="mb-7 flex flex-col items-center gap-2 text-center">
            <Logo />
            <h1 className="font-display mt-3 text-[36px] font-medium leading-[1.05] tracking-[-0.02em] text-[color:var(--color-text)]">
              Create your <em className="italic">account.</em>
            </h1>
            <p className="mt-1 text-[13.5px] text-[color:var(--color-text-muted)]">
              Free forever — takes about 20 seconds.
            </p>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
            <Field label="Full name" htmlFor="signup-name" error={errors.name} required>
              <Input
                id="signup-name"
                autoComplete="name"
                placeholder="Jane Doe"
                leftIcon={<User size={14} aria-hidden="true" />}
                invalid={!!errors.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>

            <Field label="Email" htmlFor="signup-email" error={errors.email} required>
              <Input
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                leftIcon={<Mail size={14} aria-hidden="true" />}
                invalid={!!errors.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>

            <Field
              label="Password"
              htmlFor="signup-password"
              error={errors.password}
              hint={password ? `Strength: ${SCORE_LABEL[score]}` : 'At least 8 characters.'}
              required
            >
              <Input
                id="signup-password"
                type={showPw ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                invalid={!!errors.password}
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
              {password && (
                <div className="mt-1 flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="h-1 flex-1 rounded-full transition-colors"
                      style={{
                        background:
                          i < score
                            ? score >= 3
                              ? 'var(--color-success)'
                              : score === 2
                                ? 'var(--color-accent)'
                                : 'var(--color-danger)'
                            : 'var(--color-border)',
                      }}
                    />
                  ))}
                </div>
              )}
            </Field>

            <Field
              label="Confirm password"
              htmlFor="signup-confirm"
              error={errors.confirm}
              required
            >
              <Input
                id="signup-confirm"
                type={showPw ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                invalid={!!errors.confirm}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </Field>

            {errors.form && (
              <div
                role="alert"
                className="rounded-[var(--radius)] border border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger-soft)] px-3 py-2 text-[13px] text-[color:var(--color-danger)]"
              >
                {errors.form}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              loading={submitting}
              leftIcon={!submitting ? <UserPlus size={14} aria-hidden="true" /> : null}
            >
              Create account
            </Button>
          </form>

          <p className="mt-5 text-center text-[13px] text-[color:var(--color-text-muted)]">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="font-medium text-[color:var(--color-secondary)] hover:text-[color:var(--color-secondary-hover)]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
