<div align="center">

# b1-slick

**Smart SAPUI5 controls for SAP Business One Service Layer**

[![npm version](https://img.shields.io/npm/v/b1-slick?color=blue&style=flat-square)](https://www.npmjs.com/package/b1-slick)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![SAPUI5](https://img.shields.io/badge/SAPUI5-1.120.27-0070f2?style=flat-square)](https://ui5.sap.com)
[![SAP B1](https://img.shields.io/badge/SAP%20Business%20One-10.0%20FP2508-orange?style=flat-square)](https://www.sap.com/products/erp/business-one.html)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square)](https://www.typescriptlang.org)

A metadata-driven Entity framework that auto-generates fully functional CRUD UI components — tables, filter bars, fields, and value helps — from a simple entity configuration. Built specifically for SAPUI5 applications that consume the **SAP Business One Service Layer**.

</div>

---

## Overview

Building SAPUI5 apps connected to SAP Business One often means writing the same boilerplate over and over: OData bindings, MDC tables, filter bars, value help dialogs... **b1-slick** eliminates that repetition.

You define your entity once. The library handles the rest.

```xml
<!-- That's it. A fully functional, OData-bound table. -->
<slick:EntityTable entity="BusinessPartners" />
```

### Designed for

- **SAP Business One Service Layer** (OData v4) — the library is built around the SAP B1 `/b1s/v2/` API patterns
- **SAP Business One Tile Extensions** — drop it into any Web Client extension with minimal setup
- **SAPUI5 MDC Controls** — EntityTable, EntityFilterBar, and EntityField are built on top of `sap.ui.mdc`

---

## Compatibility

> **Important:** This library has been developed and tested against the following version. Compatibility with other versions has not been verified.

| Component | Version |
|-----------|---------|
| SAP Business One | **10.0 for SAP HANA (10.00.300) FP 2508** |
| SAPUI5 | **1.120.27** |
| Node.js | 18+ |
| TypeScript | 5.x |

---

## Prerequisites

Before installing, make sure your project has:

- A working SAPUI5 app with `@ui5/cli` (spec version 4.0+)
- A connection to the **SAP Business One Service Layer** configured as an OData model in your `manifest.json`
- (Optional) TypeScript — the library ships with full type definitions

---

## Installation

```bash
npm install b1-slick
```

### 1. Register the library in `ui5.yaml`

```yaml
# ui5.yaml
specVersion: "4.0"
metadata:
  name: my.app
type: application
framework:
  name: SAPUI5
  version: "1.120.27"
  libraries:
    - name: sap.ui.core
    - name: sap.ui.mdc
    - name: sap.m
    - name: b1.slick             # ← add this
      path: node_modules/b1-slick/dist/resources
```

### 2. Add TypeScript path mapping in `tsconfig.json`

```json
{
    "compilerOptions": {
        "paths": {
            "b1/*": ["node_modules/b1-slick/src/b1/*"]
        }
    }
}
```

### 3. Initialize Slick in `Component.ts`

Call `Slick.configure()` once during app initialization, before any views are loaded.

```typescript
import Slick from "b1/slick";

export default class Component extends UIComponent {
    public init(): void {
        super.init();

        Slick.configure({
            model: "SL",   // must match your OData model name in manifest.json
        });
    }
}
```

---

## Quick Start

Declare the `b1.slick` namespace in your XML view and start using controls:

```xml
<mvc:View
    xmlns:mvc="sap.ui.core.mvc"
    xmlns:slick="b1.slick">

    <slick:EntityFilterBar id="filterBar" entity="BusinessPartners" />

    <slick:EntityTable
        entity="BusinessPartners"
        filterBar="filterBar" />

</mvc:View>
```

That's it — the table is OData-bound, sortable, with column selection and search built in.

---

## Controls

### `EntityTable`

An MDC Table automatically configured from an entity's metadata. Handles OData binding, column generation, and sorting.

```xml
<slick:EntityTable
    entity="BusinessPartners"
    filterBar="filterBar"
    initialColumns="CardCode,CardName,Phone1" />
```

| Property | Type | Description |
|----------|------|-------------|
| `entity` | `string` | Registered entity key (e.g. `"BusinessPartners"`) |
| `filterBar` | `string` | ID of an associated `EntityFilterBar` |
| `initialColumns` | `string` | Comma-separated list of property keys to show by default |

---

### `EntityFilterBar`

An MDC FilterBar that auto-generates filter fields from the entity's properties.

```xml
<slick:EntityFilterBar
    id="filterBar"
    entity="Items" />
```

| Property | Type | Description |
|----------|------|-------------|
| `entity` | `string` | Registered entity key |

---

### `EntityField`

A smart MDC Field with automatic data type detection and value help. Use it in forms and detail views.

```xml
<slick:EntityField
    entity="BusinessPartners"
    propertyKey="CardCode"
    editMode="Editable" />
```

| Property | Type | Description |
|----------|------|-------------|
| `entity` | `string` | Registered entity key |
| `propertyKey` | `string` | The property name within that entity |
| `editMode` | `sap.ui.mdc.enums.FieldEditMode` | `Display`, `Editable`, `ReadOnly` |

**Automatic behavior by data type:**

| Data Type | Auto-generated behavior |
|-----------|-------------------------|
| `STRING` | Plain text input / display |
| `DATE` | Date picker |
| `TIME` | Time picker |
| `INTEGER` | Number input |
| `ENTITY` | Value Help dialog with OData-backed table |
| `ENUM` | Value Help dialog with color-coded ObjectStatus display |

---

### `EntityFilterField`

Same as `EntityField` but optimized for use inside a FilterBar.

```xml
<slick:EntityFilterBar entity="Orders">
    <slick:filterItems>
        <slick:EntityFilterField
            entity="Orders"
            propertyKey="DocDate" />
    </slick:filterItems>
</slick:EntityFilterBar>
```

---

## Entity Registry — `Slick`

The `Slick` singleton is the central configuration object of the library. Import it from `"b1/slick"`.

```typescript
import Slick from "b1/slick";
import { DataTypes } from "b1/slick";
```

### `Slick.configure(config)`

Initializes the library. Call once in `Component.ts`.

```typescript
Slick.configure({
    model: "SL",                        // OData model name (default: "SL")
    entitiesExtend: { ... },            // extend built-in entities with custom fields
    custom: { ... },                    // register your own UDO entities
});
```

### `Slick.extend(entityName, properties)`

Add properties to an existing entity at runtime.

```typescript
Slick.extend("BusinessPartners", {
    U_Segment: {
        type: DataTypes.ENUM,
        enums: [
            { value: "A", semanticColor: "Success", cssColor: "#4caf50" },
            { value: "B", semanticColor: "None",    cssColor: "#9e9e9e" },
        ]
    }
});
```

### `Slick.registerEntity(name, config)`

Register a completely new entity (for SAP B1 User-Defined Objects — UDOs).

```typescript
Slick.registerEntity("U_MY_PROJECT", {
    name: "U_MY_PROJECT",
    singularName: "U_MY_PROJECT",
    key: "Code",
    properties: {
        Code:        { type: DataTypes.STRING },
        Name:        { type: DataTypes.STRING },
        StartDate:   { type: DataTypes.DATE },
        BudgetHours: { type: DataTypes.INTEGER },
        OwnerCode: {
            type: DataTypes.ENTITY,
            navigation: {
                entity: "Users",
                keyPath: "UserCode",
                descriptionPath: "UserName",
            }
        }
    }
});
```

### `Slick.getEntityConfig(name)` / `Slick.getEntityProps(name)` / `Slick.getEntityProp(name, key)`

Programmatic access to entity metadata — useful when building custom delegates or logic.

---

## Data Types

```typescript
import { DataTypes } from "b1/slick";
```

| Value | Description | Auto ValueHelp |
|-------|-------------|----------------|
| `DataTypes.STRING` | Text / varchar | — |
| `DataTypes.DATE` | Date (YYYY-MM-DD) | Date picker |
| `DataTypes.TIME` | Time (HH:mm:ss) | Time picker |
| `DataTypes.INTEGER` | Numeric integer | — |
| `DataTypes.ENTITY` | Navigation to another SAP B1 entity | OData table dialog |
| `DataTypes.ENUM` | Fixed value list with color coding | Enum table dialog |

---

## Default Entities

The following SAP B1 entities are available without any configuration:

| Key | Service Layer Endpoint | Primary Key |
|-----|----------------------|-------------|
| `BusinessPartners` | `BusinessPartners` | `CardCode` |
| `Items` | `Items` | `ItemCode` |
| `Orders` | `Orders` | `DocEntry` |
| `PurchaseOrders` | `PurchaseOrders` | `DocEntry` |
| `Invoices` | `Invoices` | `DocEntry` |
| `PurchaseInvoices` | `PurchaseInvoices` | `DocEntry` |
| `Users` | `Users` | `UserCode` |
| `Warehouses` | `Warehouses` | `WarehouseCode` |
| `ItemGroups` | `ItemGroups` | `Number` |
| `BusinessPartnerGroups` | `BusinessPartnerGroups` | `Code` |

---

## ENUM Properties — i18n Labels

For `ENUM` type properties, display labels are resolved from your app's i18n resource bundle. The key format is:

```
{EntityName}.{PropertyKey}.{value}
```

**Example** — for `BusinessPartners.U_Segment` with value `"A"`:

```properties
# i18n/i18n.properties
BusinessPartners.U_Segment.A=Premium
BusinessPartners.U_Segment.B=Standard
```

The `semanticColor` field maps to SAP's `ValueState` enum (`Success`, `Error`, `Warning`, `Information`, `None`).

---

## ENTITY Properties — Navigation / Value Help

For properties that reference another SAP B1 entity, define a `navigation` config:

```typescript
SalesPersonCode: {
    type: DataTypes.ENTITY,
    navigation: {
        entity: "Users",           // registered entity key
        keyPath: "SalesPersonCode",  // field that stores the FK value
        descriptionPath: "SalesPersonName", // field shown as description
        listProps: ["SalesPersonCode", "SalesPersonName"], // columns in VH dialog
        filters: {                 // optional static filters
            and: true,
            list: [
                { path: "Active", operator: FilterOperator.EQ, value: "tYES" }
            ]
        }
    }
}
```

---

## Usage as a SAP B1 Tile Extension

This library was designed to work within **SAP Business One Web Client** as a **Tile Extension**. In that context:

- The Service Layer connection and authentication are handled by the Web Client
- The OData model is typically named `SL` and maps to `/b1s/v2/`
- Proxying is not needed in production — the Web Client handles routing automatically

**Typical `manifest.json` OData model setup:**

```json
{
    "sap.app": {
        "dataSources": {
            "ServiceLayer": {
                "uri": "/b1s/v2/",
                "type": "OData",
                "settings": { "odataVersion": "4.0" }
            }
        }
    },
    "sap.ui5": {
        "models": {
            "SL": {
                "dataSource": "ServiceLayer",
                "type": "sap.ui.model.odata.v4.ODataModel"
            }
        }
    }
}
```

For local development, configure a proxy to your SAP B1 server in `ui5-local.yaml` using `ui5-middleware-simpleproxy`.

---

## Project Structure

```
src/b1/slick/
├── registry/
│   ├── EntityRegistry.ts       Slick singleton — central configuration
│   ├── types.ts                DataTypes, Entity, EntityProperty, etc.
│   └── defaults/               10 pre-configured SAP B1 entities
├── Field/
│   ├── EntityField.ts          Smart MDC field with auto data type
│   ├── EntityFilterField.ts    Field variant for FilterBar
│   └── AutoDataType/           Data type handlers per DataTypes enum
├── FilterBar/
│   └── EntityFilterBar.ts      Auto-generated MDC FilterBar
├── Table/
│   ├── EntityTable.ts          Auto-generated MDC Table
│   └── EntityTableDelegate.ts  OData v4 delegate
└── ValueHelp/
    ├── FieldValueHelp.ts       Value help container
    ├── Entity/                 OData-backed value help dialog + popover
    └── Enum/                   Enum value help dialog + popover
```

---

## Contributing

Contributions are welcome. To get started:

```bash
git clone https://github.com/GadielHernandez/b1-slick.git
cd b1-slick
npm install

# Type checking
npm run ts-typecheck

# Regenerate control type definitions after MDC metadata changes
npm run ts-interface-generator

# Build the library
npm run build
```

---

## License

[MIT](LICENSE) — © Gadiel Hernandez
