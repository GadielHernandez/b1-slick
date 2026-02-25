import Filter from "sap/ui/model/Filter";
import Event from "sap/ui/base/Event";
import FilterBar from "sap/ui/mdc/FilterBar";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./EntityFilterBar" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $EntityFilterBarSettings extends $ControlSettings {

        /**
         * Name of the registered entity. Setting this property creates the inner FilterBar.
         */
        entity?: string | PropertyBindingInfo;
        filterBar?: FilterBar;

        /**
         * Fired when the user triggers a search. The event parameter `filters` contains
        an array of `sap.ui.model.Filter` objects ready for OData binding.
         */
        search?: (event: EntityFilterBar$SearchEvent) => void;
    }

    export default interface EntityFilterBar {

        // property: entity

        /**
         * Name of the registered entity. Setting this property creates the inner FilterBar.
         */
        getEntity(): string;

        /**
         * Name of the registered entity. Setting this property creates the inner FilterBar.
         */
        setEntity(entity: string): this;

        // aggregation: filterBar
        getFilterBar(): FilterBar;
        setFilterBar(filterBar: FilterBar): this;
        destroyFilterBar(): this;

        // event: search

        /**
         * Fired when the user triggers a search. The event parameter `filters` contains
        an array of `sap.ui.model.Filter` objects ready for OData binding.
         */
        attachSearch(fn: (event: EntityFilterBar$SearchEvent) => void, listener?: object): this;

        /**
         * Fired when the user triggers a search. The event parameter `filters` contains
        an array of `sap.ui.model.Filter` objects ready for OData binding.
         */
        attachSearch<CustomDataType extends object>(data: CustomDataType, fn: (event: EntityFilterBar$SearchEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Fired when the user triggers a search. The event parameter `filters` contains
        an array of `sap.ui.model.Filter` objects ready for OData binding.
         */
        detachSearch(fn: (event: EntityFilterBar$SearchEvent) => void, listener?: object): this;

        /**
         * Fired when the user triggers a search. The event parameter `filters` contains
        an array of `sap.ui.model.Filter` objects ready for OData binding.
         */
        fireSearch(parameters?: EntityFilterBar$SearchEventParameters): this;
    }

    /**
     * Interface describing the parameters of EntityFilterBar's 'search' event.
     * Fired when the user triggers a search. The event parameter `filters` contains
    an array of `sap.ui.model.Filter` objects ready for OData binding.
     */
    export interface EntityFilterBar$SearchEventParameters {
        filters?: Filter[];
    }

    /**
     * Type describing the EntityFilterBar's 'search' event.
     * Fired when the user triggers a search. The event parameter `filters` contains
    an array of `sap.ui.model.Filter` objects ready for OData binding.
     */
    export type EntityFilterBar$SearchEvent = Event<EntityFilterBar$SearchEventParameters>;
}
