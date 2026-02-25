import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $DialogSettings } from "sap/ui/mdc/valuehelp/Dialog";

declare module "./ValueHelpDialog" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $ValueHelpDialogSettings extends $DialogSettings {
        entity?: string | PropertyBindingInfo;
        field?: string | PropertyBindingInfo;
    }

    export default interface ValueHelpDialog {

        // property: entity
        getEntity(): string;
        setEntity(entity: string): this;

        // property: field
        getField(): string;
        setField(field: string): this;
    }
}
