import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $PopoverSettings } from "sap/ui/mdc/valuehelp/Popover";

declare module "./TypeheadPopover" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $TypeheadPopoverSettings extends $PopoverSettings {
        entity?: string | PropertyBindingInfo;
        field?: string | PropertyBindingInfo;
    }

    export default interface TypeheadPopover {

        // property: entity

        /**
         * Gets current value of property "entity".
         *
         * @returns Value of property "entity"
         */
        getEntity(): string;

        /**
         * Sets a new value for property "entity".
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * @param entity New value for property "entity"
         * @returns Reference to "this" in order to allow method chaining
         */
        setEntity(entity: string): this;

        // property: field

        /**
         * Gets current value of property "field".
         *
         * @returns Value of property "field"
         */
        getField(): string;

        /**
         * Sets a new value for property "field".
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * @param field New value for property "field"
         * @returns Reference to "this" in order to allow method chaining
         */
        setField(field: string): this;
    }
}
