export const EMPLOYMENT_TYPES = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
];

export const EXPERIENCE_LEVELS = [
  { value: 'internship', label: 'Internship' },
  { value: 'entry', label: 'Entry level' },
  { value: 'mid', label: 'Mid level' },
  { value: 'senior', label: 'Senior' },
  { value: 'staff', label: 'Staff / Principal' },
  { value: 'lead', label: 'Lead / Manager' },
];

export const WORKPLACE_TYPES = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' },
];

export const CATEGORIES = [
  { value: 'engineering', label: 'Engineering', accent: '#4f46e5' },
  { value: 'design', label: 'Design', accent: '#db2777' },
  { value: 'product', label: 'Product', accent: '#0891b2' },
  { value: 'data', label: 'Data & ML', accent: '#7c3aed' },
  { value: 'sales', label: 'Sales', accent: '#059669' },
  { value: 'marketing', label: 'Marketing', accent: '#d97706' },
  { value: 'operations', label: 'Operations', accent: '#475569' },
  { value: 'support', label: 'Customer Success', accent: '#0ea5e9' },
];

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'salary-desc', label: 'Highest salary' },
  { value: 'salary-asc', label: 'Lowest salary' },
  { value: 'company-asc', label: 'Company A–Z' },
];

export const PAGE_SIZE = 12;

export const SALARY_MIN = 30000;
export const SALARY_MAX = 400000;

export const LABEL_BY_VALUE = (list) =>
  list.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});
