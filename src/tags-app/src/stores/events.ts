import type { Event } from 'effector';
import { createEvent } from 'effector';
import type { TagsHolder, Tag } from '@tags-api/interfaces';

export interface TagCreateEventPayload {
    holder: TagsHolder;
    tag: Tag
}
export type TagDeleteEventPayload = TagCreateEventPayload;

export const tagCreated: Event<TagCreateEventPayload> = createEvent('g_tagCreated');
export const tagDeleted: Event<TagDeleteEventPayload> = createEvent('g_tagDeleted');
