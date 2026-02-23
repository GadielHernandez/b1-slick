import BaseFieldType from "./BaseFieldType";
import Integer from "sap/ui/model/type/Integer";
import FieldBase from "sap/ui/mdc/field/FieldBase";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";

class IntegerFieldType extends BaseFieldType {
    getDataType(): string {
        return "sap.ui.model.type.Integer";
    }

    override bindValue(field: FieldBase, bindingInfo: PropertyBindingInfo): void {
        const integerBindingInfo = {
            ...bindingInfo,
            type: new Integer(),
        };

        super.bindValue(field, integerBindingInfo);
    }
}

export default IntegerFieldType;
