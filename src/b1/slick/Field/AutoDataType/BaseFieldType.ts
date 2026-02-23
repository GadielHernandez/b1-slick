import FieldBase from "sap/ui/mdc/field/FieldBase";
import Field from "sap/ui/mdc/Field";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";

class BaseFieldType {
    getDataType(): string {
        return "sap.ui.model.type.String";
    }

    createContent(field: FieldBase): void {
        if (!this.isFilterField(field)) return;

        field.setDataType(this.getDataType());
    }

    bindValue(field: FieldBase, bindingInfo: PropertyBindingInfo): void {
        if (!bindingInfo) return;

        const existsBindingInfo = field.getBindingInfo("value");
        if (existsBindingInfo) return;

        if (this.isFilterField(field)) return;

        (field as Field).bindValue({ ...bindingInfo });

        const editControl = (field as Field).getContentEdit();
        if (editControl) editControl.bindProperty("value", { ...bindingInfo });
    }

    protected isFilterField(field: FieldBase): boolean {
        return field.getMetadata().getName().includes("Filter");
    }
}

export default BaseFieldType;
