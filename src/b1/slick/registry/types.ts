import FilterOperator from "sap/ui/model/FilterOperator";

export enum DataTypes {
    STRING = "String",
    DATE = "Date",
    TIME = "Time",
    INTEGER = "Integer",
    ENTITY = "Entity",
    ENUM = "Enum",
}

export const isNativeDataType = (dataType: DataTypes): boolean =>
    ![DataTypes.ENTITY, DataTypes.ENUM].includes(dataType);

export const isTypeNumber = (dataType: DataTypes): boolean =>
    [DataTypes.INTEGER].includes(dataType);

export type NavigationProps = {
    entity: string;
    keyPath: string;
    descriptionPath: string;
    listProps?: string[];
    filters?: {
        and?: boolean;
        list: {
            path: string;
            operator: FilterOperator;
            value: string;
        }[];
    };
};

export type EnumValue = {
    value: string;
    semanticColor: string;
    cssColor: string;
};

export type EntityProperty = {
    type: DataTypes;
    required?: boolean;
    entity?: string;
    navigation?: NavigationProps;
    enums?: EnumValue[];
};

export type Entity = {
    name: string;
    singularName: string;
    key: string;
    properties: Record<string, EntityProperty>;
};

export type LibraryConfig = {
    model?: string;
    entitiesExtend?: Record<string, Record<string, EntityProperty>>;
    custom?: Record<string, Entity>;
};
