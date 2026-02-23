import { DataTypes, Entity } from "../types";

const UsersConfig: Entity = {
    name: "Users",
    singularName: "User",
    key: "InternalKey",
    properties: {
        InternalKey: { type: DataTypes.INTEGER },
        UserCode: { type: DataTypes.STRING },
        UserName: { type: DataTypes.STRING },
        Superuser: { type: DataTypes.STRING },
        eMail: { type: DataTypes.STRING },
        MobilePhoneNumber: { type: DataTypes.STRING },
    },
};

export default UsersConfig;
