import { Armor } from "../../../../models/database/armor";
import { FilterTypeEnum, TableColumn } from "../../../common/table/table-column";

export const invArmorSelectColumns: TableColumn<Armor>[] = [
    new TableColumn<Armor>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Armor>({
      label: "Type",
      property: "type",
      filterType: FilterTypeEnum.Select,
    }),
];
