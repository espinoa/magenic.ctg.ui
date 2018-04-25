export const LocalStorageCacheServiceStub = {
  get(key: string): string {
      return null;
  },

  set(key: string, value: string): void {

  },

  remove(key: string): void {

  },

  clear(): void {

  },

  contains(key: string): boolean {
      return false;
  },

  getObject(key: string, converterFn: (data: any) => any = null): any {
      return null;
  },

  setObject(key: string, value: any): void {

  },

  getObjectArray(key: string, converterFn: (data: any) => any = null): any[] {
      return null;
  },

  setObjectArray(key: string, value: any[]): void {

  },

  sanitizeCacheKey(key: string): string {
      return key;
  },
};

