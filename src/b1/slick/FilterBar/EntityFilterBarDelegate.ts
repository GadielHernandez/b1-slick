import FilterBarDelegate from "sap/ui/mdc/FilterBarDelegate";
import type { PropertyInfo } from "sap/ui/mdc/FilterBar";
import Element from "sap/ui/core/Element";
import FilterField from "sap/ui/mdc/FilterField";
import Slick from "b1/slick/registry/EntityRegistry";
import { EntityProperty, DataTypes, isNativeDataType } from "b1/slick/registry/types";
import FilterBar from "sap/ui/mdc/FilterBar";
import EntityFilterField from "b1/slick/Field/EntityFilterField";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

type DelegateObject = { name: string; payload: { entity: string } };
type EntityPropertyFlat = EntityProperty & { name: string; entity: string };

const EntityFilterBarDelegate = Object.assign({}, FilterBarDelegate);

EntityFilterBarDelegate.fetchProperties = async (filterBar: FilterBar) => {
    const delegate = filterBar.getDelegate() as DelegateObject;
    const entity = delegate.payload.entity;
    if (!entity) return [];

    const resourceModel = filterBar.getModel("i18n") as ResourceModel | null;
    const i18n = resourceModel ? await resourceModel.getResourceBundle() : null;
    const EntityProps = Slick.getEntityProps(entity);
    const properties = EntityProps.map(
        (property) =>
            ({
                path: property.name,
                name: property.name,
                label: i18n
                    ? i18n.getText(`${entity}.${property.name}`)
                    : property.name,
                dataType: isNativeDataType(property.type)
                    ? property.type
                    : DataTypes.STRING,
            } as PropertyInfo)
    );

    return Promise.resolve(properties);
};

const createFilterField = (
    filterBar: FilterBar,
    property: EntityPropertyFlat
) => {
    const sId = `${filterBar.getId()}--filter--${property.name}`;
    const oFilterField = Element.getElementById(sId);
    if (oFilterField) return oFilterField as FilterField;

    return new EntityFilterField(sId, {
        entity: property.entity,
        propertyKey: property.name,
        label: `{i18n>${property.entity}.${property.name}}`,
        conditions: `{$filters>/conditions/${property.name}}`,
        visible: true,
    });
};

EntityFilterBarDelegate.addItem = async (
    filterBar: FilterBar,
    propertyName: string
) => {
    const delegate = filterBar.getDelegate() as DelegateObject;
    const entity = delegate.payload.entity;

    if (!entity) return null as unknown as FilterField;

    const EntityProps = Slick.getEntityProps(entity);
    const property = EntityProps.find((prop) => prop.name === propertyName);
    if (!property) return null as unknown as FilterField;

    return createFilterField(filterBar, property);
};

EntityFilterBarDelegate.removeItem = async (_oFilterBar: FilterBar, oFilterField: FilterField) => {
    oFilterField.destroy();
    return true;
};

export default EntityFilterBarDelegate;
