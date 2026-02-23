import { EntityProperty } from "b1/slick/registry/types";
import { MetadataOptions } from "sap/ui/core/Element";
import MDCTable from "sap/ui/mdc/valuehelp/content/MDCTable";
import TableType from "sap/ui/mdc/enums/TableType";
import Table from "sap/ui/mdc/Table";
import Column from "sap/ui/mdc/table/Column";
import Text from "sap/m/Text";
import JSONModel from "sap/ui/model/json/JSONModel";
import TableP13nMode from "sap/ui/mdc/enums/TableP13nMode";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ValueHelpDialog from "../ValueHelpDialog";

const ENUM_DELEGATE_PATH = "b1/slick/ValueHelp/Enum/EnumTableDialogDelegate";

/**
 * @namespace b1.slick.ValueHelp.Enum.EnumTableDialog
 */
class EnumTableDialog extends MDCTable {
    constructor(idOrSettings?: string | $EnumTableDialogSettings);
    constructor(id?: string, settings?: $EnumTableDialogSettings);
    constructor(id?: string, settings?: $EnumTableDialogSettings) {
        super(id, settings);
    }

    static readonly metadata: MetadataOptions = {
        properties: {
            fieldConfig: { type: "any" },
        },
    };

    setFieldConfig(fieldConfig: EntityProperty) {
        this.setProperty("fieldConfig", fieldConfig);

        this.setKeyPath("value");
        this.setDescriptionPath("value");
        this.setFilterFields("$search");

        this.createContent();
    }

    createContent() {
        this.createTable();
    }

    createTable() {
        const config = this.getFieldConfig() as EntityProperty;
        const DATA_MODEL_NAME = "data";

        const table = new Table({
            id: `${this.getId()}-table-enum`,
            p13nMode: [TableP13nMode.Column, TableP13nMode.Filter],
            type: TableType.ResponsiveTable,
            delegate: {
                name: ENUM_DELEGATE_PATH,
                payload: config,
            },
            columns: [
                new Column({
                    propertyKey: "value",
                    header: "value",
                    template: new Text({
                        text: {
                            path: "value",
                            model: DATA_MODEL_NAME,
                            formatter: async (value: string) => {
                                const valueHelp = this.getParent() as ValueHelpDialog;

                                const resourceModel = this.getModel("i18n") as ResourceModel | null;
                                if (!resourceModel) return value;

                                try {
                                    const i18n = await resourceModel.getResourceBundle();
                                    return i18n.getText(
                                        `${valueHelp.getEntity()}.${valueHelp.getField()}.${value}`
                                    );
                                } catch {
                                    return value;
                                }
                            },
                        },
                    }),
                }),
            ],
        });

        table.setModel(new JSONModel({ enums: config.enums }), DATA_MODEL_NAME);
        this.setTable(table);
    }
}

export default EnumTableDialog;
