import { DataTypes, Entity } from "../types";

const BusinessPartnerGroupsConfig: Entity = {
    name: "BusinessPartnerGroups",
    singularName: "BusinessPartnerGroup",
    key: "Code",
    properties: {
        Code: { type: DataTypes.INTEGER },
        Name: { type: DataTypes.STRING },
    },
};

export default BusinessPartnerGroupsConfig;
