import { EntityProperty } from "b1/slick/registry/types";
import Column from "sap/m/Column";
import ColumnListItem from "sap/m/ColumnListItem";
import { ListType } from "sap/m/library";
import Table from "sap/m/Table";
import Text from "sap/m/Text";
import { MetadataOptions } from "sap/ui/core/Element";
import MTable from "sap/ui/mdc/valuehelp/content/MTable";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace b1.slick.ValueHelp.Enum.EnumTablePopover
 */
class EnumTablePopover extends MTable {
    constructor(idOrSettings?: string | $EnumTablePopoverSettings);
    constructor(id?: string, settings?: $EnumTablePopoverSettings);
    constructor(id?: string, settings?: $EnumTablePopoverSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        properties: {
            fieldConfig: { type: "any" },
        },
    };

    setFieldConfig(fieldConfig: EntityProperty) {
        this.setProperty("fieldConfig", fieldConfig);
        this.createContent();
    }

    createContent() {
        const id = this.getId();
        const columns = [
            new Column({
                header: new Text({ text: "Value" }),
            }),
        ];
        const table = new Table({
            id: `${id}-enums-popover-table`,
            fixedLayout: false,
            columns,
        });

        const config = this.getFieldConfig() as EntityProperty;

        table.setModel(new JSONModel({ enums: config.enums }));

        table.bindItems({
            path: "/enums",
            template: new ColumnListItem({
                type: ListType.Active,
                cells: [new Text({ text: "{value}" })],
            }),
        });

        this.setKeyPath("value");
        this.setTable(table);
        this.setUseAsValueHelp(true);
    }
}

export default EnumTablePopover;
