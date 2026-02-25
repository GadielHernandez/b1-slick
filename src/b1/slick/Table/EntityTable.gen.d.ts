import Table from "sap/ui/mdc/Table";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./EntityTable" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $EntityTableSettings extends $ControlSettings {

        /**
         * Table configuration object.
        - `entity` (required): registered entity name (e.g. `"BusinessPartners"`)
        - `initialColumns` (optional): property keys to show as columns on first load
         */
        config?: object | PropertyBindingInfo | `{${string}}`;
        table?: Table;
    }

    export default interface EntityTable {

        // property: config

        /**
         * Table configuration object.
        - `entity` (required): registered entity name (e.g. `"BusinessPartners"`)
        - `initialColumns` (optional): property keys to show as columns on first load
         */
        getConfig(): object;

        /**
         * Table configuration object.
        - `entity` (required): registered entity name (e.g. `"BusinessPartners"`)
        - `initialColumns` (optional): property keys to show as columns on first load
         */
        setConfig(config: object): this;

        // aggregation: table
        getTable(): Table;
        setTable(table: Table): this;
        destroyTable(): this;
    }
}
