import type {
  Column,
  DataTableProps,
  TableFilterDef,
  TableFilterOption,
  MobileCardHelpers,
} from "./table/types";
import {
  useTableController,
  type TableControllerReturn,
} from "./table/useTableController";
import { TableToolbar } from "./table/TableToolbar";
import { DesktopTableView } from "./table/DesktopTableView";
import { MobileCardListView } from "./table/MobileCardListView";
import { TablePagination } from "./table/TablePagination";

export type {
  Column,
  DataTableProps,
  TableFilterDef,
  TableFilterOption,
  MobileCardHelpers,
  TableControllerReturn,
};
export { useTableController };

export function DataTable<T extends { id: string | number }>(
  props: DataTableProps<T>,
) {
  const controller = useTableController(props);

  // Opt-in check: Chỉ bật Mobile Card khi trang chủ động kích hoạt enableMobileCard hoặc truyền renderMobileCard
  const shouldRenderMobileCard = Boolean(
    (props.enableMobileCard || props.renderMobileCard) && controller.isMobile,
  );

  return (
    <div className="space-y-4">
      <TableToolbar controller={controller} />
      {shouldRenderMobileCard ? (
        <MobileCardListView controller={controller} />
      ) : (
        <DesktopTableView controller={controller} />
      )}
      <TablePagination
        controller={controller}
        isMobileCardMode={shouldRenderMobileCard}
      />
    </div>
  );
}
