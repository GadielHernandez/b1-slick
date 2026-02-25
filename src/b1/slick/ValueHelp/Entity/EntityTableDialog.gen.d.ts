import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $MDCTableSettings } from "sap/ui/mdc/valuehelp/content/MDCTable";

declare module "./EntityTableDialog" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $EntityTableDialogSettings extends $MDCTableSettings {
        fieldConfig?: any | PropertyBindingInfo | `{${string}}`;
    }

    export default interface EntityTableDialog {

        // property: fieldConfig
        getFieldConfig(): any;
        setFieldConfig(fieldConfig: any): this;
    }
}
