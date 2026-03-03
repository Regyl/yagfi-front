export const STARS_OPERATORS = [
  { value: "GREATER" as const, labelKey: "filters.greaterThan" },
  { value: "LESS" as const, labelKey: "filters.lessThan" },
] as const;

export const LICENSES_OPERATORS = [
  { value: "IN" as const, labelKey: "filters.include" },
  { value: "NOT_IN" as const, labelKey: "filters.exclude" },
] as const;

export type StarsOperator = (typeof STARS_OPERATORS)[number]["value"];
export type LicenseOperator = (typeof LICENSES_OPERATORS)[number]["value"];
