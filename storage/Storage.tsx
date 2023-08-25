import { StorageKeys } from '@/storage/StorageKeys';

const getKey = (key: StorageKeys): string => `movies-series:${key}`;

const localSaveItem = <T,>(key: StorageKeys, item: T): void =>
    localStorage.setItem(getKey(key), JSON.stringify(item));

const localGetItem = <T,>(key: StorageKeys): T =>
    JSON.parse(localStorage.getItem(getKey(key)) ?? '');

const sessionSaveItem = <T,>(key: StorageKeys, item: T): void =>
    sessionStorage.setItem(getKey(key), JSON.stringify(item));

const sessionGetItem = <T,>(key: StorageKeys): T =>
    JSON.parse(sessionStorage.getItem(getKey(key)) ?? '');

export { localSaveItem, localGetItem, sessionGetItem, sessionSaveItem };
