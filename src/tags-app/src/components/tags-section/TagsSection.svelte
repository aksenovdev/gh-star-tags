<script lang="ts">
    import { setContext } from 'svelte';
    import type { Store } from 'effector';
    import type { Tag } from '../../../../tags-api/interfaces';
    import type { TagsHolderStore } from '../../stores/tags-holder.store';
    import { TAGS_HOLDER_STORE_CONTEXT_KEY } from './tags-section.constants';
    import CreateTag from './create-tag/CreateTag.svelte';
    import RepositoryTag from './RepositoryTag.svelte';

    export let holderStore: TagsHolderStore;
    const tags$: Store<Tag[]>  = holderStore.tags$;

    setContext(TAGS_HOLDER_STORE_CONTEXT_KEY, holderStore);
    holderStore.requestTagsHolderFx();
</script>

<style lang="scss">
    .tags-section {
        margin-bottom: -15px;
        margin-top: 16px;
        margin-left: -4px;
        display: flex;
        flex-wrap: wrap;
    }
</style>

<div class="tags-section">
    <CreateTag class="m-1" />
    {#each $tags$ as tag (tag)}
        <RepositoryTag class="m-1" {tag}></RepositoryTag>
    {/each}
</div>
