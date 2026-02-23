import Time from "sap/ui/model/type/Time";
import BaseFieldType from "./BaseFieldType";
import FieldBase from "sap/ui/mdc/field/FieldBase";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";

class TimeFieldType extends BaseFieldType {
    getDataType(): string {
        return "sap.ui.model.type.Time";
    }

    override bindValue(field: FieldBase, bindingInfo: PropertyBindingInfo): void {
        const bindingConfig = {
            ...bindingInfo,
            type: new Time({
                source: { pattern: "HH:mm:ss" },
            }),
        };

        super.bindValue(field, bindingConfig);
    }
}

export default TimeFieldType;
