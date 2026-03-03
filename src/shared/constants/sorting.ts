export const DEFAULT_SORT_FIELD = "ei.created_at";

export const SORT_FIELDS = [
  { value: "er.stars", labelKey: "sort.fields.stars" },
  { value: "ei.created_at", labelKey: "sort.fields.issueCreated" },
  { value: "ei.updated_at", labelKey: "sort.fields.issueUpdated" },
  { value: "er.created_at", labelKey: "sort.fields.repoCreated" },
  { value: "er.updated_at", labelKey: "sort.fields.repoUpdated" },
] as const;

export const SORT_TYPES = [
  { value: "desc" as const, labelKey: "sort.types.desc" },
  { value: "asc" as const, labelKey: "sort.types.asc" },
] as const;

export type SortField = (typeof SORT_FIELDS)[number]["value"];
export type SortType = (typeof SORT_TYPES)[number]["value"];
