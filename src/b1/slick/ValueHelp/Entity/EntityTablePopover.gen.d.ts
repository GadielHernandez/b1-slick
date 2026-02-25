import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $MTableSettings } from "sap/ui/mdc/valuehelp/content/MTable";

declare module "./EntityTablePopover" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $EntityTablePopoverSettings extends $MTableSettings {
        fieldConfig?: any | PropertyBindingInfo | `{${string}}`;
    }

    export default interface EntityTablePopover {

        // property: fieldConfig
        getFieldConfig(): any;
        setFieldConfig(fieldConfig: any): this;
    }
}
