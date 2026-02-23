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

        /**
         * Gets current value of property "fieldConfig".
         *
         * @returns Value of property "fieldConfig"
         */
        getFieldConfig(): any;

        /**
         * Sets a new value for property "fieldConfig".
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * @param fieldConfig New value for property "fieldConfig"
         * @returns Reference to "this" in order to allow method chaining
         */
        setFieldConfig(fieldConfig: any): this;
    }
}
