import { useNavigate } from 'react-router-dom';
import { JobForm } from '../components/JobForm';
import { useJobs } from '../context/JobsContext';
import { useToast } from '../context/ToastContext';
import { SEO } from '../components/SEO';
import { COMPANIES } from '../data/companies';

// If the user re-uses a well-known company name in the form, we hydrate a few
// extra fields so their listing looks consistent with the seeded ones.
function enrichWithCompany(input) {
  const key = Object.keys(COMPANIES).find(
    (k) => COMPANIES[k].name.toLowerCase() === input.companyName.toLowerCase(),
  );
  if (!key) return input;
  const c = COMPANIES[key];
  return {
    ...input,
    companyWebsite: input.companyWebsite || c.website,
    companyLogo:
      input.companyLogo || `https://logo.clearbit.com/${new URL(c.website).hostname}`,
    companyColor: c.color,
    companyHq: c.hq,
    companySize: c.size,
    companyTagline: c.tagline,
  };
}

export default function PostJobPage() {
  const navigate = useNavigate();
  const { createJob } = useJobs();
  const toast = useToast();

  const onSubmit = async (values) => {
    const enriched = enrichWithCompany(values);
    const job = await createJob(enriched);
    toast.success('Your role is live', { title: 'Job posted' });
    navigate(`/jobs/${job.id}`);
  };

  return (
    <>
      <SEO
        title="Post a job"
        description="Publish a role to Postline in under a minute. Free while in beta."
      />
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
        <header className="mb-8 flex flex-col gap-1">
          <span className="text-[12.5px] font-semibold uppercase tracking-wider text-[color:var(--color-accent-text)]">
            Post a job
          </span>
          <h1 className="text-[28px] font-semibold tracking-[-0.01em] text-[color:var(--color-text)] sm:text-[32px]">
            Share a role with the community
          </h1>
          <p className="max-w-xl text-[14px] text-[color:var(--color-text-muted)]">
            Your listing goes live instantly. Everything is stored locally in this demo — you
            can edit or delete anytime from the role page.
          </p>
        </header>

        <JobForm onSubmit={onSubmit} submitLabel="Publish job" />
      </div>
    </>
  );
}
