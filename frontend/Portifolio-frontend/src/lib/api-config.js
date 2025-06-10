export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const ENDPOINTS = {
  EDUCATION: `${API_BASE_URL}/resume/education`,
  EXPERIENCE: `${API_BASE_URL}/resume/experience`,
  SKILLS: `${API_BASE_URL}/resume/skills?category`,
  CERTIFICATES: `${API_BASE_URL}/resume/certificates`,
  PROJECTS: `${API_BASE_URL}/projects`,
  CONTACT: `${API_BASE_URL}/contact`,
  HIRE: `${API_BASE_URL}/hire/proposals`,
  BLOG: `${API_BASE_URL}/blog`,
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Present';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
};

export const getMonthYearDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const startYear = start.getFullYear();
  const startMonth = start.getMonth();
  
  const endYear = end.getFullYear();
  const endMonth = end.getMonth();
  
  const yearDiff = endYear - startYear;
  const monthDiff = endMonth - startMonth;
  
  const totalMonths = yearDiff * 12 + monthDiff;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  
  let duration = '';
  if (years > 0) {
    duration += `${years} ${years === 1 ? 'year' : 'years'}`;
  }
  if (months > 0) {
    duration += duration ? ` ${months} ${months === 1 ? 'month' : 'months'}` : `${months} ${months === 1 ? 'month' : 'months'}`;
  }
  if (!duration) {
    duration = 'Less than a month';
  }
  
  return duration;
};