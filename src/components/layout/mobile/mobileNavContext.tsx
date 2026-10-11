import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  MOBILE_NAV_ITEMS,
  getBottomNavExcludedPaths,
  type MobileNavItem,
} from "./mobileNav";

export interface MobileNavContextValue {
  navItems: MobileNavItem[];
  extraExcludedPaths: string[];
}

export const MobileNavContext = createContext<MobileNavContextValue>({
  navItems: MOBILE_NAV_ITEMS,
  extraExcludedPaths: [],
});

export interface MobileNavProviderProps {
  children: ReactNode;
  navItems?: MobileNavItem[];
  extraExcludedPaths?: string[];
}

export function MobileNavProvider({
  children,
  navItems = MOBILE_NAV_ITEMS,
  extraExcludedPaths = [],
}: MobileNavProviderProps) {
  const value = useMemo(
    () => ({ navItems, extraExcludedPaths }),
    [navItems, extraExcludedPaths],
  );

  return (
    <MobileNavContext.Provider value={value}>
      {children}
    </MobileNavContext.Provider>
  );
}

/**
 * Lấy danh sách MobileNavItem đang được sử dụng trong MobileAppLayout.
 * Tự động fallback về MOBILE_NAV_ITEMS nếu gọi ngoài Provider.
 */
export function useMobileNavItems(): MobileNavItem[] {
  const context = useContext(MobileNavContext);
  return context?.navItems ?? MOBILE_NAV_ITEMS;
}

/**
 * Lấy danh sách extraExcludedPaths từ MobileNavContext.
 */
export function useMobileNavExtraExcludedPaths(): string[] {
  const context = useContext(MobileNavContext);
  return context?.extraExcludedPaths ?? [];
}

/**
 * Hook trả về danh sách các đường dẫn cần loại trừ từ thanh điều hướng mobile hiện tại.
 * Hỗ trợ nhận overrideNavItems hoặc overrideExtraPaths nếu muốn truyền thủ công.
 */
export function useBottomNavExcludedPaths(
  overrideNavItems?: MobileNavItem[],
  overrideExtraPaths?: string[],
): string[] {
  const context = useContext(MobileNavContext);
  const effectiveNavItems =
    overrideNavItems ?? context?.navItems ?? MOBILE_NAV_ITEMS;
  const effectiveExtraPaths =
    overrideExtraPaths ?? context?.extraExcludedPaths ?? [];

  return useMemo(() => {
    return getBottomNavExcludedPaths(effectiveNavItems, effectiveExtraPaths);
  }, [effectiveNavItems, effectiveExtraPaths]);
}
