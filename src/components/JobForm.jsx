import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CATEGORIES,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  WORKPLACE_TYPES,
} from '../constants/enums';
import { jobDefaults, jobSchema } from '../utils/jobSchema';
import { Field, Input, Select, Textarea } from './Input';
import { TagInput } from './TagInput';
import { BulletInput } from './BulletInput';
import { Button } from './Button';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];

export function JobForm({ initial, submitLabel, onSubmit, submitting }) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: jobDefaults(initial || {}),
    resolver: zodResolver(jobSchema),
    mode: 'onBlur',
  });

  const busy = submitting || isSubmitting;
  const currency = watch('currency');
  const salaryUnit = watch('salaryUnit');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8" noValidate>
      <FormSection title="Role basics" description="What is this role, and where does it live?">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Job title" htmlFor="title" required error={errors.title?.message}>
            <Input
              id="title"
              placeholder="e.g. Senior Frontend Engineer"
              invalid={!!errors.title}
              {...register('title')}
            />
          </Field>
          <Field label="Company name" htmlFor="companyName" required error={errors.companyName?.message}>
            <Input
              id="companyName"
              placeholder="e.g. Postline"
              invalid={!!errors.companyName}
              {...register('companyName')}
            />
          </Field>
          <Field label="Company website" htmlFor="companyWebsite" error={errors.companyWebsite?.message}>
            <Input
              id="companyWebsite"
              placeholder="https://example.com"
              invalid={!!errors.companyWebsite}
              {...register('companyWebsite')}
            />
          </Field>
          <Field label="Company logo URL" htmlFor="companyLogo" hint="Optional. We show initials if this fails to load." error={errors.companyLogo?.message}>
            <Input
              id="companyLogo"
              placeholder="https://logo.clearbit.com/example.com"
              invalid={!!errors.companyLogo}
              {...register('companyLogo')}
            />
          </Field>
          <Field label="Location" htmlFor="location" required error={errors.location?.message}>
            <Input
              id="location"
              placeholder="e.g. Remote (US), San Francisco, London"
              invalid={!!errors.location}
              {...register('location')}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Classification" description="Helps candidates find the role.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Field label="Category" htmlFor="category" required error={errors.category?.message}>
            <Select id="category" invalid={!!errors.category} {...register('category')}>
              {CATEGORIES.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Experience level" htmlFor="level" required error={errors.level?.message}>
            <Select id="level" invalid={!!errors.level} {...register('level')}>
              {EXPERIENCE_LEVELS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Workplace" htmlFor="workplace" required error={errors.workplace?.message}>
            <Select id="workplace" invalid={!!errors.workplace} {...register('workplace')}>
              {WORKPLACE_TYPES.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Employment type" htmlFor="employment" required error={errors.employment?.message}>
            <Select id="employment" invalid={!!errors.employment} {...register('employment')}>
              {EMPLOYMENT_TYPES.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </FormSection>

      <FormSection title="Compensation" description="Transparent salary ranges get 3× more applicants.">
        <div className="grid gap-4 md:grid-cols-4">
          <Field label="Currency" htmlFor="currency" required>
            <Select id="currency" {...register('currency')}>
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Pay period" htmlFor="salaryUnit" required>
            <Select id="salaryUnit" {...register('salaryUnit')}>
              <option value="year">Per year</option>
              <option value="hour">Per hour</option>
            </Select>
          </Field>
          <Field label={`Minimum (${currency})`} htmlFor="salaryMin" required error={errors.salaryMin?.message}>
            <Input
              id="salaryMin"
              type="number"
              inputMode="numeric"
              min={0}
              invalid={!!errors.salaryMin}
              {...register('salaryMin', { valueAsNumber: true })}
            />
          </Field>
          <Field label={`Maximum (${currency})`} htmlFor="salaryMax" required error={errors.salaryMax?.message}>
            <Input
              id="salaryMax"
              type="number"
              inputMode="numeric"
              min={0}
              invalid={!!errors.salaryMax}
              {...register('salaryMax', { valueAsNumber: true })}
            />
          </Field>
        </div>
        <p className="text-[12.5px] text-[color:var(--color-text-subtle)]">
          Range is shown as <span className="text-[color:var(--color-text)]">
            {salaryUnit === 'hour' ? 'per hour' : 'per year'}
          </span>{' '}
          in {currency}. Min must be less than max.
        </p>
      </FormSection>

      <FormSection title="About the role" description="Sell the role. Be specific.">
        <Field
          label="Summary"
          htmlFor="summary"
          hint="1–3 sentences. What is the role and why should someone want it?"
          required
          error={errors.summary?.message}
        >
          <Textarea
            id="summary"
            rows={4}
            invalid={!!errors.summary}
            {...register('summary')}
          />
        </Field>

        <Field label="Skills" htmlFor="skills" required error={errors.skills?.message}>
          <Controller
            control={control}
            name="skills"
            render={({ field }) => (
              <TagInput
                id="skills"
                values={field.value}
                onChange={field.onChange}
                placeholder="e.g. TypeScript, React, PostgreSQL"
                invalid={!!errors.skills}
              />
            )}
          />
        </Field>
      </FormSection>

      <FormSection title="Details" description="Bullet-point what the role covers.">
        <Field label="Responsibilities" required error={errors.responsibilities?.message}>
          <Controller
            control={control}
            name="responsibilities"
            render={({ field }) => (
              <BulletInput
                values={field.value}
                onChange={field.onChange}
                placeholder="Own analytics features end-to-end"
                invalid={!!errors.responsibilities}
              />
            )}
          />
        </Field>

        <Field label="Requirements" required error={errors.requirements?.message}>
          <Controller
            control={control}
            name="requirements"
            render={({ field }) => (
              <BulletInput
                values={field.value}
                onChange={field.onChange}
                placeholder="4+ years of full-stack TypeScript"
                invalid={!!errors.requirements}
              />
            )}
          />
        </Field>

        <Field label="Benefits (optional)" error={errors.benefits?.message}>
          <Controller
            control={control}
            name="benefits"
            render={({ field }) => (
              <BulletInput
                values={field.value}
                onChange={field.onChange}
                placeholder="Health, dental, vision"
              />
            )}
          />
        </Field>
      </FormSection>

      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-[color:var(--color-border)] pt-6">
        <Button type="submit" size="lg" loading={busy}>
          {submitLabel || 'Publish job'}
        </Button>
      </div>
    </form>
  );
}

function FormSection({ title, description, children }) {
  return (
    <section className="grid gap-4 border-b border-[color:var(--color-border)] pb-8 md:grid-cols-[220px_1fr] md:gap-8">
      <div>
        <h2 className="text-[14px] font-semibold text-[color:var(--color-text)]">{title}</h2>
        {description && (
          <p className="mt-1 text-[12.5px] leading-relaxed text-[color:var(--color-text-muted)]">
            {description}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
