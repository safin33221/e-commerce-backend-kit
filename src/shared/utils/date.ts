import {
  addDays,
  addHours,
  addMinutes,
  format,
  formatDistanceToNow,
  isAfter,
  isBefore,
  isValid,
  parseISO,
} from "date-fns";

/**
 * Format Date
 */
export const formatDate = (
  date: Date | string,
  pattern = "dd MMM yyyy"
): string => {
  const value = typeof date === "string" ? parseISO(date) : date;

  return format(value, pattern);
};

/**
 * Human readable time
 */
export const timeAgo = (date: Date | string): string => {
  const value = typeof date === "string" ? parseISO(date) : date;

  return formatDistanceToNow(value, {
    addSuffix: true,
  });
};

/**
 * Add Minutes
 */
export const addMinutesToDate = (
  minutes: number,
  date: Date = new Date()
): Date => {
  return addMinutes(date, minutes);
};

/**
 * Add Hours
 */
export const addHoursToDate = (
  hours: number,
  date: Date = new Date()
): Date => {
  return addHours(date, hours);
};

/**
 * Add Days
 */
export const addDaysToDate = (
  days: number,
  date: Date = new Date()
): Date => {
  return addDays(date, days);
};

/**
 * Check Expired
 */
export const isExpired = (date: Date): boolean => {
  return isBefore(date, new Date());
};

/**
 * Check Future Date
 */
export const isFutureDate = (date: Date): boolean => {
  return isAfter(date, new Date());
};

/**
 * Validate Date
 */
export const isValidDate = (date: Date): boolean => {
  return isValid(date);
};