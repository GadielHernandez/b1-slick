import { DataTypes, Entity } from "../types";

const ItemsConfig: Entity = {
    name: "Items",
    singularName: "Item",
    key: "ItemCode",
    properties: {
        ItemCode: { type: DataTypes.STRING },
        ItemName: { type: DataTypes.STRING },
        ItemType: { type: DataTypes.STRING },
        ItemsGroupCode: { type: DataTypes.INTEGER },
        PurchaseUnit: { type: DataTypes.STRING },
        SalesUnit: { type: DataTypes.STRING },
        InventoryUOM: { type: DataTypes.STRING },
        BarCode: { type: DataTypes.STRING },
        ValidFor: { type: DataTypes.STRING },
    },
};

export default ItemsConfig;
