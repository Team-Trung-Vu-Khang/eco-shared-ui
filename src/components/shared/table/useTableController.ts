import { useState, useMemo, useEffect, useCallback } from "react";
import type {
  DataTableProps,
  Column,
  TableFilterDef,
  MobileCardHelpers,
} from "./types";

export interface TableControllerReturn<T extends { id: string | number }> {
  columns: Column<T>[];
  data: T[];
  loading: boolean;
  selectable: boolean;
  searchable: boolean;
  filterable: boolean;
  columnToggleable: boolean;
  downloadable: boolean;
  searchPlaceholder: string;
  filters: TableFilterDef[];
  enableMobileCard: boolean;
  renderMobileCard?: (row: T, helpers: MobileCardHelpers<T>) => React.ReactNode;

  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDuplicate?: (row: T) => void;
  onDelete?: (row: T) => void;

  search: string;
  handleSearchChange: (value: string) => void;

  activeFilters: Record<string, string>;
  handleFilterChange: (key: string, value: string) => void;
  clearFilters: () => void;

  visibleColumns: Set<string>;
  setVisibleColumns: React.Dispatch<React.SetStateAction<Set<string>>>;
  visibleColumnCount: number;

  selectedRows: Set<string | number>;
  toggleSelectAll: () => void;
  toggleSelect: (id: string | number) => void;

  currentPage: number;
  rowsPerPage: number;
  resolvedTotalPages: number;
  resolvedTotalElements: number;
  startIndex: number;
  currentPaginatedData: T[];
  updateCurrentPage: (nextPage: number) => void;
  handlePageSizeChange: (size: number) => void;

  isMobile: boolean;
  renderCellValue: (value: unknown) => React.ReactNode;
  runAfterMenuClose: (callback: () => void) => void;
}

export function useTableController<T extends { id: string | number }>({
  columns,
  data,
  searchable = true,
  filterable = true,
  columnToggleable = true,
  downloadable = true,
  searchPlaceholder = "Tìm kiếm...",
  selectable = false,
  onSearch,
  onPageSize,
  currentIndex,
  onIndexChange,
  onView,
  onEdit,
  onDuplicate,
  onDelete,
  loading = false,
  pageSize = 10,
  mobilePageSize,
  totalPages,
  totalElements,
  onFilterChange,
  filters = [],
  enableMobileCard = false,
  renderMobileCard,
  mobileBreakpoint = 768,
}: DataTableProps<T>): TableControllerReturn<T> {
  const [search, setSearch] = useState("");
  const [internalCurrentPage, setInternalCurrentPage] = useState(
    currentIndex ?? 1,
  );
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set(),
  );
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {},
  );
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map((c) => c.key)),
  );
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= mobileBreakpoint;
  });

  const [rowsPerPage, setRowsPerPage] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth <= mobileBreakpoint && mobilePageSize) {
      return mobilePageSize;
    }
    return pageSize;
  });

  useEffect(() => {
    setRowsPerPage(isMobile && mobilePageSize ? mobilePageSize : pageSize);
  }, [isMobile, mobilePageSize, pageSize]);


  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setIsMobile(window.innerWidth <= mobileBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint]);

  // Update visible columns if columns definition changes keys
  useEffect(() => {
    setVisibleColumns((prev) => {
      const currentKeys = new Set(columns.map((c) => c.key));
      const next = new Set<string>();
      currentKeys.forEach((k) => {
        if (prev.has(k)) next.add(k);
      });
      // If newly added columns, include them
      columns.forEach((c) => {
        if (!prev.has(c.key)) next.add(c.key);
      });
      return next;
    });
  }, [columns]);

  // Filter logic (client-side)
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const rowValues = Object.values(row as Record<string, unknown>);

      // Search filter
      const matchesSearch =
        !search ||
        rowValues.some((value) =>
          String(value ?? "").toLowerCase().includes(search.toLowerCase()),
        );

      // Advanced filters
      const matchesFilters = Object.entries(activeFilters).every(
        ([key, value]) => {
          if (!value || value === "all") return true;
          return String((row as Record<string, unknown>)[key]) === value;
        },
      );

      return matchesSearch && matchesFilters;
    });
  }, [data, search, activeFilters]);

  const currentPage = currentIndex ?? internalCurrentPage;
  const isManualPagination =
    totalPages !== undefined || totalElements !== undefined;
  const resolvedTotalElements = totalElements ?? filteredData.length;
  const resolvedTotalPages = Math.max(
    1,
    totalPages ?? Math.ceil(resolvedTotalElements / rowsPerPage),
  );
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPaginatedData = isManualPagination
    ? filteredData
    : filteredData.slice(startIndex, startIndex + rowsPerPage);

  const updateCurrentPage = useCallback(
    (nextPage: number) => {
      const normalizedPage = Math.max(
        1,
        Math.min(nextPage, resolvedTotalPages || 1),
      );
      onIndexChange?.(normalizedPage);
      if (currentIndex === undefined) {
        setInternalCurrentPage(normalizedPage);
      }
    },
    [currentIndex, onIndexChange, resolvedTotalPages],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      onSearch?.(value);
      updateCurrentPage(1);
    },
    [onSearch, updateCurrentPage],
  );

  const handlePageSizeChange = useCallback(
    (value: number) => {
      setRowsPerPage(value);
      onPageSize?.(value);
      updateCurrentPage(1);
    },
    [onPageSize, updateCurrentPage],
  );

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      setActiveFilters((prev) => {
        if (!value || value === "all") {
          const next = { ...prev };
          delete next[key];
          return next;
        }
        return {
          ...prev,
          [key]: value,
        };
      });
      onFilterChange?.(key, value);
    },
    [onFilterChange],
  );

  const clearFilters = useCallback(() => {
    Object.keys(activeFilters).forEach((key) => {
      onFilterChange?.(key, "all");
    });
    setActiveFilters({});
    handleSearchChange("");
  }, [activeFilters, handleSearchChange, onFilterChange]);

  const toggleSelectAll = useCallback(() => {
    if (selectedRows.size === currentPaginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(currentPaginatedData.map((row) => row.id)));
    }
  }, [currentPaginatedData, selectedRows.size]);

  const toggleSelect = useCallback((id: string | number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const runAfterMenuClose = useCallback((callback: () => void) => {
    window.setTimeout(callback, 0);
  }, []);

  const renderCellValue = useCallback((value: unknown) => {
    if (value === null || value === undefined) return null;
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return value;
    }
    return String(value);
  }, []);

  const visibleColumnCount = useMemo(() => {
    return columns.filter((c) => visibleColumns.has(c.key)).length;
  }, [columns, visibleColumns]);

  return {
    columns,
    data,
    loading,
    selectable,
    searchable,
    filterable,
    columnToggleable,
    downloadable,
    searchPlaceholder,
    filters,
    enableMobileCard,
    renderMobileCard,

    onView,
    onEdit,
    onDuplicate,
    onDelete,

    search,
    handleSearchChange,

    activeFilters,
    handleFilterChange,
    clearFilters,

    visibleColumns,
    setVisibleColumns,
    visibleColumnCount,

    selectedRows,
    toggleSelectAll,
    toggleSelect,

    currentPage,
    rowsPerPage,
    resolvedTotalPages,
    resolvedTotalElements,
    startIndex,
    currentPaginatedData,
    updateCurrentPage,
    handlePageSizeChange,

    isMobile,
    renderCellValue,
    runAfterMenuClose,
  };
}
