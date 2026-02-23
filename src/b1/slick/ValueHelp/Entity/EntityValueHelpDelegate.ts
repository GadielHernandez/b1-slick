import { DataTypes, isTypeNumber } from "b1/slick/registry/types";
import Slick from "b1/slick/registry/EntityRegistry";
import ValueHelpDelegate from "sap/ui/mdc/ValueHelpDelegate";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import { DelegatePayload } from "../FieldValueHelp";

const EntityValueHelpDelegate = Object.assign({}, ValueHelpDelegate);

EntityValueHelpDelegate.updateBindingInfo = function (
    valueHelp,
    content,
    oBindingInfo
) {
    oBindingInfo.parameters = {};
    oBindingInfo.filters = [];

    const payload = valueHelp.getPayload() as unknown as DelegatePayload;
    const fieldConfig = Slick.getEntityProp(payload.entity, payload.field);
    if (!fieldConfig || fieldConfig.type !== DataTypes.ENTITY) return;
    if (!fieldConfig.navigation) return;

    const searchPaths = fieldConfig.navigation.listProps ?? [];
    const entityProps = Slick.getEntityProps(fieldConfig.navigation.entity);

    const filters = searchPaths.map((path) => {
        const propConfig = entityProps.find((prop) => prop.name === path);
        const isNumber = propConfig ? isTypeNumber(propConfig.type) : false;
        const value = isNumber
            ? Number(content.getFilterValue()) || -1
            : content.getFilterValue();

        return new Filter({
            path,
            operator: isNumber ? FilterOperator.EQ : FilterOperator.Contains,
            value1: value,
        });
    });

    oBindingInfo.filters = [new Filter(filters, false)];
};

EntityValueHelpDelegate.showTypeahead = (_oValueHelp: unknown, oContent: { getFilterValue: () => string }) => {
    const filterValue = oContent.getFilterValue();
    return (
        filterValue !== "" && filterValue !== null && filterValue !== undefined
    );
};

EntityValueHelpDelegate.isSearchSupported = () => true;

export default EntityValueHelpDelegate;
