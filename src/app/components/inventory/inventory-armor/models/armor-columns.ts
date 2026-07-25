import { Armor } from "../../../../models/database/armor";
import { InventoryItem } from "../../../../models/inventory/inventory";
import { EditTypeEnum, FilterTypeEnum, TableColumn } from "../../../common/table/table-column";

export const invArmorColumns: TableColumn<InventoryItem<Armor>>[] = [
  new TableColumn<InventoryItem<Armor>>({
    label: "Amount",
    property: "amount",
    filterType: FilterTypeEnum.Sort,
    editType: EditTypeEnum.Number,
  }),
  new TableColumn<InventoryItem<Armor>>({
    label: "Equip",
    property: "equip",
    filterType: FilterTypeEnum.None,
  }),
  new TableColumn<InventoryItem<Armor>>({
    label: "Name",
    property: "item.name",
    filterType: FilterTypeEnum.Text,
    editType: EditTypeEnum.Text,
  }),
  new TableColumn<InventoryItem<Armor>>({
    label: "Type",
    property: "item.type",
    filterType: FilterTypeEnum.Select,
    editType: EditTypeEnum.Select,
  }),
  new TableColumn<InventoryItem<Armor>>({
    label: "Physical Resistance",
    property: "item.physicalRes",
    filterType: FilterTypeEnum.Sort,
    align: "right",
    getText: (item) => { return item.item.physicalRes > 0 ? item.item.physicalRes == 999 ? 'Immune' : item.item.physicalRes.toString() : '-' },
    editType: EditTypeEnum.Number,
  }),
  new TableColumn<InventoryItem<Armor>>({
    label: "Energy Resistance",
    property: "item.energyRes",
    filterType: FilterTypeEnum.Sort,
    align: "right",
    getText: (item) => { return item.item.energyRes > 0 ? item.item.energyRes == 999 ? 'Immune' : item.item.energyRes.toString() : '-' },
    editType: EditTypeEnum.Number,
  }),
  new TableColumn<InventoryItem<Armor>>({
    label: "Radiation Resistance",
    property: "item.radiationRes",
    filterType: FilterTypeEnum.Sort,
    align: "right",
    getText: (item) => { return item.item.radiationRes > 0 ? item.item.radiationRes == 999 ? 'Immune' : item.item.radiationRes.toString() : '-' },
    editType: EditTypeEnum.Number,
  }),
  new TableColumn<InventoryItem<Armor>>({
    label: "Locations Covered",
    property: "item.locationCoveredText",
    filterType: FilterTypeEnum.Select,
    editType: EditTypeEnum.Multiselect,
    editProperty: "item.locationCovered",
  }),
  new TableColumn<InventoryItem<Armor>>({
    label: "Weight",
    property: "item.weight",
    filterType: FilterTypeEnum.Sort,
    editType: EditTypeEnum.Number,
  }),
];
