import { DataTypes, Entity } from "../types";

const BusinessPartnersConfig: Entity = {
    name: "BusinessPartners",
    singularName: "BusinessPartner",
    key: "CardCode",
    properties: {
        CardCode: { type: DataTypes.STRING },
        CardName: { type: DataTypes.STRING },
        CardType: { type: DataTypes.STRING },
        GroupCode: { type: DataTypes.INTEGER },
        Currency: { type: DataTypes.STRING },
        Phone1: { type: DataTypes.STRING },
        Phone2: { type: DataTypes.STRING },
        EmailAddress: { type: DataTypes.STRING },
        Website: { type: DataTypes.STRING },
        ZipCode: { type: DataTypes.STRING },
        Address: { type: DataTypes.STRING },
    },
};

export default BusinessPartnersConfig;
