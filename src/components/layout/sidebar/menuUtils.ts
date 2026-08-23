import type { ElementType } from "react";
import * as LucideIcons from "lucide-react";
import type {
  FarmRole,
  MenuChild,
  MenuCondition,
  MenuItem,
  MenuSection,
  UserContext,
} from "./types";
import { SUPER_ADMIN_ROLE, REQUIRE_FIRST_ONBOARD_COND } from "./types";

/**
 * Resolves a dynamic icon string or ElementType into a valid React Component.
 * Fallback to HelpCircle if not found.
 */
export function getIconComponent(iconName?: string | ElementType): ElementType {
  if (!iconName) return LucideIcons.HelpCircle;
  if (typeof iconName !== "string") return iconName;

  // Try to resolve the icon from the lucide-react exports
  const Icon = (LucideIcons as unknown as Record<string, ElementType>)[
    iconName
  ];
  return Icon || LucideIcons.HelpCircle;
}

/**
 * Dynamic sidebar menu filter based on RBAC and ABAC rules.
 * Supports deep filtering (from children up to sections).
 * Bypasses all rules if context.role is "MEVI_SUPER_ADMIN".
 */
export function filterMenuByContext(
  menu: MenuSection[],
  context: UserContext,
): MenuSection[] {
  const isSuperAdmin = context.roles?.includes(SUPER_ADMIN_ROLE);

  // Helper to check user conditions (ABAC)
  const checkConditions = (conditions?: MenuCondition[]): boolean => {
    if (isSuperAdmin) return true;
    if (!conditions || conditions.length === 0) return true;

    return conditions.every((cond) => {
      if (cond === REQUIRE_FIRST_ONBOARD_COND) {
        return !!context.isFirstOnboard;
      }
      return true;
    });
  };

  // Helper to check user roles (RBAC)
  const checkRole = (roles?: FarmRole[]): boolean => {
    if (isSuperAdmin) return true;
    if (!roles || roles.length === 0) return true; // Public menu
    if (!context.roles || context.roles.length === 0) return false;
    return roles.some((role) => context.roles!.includes(role));
  };

  // Bottom-up deep filtering using .reduce()
  return menu.reduce<MenuSection[]>((accSections, section) => {
    // 1. Check section roles
    if (!checkRole(section.roles)) {
      return accSections;
    }

    // 2. Filter section items
    const filteredItems = section.items.reduce<MenuItem[]>((accItems, item) => {
      // Check item's roles & conditions
      if (!checkRole(item.roles) || !checkConditions(item.conditions)) {
        return accItems;
      }

      // Filter children first if any
      const filteredChildren = item.children
        ? item.children.reduce<MenuChild[]>((accChildren, child) => {
            if (checkRole(child.roles) && checkConditions(child.conditions)) {
              accChildren.push(child);
            }
            return accChildren;
          }, [])
        : undefined;

      // An item is kept if:
      // - It has a direct link (href)
      // - OR it has at least one valid child after filtering
      const hasValidChildren = filteredChildren && filteredChildren.length > 0;
      if (item.href || hasValidChildren) {
        accItems.push({
          ...item,
          children: filteredChildren,
        });
      }

      return accItems;
    }, []);

    // 3. Keep section only if it has at least one valid item
    if (filteredItems.length > 0) {
      accSections.push({
        ...section,
        items: filteredItems,
      });
    }

    return accSections;
  }, []);
}

// Module-level caches for menu configurations
let cachedFilteredMenu: MenuSection[] | null = null;
let cachedMasterMenu: MenuSection[] | null = null;

export function setCachedFilteredMenu(menu: MenuSection[]): void {
  cachedFilteredMenu = menu;
}

export function getCachedFilteredMenu(): MenuSection[] | null {
  return cachedFilteredMenu;
}

export function setCachedMasterMenu(menu: MenuSection[]): void {
  cachedMasterMenu = menu;
}

export function getCachedMasterMenu(): MenuSection[] | null {
  return cachedMasterMenu;
}

/**
 * Checks if the user is authorized to access a given route based on config.json or cached objects.
 * If the route is not defined in the menu, it is considered public.
 * If the route is defined but filtered out for the user, returns false.
 */
export function isRouteAuthorized(
  location: string,
  context: UserContext,
  rawMenu: MenuSection[],
  filteredMenu?: MenuSection[],
): boolean {
  if (context.roles?.includes(SUPER_ADMIN_ROLE)) return true;

  // Normalize path (remove query parameters and trailing slashes)
  const cleanPath = location.split("?")[0].replace(/\/$/, "") || "/";

  // Helper to extract all hrefs from a menu structure
  const getAllHrefs = (sections: MenuSection[]): Set<string> => {
    const hrefs = new Set<string>();
    sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.href) {
          hrefs.add(item.href.split("?")[0].replace(/\/$/, "") || "/");
        }
        item.children?.forEach((child) => {
          if (child.href) {
            hrefs.add(child.href.split("?")[0].replace(/\/$/, "") || "/");
          }
        });
      });
    });
    return hrefs;
  };

  const allDefinedHrefs = getAllHrefs(rawMenu);

  // If the path is not part of the defined sidebar paths, it's public
  if (!allDefinedHrefs.has(cleanPath)) {
    return true;
  }

  // Filter the menu by context or use the pre-filtered cached menu
  const allowedMenu = filteredMenu || filterMenuByContext(rawMenu, context);
  const allowedHrefs = getAllHrefs(allowedMenu);

  // If the path is defined in menus but not allowed, user is unauthorized
  return allowedHrefs.has(cleanPath);
}
