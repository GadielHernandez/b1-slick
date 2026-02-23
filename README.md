# b1-slick

**Slick** — Smart SAPUI5 controls for SAP Business One Service Layer.

Provides a metadata-driven Entity framework that auto-generates CRUD UI (tables, filter bars, value helps, fields) from a simple entity configuration.

## Installation

```bash
npm install b1-slick
```

## Setup in ui5.yaml

```yaml
framework:
  libraries:
    - name: b1.slick
      path: node_modules/b1-slick/dist/resources
```

## Setup in Component.ts

```typescript
import Slick from "b1/slick";
import { DataTypes } from "b1/slick";

Slick.configure({
    model: "SL",                  // OData model name in your manifest.json
    entitiesExtend: {             // optional: extend default entities
        BusinessPartners: {
            U_Segment: { type: DataTypes.ENUM, label: "Segment", enums: [
                { key: "A", value: "Premium" },
                { key: "B", value: "Standard" }
            ]}
        }
    },
    custom: {                     // optional: register your own UDOs
        U_MY_UDO: {
            endpoint: "U_MY_UDO",
            label: "My UDO",
            key: "Code",
            properties: {
                Code: { type: DataTypes.STRING, label: "Code" },
                Name: { type: DataTypes.STRING, label: "Name" }
            }
        }
    }
});
```

## Usage in XML Views

```xml
<mvc:View
    xmlns:mvc="sap.ui.core.mvc"
    xmlns:slick="b1.slick">

    <!-- Auto-generated table from entity config -->
    <slick:EntityTable entity="BusinessPartners" />

    <!-- Auto-generated filter bar -->
    <slick:EntityFilterBar entity="BusinessPartners" />

    <!-- Smart field with value help -->
    <slick:EntityField entity="BusinessPartners" propertyKey="CardCode" />

</mvc:View>
```

## Default Entities

The following SAP Business One entities are available out of the box:

| Key | Endpoint |
|-----|----------|
| `BusinessPartners` | `BusinessPartners` |
| `Items` | `Items` |
| `Orders` | `Orders` (Sales Orders) |
| `PurchaseOrders` | `PurchaseOrders` |
| `Invoices` | `Invoices` |
| `PurchaseInvoices` | `PurchaseInvoices` |
| `Users` | `Users` |
| `Warehouses` | `Warehouses` |
| `ItemGroups` | `ItemGroups` |
| `BusinessPartnerGroups` | `BusinessPartnerGroups` |

## TypeScript Setup

Add path mapping in `tsconfig.json`:

```json
{
    "compilerOptions": {
        "paths": {
            "b1/*": ["node_modules/b1-slick/src/b1/*"]
        }
    }
}
```

## License

MIT
