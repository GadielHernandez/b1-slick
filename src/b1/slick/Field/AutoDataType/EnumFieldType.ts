import FieldDisplay from "sap/ui/mdc/enums/FieldDisplay";
import FieldValueHelp from "b1/slick/ValueHelp/FieldValueHelp";
import FieldBase from "sap/ui/mdc/field/FieldBase";
import BaseFieldType from "./BaseFieldType";
import ObjectStatus from "sap/m/ObjectStatus";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import Slick from "b1/slick/registry/EntityRegistry";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";

class EnumFieldType extends BaseFieldType {
    getDataType(): string {
        return "sap.ui.model.type.String";
    }

    override createContent(field: FieldBase): void {
        field.setDisplay(FieldDisplay.DescriptionValue);
        field.setContentDisplay(new ObjectStatus({ inverted: true }));

        const entity = field.getProperty("entity") as string;
        const propertyKey = field.getProperty("propertyKey") as string;

        const id = `enum-vh-${field.getId()}`;
        const valueHelp = new FieldValueHelp({
            id,
            entity,
            field: propertyKey,
        });

        field.addDependent(valueHelp);
        field.setValueHelp(valueHelp);
    }

    override bindValue(field: FieldBase, bindingInfo: PropertyBindingInfo): void {
        const entity = field.getProperty("entity") as string;
        const propertyKey = field.getProperty("propertyKey") as string;
        const propertyConfig = Slick.getEntityProp(entity, propertyKey);

        const displayControl = field.getContentDisplay();
        displayControl?.bindProperty("text", {
            ...bindingInfo,
            formatter: async (value: string) => {
                try {
                    const resourceModel = field.getModel("i18n") as ResourceModel | null;
                    if (!resourceModel) return value;
                    const i18n = await resourceModel.getResourceBundle();
                    return i18n.getText(`${entity}.${propertyKey}.${value}`);
                } catch {
                    return value;
                }
            },
        });

        displayControl?.bindProperty("state", {
            ...bindingInfo,
            formatter: (value: string) => {
                const option = propertyConfig?.enums?.find(
                    (opt) => opt.value === value
                );
                if (!option) return undefined;
                return option.semanticColor;
            },
        });
    }
}

export default EnumFieldType;
