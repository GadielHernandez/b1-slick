import { defaultEntities } from "./defaults/index";
import { Entity, EntityProperty, LibraryConfig } from "./types";

type EntityPropertyFlat = EntityProperty & { name: string; entity: string };

/**
 * Central registry for b1-slick. Holds entity definitions and OData model configuration.
 * Access the singleton via `import Slick from "b1/slick/registry/EntityRegistry"`.
 */
class EntityRegistry {
    private _registry: Record<string, Entity>;
    private _modelName: string;

    constructor() {
        this._registry = { ...defaultEntities };
        this._modelName = "SL";
    }

    /**
     * Configures the registry with a model name and entity definitions.
     * Call once during application initialization in `Component.ts`.
     *
     * @param {LibraryConfig} config - Configuration object
     * @param {string} [config.model="SL"] - OData model name used for data binding
     * @param {Record<string, Record<string, EntityProperty>>} [config.entitiesExtend] - Additional properties to merge into default entities
     * @param {Record<string, Entity>} [config.custom] - Custom entity definitions to register
     * @example
     * Slick.configure({ model: "SL", custom: { U_PROJECT: ProjectConfig } });
     */
    configure(config: LibraryConfig): void {
        if (config.model) this._modelName = config.model;

        for (const [name, props] of Object.entries(config.entitiesExtend ?? {})) {
            this.extend(name, props);
        }

        for (const [name, entity] of Object.entries(config.custom ?? {})) {
            this.registerEntity(name, entity);
        }
    }

    /**
     * Merges additional properties into an existing registered entity.
     * Useful for adding custom UDFs to default SAP B1 entities.
     *
     * @param {string} entityName - Name of the registered entity (e.g. `"BusinessPartners"`)
     * @param {Record<string, EntityProperty>} properties - Properties to merge
     * @throws {Error} If the entity is not registered
     * @example
     * Slick.extend("BusinessPartners", { U_Category: { type: DataTypes.ENUM, enums: [...] } });
     */
    extend(entityName: string, properties: Record<string, EntityProperty>): void {
        const entity = this.getEntityConfig(entityName);
        Object.assign(entity.properties, properties);
    }

    /**
     * Registers a new entity definition. Prefer using `configure({ custom: ... })` for
     * initialization-time registration.
     *
     * @param {string} name - Entity name matching the SAP B1 Service Layer resource name (e.g. `"U_MYUDT"`)
     * @param {Entity} config - Entity definition
     */
    registerEntity(name: string, config: Entity): void {
        this._registry[name] = config;
    }

    /**
     * Returns the full entity definition for a registered entity.
     *
     * @param {string} name - Entity name
     * @returns {Entity} The entity definition
     * @throws {Error} If the entity is not registered
     */
    getEntityConfig(name: string): Entity {
        const entity = this._registry[name];
        if (!entity) {
            throw new Error(
                `[Slick] Entity "${name}" not found. Register it via Slick.configure({ custom: { "${name}": ... } })`
            );
        }
        return entity;
    }

    /**
     * Returns all properties of a registered entity as a flat array.
     * Emits a console warning if the entity is not registered.
     *
     * @param {string} entityName - Entity name
     * @returns {EntityPropertyFlat[]} Array of properties with `name` and `entity` fields injected
     */
    getEntityProps(entityName: string): EntityPropertyFlat[] {
        const entity = this._registry[entityName];
        if (!entity) {
            console.warn(`[b1-slick] Entity "${entityName}" not registered.`);
            return [];
        }

        return Object.keys(entity.properties).map((property) => ({
            name: property,
            entity: entityName,
            ...entity.properties[property],
        }));
    }

    /**
     * Returns a single property definition from a registered entity.
     *
     * @param {string} entityName - Entity name
     * @param {string} property - Property key
     * @returns {EntityProperty | null} The property definition, or `null` if not found
     */
    getEntityProp(entityName: string, property: string): EntityProperty | null {
        const entity = this._registry[entityName];
        if (!entity) return null;

        return entity.properties[property] ?? null;
    }

    /**
     * Returns the OData model name configured via `Slick.configure()`.
     * Used internally by controls for data binding.
     *
     * @returns {string} The model name (default: `"SL"`)
     */
    getModelName(): string {
        return this._modelName;
    }
}

const Slick = new EntityRegistry();
export default Slick;
