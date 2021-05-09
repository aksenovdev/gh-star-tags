import './src/global.scss';

import type { StorageData } from '../storage-data';
import { getStorageData } from '../storage-data';
import { apiProvidersFabrics } from '../tags-api';
import type { TagsApi } from '../tags-api/interfaces';
import { STORAGE_PROVIDER_KEY } from '../tags-api/providers/storage.provider';
import { getStarredHoldersFromPage, HTMLStarredHolder } from './src/utils/get-starred-repositories-from-page';
import { createTagsHolderStoreFactory, TagsHolderStore } from './src/stores/tags-holder.store';
import TagsSection from './src/components/tags-section/TagsSection.svelte';

getStorageData()
    .then(({ activeApiProviderKey, providersOptions }: StorageData) => {
        const providerKey: string = apiProvidersFabrics.has(activeApiProviderKey)
            ? activeApiProviderKey
            : STORAGE_PROVIDER_KEY;
        const factory: (options: any) => TagsApi
            = apiProvidersFabrics.get(providerKey);
        const tagsApi: TagsApi = factory(providersOptions.get(providerKey));
        const createHolderStore: (holderKey: string) => TagsHolderStore
            = createTagsHolderStoreFactory(tagsApi);

        getStarredHoldersFromPage()
            .forEach(({ key, tagsSectionTargetElement }: HTMLStarredHolder) => new TagsSection({
                target: tagsSectionTargetElement,
                props: { holderStore: createHolderStore(key) }
            }));
    });
