import { MiscellanyItem } from "../../../../models/database/miscellany-item";
import { InventoryItem } from "../../../../models/inventory/inventory";
import { FilterTypeEnum, TableColumn } from "../../../common/table/table-column";

export const invMiscColumns: TableColumn<InventoryItem<MiscellanyItem>>[] = [
  new TableColumn<InventoryItem<MiscellanyItem>>({
    label: "Amount",
    property: "amount",
    filterType: FilterTypeEnum.Sort,
  }),
  new TableColumn<InventoryItem<MiscellanyItem>>({
    label: "Name",
    property: "item.name",
    filterType: FilterTypeEnum.Text,
  }),
  new TableColumn<InventoryItem<MiscellanyItem>>({
    label: "Effects",
    property: "item.effects",
    filterType: FilterTypeEnum.Text,
  }),
  new TableColumn<InventoryItem<MiscellanyItem>>({
    label: "Weight",
    property: "item.weight",
    filterType: FilterTypeEnum.Sort,
    align: "right"
  }),
];
