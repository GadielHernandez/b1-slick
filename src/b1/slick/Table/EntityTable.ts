import Control from "sap/ui/core/Control";
import { MetadataOptions } from "sap/ui/core/Element";
import RenderManager from "sap/ui/core/RenderManager";
import TableP13nMode from "sap/ui/mdc/enums/TableP13nMode";
import TableType from "sap/ui/mdc/enums/TableType";
import Table from "sap/ui/mdc/Table";
import { createColumn } from "b1/slick/Table/EntityTableDelegate";

type ConfigTable = {
    entity: string;
    initialColumns?: string[];
};

const PATH_DELEGATE = "b1/slick/Table/EntityTableDelegate";

/**
 * A wrapper control that renders a responsive MDC `Table` automatically configured
 * from entity metadata registered in `Slick`. Handles column creation, OData binding,
 * and delegate setup.
 *
 * Set the `config` property with an entity name and optional initial columns.
 *
 * @namespace b1.slick.Table.EntityTable
 * @example
 * <!-- XML view usage: -->
 * <slick:EntityTable config="{ entity: 'BusinessPartners', initialColumns: ['CardCode', 'CardName'] }" />
 */
export default class EntityTable extends Control {
    constructor(idOrSettings?: string | $EntityTableSettings);
    constructor(id?: string, settings?: $EntityTableSettings);
    constructor(id?: string, settings?: $EntityTableSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        properties: {
            /**
             * Table configuration object.
             * - `entity` (required): registered entity name (e.g. `"BusinessPartners"`)
             * - `initialColumns` (optional): property keys to show as columns on first load
             */
            config: { type: "object" },
        },
        aggregations: {
            table: {
                type: "sap.ui.mdc.Table",
                multiple: false,
            },
        },
    };

    setConfig(config: ConfigTable) {
        this.setProperty("config", config);
        if (!config) return;

        this.createTable();
    }

    createTable() {
        const config = this.getConfig() as ConfigTable;

        const table = new Table({
            id: `${this.getId()}-table-${config.entity}`,
            autoBindOnInit: true,
            p13nMode: [TableP13nMode.Column, TableP13nMode.Filter],
            type: TableType.ResponsiveTable,
            delegate: {
                name: PATH_DELEGATE,
                payload: { entity: config.entity },
            },
            columns: (config.initialColumns ?? []).map((col) =>
                createColumn(`${this.getId()}-table-${config.entity}-col-${col}`, col)
            ),
        });

        this.setTable(table);
    }

    static renderer = {
        apiVersion: 2,
        render: function (rm: RenderManager, control: EntityTable) {
            rm.openStart("div");
            rm.openEnd();

            const table = control.getTable();
            if (table) rm.renderControl(table);

            rm.close("div");
        },
    };
}
