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
        entity?: string | PropertyBindingInfo;
        filterBar?: FilterBar;
        search?: (event: EntityFilterBar$SearchEvent) => void;
    }

    export default interface EntityFilterBar {

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

        // aggregation: filterBar

        /**
         * Gets content of aggregation "filterBar".
         */
        getFilterBar(): FilterBar;

        /**
         * Sets the aggregated filterBar.
         *
         * @param filterBar The filterBar to set
         * @returns Reference to "this" in order to allow method chaining
         */
        setFilterBar(filterBar: FilterBar): this;

        /**
         * Destroys the filterBar in the aggregation "filterBar".
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        destroyFilterBar(): this;

        // event: search

        /**
         * Attaches event handler "fn" to the "search" event of this "EntityFilterBar".
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "EntityFilterBar" itself.
         *
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "EntityFilterBar" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachSearch(fn: (event: EntityFilterBar$SearchEvent) => void, listener?: object): this;

        /**
         * Attaches event handler "fn" to the "search" event of this "EntityFilterBar".
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "EntityFilterBar" itself.
         *
         * @param data An application-specific payload object that will be passed to the event handler along with the event object when firing the event
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "EntityFilterBar" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachSearch<CustomDataType extends object>(data: CustomDataType, fn: (event: EntityFilterBar$SearchEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Detaches event handler "fn" from the "search" event of this "EntityFilterBar".
         *
         * The passed function and listener object must match the ones used for event registration.
         *
         * @param fn The function to be called, when the event occurs
         * @param listener Context object on which the given function had to be called
         * @returns Reference to "this" in order to allow method chaining
         */
        detachSearch(fn: (event: EntityFilterBar$SearchEvent) => void, listener?: object): this;

        /**
         * Fires event "search" to attached listeners.
         *
         * @param parameters Parameters to pass along with the event
         * @param [mParameters.filters]
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        fireSearch(parameters?: EntityFilterBar$SearchEventParameters): this;
    }

    /**
     * Interface describing the parameters of EntityFilterBar's 'search' event.
     */
    export interface EntityFilterBar$SearchEventParameters {
        filters?: Filter[];
    }

    /**
     * Type describing the EntityFilterBar's 'search' event.
     */
    export type EntityFilterBar$SearchEvent = Event<EntityFilterBar$SearchEventParameters>;
}
