import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $FilterFieldSettings } from "sap/ui/mdc/FilterField";

declare module "./EntityFilterField" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $EntityFilterFieldSettings extends $FilterFieldSettings {
        entity?: string | PropertyBindingInfo;
    }

    export default interface EntityFilterField {

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
    }
}
