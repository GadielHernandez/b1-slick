import Slick from "b1/slick/registry/EntityRegistry";
import { EntityProperty } from "b1/slick/registry/types";
import { MetadataOptions } from "sap/ui/core/Element";
import Popover from "sap/ui/mdc/valuehelp/Popover";
import { DataTypes } from "b1/slick/registry/types";
import EnumTablePopover from "./Enum/EnumTablePopover";
import EntityTablePopover from "./Entity/EntityTablePopover";

const TABLES_POPOVER_REGISTRY: Record<string, new (settings?: object) => EnumTablePopover | EntityTablePopover> = {
    [DataTypes.ENUM]: EnumTablePopover,
    [DataTypes.ENTITY]: EntityTablePopover,
};

/**
 * @namespace b1.slick.ValueHelp.TypeheadPopover
 */
class TypeheadPopover extends Popover {
    constructor(idOrSettings?: string | $TypeheadPopoverSettings);
    constructor(id?: string, settings?: $TypeheadPopoverSettings);
    constructor(id?: string, settings?: $TypeheadPopoverSettings) {
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

    private configTable() {
        if (!this.fieldConfig) return;

        const type = this.fieldConfig.type as DataTypes;
        const PopoverTable = TABLES_POPOVER_REGISTRY[type];
        if (!PopoverTable) return;

        const popoverTable = new PopoverTable({
            fieldConfig: this.fieldConfig,
        });

        this.setTitle(this.getEntity());
        this.addContent(popoverTable);
    }
}

export default TypeheadPopover;
