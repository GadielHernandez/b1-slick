import FieldDisplay from "sap/ui/mdc/enums/FieldDisplay";
import FieldValueHelp from "b1/slick/ValueHelp/FieldValueHelp";
import FieldBase from "sap/ui/mdc/field/FieldBase";
import BaseFieldType from "./BaseFieldType";

class EntityFieldType extends BaseFieldType {
    getDataType(): string {
        return "sap.ui.model.type.String";
    }

    override createContent(field: FieldBase): void {
        field.setDisplay(FieldDisplay.DescriptionValue);

        const entity = field.getProperty("entity") as string;
        const propertyKey = field.getProperty("propertyKey") as string;

        const valueHelp = new FieldValueHelp({
            id: `entity-vh-${field.getId()}`,
            entity,
            field: propertyKey,
        });

        field.addDependent(valueHelp);
        field.setValueHelp(valueHelp);
    }
}

export default EntityFieldType;
