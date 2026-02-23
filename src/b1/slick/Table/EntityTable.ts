import Control from "sap/ui/core/Control";
import { MetadataOptions } from "sap/ui/core/Element";
import RenderManager from "sap/ui/core/RenderManager";
import TableP13nMode from "sap/ui/mdc/enums/TableP13nMode";
import TableType from "sap/ui/mdc/enums/TableType";
import Table from "sap/ui/mdc/Table";
import Column from "sap/ui/mdc/table/Column";
import Text from "sap/m/Text";
import Slick from "b1/slick/registry/EntityRegistry";

type ConfigTable = {
    entity: string;
    initialColumns?: string[];
};

const PATH_DELEGATE = "b1/slick/Table/EntityTableDelegate";

/**
 * @namespace b1.slick.Table.EntityTable
 */
export default class EntityTable extends Control {
    constructor(idOrSettings?: string | $EntityTableSettings);
    constructor(id?: string, settings?: $EntityTableSettings);
    constructor(id?: string, settings?: $EntityTableSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        properties: {
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
        const modelName = Slick.getModelName();

        const table = new Table({
            id: `${this.getId()}-table-${config.entity}`,
            autoBindOnInit: true,
            p13nMode: [TableP13nMode.Column, TableP13nMode.Filter],
            type: TableType.ResponsiveTable,
            delegate: {
                name: PATH_DELEGATE,
                payload: { entity: config.entity },
            },
            columns: (config.initialColumns ?? []).map(
                (col) =>
                    new Column({
                        propertyKey: col,
                        header: col,
                        template: new Text({
                            text: {
                                path: col,
                                model: modelName,
                            },
                        }),
                    })
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
