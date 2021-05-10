<script lang="ts">
    import { onMount, setContext } from 'svelte';
    import type { Readable} from 'svelte/store';
    import type { Tag, TagsHolder } from '@tags-api/interfaces';
    import type { TagsSearchStore } from '../../stores/tags-search.store';
    import type { TagCreateEventPayload } from '../../stores/events';
    import { tagCreated } from '../../stores/events';
    import { TAGS_SEARCH_STORE_CONTEXT_KEY } from './tags-search.constants';
    import HolderCard from './HolderCard.svelte';
    import SearchTag from './SearchTag.svelte';
    import { someKeyPressed } from '../../stores/some-key-pressed.store';

    export let searchStore: TagsSearchStore;
    const controlPressed$: Readable<boolean> = someKeyPressed('Control');
    let allTags: Tag[] = [];
    let activeTags: Set<Tag> = new Set();
    let holders: TagsHolder[] = [];

    setContext(TAGS_SEARCH_STORE_CONTEXT_KEY, searchStore);
    searchStore.getAllTagsFx()
        .then((tags: Tag[]) => (allTags = tags.sort()));
    onMount(() => tagCreated.watch(({ tag }: TagCreateEventPayload) => {
        if (!allTags.includes(tag)) {
            allTags.push(tag);
            allTags = allTags.sort();
        }
    }));

    const activateTag: (tag: Tag) => void
        = (tag: Tag) => {
            if (activeTags.has(tag)) {
                activeTags.delete(tag)
            } else {
                if (!$controlPressed$) {
                    activeTags.clear();
                }
                activeTags.add(tag);
            }
            activeTags = activeTags;

            if (activeTags.size > 0) {
                searchStore.searchHoldersByTagsFx(Array.from(activeTags))
                    .then((findedHolders: TagsHolder[]) => (holders = findedHolders));
            } else {
                holders = [];
            }
        };
</script>

<style lang="scss">
    .tags-section {
        margin-left: -4px;
        display: flex;
        flex-wrap: wrap;
    }
</style>

<div class="h6 text-uppercase border-bottom pb-3">
    Tags search
</div>
<div class="tags-section pt-3 mb-2">
    {#each allTags as tag (tag)}
        <SearchTag
            class="m-1"
            active={activeTags.has(tag)}
            on:click={(ev) => activateTag(tag)}
        >{ tag }</SearchTag>
    {/each}
</div>
{#each holders as holder (holder.link)}
    <HolderCard class="mb-2" holder={holder} />
{/each}
