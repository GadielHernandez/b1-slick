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
        getEntity(): string;
        setEntity(entity: string): this;
    }
}
