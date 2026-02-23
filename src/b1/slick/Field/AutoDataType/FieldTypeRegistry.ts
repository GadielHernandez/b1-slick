import { DataTypes } from "b1/slick/registry/types";
import DateFieldType from "./DateFieldType";
import BaseFieldType from "./BaseFieldType";
import EntityFieldType from "./EntityFieldType";
import EnumFieldType from "./EnumFieldType";
import TimeFieldType from "./TimeFieldType";
import IntegerFieldType from "./IntegerFieldType";

const FieldTypeRegistry: Record<string, new () => BaseFieldType> = {
    [DataTypes.STRING]: BaseFieldType,
    [DataTypes.DATE]: DateFieldType,
    [DataTypes.TIME]: TimeFieldType,
    [DataTypes.INTEGER]: IntegerFieldType,
    [DataTypes.ENTITY]: EntityFieldType,
    [DataTypes.ENUM]: EnumFieldType,
};

export default FieldTypeRegistry;
