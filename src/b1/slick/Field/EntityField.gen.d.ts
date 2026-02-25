import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $FieldSettings } from "sap/ui/mdc/Field";

declare module "./EntityField" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $EntityFieldSettings extends $FieldSettings {

        /**
         * Name of the registered entity (e.g. `"BusinessPartners"`).
         */
        entity?: string | PropertyBindingInfo;

        /**
         * Property key within the entity (e.g. `"CardCode"`). Determines the data type and value help.
         */
        propertyKey?: string | PropertyBindingInfo;
    }

    export default interface EntityField {

        // property: entity

        /**
         * Name of the registered entity (e.g. `"BusinessPartners"`).
         */
        getEntity(): string;

        /**
         * Name of the registered entity (e.g. `"BusinessPartners"`).
         */
        setEntity(entity: string): this;

        // property: propertyKey

        /**
         * Property key within the entity (e.g. `"CardCode"`). Determines the data type and value help.
         */
        getPropertyKey(): string;

        /**
         * Property key within the entity (e.g. `"CardCode"`). Determines the data type and value help.
         */
        setPropertyKey(propertyKey: string): this;
    }
}
