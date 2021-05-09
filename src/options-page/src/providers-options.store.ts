import type { Writable, Readable } from 'svelte/store';
import { writable, get, derived } from 'svelte/store';

chrome.storage.sync
    .get(({ providersOptions = [], ...otherOptions }: { providersOptions: [string, any][]; [x: string]: any; }) => {
        setProvidersOptions(new Map(providersOptions));
        providersOptions$
            .subscribe(($providersOptions: Map<string, any>) => (chrome.storage.sync.set({ providersOptions: Array.from($providersOptions), ...otherOptions })));
    });
export const providersOptions$: Writable<Map<string, any>> = writable(new Map());
export const setProvidersOptions: (providersOptions: Map<string, any>) => void
    = providersOptions$.set;
export const setProviderOptions: (providerKey: string, providerOptions: any) => void
    = (providerKey: string, providerOptions: any) => {
        const providersOptions: Map<string, any> = get(providersOptions$);
        const updatedProvidersOptions: Map<string, any> = new Map([
            ...providersOptions,
            [providerKey, providerOptions]
        ]);
        setProvidersOptions(updatedProvidersOptions);
    };
export const getOptionsForProvider: (providerKey: string) => Readable<any>
    = (providerKey: string) => derived(
        providersOptions$,
        (providersOptions: Map<string, any>) => providersOptions.get(providerKey)
    );
