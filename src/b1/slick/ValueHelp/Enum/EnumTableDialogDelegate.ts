import { DataTypes } from "b1/slick/registry/types";
import Table from "sap/ui/mdc/Table";
import TableDelegate from "sap/ui/mdc/TableDelegate";

const EnumTableDialogDelegate = Object.assign({}, TableDelegate);

EnumTableDialogDelegate.fetchProperties = async (_table: Table) => {
    return [
        {
            path: "value",
            name: "value",
            label: "Value",
            dataType: DataTypes.STRING,
        },
    ];
};

EnumTableDialogDelegate.updateBindingInfo = function (table, oBindingInfo) {
    TableDelegate.updateBindingInfo.call(this, table, oBindingInfo);

    oBindingInfo.path = "/enums";
    oBindingInfo.model = "data";
};

export default EnumTableDialogDelegate;
