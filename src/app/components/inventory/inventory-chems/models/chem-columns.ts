import { Chem } from "../../../../models/database/chem";
import { InventoryItem } from "../../../../models/inventory/inventory";
import { EditTypeEnum, FilterTypeEnum, TableColumn } from "../../../common/table/table-column";

export const invChemsColumns: TableColumn<InventoryItem<Chem>>[] = [
  new TableColumn<InventoryItem<Chem>>({
    label: "Amount",
    property: "amount",
    filterType: FilterTypeEnum.Sort,
    editType: EditTypeEnum.Number,
  }),
  new TableColumn<InventoryItem<Chem>>({
    label: "Name",
    property: "item.name",
    filterType: FilterTypeEnum.Text,
    editType: EditTypeEnum.Text,
  }),
  new TableColumn<InventoryItem<Chem>>({
    label: "Effects",
    property: "item.effects",
    filterType: FilterTypeEnum.Text,
    editType: EditTypeEnum.Text,
  }),
  new TableColumn<InventoryItem<Chem>>({
    label: "Duration",
    property: "item.duration",
    filterType: FilterTypeEnum.Select,
    editType: EditTypeEnum.Select,
    editOptions: ["Instant", "Lasting", "Brief"],
  }),
  new TableColumn<InventoryItem<Chem>>({
    label: "Addictive?",
    property: "item.addictive",
    filterType: FilterTypeEnum.Sort,
    align: "center",
    getText: (item) => { return item.item.addictive > 0 ? 'Yes ' + item.item.addictive  : 'No' },
    editType: EditTypeEnum.Number,
  }),
];