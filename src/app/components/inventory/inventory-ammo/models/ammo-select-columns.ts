import { Ammo } from "../../../../models/database/ammo";
import { TableColumn, FilterTypeEnum } from "../../../common/table/table-column";

export const invAmmoSelectColumns: TableColumn<Ammo>[] = [
    new TableColumn<Ammo>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Ammo>({
      label: "Sub Type",
      property: "subType",
      filterType: FilterTypeEnum.Text,
    }),
];
