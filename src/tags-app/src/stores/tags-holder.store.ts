import type { Store, Event, Effect } from 'effector';
import { createEffect, createEvent, createStore, forward } from 'effector';
import type { TagsApi, Tag, TagsHolder } from '@tags-api/interfaces';
import type { TagCreateEventPayload, TagDeleteEventPayload } from './events';
import { tagCreated, tagDeleted } from './events';

export interface TagsHolderStore {
    tagsHolder$: Store<TagsHolder>;
    tags$: Store<Tag[]>;
    addTagFx: Effect<Tag, TagsHolder>;
    removeTagFx: Effect<Tag, TagsHolder>;
    requestTagsHolderFx: Effect<void, TagsHolder>;
}
export type HolderData = Omit<TagsHolder, 'tags'>;

export const createTagsHolderStoreFactory: (tagsApi: TagsApi) => (holderData: HolderData) => TagsHolderStore
    = (tagsApi: TagsApi) => {
        return ({ link, ...data }: HolderData) => {
            const setHolder: Event<TagsHolder> = createEvent('setTagHolder');
            const addTagFx: Effect<Tag, TagsHolder> = createEffect(
                (tag: Tag) => tagsApi.addTagsToHolder(link, [tag])
            );
            const removeTagFx: Effect<Tag, TagsHolder> = createEffect(
                (tag: Tag) => tagsApi.deleteTagsFromHolder(link, [tag])
            );
            const requestTagsHolderFx: Effect<void, TagsHolder> = createEffect(
                () => tagsApi.getHolderById(link)
                    .then(
                        (tagsHolder: TagsHolder) => tagsHolder
                            ? tagsHolder
                            : tagsApi.createHolder({
                                ...data,
                                link: link,
                                tags: [],
                            })
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
            forward({
                from: addTagFx.done.map(({ result, params }) => ({
                    holder: result,
                    tag: params
                } as TagCreateEventPayload)),
                to: tagCreated
            });
            forward({
                from: removeTagFx.done.map(({ result, params }) => ({
                    holder: result,
                    tag: params
                } as TagDeleteEventPayload)),
                to: tagDeleted
            });

            return {
                addTagFx,
                removeTagFx,
                requestTagsHolderFx,
                tagsHolder$,
                tags$
            }
        };
    };
