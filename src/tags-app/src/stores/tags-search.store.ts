import type { Effect } from 'effector';
import { createEffect } from 'effector';
import type { Tag, TagsApi, TagsHolder } from '@tags-api/interfaces';

export interface TagsSearchStore {
    searchTagsFx: Effect<string, Tag[]>;
    searchHoldersByTagsFx: Effect<Tag[], TagsHolder[]>;
    getAllTagsFx: Effect<void, Tag[]>;
}

export const createTagsSearchStore: (tagsApi: TagsApi) => TagsSearchStore
    = (tagsApi: TagsApi) => {
        const searchTagsFx: Effect<string, Tag[]> = createEffect(
            (search: string) => tagsApi.searchTags(search)
        );
        const searchHoldersByTagsFx: Effect<Tag[], TagsHolder[]> = createEffect(
            (tags: Tag[]) => tagsApi.searchHoldersByTags(tags)
        );
        const getAllTagsFx: Effect<void, Tag[]> = createEffect(
            () => tagsApi.getAllTags()
        );

        return {
            searchTagsFx,
            searchHoldersByTagsFx,
            getAllTagsFx
        };
    };
