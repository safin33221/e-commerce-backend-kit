export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,

  PHONE:
    /^(\+8801|01)[3-9]\d{8}$/,

  SLUG:
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;