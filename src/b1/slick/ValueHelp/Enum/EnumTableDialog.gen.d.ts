import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $MDCTableSettings } from "sap/ui/mdc/valuehelp/content/MDCTable";

declare module "./EnumTableDialog" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $EnumTableDialogSettings extends $MDCTableSettings {
        fieldConfig?: any | PropertyBindingInfo | `{${string}}`;
    }

    export default interface EnumTableDialog {

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
