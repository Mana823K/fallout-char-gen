import { Magazine } from "../../../../models/database/magazine";
import { FilterTypeEnum, TableColumn } from "../../../common/table/table-column";

export const invMagazineSelectColumns: TableColumn<Magazine>[] = [
  new TableColumn<Magazine>({
    label: "Name",
    property: "name",
    filterType: FilterTypeEnum.Text,
  }),
  new TableColumn<Magazine>({
    label: "Issue",
    property: "issue",
    filterType: FilterTypeEnum.Text,
  }),
  new TableColumn<Magazine>({
    label: "Rare",
    property: "rare",
    filterType: FilterTypeEnum.YesNo,
    align: "center",
    getText: (magazine) => { return magazine.rare ? 'Yes' : 'No'; }
  }),
]