import Lib from "sap/ui/core/Lib";

export default Lib.init({
    apiVersion: 2,
    name: "b1.slick",
    dependencies: ["sap.ui.core", "sap.ui.mdc", "sap.m"],
    controls: [
        "b1.slick.Field.EntityField",
        "b1.slick.Field.EntityFilterField",
        "b1.slick.FilterBar.EntityFilterBar",
        "b1.slick.Table.EntityTable",
        "b1.slick.ValueHelp.FieldValueHelp",
    ],
    elements: [],
});
