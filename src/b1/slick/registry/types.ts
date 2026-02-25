import FilterOperator from "sap/ui/model/FilterOperator";

/**
 * Supported data types for entity properties.
 * - `STRING` / `DATE` / `TIME` / `INTEGER` — native OData types, bound directly to the field.
 * - `ENTITY` — renders a value help dialog backed by another SAP B1 entity.
 * - `ENUM` — renders an inline value help with predefined options and optional semantic colors.
 */
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

/**
 * Defines the relationship to a foreign entity for `DataTypes.ENTITY` properties.
 * Controls how the value help dialog resolves and displays the related record.
 */
export type NavigationProps = {
    /** Name of the related SAP B1 entity (e.g. `"BusinessPartners"`) */
    entity: string;
    /** OData property used as the stored key (e.g. `"CardCode"`) */
    keyPath: string;
    /** OData property shown as the display description (e.g. `"CardName"`) */
    descriptionPath: string;
    /** Columns shown in the value help table. Defaults to all entity properties if omitted. */
    listProps?: string[];
    /** Static filters always applied when loading the value help list */
    filters?: {
        /** Whether to AND (true) or OR (false) the filters. Defaults to true. */
        and?: boolean;
        list: {
            path: string;
            operator: FilterOperator;
            value: string;
        }[];
    };
};

/**
 * A single option for a `DataTypes.ENUM` property.
 */
export type EnumValue = {
    /** The raw OData value stored in the backend (e.g. `"Y"`, `"N"`, `"P"`) */
    value: string;
    /** SAP semantic color token for `sap.m.ObjectStatus` (e.g. `"Positive"`, `"Critical"`, `"Negative"`) */
    semanticColor: string;
    /** CSS color string used for custom styling (e.g. `"#007700"`) */
    cssColor: string;
};

/**
 * Metadata definition for a single property of an entity.
 */
export type EntityProperty = {
    /** Data type that determines rendering behavior and value help strategy */
    type: DataTypes;
    /** Whether the field is required. Used for form validation. */
    required?: boolean;
    /** Entity name, used internally for type resolution. Usually inferred from the parent entity. */
    entity?: string;
    /** Navigation configuration. Required when `type` is `DataTypes.ENTITY`. */
    navigation?: NavigationProps;
    /** Enum options. Required when `type` is `DataTypes.ENUM`. */
    enums?: EnumValue[];
};

/**
 * Full definition of a SAP B1 entity as used by b1-slick.
 */
export type Entity = {
    /** OData collection name (e.g. `"BusinessPartners"`) */
    name: string;
    /** Singular display name for UI labels (e.g. `"Business Partner"`) */
    singularName: string;
    /** OData key property name (e.g. `"CardCode"`) */
    key: string;
    /** Map of property names to their metadata definitions */
    properties: Record<string, EntityProperty>;
};

/**
 * Configuration object passed to `Slick.configure()`.
 */
export type LibraryConfig = {
    /** OData model name. Defaults to `"SL"`. */
    model?: string;
    /** Additional properties to merge into default entities. Useful for extending standard entities with UDFs. */
    entitiesExtend?: Record<string, Record<string, EntityProperty>>;
    /** Custom entity definitions (UDTs, User Tables) to register alongside the defaults. */
    custom?: Record<string, Entity>;
};
