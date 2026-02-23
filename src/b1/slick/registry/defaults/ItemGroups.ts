import { DataTypes, Entity } from "../types";

const ItemGroupsConfig: Entity = {
    name: "ItemGroups",
    singularName: "ItemGroup",
    key: "Number",
    properties: {
        Number: { type: DataTypes.INTEGER },
        GroupName: { type: DataTypes.STRING },
    },
};

export default ItemGroupsConfig;
