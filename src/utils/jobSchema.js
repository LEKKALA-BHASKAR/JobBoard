import { z } from 'zod';
import {
  CATEGORIES,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  WORKPLACE_TYPES,
} from '../constants/enums';

const values = (list) => list.map((o) => o.value);

const urlLike = z
  .string()
  .trim()
  .refine((v) => !v || /^https?:\/\/[^\s]+$/i.test(v), {
    message: 'Enter a valid URL starting with http:// or https://',
  })
  .optional()
  .or(z.literal(''));

export const jobSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, 'Job title must be at least 3 characters')
      .max(120, 'Job title is too long'),
    companyName: z
      .string()
      .trim()
      .min(2, 'Company name is required')
      .max(80, 'Company name is too long'),
    companyWebsite: urlLike,
    companyLogo: urlLike,
    location: z.string().trim().min(2, 'Location is required'),
    category: z.enum(values(CATEGORIES), {
      errorMap: () => ({ message: 'Choose a category' }),
    }),
    level: z.enum(values(EXPERIENCE_LEVELS), {
      errorMap: () => ({ message: 'Choose an experience level' }),
    }),
    workplace: z.enum(values(WORKPLACE_TYPES), {
      errorMap: () => ({ message: 'Choose a workplace type' }),
    }),
    employment: z.enum(values(EMPLOYMENT_TYPES), {
      errorMap: () => ({ message: 'Choose an employment type' }),
    }),
    salaryUnit: z.enum(['year', 'hour']),
    currency: z.enum(['USD', 'EUR', 'GBP', 'CAD', 'AUD']),
    salaryMin: z
      .number({ invalid_type_error: 'Minimum salary is required' })
      .positive('Minimum must be greater than 0'),
    salaryMax: z
      .number({ invalid_type_error: 'Maximum salary is required' })
      .positive('Maximum must be greater than 0'),
    skills: z
      .array(z.string().trim().min(1))
      .min(1, 'Add at least one skill')
      .max(15, 'Keep it under 15 skills'),
    summary: z
      .string()
      .trim()
      .min(60, 'Give at least 60 characters of context')
      .max(600, 'Keep the summary under 600 characters'),
    responsibilities: z
      .array(z.string().trim().min(3))
      .min(2, 'Add at least 2 responsibilities'),
    requirements: z
      .array(z.string().trim().min(3))
      .min(2, 'Add at least 2 requirements'),
    benefits: z.array(z.string().trim().min(3)).default([]),
  })
  .refine((data) => data.salaryMin < data.salaryMax, {
    message: 'Minimum salary must be less than maximum salary',
    path: ['salaryMax'],
  });

export function jobDefaults(overrides = {}) {
  return {
    title: '',
    companyName: '',
    companyWebsite: '',
    companyLogo: '',
    location: '',
    category: 'engineering',
    level: 'mid',
    workplace: 'remote',
    employment: 'full-time',
    salaryUnit: 'year',
    currency: 'USD',
    salaryMin: 80000,
    salaryMax: 140000,
    skills: [],
    summary: '',
    responsibilities: [],
    requirements: [],
    benefits: [],
    ...overrides,
  };
}
