import { Injectable } from '@angular/core';

@Injectable()
export abstract class CacheService {

    // specific caching mechanism is defined in classes that extend CacheService
    abstract get(key: string): string;

    abstract set(key: string, value: string): void;

    abstract remove(key: string): void;

    abstract clear(): void;

    contains(key: string): boolean {
        return !!this.get(key);
    }

    /**
     * Gets cached objects (e.g. PropertyMetadataList) and arrays of primitives (e.g. string[], boolean[], number[]).
     * @key The key where the value is cached.
     * @fromJS? An optional function to assist the object parsing. If the object is one of our codegen entities, pass in the Entity.fromJS static function.
     * @return The cached value.
     */
    getObject(key: string, fromJS: (data: any) => any = null): any {
        const json = JSON.parse(this.get(key));
        return fromJS ? fromJS(json) : json;
    }

    /**
     * Sets cached objects (e.g. PropertyMetadataList) and arrays of primitives (e.g. string[], boolean[], number[]).
     * @key The key where the value is cached.
     * @value The value to cache.
     */
    setObject(key: string, value: any): void {
        if (value.toJS) {
            value = value.toJS();
        }
        this.set(key, JSON.stringify(value));
    }

    /**
     * Gets cached arrays of complex objects
     * @key The key where the value is cached.
     * @fromJS? An optional function to assist the object parsing. If the object is one of our codegen entities, pass in the Entity.fromJS static function.
     * @return The cached value.
     */
    getObjectArray(key: string, fromJS: (data: any) => any = null): any[] {
        const result = [];
        const jsonArray = JSON.parse(this.get(key));
        for (const json of jsonArray) {
            result.push(fromJS ? fromJS(json) : json);
        }
        return result;
    }

    /**
     * Sets cached arrays of complex objects (e.g. EntitlementDTO[]).
     * @key The key where the value is cached.
     * @value The value to cache.
     */
    setObjectArray(key: string, value: any[]): void {
        if (value && value.length > 0 && value[0].toJS) {
            const tempArray = [];
            for (const item of value) {
                tempArray.push(item.toJS());
            }
            value = tempArray;
        }
        this.set(key, JSON.stringify(value));
    }

    sanitizeCacheKey(key: string): string {
        return key.replace(/[ \.\-]/g, '');
    }
}
