export const DEFAULT_WORKSPACE_FEATURE_PREFIXES = {
  farm: "Nông trại",
  factory: "Nhà máy",
} as const;

export type WorkspaceFeatureType = "farm" | "factory" | (string & {});

export interface FormatWorkspaceFeatureNameOptions {
  customPrefix?: string;
  prefixes?: Record<string, string>;
}

/**
 * Format tên workspace với tiền tố tương ứng của feature khi hiển thị lên UI.
 * Thứ tự ưu tiên prefix:
 * 1. options.customPrefix
 * 2. options.prefixes[feature]
 * 3. DEFAULT_WORKSPACE_FEATURE_PREFIXES[feature]
 */
export function formatWorkspaceFeatureName(
  name?: string | null,
  feature: WorkspaceFeatureType = "farm",
  options?: FormatWorkspaceFeatureNameOptions,
): string {
  const prefix =
    options?.customPrefix ||
    options?.prefixes?.[feature] ||
    (DEFAULT_WORKSPACE_FEATURE_PREFIXES as Record<string, string>)[feature] ||
    DEFAULT_WORKSPACE_FEATURE_PREFIXES.farm;

  const trimmed = name?.trim();
  if (!trimmed) return prefix;
  return `${prefix} ${trimmed}`;
}

/**
 * Loại bỏ tiền tố prefix nếu chuỗi đã có sẵn (để tránh người dùng nhập trùng prefix vào input)
 * Ví dụ: "Nông trại Khang" -> "Khang", "Farm của Khang" -> "của Khang"
 */
export function stripWorkspaceFeaturePrefix(
  name?: string | null,
  feature: WorkspaceFeatureType = "farm",
  options?: FormatWorkspaceFeatureNameOptions,
): string {
  if (!name) return "";
  const prefix =
    options?.customPrefix ||
    options?.prefixes?.[feature] ||
    (DEFAULT_WORKSPACE_FEATURE_PREFIXES as Record<string, string>)[feature] ||
    DEFAULT_WORKSPACE_FEATURE_PREFIXES.farm;

  const trimmed = name.trim();
  const pattern = new RegExp(
    `^(?:${prefix}|nông trại|nhà máy|farm|factory)\\s*`,
    "i",
  );
  return trimmed.replace(pattern, "").trim();
}

export const SELECTED_WORKSPACE_STORAGE_KEY = "admin_selected_workspace";
export const WORKSPACE_CHANGE_EVENT = "eco-farm:workspace-change";
export const WORKSPACE_DATA_UPDATED_EVENT = "eco-farm:workspace-data-updated";
