import './src/global.scss';

import type { StorageData } from '@storage-data';
import { getStorageData } from '@storage-data';
import { apiProvidersFabrics } from '@tags-api/index';
import type { TagsApi } from '@tags-api/interfaces';
import { STORAGE_PROVIDER_KEY } from '@tags-api/providers/storage.provider';
import type { RepositoryHolderInfo } from './src/utils/get-starred-repositories-from-page';
import { getTagsHoldersFromPage } from './src/utils/get-starred-repositories-from-page';
import type { HolderData, TagsHolderStore } from './src/stores/tags-holder.store';
import { createTagsHolderStoreFactory } from './src/stores/tags-holder.store';
import type { TagsSearchStore } from './src/stores/tags-search.store';
import { createTagsSearchStore } from './src/stores/tags-search.store';
import TagsSection from './src/components/tags-section/TagsSection.svelte';
import TagsSearch from './src/components/tags-search/TagsSearch.svelte';

getStorageData()
    .then(({ activeApiProviderKey, providersOptions }: StorageData) => {
        const providerKey: string = apiProvidersFabrics.has(activeApiProviderKey)
            ? activeApiProviderKey
            : STORAGE_PROVIDER_KEY;
        const factory: (options: any) => TagsApi
            = apiProvidersFabrics.get(providerKey);
        const tagsApi: TagsApi = factory(providersOptions.get(providerKey));
        const tagsSearchStore: TagsSearchStore = createTagsSearchStore(tagsApi);
        const createHolderStore: (holderKey: HolderData) => TagsHolderStore
            = createTagsHolderStoreFactory(tagsApi);

        getTagsHoldersFromPage()
            .forEach(({ data, tagsSectionTargetElement }: RepositoryHolderInfo) => new TagsSection({
                target: tagsSectionTargetElement,
                props: {
                    holderStore: createHolderStore(data),
                    searchStore: tagsSearchStore
                }
            }));

        const searchSectionTarget: HTMLElement = document.querySelector('.col-lg-3.mt-6.mt-lg-0');
        new TagsSearch({
            target: searchSectionTarget,
            props: {
                searchStore: tagsSearchStore
            }
        });
    });
