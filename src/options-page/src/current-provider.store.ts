import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { StorageData } from '../../storage-data';
import { getStorageData, updateStorageData } from '../../storage-data';

getStorageData()
    .then(({ activeApiProviderKey }: StorageData) => setActiveProvider(activeApiProviderKey))
    .then(
        () => activeProvider$
            .subscribe((activeApiProviderKey: string) => updateStorageData({ activeApiProviderKey }))
    );

export const activeProvider$: Writable<string> = writable('');
export const setActiveProvider: (providerKey: string) => void = activeProvider$.set;
