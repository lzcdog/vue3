class localCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  getCache(key: string) {
    const value: any = window.localStorage.getItem(key);
    return JSON.parse(value);
  }
  removeCache(key: string) {
    window.localStorage.removeItem(key);
  }
  clearCache() {
    window.localStorage.clear();
  }
}
const localCacheInstance = new localCache();
export default localCacheInstance;
