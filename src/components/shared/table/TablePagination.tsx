import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { TableControllerReturn } from "./useTableController";

interface TablePaginationProps<T extends { id: string | number }> {
  controller: TableControllerReturn<T>;
  isMobileCardMode?: boolean;
}

export function TablePagination<T extends { id: string | number }>({
  controller,
  isMobileCardMode = false,
}: TablePaginationProps<T>) {
  const {
    resolvedTotalPages,
    resolvedTotalElements,
    startIndex,
    currentPaginatedData,
    rowsPerPage,
    handlePageSizeChange,
    updateCurrentPage,
    currentPage,
  } = controller;

  // Nếu không có dữ liệu nào, không hiển thị thanh phân trang
  if (resolvedTotalElements === 0) {
    return null;
  }

  const effectiveTotalPages = Math.max(1, resolvedTotalPages);

  // Giao diện Mobile Card:
  // - Tuyệt đối không xuất hiện trên PC (chỉ render khi isMobileCardMode === true)
  // - Bỏ hoàn toàn phần chọn số dòng (được truyền từ table props)
  // - Chỉ giữ lại nút bấm Trước (prev), Sau (next), và số trang/tổng số
  // - Nút bấm không bị nở to (không dùng flex-1, kích thước nhỏ gọn căn giữa)
  if (isMobileCardMode) {
    return (
      <div className="flex items-center justify-center gap-3 py-3 border-t border-border/40">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 px-3.5 text-xs font-medium border-border w-auto shadow-2xs cursor-pointer"
          onClick={() => updateCurrentPage(currentPage - 1)}
          disabled={currentPage <= 1}
          data-testid="mobile-prev-page"
        >
          <ChevronLeft className="w-4 h-4 mr-1 text-muted-foreground" />
          Trước
        </Button>

        <span className="text-xs font-semibold px-2 text-foreground whitespace-nowrap">
          {currentPage} / {effectiveTotalPages}
        </span>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 px-3.5 text-xs font-medium border-border w-auto shadow-2xs cursor-pointer"
          onClick={() => updateCurrentPage(currentPage + 1)}
          disabled={currentPage >= effectiveTotalPages}
          data-testid="mobile-next-page"
        >
          Sau
          <ChevronRight className="w-4 h-4 ml-1 text-muted-foreground" />
        </Button>
      </div>
    );
  }

  // Giao diện Desktop Table:
  // Nếu dữ liệu vừa vặn trong 1 trang trên PC, ẩn phân trang để giữ giao diện sạch sẽ
  if (resolvedTotalPages <= 1 && resolvedTotalElements <= rowsPerPage) {
    return null;
  }

  const startRecord = resolvedTotalElements === 0 ? 0 : startIndex + 1;
  const endRecord = Math.min(
    startIndex + (currentPaginatedData?.length || 0),
    resolvedTotalElements,
  );

  return (
    <div className="flex items-center justify-between gap-4 pt-2">
      <p className="text-sm text-muted-foreground">
        Đang hiển thị{" "}
        <span className="font-semibold text-foreground">{startRecord}</span> -{" "}
        <span className="font-semibold text-foreground">{endRecord}</span> trên{" "}
        <span className="font-semibold text-foreground">
          {resolvedTotalElements}
        </span>{" "}
        kết quả
      </p>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <div className="flex items-center gap-2 mr-4">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Số dòng:
          </span>
          <Select
            value={String(rowsPerPage)}
            onValueChange={(val) => {
              handlePageSizeChange(Number(val));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 border-muted-foreground/20 cursor-pointer"
          onClick={() => updateCurrentPage(1)}
          disabled={currentPage <= 1}
          data-testid="first-page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 border-muted-foreground/20 cursor-pointer"
          onClick={() => updateCurrentPage(currentPage - 1)}
          disabled={currentPage <= 1}
          data-testid="prev-page"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <span className="text-sm text-muted-foreground px-1 font-medium whitespace-nowrap">
          {currentPage} / {effectiveTotalPages}
        </span>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 border-muted-foreground/20 cursor-pointer"
          onClick={() => updateCurrentPage(currentPage + 1)}
          disabled={currentPage >= effectiveTotalPages}
          data-testid="next-page"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 border-muted-foreground/20 cursor-pointer"
          onClick={() => updateCurrentPage(effectiveTotalPages)}
          disabled={currentPage >= effectiveTotalPages}
          data-testid="last-page"
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
