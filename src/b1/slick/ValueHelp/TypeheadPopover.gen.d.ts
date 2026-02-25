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
        getEntity(): string;
        setEntity(entity: string): this;

        // property: field
        getField(): string;
        setField(field: string): this;
    }
}
