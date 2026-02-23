import { Entity } from "../types";
import BusinessPartnersConfig from "./BusinessPartners";
import ItemsConfig from "./Items";
import SalesOrdersConfig from "./SalesOrders";
import PurchaseOrdersConfig from "./PurchaseOrders";
import InvoicesConfig from "./Invoices";
import PurchaseInvoicesConfig from "./PurchaseInvoices";
import UsersConfig from "./Users";
import WarehousesConfig from "./Warehouses";
import ItemGroupsConfig from "./ItemGroups";
import BusinessPartnerGroupsConfig from "./BusinessPartnerGroups";

export const defaultEntities: Record<string, Entity> = {
    [BusinessPartnersConfig.name]: BusinessPartnersConfig,
    [ItemsConfig.name]: ItemsConfig,
    [SalesOrdersConfig.name]: SalesOrdersConfig,
    [PurchaseOrdersConfig.name]: PurchaseOrdersConfig,
    [InvoicesConfig.name]: InvoicesConfig,
    [PurchaseInvoicesConfig.name]: PurchaseInvoicesConfig,
    [UsersConfig.name]: UsersConfig,
    [WarehousesConfig.name]: WarehousesConfig,
    [ItemGroupsConfig.name]: ItemGroupsConfig,
    [BusinessPartnerGroupsConfig.name]: BusinessPartnerGroupsConfig,
};
