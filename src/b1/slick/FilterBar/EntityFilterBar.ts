import FilterBar from "sap/ui/mdc/FilterBar";
import { MetadataOptions } from "sap/ui/core/Element";
import FilterBarP13nMode from "sap/ui/mdc/enums/FilterBarP13nMode";
import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import { FilterBarBase$SearchEvent } from "sap/ui/mdc/filterbar/FilterBarBase";
import Filter from "sap/ui/model/Filter";
import Condition, { ConditionObject } from "sap/ui/mdc/condition/Condition";
import FilterOperator from "sap/ui/model/FilterOperator";

const DELEGATE_PATH = "b1/slick/FilterBar/EntityFilterBarDelegate";

/**
 * A wrapper control that renders an MDC `FilterBar` automatically populated
 * with filter fields derived from entity metadata registered in `Slick`.
 *
 * Fires a `search` event with the resolved `Filter[]` array ready to be passed
 * to an OData binding. Set `entity` to activate.
 *
 * @namespace b1.slick.FilterBar.EntityFilterBar
 * @example
 * <!-- XML view usage: -->
 * <slick:EntityFilterBar entity="BusinessPartners" search=".onSearch" />
 */
export default class EntityFilterBar extends Control {
    constructor(idOrSettings?: string | $EntityFilterBarSettings);
    constructor(id?: string, settings?: $EntityFilterBarSettings);
    constructor(id?: string, settings?: $EntityFilterBarSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        properties: {
            /** Name of the registered entity. Setting this property creates the inner FilterBar. */
            entity: { type: "string" },
        },
        aggregations: {
            filterBar: {
                type: "sap.ui.mdc.FilterBar",
                multiple: false,
            },
        },
        events: {
            /**
             * Fired when the user triggers a search. The event parameter `filters` contains
             * an array of `sap.ui.model.Filter` objects ready for OData binding.
             */
            search: { parameters: { filters: "sap.ui.model.Filter[]" } },
        },
    };

    setEntity(entity: string) {
        this.setProperty("entity", entity);
        if (!entity) return;

        const filterBar = new FilterBar({
            id: `${this.getId()}-filterBar`,
            p13nMode: [FilterBarP13nMode.Item, FilterBarP13nMode.Value],
            delegate: {
                name: DELEGATE_PATH,
                payload: { entity },
            },
        });
        filterBar.attachSearch(this.onSearch.bind(this));

        this.setFilterBar(filterBar);
    }

    onSearch(_event?: FilterBarBase$SearchEvent) {
        const filterBar = this.getFilterBar();
        if (!filterBar) return;
        const conditions = filterBar.getConditions();

        const filters = Object.keys(conditions).map((property) => {
            const propFilters = conditions[property].map(
                (condition: ConditionObject) =>
                    new Filter({
                        path: property,
                        operator: condition.operator as FilterOperator,
                        value1: condition.values?.[0],
                        value2: condition.values?.[1],
                    })
            );

            return new Filter(propFilters, false);
        });

        this.fireSearch({ filters });
    }

    static renderer = {
        apiVersion: 2,
        render: function (rm: RenderManager, control: EntityFilterBar) {
            rm.openStart("div");
            rm.openEnd();

            const filterBar = control.getFilterBar();
            if (filterBar) rm.renderControl(filterBar);

            rm.close("div");
        },
    };
}
