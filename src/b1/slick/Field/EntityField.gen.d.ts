import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $FieldSettings } from "sap/ui/mdc/Field";

declare module "./EntityField" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $EntityFieldSettings extends $FieldSettings {
        entity?: string | PropertyBindingInfo;
        propertyKey?: string | PropertyBindingInfo;
    }

    export default interface EntityField {

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

        // property: propertyKey

        /**
         * Gets current value of property "propertyKey".
         *
         * @returns Value of property "propertyKey"
         */
        getPropertyKey(): string;

        /**
         * Sets a new value for property "propertyKey".
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * @param propertyKey New value for property "propertyKey"
         * @returns Reference to "this" in order to allow method chaining
         */
        setPropertyKey(propertyKey: string): this;
    }
}
