import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ValueHelpSettings } from "sap/ui/mdc/ValueHelp";

declare module "./FieldValueHelp" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $FieldValueHelpSettings extends $ValueHelpSettings {
        entity?: string | PropertyBindingInfo;
        field?: string | PropertyBindingInfo;
    }

    export default interface FieldValueHelp {

        // property: entity
        getEntity(): string;
        setEntity(entity: string): this;

        // property: field
        getField(): string;
        setField(field: string): this;
    }
}
