import { Consumable } from "../../../../models/database/consumable";
import { InventoryItem } from "../../../../models/inventory/inventory";
import { FilterTypeEnum, TableColumn } from "../../../common/table/table-column";

export const invConsumablesColumns: TableColumn<InventoryItem<Consumable>>[] = [
  new TableColumn<InventoryItem<Consumable>>({
    label: "Amount",
    property: "amount",
    filterType: FilterTypeEnum.Sort,
  }),
  new TableColumn<InventoryItem<Consumable>>({
    label: "Name",
    property: "item.name",
    filterType: FilterTypeEnum.Text,
  }),
  new TableColumn<InventoryItem<Consumable>>({
    label: "Type",
    property: "item.type",
    filterType: FilterTypeEnum.Select,
  }),
  new TableColumn<InventoryItem<Consumable>>({
    label: "HP Heal",
    property: "item.heal",
    filterType: FilterTypeEnum.Sort,
    align: "right"
  }),
  new TableColumn<InventoryItem<Consumable>>({
    label: "Effects",
    property: "item.effects",
    filterType: FilterTypeEnum.Text,
  }),
  new TableColumn<InventoryItem<Consumable>>({
    label: "Irradiated",
    property: "item.irradiated",
    filterType: FilterTypeEnum.YesNo,
    align: "center",
    getText: (item) => { return item.item.irradiated ? 'O': '' }
  }),
  new TableColumn<InventoryItem<Consumable>>({
    label: "Weight",
    property: "item.weight",
    filterType: FilterTypeEnum.Sort,
    align: "right"
  }),
];
