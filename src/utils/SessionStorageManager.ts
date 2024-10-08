export class SessionStorageManager {
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving to sessionStorage: ${error}`);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const serializedValue = sessionStorage.getItem(key);
      if (!serializedValue) return null;
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(`Error reading from sessionStorage: ${error}`);
      return null;
    }
  }
}
