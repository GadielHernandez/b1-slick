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
    const search = (content as { getSearch: () => string }).getSearch();
    if (!search) return [];
    return [
        new Filter({
            path: "value",
            operator: FilterOperator.Contains,
            value1: search,
        }),
    ];
};

EnumsValueHelpDelegate.isSearchSupported = () => true;

export default EnumsValueHelpDelegate;
