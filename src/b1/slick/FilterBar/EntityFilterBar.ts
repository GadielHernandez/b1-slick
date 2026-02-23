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
 * @namespace b1.slick.FilterBar.EntityFilterBar
 */
export default class EntityFilterBar extends Control {
    constructor(idOrSettings?: string | $EntityFilterBarSettings);
    constructor(id?: string, settings?: $EntityFilterBarSettings);
    constructor(id?: string, settings?: $EntityFilterBarSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        properties: {
            entity: { type: "string" },
        },
        aggregations: {
            filterBar: {
                type: "sap.ui.mdc.FilterBar",
                multiple: false,
            },
        },
        events: {
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
