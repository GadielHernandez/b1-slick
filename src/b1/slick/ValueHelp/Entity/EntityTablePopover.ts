import Slick from "b1/slick/registry/EntityRegistry";
import { EntityProperty } from "b1/slick/registry/types";
import Column from "sap/m/Column";
import ColumnListItem from "sap/m/ColumnListItem";
import { ListType } from "sap/m/library";
import Table from "sap/m/Table";
import Text from "sap/m/Text";
import { MetadataOptions } from "sap/ui/core/Element";
import MTable from "sap/ui/mdc/valuehelp/content/MTable";

/**
 * @namespace b1.slick.ValueHelp.Entity.EntityTablePopover
 */
class EntityTablePopover extends MTable {
    constructor(idOrSettings?: string | $EntityTablePopoverSettings);
    constructor(id?: string, settings?: $EntityTablePopoverSettings);
    constructor(id?: string, settings?: $EntityTablePopoverSettings) {
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
        const config = this.getFieldConfig() as EntityProperty;
        if (!config.navigation) return;

        this.setKeyPath(config.navigation.keyPath);
        this.setDescriptionPath(config.navigation.descriptionPath);
        this.setFilterFields(`$search`);

        const id = this.getId();
        const columns = this.createColumns();
        const table = new Table({
            id: `${id}-entity-popover-table`,
            fixedLayout: false,
            columns,
        });

        table.bindItems({
            path: `/${config.navigation.entity}`,
            model: Slick.getModelName(),
            template: new ColumnListItem({
                type: ListType.Active,
                cells: this.createCells(),
            }),
        });

        this.setTable(table);
    }

    createColumns() {
        const config = this.getFieldConfig() as EntityProperty;
        return (config.navigation?.listProps ?? []).map(
            (prop: string) =>
                new Column({
                    header: new Text({ text: prop }),
                })
        );
    }

    private createCells() {
        const config = this.getFieldConfig() as EntityProperty;
        const modelName = Slick.getModelName();
        return (config.navigation?.listProps ?? []).map(
            (prop: string) =>
                new Text({ text: `{${modelName}>${prop}}` })
        );
    }
}

export default EntityTablePopover;
