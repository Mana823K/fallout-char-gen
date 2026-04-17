import { Armor } from "../../../../models/database/armor";
import { InventoryItem } from "../../../../models/inventory/inventory";
import { FilterTypeEnum, TableColumn } from "../../../common/table/table-column";

export const invArmorColumns: TableColumn<InventoryItem<Armor>>[] = [
  new TableColumn<InventoryItem<Armor>>({
    label: "Amount",
    property: "amount",
    filterType: FilterTypeEnum.Sort,
  }),
  new TableColumn<InventoryItem<Armor>>({
    label: "Name",
    property: "item.name",
    filterType: FilterTypeEnum.Text,
  }),
  new TableColumn<InventoryItem<Armor>>({
    label: "Type",
    property: "item.type",
    filterType: FilterTypeEnum.Select,
  }),
  new TableColumn<InventoryItem<Armor>>({
    label: "Physical Resistance",
    property: "item.physicalRes",
    filterType: FilterTypeEnum.Sort,
    align: "right",
    getText: (item) => { return item.item.physicalRes > 0 ? item.item.physicalRes == 999 ? 'Immune' : item.item.physicalRes.toString() : '-' }
  }),
  new TableColumn<InventoryItem<Armor>>({
    label: "Energy Resistance",
    property: "item.energyRes",
    filterType: FilterTypeEnum.Sort,
    align: "right",
    getText: (item) => { return item.item.energyRes > 0 ? item.item.energyRes == 999 ? 'Immune' : item.item.energyRes.toString() : '-' }
  }),
  new TableColumn<InventoryItem<Armor>>({
    label: "Radiation Resistance",
    property: "item.radiationRes",
    filterType: FilterTypeEnum.Sort,
    align: "right",
    getText: (item) => { return item.item.radiationRes > 0 ? item.item.radiationRes == 999 ? 'Immune' : item.item.radiationRes.toString() : '-' }
  }),
  new TableColumn<InventoryItem<Armor>>({
    label: "Locations Covered",
    property: "item.locationCoveredText",
    filterType: FilterTypeEnum.Select,
  }),
  new TableColumn<InventoryItem<Armor>>({
    label: "Weight",
    property: "item.weight",
    filterType: FilterTypeEnum.Sort,
  }),
];
