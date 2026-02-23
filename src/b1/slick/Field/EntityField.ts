import type { MetadataOptions } from "sap/ui/core/Element";
import Field from "sap/ui/mdc/Field";
import AutoDataType from "./AutoDataType/AutoDataType";

/**
 * @namespace b1.slick.Field.EntityField
 */
class EntityField extends Field {
    constructor(idOrSettings?: string | $EntityFieldSettings);
    constructor(id?: string, settings?: $EntityFieldSettings);
    constructor(id?: string, settings?: $EntityFieldSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        properties: {
            entity: { type: "string" },
            propertyKey: { type: "string" },
        },
    };

    init(): void | undefined {
        super.init();
        AutoDataType.attach(this);
    }

    renderer = "sap.ui.mdc.FieldRenderer";
}

export default EntityField;
