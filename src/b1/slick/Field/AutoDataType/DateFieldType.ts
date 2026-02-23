import DatePicker from "sap/m/DatePicker";
import BaseFieldType from "./BaseFieldType";
import DateTimeOffset from "sap/ui/model/odata/type/DateTimeOffset";
import Field from "sap/ui/mdc/Field";
import FieldBase from "sap/ui/mdc/field/FieldBase";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";

class DateFieldType extends BaseFieldType {
    getDataType(): string {
        return "sap.ui.model.type.Date";
    }

    override createContent(field: FieldBase): void {
        super.createContent(field);

        if (this.isFilterField(field)) return;

        const datePicker = new DatePicker({
            valueFormat: "dd-MM-yyyy",
            change: () => {
                const dateSelected = datePicker.getDateValue();
                if (!dateSelected) return;

                (field as Field).setValue(dateSelected);
            },
        });
        field.setContentEdit(datePicker);
    }

    override bindValue(field: FieldBase, bindingInfo: PropertyBindingInfo): void {
        const dateBindingInfo = {
            ...bindingInfo,
            type: new DateTimeOffset({
                pattern: "dd-MM-yyyy",
            }),
        };

        super.bindValue(field, dateBindingInfo);
    }
}

export default DateFieldType;
