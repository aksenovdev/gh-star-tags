import type { Store, Event, Effect } from 'effector';
import { createEffect, createEvent, createStore, forward } from 'effector';
import type { TagsApi, Tag, TagsHolder } from '../../../tags-api/interfaces';

export interface TagsHolderStore {
    tagsHolder$: Store<TagsHolder>;
    tags$: Store<Tag[]>;
    addTagFx: Effect<Tag, TagsHolder>;
    removeTagFx: Effect<Tag, TagsHolder>;
    requestTagsHolderFx: Effect<void, TagsHolder>;
    searchTagsFx: Effect<Tag, Tag[]>;
}

export const createTagsHolderStoreFactory: (tagsApi: TagsApi) => (holderKey: string) => TagsHolderStore
    = (tagsApi: TagsApi) => {
        return (holderKey: string) => {
            const setHolder: Event<TagsHolder> = createEvent('setTagHolder');
            const searchTagsFx: Effect<Tag, Tag[]> = createEffect(
                (search: string) => tagsApi.searchTags(search)
            );
            const addTagFx: Effect<Tag, TagsHolder> = createEffect(
                (tag: Tag) => tagsApi.addTagsToHolder(holderKey, [tag])
            );
            const removeTagFx: Effect<Tag, TagsHolder> = createEffect(
                (tag: Tag) => tagsApi.deleteTagsFromHolder(holderKey, [tag])
            );
            const requestTagsHolderFx: Effect<void, TagsHolder> = createEffect(
                () => tagsApi.getHolderById(holderKey)
                    .then(
                        (tagsHolder: TagsHolder) => tagsHolder
                            ? tagsHolder
                            : tagsApi.createHolder({ repositoryKey: holderKey, tags: [] })
                    )
            );

            const tagsHolder$: Store<TagsHolder> = createStore(null)
                .on(setHolder, (_: TagsHolder, holder: TagsHolder) => holder);
            const tags$: Store<Tag[]> = tagsHolder$
                .map((tagsHolder: TagsHolder) => tagsHolder?.tags ?? []);

            forward({
                from: [
                    addTagFx.done.map(({ result }) => result),
                    removeTagFx.done.map(({ result }) => result),
                    requestTagsHolderFx.done.map(({ result }) => result),
                ],
                to: setHolder
            });

            return {
                addTagFx,
                removeTagFx,
                requestTagsHolderFx,
                searchTagsFx,
                tagsHolder$,
                tags$
            }
        };
    };
