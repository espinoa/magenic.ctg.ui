import { Injectable } from '@angular/core';

import { CacheService } from './cache.service';

@Injectable()
export class LocalStorageCacheService extends CacheService {

    get(key: string): string {
        return localStorage.getItem(key);
    }

    set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}
