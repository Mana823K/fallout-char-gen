import { Ammo } from "../../../models/database/ammo";
import { InventoryItem } from "../../../models/inventory/inventory";
import { TableColumn, FilterTypeEnum } from "../../common/table/table-column";

export const invAmmoColumns: TableColumn<InventoryItem<Ammo>>[] = [
    new TableColumn<InventoryItem<Ammo>>({
      label: "Amount",
      property: "amount",
      filterType: FilterTypeEnum.None,
    }),
    new TableColumn<InventoryItem<Ammo>>({
      label: "Name",
      property: "item.name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<InventoryItem<Ammo>>({
      label: "Sub Type",
      property: "item.subType",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<InventoryItem<Ammo>>({
      label: "Weight",
      property: "item.weight",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<InventoryItem<Ammo>>({
      label: "Notes",
      property: "notes",
      filterType: FilterTypeEnum.None,
    }),
];
