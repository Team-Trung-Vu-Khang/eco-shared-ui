import { useMemo } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { AdminMenuOptions } from "../menus/resolveAdminMenu";
import { resolveAdminMenu } from "../menus/resolveAdminMenu";
import { filterMenuByContext } from "./menuUtils";
import type { MenuSection as SidebarMenuSection, UserContext } from "./types";
import type {
  MenuSection as AdminMenuSection,
  MenuGroup,
} from "../menus/adminSidebarMenus";

export type AdminMenuItem = MenuGroup["items"][number];
export type AdminMenuChild = NonNullable<AdminMenuItem["children"]>[number];

export interface UserLike {
  roles?: string[];
  roleCodes?: string[];
  role?: string | string[];
  workspaceRoles?: Array<{ roleCode?: string; [key: string]: unknown }>;
  isFirstOnboard?: boolean;
  [key: string]: unknown;
}

export interface GetAccountSidebarMenuParams extends AdminMenuOptions {
  user?: any;
  userContext?: UserContext;
}

/**
 * Normalizes user object across eco-shared-ui and app variants
 * into standard UserContext.
 */
export function extractUserContext(user?: any): UserContext {
  const typedUser = user as UserLike | null | undefined;
  const directRoles =
    typedUser?.roles ??
    typedUser?.roleCodes ??
    (typedUser?.role
      ? Array.isArray(typedUser.role)
        ? typedUser.role
        : [typedUser.role]
      : []);

  const workspaceRoles =
    typedUser?.workspaceRoles
      ?.map((r) => r.roleCode)
      .filter((code): code is string => Boolean(code)) ?? [];

  const roles = Array.from(new Set([...directRoles, ...workspaceRoles]));

  return {
    roles,
    isFirstOnboard: Boolean(typedUser?.isFirstOnboard),
  };
}

/**
 * Pure function to resolve and filter sidebar menu for a specific account / context.
 */
export function getAccountSidebarMenu(
  params: GetAccountSidebarMenuParams = {},
): AdminMenuSection[] {
  const { user, userContext, ...adminOptions } = params;
  const resolvedContext: UserContext = userContext ?? extractUserContext(user);
  const masterMenu = resolveAdminMenu(adminOptions);

  return filterMenuByContext(
    masterMenu as unknown as SidebarMenuSection[],
    resolvedContext,
  ) as unknown as AdminMenuSection[];
}

export interface UseAccountSidebarMenuOptions extends AdminMenuOptions {
  user?: any;
  userContext?: UserContext;
}

/**
 * React hook to get authorized sidebar menu items for the current account.
 */
export function useAccountSidebarMenu(
  options: UseAccountSidebarMenuOptions = {},
): AdminMenuSection[] {
  const { user: authUser } = useAuth();
  const effectiveUser = options.user ?? authUser;

  const serializedOptions = JSON.stringify({
    isDev: options.isDev,
    isMevi: options.isMevi,
    isRice: options.isRice,
    isEcoSystemAdmin: options.isEcoSystemAdmin,
    isFactory: options.isFactory,
    isOwnerFactory: options.isOwnerFactory,
  });

  return useMemo(() => {
    return getAccountSidebarMenu({
      ...options,
      user: effectiveUser,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveUser, options.userContext, options.menu, serializedOptions]);
}

/**
 * Custom predicate filter for menu sections and their items.
 */
export function filterSidebarMenu(
  menu: AdminMenuSection[],
  predicate: (item: AdminMenuItem, section: MenuGroup) => boolean,
): AdminMenuSection[] {
  return menu.reduce<AdminMenuSection[]>((accSections, section) => {
    if ("note" in section) {
      accSections.push(section);
      return accSections;
    }

    const filteredItems = section.items.reduce<AdminMenuItem[]>(
      (accItems, item) => {
        if (predicate(item, section)) {
          accItems.push(item);
        }
        return accItems;
      },
      [],
    );

    if (filteredItems.length > 0) {
      accSections.push({
        ...section,
        items: filteredItems,
      });
    }

    return accSections;
  }, []);
}

/**
 * Excludes items/children whose `href` matches or starts with any of the excluded paths/prefixes.
 * If all children of an item are excluded and the parent item has no valid href, the parent is omitted.
 * If all items in a section are excluded, the entire section is omitted.
 */
export function excludeSidebarPaths(
  menu: AdminMenuSection[],
  excludedPathsOrPrefixes: string[],
): AdminMenuSection[] {
  const normalizedExcludes = excludedPathsOrPrefixes.map(
    (p) => p.split("?")[0].replace(/\/$/, "") || "/",
  );

  const isPathExcluded = (path?: string): boolean => {
    if (!path) return false;
    const cleanPath = path.split("?")[0].replace(/\/$/, "") || "/";
    return normalizedExcludes.some((excluded) => {
      if (excluded === "/" || excluded === "") {
        return cleanPath === "/" || cleanPath === "";
      }
      return cleanPath === excluded || cleanPath.startsWith(`${excluded}/`);
    });
  };

  return menu.reduce<AdminMenuSection[]>((accSections, section) => {
    if ("note" in section) {
      return accSections;
    }

    const filteredItems = section.items.reduce<AdminMenuItem[]>(
      (accItems, item) => {
        // 1. Filter children first if present
        const filteredChildren = item.children
          ? (item.children.filter(
              (child) => !isPathExcluded(child.href),
            ) as AdminMenuChild[])
          : undefined;

        const hasValidChildren =
          filteredChildren && filteredChildren.length > 0;
        const isParentExcluded = isPathExcluded(item.href);

        // If item has children, keep it if any valid child remains
        if (hasValidChildren) {
          accItems.push({
            ...item,
            children: filteredChildren,
          });
        } else if (!isParentExcluded && item.href) {
          // If no children or children were empty, keep if own href is not excluded
          accItems.push({
            ...item,
            children: undefined,
          });
        }

        return accItems;
      },
      [],
    );

    if (filteredItems.length > 0) {
      accSections.push({
        ...section,
        items: filteredItems,
      });
    }

    return accSections;
  }, []);
}
