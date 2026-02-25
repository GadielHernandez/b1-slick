import type { MetadataOptions } from "sap/ui/core/Element";
import Field from "sap/ui/mdc/Field";
import AutoDataType from "./AutoDataType/AutoDataType";

/**
 * A smart MDC Field that automatically configures its data type and value help
 * based on entity metadata registered in `Slick`.
 *
 * Set `entity` and `propertyKey` to enable auto-configuration.
 * The field type is resolved via `AutoDataType` on `modelContextChange`.
 *
 * @namespace b1.slick.Field.EntityField
 * @example
 * <!-- XML view usage: -->
 * <slick:EntityField entity="BusinessPartners" propertyKey="CardCode" />
 */
class EntityField extends Field {
    constructor(idOrSettings?: string | $EntityFieldSettings);
    constructor(id?: string, settings?: $EntityFieldSettings);
    constructor(id?: string, settings?: $EntityFieldSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        properties: {
            /** Name of the registered entity (e.g. `"BusinessPartners"`). */
            entity: { type: "string" },
            /** Property key within the entity (e.g. `"CardCode"`). Determines the data type and value help. */
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
