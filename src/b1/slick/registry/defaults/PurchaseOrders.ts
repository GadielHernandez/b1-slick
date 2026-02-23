import { DataTypes, Entity } from "../types";

const PurchaseOrdersConfig: Entity = {
    name: "PurchaseOrders",
    singularName: "PurchaseOrder",
    key: "DocEntry",
    properties: {
        DocEntry: { type: DataTypes.INTEGER },
        DocNum: { type: DataTypes.INTEGER },
        CardCode: {
            type: DataTypes.ENTITY,
            navigation: {
                entity: "BusinessPartners",
                keyPath: "CardCode",
                descriptionPath: "CardName",
                listProps: ["CardCode", "CardName"],
            },
        },
        CardName: { type: DataTypes.STRING },
        DocDate: { type: DataTypes.DATE },
        DocDueDate: { type: DataTypes.DATE },
        DocTotal: { type: DataTypes.STRING },
        Comments: { type: DataTypes.STRING },
    },
};

export default PurchaseOrdersConfig;
