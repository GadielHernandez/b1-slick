import { MetadataOptions } from "sap/ui/core/Element";
import ValueHelp from "sap/ui/mdc/ValueHelp";
import Slick from "b1/slick/registry/EntityRegistry";
import { DataTypes } from "b1/slick/registry/types";
import TypeheadPopover from "./TypeheadPopover";
import ValueHelpDialog from "./ValueHelpDialog";

export type DelegatePayload = { entity: string; field: string };

const DELEGATES: Record<string, string> = {
    [DataTypes.ENTITY]: "b1/slick/ValueHelp/Entity/EntityValueHelpDelegate",
    [DataTypes.ENUM]: "b1/slick/ValueHelp/Enum/EnumValueHelpDelegate",
};

/**
 * @namespace b1.slick.ValueHelp.FieldValueHelp
 */
class FieldValueHelp extends ValueHelp {
    private _typeaheadPopover?: TypeheadPopover;
    private _valueHelpDialog?: ValueHelpDialog;

    static readonly metadata: MetadataOptions = {
        properties: {
            entity: { type: "string" },
            field: { type: "string" },
        },
    };

    constructor(idOrSettings?: string | $FieldValueHelpSettings);
    constructor(id?: string, settings?: $FieldValueHelpSettings);
    constructor(id?: string, settings?: $FieldValueHelpSettings) {
        super(id, settings);
    }

    init(): void {
        super.init();
        this.updateConfiguration();
    }

    setEntity(entity: string): this {
        if (entity === this.getEntity()) return this;

        this.setProperty("entity", entity, true);
        this.updateConfiguration();
        return this;
    }

    setField(field: string): this {
        if (field === this.getField()) return this;

        this.setProperty("field", field, true);
        this.updateConfiguration();
        return this;
    }

    private updateConfiguration() {
        const entity = this.getEntity();
        const field = this.getField();

        if (!entity || !field) return;

        this.updateDelegate();
        this.updateTypeaheadPopover();
        this.updateHelpDialog();
    }

    private updateDelegate(): this {
        const entity = this.getEntity();
        const field = this.getField();

        const fieldConfig = Slick.getEntityProp(entity, field);
        if (!fieldConfig) return this;

        const delegatePath = DELEGATES[fieldConfig.type];
        if (!delegatePath) return this;

        const payload = { entity, field };
        this.setDelegate({ name: delegatePath, payload });

        return this;
    }

    private updateTypeaheadPopover() {
        const entity = this.getEntity();
        const field = this.getField();

        if (this._typeaheadPopover) {
            this._typeaheadPopover.destroy();
        }

        this._typeaheadPopover = new TypeheadPopover({ entity, field });
        this.setTypeahead(this._typeaheadPopover);
    }

    private updateHelpDialog() {
        const entity = this.getEntity();
        const field = this.getField();

        if (this._valueHelpDialog) {
            this._valueHelpDialog.destroy();
        }

        this._valueHelpDialog = new ValueHelpDialog({
            id: `${this.getId()}-vlh`,
            entity,
            field,
        });
        this.setDialog(this._valueHelpDialog);
    }
}

export default FieldValueHelp;
