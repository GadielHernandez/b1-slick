import { EntityProperty } from "b1/slick/registry/types";
import { MetadataOptions } from "sap/ui/core/Element";
import MDCTable from "sap/ui/mdc/valuehelp/content/MDCTable";
import FilterBar from "sap/ui/mdc/filterbar/vh/FilterBar";
import EntityTable from "b1/slick/Table/EntityTable";

const DELEGATE_PATH = "b1/slick/FilterBar/EntityFilterBarDelegate";

/**
 * @namespace b1.slick.ValueHelp.Entity.EntityTableDialog
 */
class EntityTableDialog extends MDCTable {
    constructor(idOrSettings?: string | $EntityTableDialogSettings);
    constructor(id?: string, settings?: $EntityTableDialogSettings);
    constructor(id?: string, settings?: $EntityTableDialogSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        properties: {
            fieldConfig: { type: "any" },
        },
    };

    setFieldConfig(fieldConfig: EntityProperty) {
        this.setProperty("fieldConfig", fieldConfig);

        if (!fieldConfig.navigation) return;

        this.setKeyPath(fieldConfig.navigation.keyPath);
        this.setDescriptionPath(fieldConfig.navigation.descriptionPath);
        this.setFilterFields("$search");
        this.createContent();
    }

    addFilterBar() {
        const config = this.getFieldConfig() as EntityProperty;
        if (!config.navigation) return;

        const filterBar = new FilterBar({
            delegate: {
                name: DELEGATE_PATH,
                payload: { entity: config.navigation.entity },
            },
        });

        this.setFilterBar(filterBar);
    }

    createContent() {
        this.createTable();
    }

    createTable() {
        const config = this.getFieldConfig() as EntityProperty;
        if (!config.navigation) return;

        const entityTable = new EntityTable({
            id: `${this.getId()}-mdctable`,
            config: {
                entity: config.navigation.entity,
                initialColumns: config.navigation.listProps,
            },
        });

        this.setTable(entityTable.getTable());
    }
}

export default EntityTableDialog;
