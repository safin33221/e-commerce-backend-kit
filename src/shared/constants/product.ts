export const PRODUCT_STATUS = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  ARCHIVED: "ARCHIVED",
} as const;

export const PRODUCT_SORT_BY = [
  "createdAt",
  "updatedAt",
  "price",
  "name",
] as const;

export const PRODUCT_SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;