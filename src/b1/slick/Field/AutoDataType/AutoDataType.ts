import Slick from "b1/slick/registry/EntityRegistry";
import FieldBase from "sap/ui/mdc/field/FieldBase";
import FieldTypeRegistry from "./FieldTypeRegistry";
import { DataTypes } from "b1/slick/registry/types";

export default class AutoDataType {
    static attach(field: FieldBase): void {
        field.attachModelContextChange(() => {
            const entity = field.getProperty("entity") as string;
            const propertyKey = field.getProperty("propertyKey") as string;
            if (!entity || !propertyKey) return;

            this.configField(field);
        });
    }

    static configField(field: FieldBase): void {
        const entity = field.getProperty("entity") as string;
        const propertyKey = field.getProperty("propertyKey") as string;

        const propertyConfig = Slick.getEntityProp(entity, propertyKey);
        if (!propertyConfig) return;

        const FieldTypeClass =
            FieldTypeRegistry[propertyConfig.type] ||
            FieldTypeRegistry[DataTypes.STRING];

        const fieldTypeInstance = new FieldTypeClass();

        fieldTypeInstance.createContent(field);
        fieldTypeInstance.bindValue(field, {
            path: `/${propertyKey}`,
            model: entity,
        });
    }
}
