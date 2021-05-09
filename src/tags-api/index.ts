import { STORAGE_PROVIDER_KEY, createStorageProvider } from './providers/storage.provider';

export const apiProvidersFabrics = new Map([
    [STORAGE_PROVIDER_KEY, createStorageProvider],
]);
