import { Injectable } from '@angular/core';

import { CacheService } from './cache.service';

@Injectable()
export class SessionStorageCacheService extends CacheService {

    get(key: string): string {
        return sessionStorage.getItem(key);
    }

    set(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    }

    remove(key: string): void {
        sessionStorage.removeItem(key);
    }

    clear(): void {
        sessionStorage.clear();
    }
}
