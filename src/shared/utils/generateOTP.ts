/**
 * Generate numeric OTP
 *
 * @param length OTP length (default: 6)
 */
export const generateOTP = (length: number = 6): string => {
  if (length <= 0) {
    throw new Error("OTP length must be greater than 0");
  }

  let otp = "";

  for (let i = 0; i < length; i++) {
    const digit = Math.floor(Math.random() * 10);
    otp += digit;
  }

  // Prevent leading zero
  if (otp.startsWith("0")) {
    otp = `${Math.floor(Math.random() * 9) + 1}${otp.slice(1)}`;
  }

  return otp;
};