import Slick from "b1/slick/registry/EntityRegistry";
import { EntityProperty } from "b1/slick/registry/types";
import { MetadataOptions } from "sap/ui/core/Element";
import { DataTypes } from "b1/slick/registry/types";
import Dialog from "sap/ui/mdc/valuehelp/Dialog";
import EntityTableDialog from "./Entity/EntityTableDialog";
import EnumTableDialog from "./Enum/EnumTableDialog";

const TABLES_DIALOG_REGISTRY: Record<string, new (settings?: object) => EntityTableDialog | EnumTableDialog> = {
    [DataTypes.ENTITY]: EntityTableDialog,
    [DataTypes.ENUM]: EnumTableDialog,
};

/**
 * @namespace b1.slick.ValueHelp.ValueHelpDialog
 */
class ValueHelpDialog extends Dialog {
    constructor(idOrSettings?: string | $ValueHelpDialogSettings);
    constructor(id?: string, settings?: $ValueHelpDialogSettings);
    constructor(id?: string, settings?: $ValueHelpDialogSettings) {
        super(id, settings);
    }

    fieldConfig: EntityProperty | null = null;

    static readonly metadata: MetadataOptions = {
        properties: {
            entity: { type: "string" },
            field: { type: "string" },
        },
    };

    setEntity(entity: string) {
        this.setProperty("entity", entity);
        this.setFieldConfiguration();
    }

    setField(field: string) {
        this.setProperty("field", field);
        this.setFieldConfiguration();
    }

    setFieldConfiguration() {
        const entity = this.getEntity();
        const field = this.getField();
        if (!entity || !field) return;

        this.fieldConfig = Slick.getEntityProp(entity, field);
        this.configTable();
    }

    configTable() {
        if (!this.fieldConfig) return;

        const type = this.fieldConfig.type as DataTypes;
        const DialogTable = TABLES_DIALOG_REGISTRY[type];
        if (!DialogTable) return;

        const dialogTable = new DialogTable({
            id: `${this.getId()}-TableDialog`,
            fieldConfig: this.fieldConfig,
        });

        this.setTitle(this.getEntity());
        this.addContent(dialogTable);
    }
}

export default ValueHelpDialog;
