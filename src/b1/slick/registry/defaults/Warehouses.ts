import { DataTypes, Entity } from "../types";

const WarehousesConfig: Entity = {
    name: "Warehouses",
    singularName: "Warehouse",
    key: "WarehouseCode",
    properties: {
        WarehouseCode: { type: DataTypes.STRING },
        WarehouseName: { type: DataTypes.STRING },
        Location: { type: DataTypes.INTEGER },
        Street: { type: DataTypes.STRING },
        City: { type: DataTypes.STRING },
        Country: { type: DataTypes.STRING },
    },
};

export default WarehousesConfig;
