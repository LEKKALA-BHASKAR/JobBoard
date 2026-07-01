import { useNavigate, useParams } from 'react-router-dom';
import { JobForm } from '../components/JobForm';
import { useJobs } from '../context/JobsContext';
import { useToast } from '../context/ToastContext';
import { SEO } from '../components/SEO';
import { NotFoundInline } from './NotFoundPage';

export default function EditJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, loading, updateJob } = useJobs();
  const toast = useToast();

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-sm text-[color:var(--color-text-muted)] sm:px-6">
        Loading role…
      </div>
    );
  }

  const job = jobs.find((j) => j.id === id);
  if (!job) return <NotFoundInline title="Role not found" />;

  const onSubmit = async (values) => {
    await updateJob(job.id, values);
    toast.success('Changes saved', { title: 'Listing updated' });
    navigate(`/jobs/${job.id}`);
  };

  return (
    <>
      <SEO title={`Edit ${job.title}`} description="Update your job listing." />
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
        <header className="mb-8">
          <span className="text-[12.5px] font-semibold uppercase tracking-wider text-[color:var(--color-accent-text)]">
            Edit listing
          </span>
          <h1 className="mt-1 text-[28px] font-semibold tracking-[-0.01em] text-[color:var(--color-text)] sm:text-[32px]">
            {job.title}
          </h1>
          <p className="max-w-xl text-[14px] text-[color:var(--color-text-muted)]">
            Update any details below. Changes are saved locally and take effect immediately.
          </p>
        </header>
        <JobForm initial={job} onSubmit={onSubmit} submitLabel="Save changes" />
      </div>
    </>
  );
}
