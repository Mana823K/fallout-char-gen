import { MiscellanyItem } from "../../../../models/database/miscellany-item";
import { FilterTypeEnum, TableColumn } from "../../../common/table/table-column";

export const invMiscSelectColumns: TableColumn<MiscellanyItem>[] = [
  new TableColumn<MiscellanyItem>({
    label: "Name",
    property: "name",
    filterType: FilterTypeEnum.Text,
  }),
];
