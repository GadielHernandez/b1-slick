import Table from "sap/ui/mdc/Table";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./EntityTable" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $EntityTableSettings extends $ControlSettings {
        config?: object | PropertyBindingInfo | `{${string}}`;
        table?: Table;
    }

    export default interface EntityTable {

        // property: config

        /**
         * Gets current value of property "config".
         *
         * @returns Value of property "config"
         */
        getConfig(): object;

        /**
         * Sets a new value for property "config".
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * @param config New value for property "config"
         * @returns Reference to "this" in order to allow method chaining
         */
        setConfig(config: object): this;

        // aggregation: table

        /**
         * Gets content of aggregation "table".
         */
        getTable(): Table;

        /**
         * Sets the aggregated table.
         *
         * @param table The table to set
         * @returns Reference to "this" in order to allow method chaining
         */
        setTable(table: Table): this;

        /**
         * Destroys the table in the aggregation "table".
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        destroyTable(): this;
    }
}
