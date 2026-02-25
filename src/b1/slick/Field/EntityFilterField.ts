import { MetadataOptions } from "sap/ui/core/Element";
import FilterField from "sap/ui/mdc/FilterField";
import AutoDataType from "b1/slick/Field/AutoDataType/AutoDataType";

/**
 * A smart MDC FilterField for use inside `EntityFilterBar` or MDC FilterBars.
 * Auto-configures its data type and value help from entity metadata registered in `Slick`.
 *
 * @namespace b1.slick.Field.EntityFilterField
 * @example
 * <!-- XML view usage: -->
 * <slick:EntityFilterField entity="BusinessPartners" propertyName="CardCode" conditions="{...}" />
 */
class EntityFilterField extends FilterField {
    constructor(idOrSettings?: string | $EntityFilterFieldSettings);
    constructor(id?: string, settings?: $EntityFilterFieldSettings);
    constructor(id?: string, settings?: $EntityFilterFieldSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        properties: {
            entity: { type: "string" },
        },
    };

    init(): void | undefined {
        super.init();
        AutoDataType.attach(this);
    }

    renderer = "sap.ui.mdc.FilterFieldRenderer";
}

export default EntityFilterField;
