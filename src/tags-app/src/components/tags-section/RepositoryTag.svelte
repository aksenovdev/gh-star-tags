<script lang="ts">
    import { getContext } from 'svelte';
    import type { Tag } from '@tags-api/interfaces';
    import type { TagsHolderStore } from '../../stores/tags-holder.store';
    import OctionIcon from '../common/OctionIcon.svelte';
    import TagComponent from '../common/tag/Tag.svelte';
    import TagAction from '../common/tag/TagAction.svelte';
    import { TAGS_HOLDER_STORE_CONTEXT_KEY } from './tags-section.constants';

    export let tag: Tag;
    export { className as class }; let className: string = '';
    const { removeTagFx }: TagsHolderStore = getContext(TAGS_HOLDER_STORE_CONTEXT_KEY);
</script>

<TagComponent class={className}>
    { tag }
    <svelte:fragment slot="actions">
        <TagAction title="Delete" on:click={() => removeTagFx(tag)}>
            <OctionIcon icon="x" />
        </TagAction>
    </svelte:fragment>
</TagComponent>
