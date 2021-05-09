interface SerializedStorageData {
    activeApiProviderKey: string;
    providersOptions: [string, any][];
}
export interface StorageData {
    activeApiProviderKey: string;
    providersOptions: Map<string, any>;
}

const serializeStorageData: (data: StorageData) => SerializedStorageData
    = ({ activeApiProviderKey, providersOptions }: StorageData) => ({
        activeApiProviderKey,
        providersOptions: Array.from(providersOptions || [])
    });
const deserializeStorageData: (serializedData: SerializedStorageData) => StorageData
    = ({ activeApiProviderKey, providersOptions = [] }: SerializedStorageData) => ({
        activeApiProviderKey,
        providersOptions: new Map(providersOptions)
    });
export const getStorageData: () => Promise<StorageData>
    = () => new Promise(
        resolve => chrome.storage.sync
            .get(
                (serializedData: SerializedStorageData) =>
                    resolve(deserializeStorageData(serializedData))
            )
    );
export const setStorageData: (data: StorageData) => Promise<void>
    = (data: StorageData) => new Promise(
        resolve => chrome.storage.sync.set(serializeStorageData(data), resolve)
    );
export const updateStorageData: (data: Partial<StorageData>) => Promise<void>
    = (data: Partial<StorageData>) => getStorageData()
        .then((currentData: StorageData) => ({
            ...currentData,
            ...data
        }))
        .then(setStorageData);
