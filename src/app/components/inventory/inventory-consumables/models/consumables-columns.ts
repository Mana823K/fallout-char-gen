import { Consumable } from "../../../../models/database/consumable";
import { InventoryItem } from "../../../../models/inventory/inventory";
import { EditTypeEnum, FilterTypeEnum, TableColumn } from "../../../common/table/table-column";

export const invConsumablesColumns: TableColumn<InventoryItem<Consumable>>[] = [
  new TableColumn<InventoryItem<Consumable>>({
    label: "Amount",
    property: "amount",
    filterType: FilterTypeEnum.Sort,
    editType: EditTypeEnum.Number,
  }),
  new TableColumn<InventoryItem<Consumable>>({
    label: "Name",
    property: "item.name",
    filterType: FilterTypeEnum.Text,
    editType: EditTypeEnum.Text,
  }),
  new TableColumn<InventoryItem<Consumable>>({
    label: "Type",
    property: "item.type",
    filterType: FilterTypeEnum.Select,
    editType: EditTypeEnum.Select,
    editOptions: ["Beverage", "Food"],
  }),
  new TableColumn<InventoryItem<Consumable>>({
    label: "HP Heal",
    property: "item.heal",
    filterType: FilterTypeEnum.Sort,
    align: "right",
    editType: EditTypeEnum.Number,
  }),
  new TableColumn<InventoryItem<Consumable>>({
    label: "Effects",
    property: "item.effects",
    filterType: FilterTypeEnum.Text,
    editType: EditTypeEnum.Text,
  }),
  new TableColumn<InventoryItem<Consumable>>({
    label: "Irradiated",
    property: "item.irradiated",
    filterType: FilterTypeEnum.YesNo,
    align: "center",
    getText: (item) => { return item.item.irradiated ? 'O': '' },
    editType: EditTypeEnum.Checkbox,
  }),
  new TableColumn<InventoryItem<Consumable>>({
    label: "Weight",
    property: "item.weight",
    filterType: FilterTypeEnum.Sort,
    align: "right",
    editType: EditTypeEnum.Number,
  }),
];
