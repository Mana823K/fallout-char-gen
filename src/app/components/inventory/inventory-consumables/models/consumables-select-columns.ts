import { Consumable } from "../../../../models/database/consumable";
import { FilterTypeEnum, TableColumn } from "../../../common/table/table-column";

export const invConsumablesSelectColumns: TableColumn<Consumable>[] = [
  new TableColumn<Consumable>({
    label: "Name",
    property: "name",
    filterType: FilterTypeEnum.Text,
  }),
  new TableColumn<Consumable>({
    label: "Type",
    property: "type",
    filterType: FilterTypeEnum.Select,
  }),
  new TableColumn<Consumable>({
    label: "Irradiated",
    property: "irradiated",
    filterType: FilterTypeEnum.YesNo,
    align: "center",
    getText: (item) => { return item.irradiated ? 'O': '' }
  }),
];
