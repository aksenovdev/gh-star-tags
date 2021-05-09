<script lang="ts">
    import { getContext } from 'svelte';
    import type { TagsHolderStore } from '../../stores/tags-holder.store';
    import { TAGS_HOLDER_STORE_CONTEXT_KEY } from './tags-section.constants';
    import OctionIcon from '../common/OctionIcon.svelte';
    import TagComponent from './common/Tag.svelte';
    import TagAction from './common/TagAction.svelte';
    import type { Tag } from '../../../../tags-api/interfaces';

    export let tag: Tag;
    export { className as class }; let className: string = '';
    const { removeTagFx }: TagsHolderStore = getContext(TAGS_HOLDER_STORE_CONTEXT_KEY);
</script>

<style lang="scss">
    .tag-action {
        min-width: var(--ghst-tag-height);
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>

<TagComponent class={className}>
    { tag }
    <svelte:fragment slot="actions">
        <TagAction title="Delete" on:click={() => removeTagFx(tag)}>
            <OctionIcon icon="x" />
        </TagAction>
    </svelte:fragment>
</TagComponent>
