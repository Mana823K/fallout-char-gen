import { Weapon } from "../../../models/database/weapon";
import { TableColumn, FilterTypeEnum } from "../../common/table/table-column";

export const invWeaponSelectColumns: TableColumn<Weapon>[] = [
  new TableColumn<Weapon>({
    label: "Name",
    property: "name",
    filterType: FilterTypeEnum.Text,
  }),
  new TableColumn<Weapon>({
    label: "Weapon Type",
    property: "type",
    filterType: FilterTypeEnum.Select,
  }),
  new TableColumn<Weapon>({
    label: "Ammo",
    property: "ammo",
    filterType: FilterTypeEnum.Select,
  }),
];
