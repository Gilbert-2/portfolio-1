if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ENDPOINTS = {
  ABOUT: `${process.env.NEXT_PUBLIC_API_URL}/about`,
  EDUCATION: `${process.env.NEXT_PUBLIC_API_URL}/resume/education`,
  EXPERIENCE: `${process.env.NEXT_PUBLIC_API_URL}/resume/experience`,
  SKILLS: `${process.env.NEXT_PUBLIC_API_URL}/resume/skills`,
  CERTIFICATES: `${process.env.NEXT_PUBLIC_API_URL}/resume/certificates`,
  PROJECTS: `${process.env.NEXT_PUBLIC_API_URL}/projects`,
  CONTACT: `${process.env.NEXT_PUBLIC_API_URL}/contact`,
  HIRE: `${process.env.NEXT_PUBLIC_API_URL}/hire/proposals`,
  BLOG: `${process.env.NEXT_PUBLIC_API_URL}/blog`,
  AUTH_LOGIN: `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
  AUTH_PROFILE: `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
  USERS: `${process.env.NEXT_PUBLIC_API_URL}/auth/users`,
  VISITORS: `${process.env.NEXT_PUBLIC_API_URL}/analytics`,
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