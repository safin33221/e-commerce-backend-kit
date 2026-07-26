export const PAYMENT_METHOD = {
  COD: "COD",
  STRIPE: "STRIPE",
  SSLCOMMERZ: "SSLCOMMERZ",
  BKASH: "BKASH",
  NAGAD: "NAGAD",
} as const;

export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
} as const;