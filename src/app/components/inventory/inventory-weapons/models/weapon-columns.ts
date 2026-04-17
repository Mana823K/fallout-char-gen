import { Weapon } from "../../../../models/database/weapon";
import { InventoryItem } from "../../../../models/inventory/inventory";
import { FilterTypeEnum, TableColumn } from "../../../common/table/table-column";

const rangeSort = (itemA: InventoryItem<Weapon>, itemB: InventoryItem<Weapon>): number => {
  return Weapon.rangeSort(itemA.item, itemB.item);
}

export const invWeaponColumns: TableColumn<InventoryItem<Weapon>>[] = [
  new TableColumn<InventoryItem<Weapon>>({
    label: "Amount",
    property: "amount",
    filterType: FilterTypeEnum.Sort,
  }),
  new TableColumn<InventoryItem<Weapon>>({
    label: "Name",
    property: "item.name",
    filterType: FilterTypeEnum.Text,
  }),
  new TableColumn<InventoryItem<Weapon>>({
    label: "Weapon Type",
    property: "item.type",
    filterType: FilterTypeEnum.Select,
  }),
  // todo: add filter
  new TableColumn<InventoryItem<Weapon>>({
    label: "Tagged",
    property: "tag",
    filterType: FilterTypeEnum.None,
  }),
  // todo: add sort
  new TableColumn<InventoryItem<Weapon>>({
    label: "Target Number",
    property: "targetNumber",
    filterType: FilterTypeEnum.None,
  }),
  new TableColumn<InventoryItem<Weapon>>({
    label: "Damage",
    property: "item.damage",
    filterType: FilterTypeEnum.Sort,
    align: "right",
    getText: (item) => { return item.item.damage + '\u00A0' + "CD"; }
  }),
  new TableColumn<InventoryItem<Weapon>>({
    label: "Damage Effects",
    property: "item.effects",
    filterType: FilterTypeEnum.Select,
  }),
  new TableColumn<InventoryItem<Weapon>>({
    label: "Damage Type",
    property: "item.damageType",
    filterType: FilterTypeEnum.Select,
  }),
  new TableColumn<InventoryItem<Weapon>>({
    label: "Fire Rate",
    property: "item.rate",
    filterType: FilterTypeEnum.Sort,
    align: "right",
  }),
  new TableColumn<InventoryItem<Weapon>>({
    label: "Range",
    property: "item.range",
    filterType: FilterTypeEnum.Sort,
    align: "center",
    sortFunc: rangeSort
  }),
  new TableColumn<InventoryItem<Weapon>>({
    label: "Qualities",
    property: "item.qualities",
    filterType: FilterTypeEnum.Select,
  }),
  new TableColumn<InventoryItem<Weapon>>({
    label: "Ammo",
    property: "item.ammo",
    filterType: FilterTypeEnum.Select,
  }),
  new TableColumn<InventoryItem<Weapon>>({
    label: "Ammo count",
    property: "ammoCount",
    filterType: FilterTypeEnum.None,
  }),
  new TableColumn<InventoryItem<Weapon>>({
    label: "Weight",
    property: "item.weight",
    filterType: FilterTypeEnum.Sort,
    align: "right"
  }),
];
