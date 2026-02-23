import { defaultEntities } from "./defaults/index";
import { Entity, EntityProperty, LibraryConfig } from "./types";

type EntityPropertyFlat = EntityProperty & { name: string; entity: string };

class EntityRegistry {
    private _registry: Record<string, Entity>;
    private _modelName: string;

    constructor() {
        this._registry = { ...defaultEntities };
        this._modelName = "SL";
    }

    configure(config: LibraryConfig): void {
        if (config.model) this._modelName = config.model;

        for (const [name, props] of Object.entries(config.entitiesExtend ?? {})) {
            this.extend(name, props);
        }

        for (const [name, entity] of Object.entries(config.custom ?? {})) {
            this.registerEntity(name, entity);
        }
    }

    extend(entityName: string, properties: Record<string, EntityProperty>): void {
        const entity = this.getEntityConfig(entityName);
        Object.assign(entity.properties, properties);
    }

    registerEntity(name: string, config: Entity): void {
        this._registry[name] = config;
    }

    getEntityConfig(name: string): Entity {
        const entity = this._registry[name];
        if (!entity) {
            throw new Error(
                `[Slick] Entity "${name}" not found. Register it via Slick.configure({ custom: { "${name}": ... } })`
            );
        }
        return entity;
    }

    getEntityProps(entityName: string): EntityPropertyFlat[] {
        const entity = this._registry[entityName];
        if (!entity) return [];

        return Object.keys(entity.properties).map((property) => ({
            name: property,
            entity: entityName,
            ...entity.properties[property],
        }));
    }

    getEntityProp(entityName: string, property: string): EntityProperty | null {
        const entity = this._registry[entityName];
        if (!entity) return null;

        return entity.properties[property] ?? null;
    }

    getModelName(): string {
        return this._modelName;
    }
}

const Slick = new EntityRegistry();
export default Slick;
