/**
 * Password policy
 */
export const PASSWORD_POLICY = {
  minLength: 8,
  maxLength: 64,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialCharacter: true,
} as const;

/**
 * Validate password strength
 */
export const validatePassword = (
  password: string
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < PASSWORD_POLICY.minLength) {
    errors.push(
      `Password must be at least ${PASSWORD_POLICY.minLength} characters long.`
    );
  }

  if (password.length > PASSWORD_POLICY.maxLength) {
    errors.push(
      `Password must not exceed ${PASSWORD_POLICY.maxLength} characters.`
    );
  }

  if (
    PASSWORD_POLICY.requireUppercase &&
    !/[A-Z]/.test(password)
  ) {
    errors.push(
      "Password must contain at least one uppercase letter."
    );
  }

  if (
    PASSWORD_POLICY.requireLowercase &&
    !/[a-z]/.test(password)
  ) {
    errors.push(
      "Password must contain at least one lowercase letter."
    );
  }

  if (
    PASSWORD_POLICY.requireNumber &&
    !/\d/.test(password)
  ) {
    errors.push(
      "Password must contain at least one number."
    );
  }

  if (
    PASSWORD_POLICY.requireSpecialCharacter &&
    !/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]]/.test(password)
  ) {
    errors.push(
      "Password must contain at least one special character."
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};