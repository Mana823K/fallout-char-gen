import { Magazine } from "../../../../models/database/magazine";
import { InventoryItem } from "../../../../models/inventory/inventory";
import { FilterTypeEnum, TableColumn } from "../../../common/table/table-column";

export const invMagazineColumns: TableColumn<InventoryItem<Magazine>>[] = [
  new TableColumn<InventoryItem<Magazine>>({
    label: "Amount",
    property: "amount",
    filterType: FilterTypeEnum.Sort,
  }),
  new TableColumn<InventoryItem<Magazine>>({
    label: "Name",
    property: "item.name",
    filterType: FilterTypeEnum.Text,
  }),
  new TableColumn<InventoryItem<Magazine>>({
    label: "Issue",
    property: "item.issue",
    filterType: FilterTypeEnum.Text,
  }),
  new TableColumn<InventoryItem<Magazine>>({
    label: "Effect",
    property: "item.effect",
    filterType: FilterTypeEnum.Text,
  }),
  new TableColumn<InventoryItem<Magazine>>({
    label: "Rare",
    property: "item.rare",
    filterType: FilterTypeEnum.YesNo,
    align: "center",
    getText: (item) => { return item.item.rare ? 'Yes' : 'No'; }
  }),
]