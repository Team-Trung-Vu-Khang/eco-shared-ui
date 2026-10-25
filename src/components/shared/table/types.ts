import type React from "react";

export interface Column<T, V = any> {
  key: string;
  label: string;
  render?: (value: V, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  /**
   * Định nghĩa vai trò của cột trên Card Mobile (khi bật enableMobileCard):
   * - "primary": Tiêu đề chính của Card
   * - "secondary": Dòng phụ hoặc thông tin phụ
   * - "badge": Hiển thị góc trên bên phải dạng Badge trạng thái
   * - "hidden": Ẩn khỏi Card trên mobile
   */
  mobilePriority?: "primary" | "secondary" | "badge" | "hidden";
  /**
   * Thứ tự hiển thị ưu tiên riêng trên Mobile Card (số nhỏ hơn đứng trước).
   * Giúp tách biệt hoàn toàn thứ tự cột trên PC và thứ tự trên Mobile Card.
   */
  mobileOrder?: number;
  /**
   * Tùy chỉnh hiển thị riêng cho ô dữ liệu trên mobile card nếu khác desktop
   */
  mobileRender?: (value: V, row: T) => React.ReactNode;
}

export interface TableFilterOption {
  label: string;
  value: string;
}

export type ColumnFilterOption = TableFilterOption;

export interface TableFilterDef {
  key: string;
  label: string;
  options: TableFilterOption[];
}

/**
 * Thao tác tuỳ biến cho từng dòng, hiển thị cùng các thao tác mặc định
 * (menu "…" trên desktop, nút ở chân Card trên mobile).
 */
export interface RowAction<T> {
  key: string;
  label: string;
  icon?: React.ElementType;
  onClick: (row: T) => void;
  /** Tô đỏ như "Xóa" và đặt cuối menu */
  destructive?: boolean;
  /** Ẩn thao tác với dòng này */
  hidden?: (row: T) => boolean;
  /** Hiện nhưng không cho bấm với dòng này */
  disabled?: (row: T) => boolean;
}

export interface MobileCardHelpers<T = unknown> {
  row?: T;
  selected: boolean;
  toggleSelect: () => void;
  onView?: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onWorkflow?: () => void;
  /** `rowActions` đã lọc theo dòng, gắn sẵn `row` */
  actions: { key: string; label: string; icon?: React.ElementType; destructive?: boolean; disabled: boolean; run: () => void }[];
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  /** Hiện ô tìm kiếm (mặc định true) */
  searchable?: boolean;
  /** Hiện nút bộ lọc (mặc định true, chỉ hiện khi có `filters`) */
  filterable?: boolean;
  /** Hiện nút ẩn/hiện cột (mặc định true) */
  columnToggleable?: boolean;
  /** Hiện nút tải xuống (mặc định true) */
  downloadable?: boolean;
  searchPlaceholder?: string;
  selectable?: boolean;
  onSearch?: (value: string) => void;
  onPageSize?: (pageSize: number) => void;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDuplicate?: (row: T) => void;
  onDelete?: (row: T) => void;
  onWorkflow?: (row: T) => void;
  onRowClick?: (row: T) => void;
  /** Thao tác tuỳ biến thêm vào cùng Xem / Sửa / Nhân bản / Xóa */
  rowActions?: RowAction<T>[];
  loading?: boolean;
  pageSize?: number;
  /**
   * Kích thước trang riêng cho giao diện mobile (tùy chọn).
   * Nếu không truyền, sẽ dùng giá trị `pageSize`.
   */
  mobilePageSize?: number;
  totalPages?: number;
  totalElements?: number;
  onFilterChange?: (key: string, value: string) => void;
  filters?: TableFilterDef[];

  /**
   * Tùy chọn opt-in hiển thị Card View trên mobile (Mặc định: false - đảm bảo tương thích ngược 100%).
   * Chỉ khi bật true, giao diện mobile mới chuyển sang dạng danh sách thẻ Card.
   */
  enableMobileCard?: boolean;
  /**
   * Hàm render tùy biến Card trên mobile cho từng dòng dữ liệu.
   * Khi truyền prop này, Card View trên mobile sẽ sử dụng hàm render này thay cho card mặc định.
   */
  renderMobileCard?: (row: T, helpers: MobileCardHelpers<T>) => React.ReactNode;
  /**
   * Ngưỡng chiều rộng màn hình (px) để nhận diện mobile (mặc định: 768px).
   */
  mobileBreakpoint?: number;
}
