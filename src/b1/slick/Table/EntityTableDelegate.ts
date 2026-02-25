import Slick from "b1/slick/registry/EntityRegistry";
import { DataTypes, isNativeDataType, isTypeNumber } from "b1/slick/registry/types";
import Text from "sap/m/Text";
import Table from "sap/ui/mdc/Table";
import Column from "sap/ui/mdc/table/Column";
import TableDelegate from "sap/ui/mdc/TableDelegate";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import Element from "sap/ui/core/Element";
import FilterBar from "sap/ui/mdc/FilterBar";
import FilterOperator from "sap/ui/model/FilterOperator";
import Filter from "sap/ui/model/Filter";

type DelegatePayload = { entity: string };

const EntityTableDelegate = Object.assign({}, TableDelegate);

EntityTableDelegate.fetchProperties = async (table: Table) => {
    const payload = table.getPayload() as DelegatePayload;
    const resourceModel = table.getModel("i18n") as ResourceModel | null;
    const i18n = resourceModel ? await resourceModel.getResourceBundle() : null;
    const EntityProps = Slick.getEntityProps(payload.entity);
    const properties = EntityProps.map((property) => ({
        path: property.name,
        name: property.name,
        label: i18n ? i18n.getText(`${payload.entity}.${property.name}`) : property.name,
        dataType: isNativeDataType(property.type)
            ? property.type
            : DataTypes.STRING,
    }));

    return properties;
};

const _createColumn = (id: string, propertyKey: string) => {
    return new Column(id, {
        propertyKey: propertyKey,
        header: propertyKey,
        template: new Text({
            text: {
                path: propertyKey,
                model: Slick.getModelName(),
            },
        }),
    });
};

EntityTableDelegate.addItem = async (table: Table, propertyKey: string) => {
    const sId = `${table.getId()}-col-${propertyKey}`;
    return await _createColumn(sId, propertyKey);
};

EntityTableDelegate.updateBindingInfo = function (table, oBindingInfo) {
    TableDelegate.updateBindingInfo.call(this, table, oBindingInfo);

    const payload = table.getPayload() as DelegatePayload;
    oBindingInfo.path = `/${payload.entity}`;
    oBindingInfo.model = Slick.getModelName();
};

EntityTableDelegate.getFilters = (table) => {
    const filterId = table.getFilter();
    if (!filterId) return [];

    const filter = Element.getElementById(filterId) as FilterBar | null;
    if (!filter) return [];
    const searchValue = filter.getSearch();
    if (!searchValue) return [];

    const columns = table.getColumns();
    const payload = table.getPayload() as DelegatePayload;
    const properties = Slick.getEntityProps(payload.entity);

    const filters = columns.map((column: Column) => {
        const prop = properties.find((p) => p.name === column.getPropertyKey());
        const operator = prop && isTypeNumber(prop.type)
            ? FilterOperator.EQ
            : FilterOperator.Contains;
        const value = prop && isTypeNumber(prop.type)
            ? Number(searchValue) || -1
            : searchValue;

        return new Filter({
            path: column.getPropertyKey(),
            operator,
            value1: value,
        });
    });
    return [new Filter(filters, false)];
};

export default EntityTableDelegate;
