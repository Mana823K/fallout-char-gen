import { Chem } from "../../../../models/database/chem";
import { FilterTypeEnum, TableColumn } from "../../../common/table/table-column";

export const invChemsSelectColumns: TableColumn<Chem>[] = [
  new TableColumn<Chem>({
    label: "Name",
    property: "name",
    filterType: FilterTypeEnum.Text,
  }),
  new TableColumn<Chem>({
    label: "Duration",
    property: "duration",
    filterType: FilterTypeEnum.Select,
  }),
  new TableColumn<Chem>({
    label: "Addictive?",
    property: "addictive",
    filterType: FilterTypeEnum.Sort,
    align: "center",
    getText: (chem) => { return chem.addictive > 0 ? 'Yes ' + chem.addictive  : 'No' }
  }),
];