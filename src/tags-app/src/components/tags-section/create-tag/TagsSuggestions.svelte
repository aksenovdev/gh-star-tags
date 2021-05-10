<script lang="ts">
    import { createEventDispatcher, getContext } from 'svelte';
    import debounce from 'lodash-es/debounce';
    import DropdownPane from '@svetlokit/components/DropdownPane.svelte';
    import type { Tag } from '@tags-api/interfaces';
    import type { TagsHolderStore } from '../../../stores/tags-holder.store';
    import type { TagsSearchStore } from '../../../stores/tags-search.store';
    import TagComponent from '../../common/tag/Tag.svelte';
    import { TAGS_HOLDER_STORE_CONTEXT_KEY, TAGS_SEARCH_STORE_CONTEXT_KEY } from '../tags-section.constants';

    export let opened: boolean = false;
    export let search: string = '';
    const dispatcher = createEventDispatcher();
    const { tags$ }: TagsHolderStore = getContext(TAGS_HOLDER_STORE_CONTEXT_KEY);
    const { searchTagsFx }: TagsSearchStore = getContext(TAGS_SEARCH_STORE_CONTEXT_KEY);
    let findedTags: Tag[] = [];

    const startSearch: (search: string) => void
        = debounce(
            (searchQuery: string) => searchQuery
                ? searchTagsFx(searchQuery)
                    .then((tags: Tag[]) => (findedTags = tags))
                : (findedTags = [])
            , 300
        );

    $: startSearch(search);
    $: suggestedTags = findedTags.filter((tag: Tag) => !$tags$.includes(tag));
    $: show = opened && suggestedTags.length > 0;
</script>

<style lang="scss">
    :global(.gh-pane.dropdown-pane) {
        border: 1px solid var(--ghst-color-border-primary) !important;
        background-color: var(--ghst-color-bg-primary) !important;
    }
</style>

<DropdownPane class="gh-pane" opened="{show}" delayOnClose="{false}" stayOpenWhileHovered="{false}">
    {#each suggestedTags as tag (tag)}
        <TagComponent class="cursor-pointer" on:click={() => dispatcher('selectTag', tag)}>{tag}</TagComponent>
    {/each}
</DropdownPane>
