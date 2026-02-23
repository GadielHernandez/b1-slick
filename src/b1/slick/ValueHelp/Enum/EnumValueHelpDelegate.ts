import ValueHelpDelegate from "sap/ui/mdc/ValueHelpDelegate";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";

const EnumsValueHelpDelegate = Object.assign({}, ValueHelpDelegate) as typeof ValueHelpDelegate & {
    getFilters?: (valueHelp: unknown, content: unknown) => Filter[];
};

EnumsValueHelpDelegate.getFilters = (
    _valueHelp: unknown,
    content: unknown
) => {
    const filterContent = content as { getSearch: () => string };
    return [
        new Filter({
            path: "value",
            operator: FilterOperator.Contains,
            value1: filterContent.getSearch(),
        }),
    ];
};

EnumsValueHelpDelegate.isSearchSupported = () => true;

export default EnumsValueHelpDelegate;
