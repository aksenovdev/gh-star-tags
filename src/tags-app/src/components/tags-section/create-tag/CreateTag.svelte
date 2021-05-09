<script lang="ts">
    import { getContext } from 'svelte';
    import type { TagsHolderStore } from '../../../stores/tags-holder.store';
    import { TAGS_HOLDER_STORE_CONTEXT_KEY } from '../tags-section.constants';
    import CreateTagForm from './CreateTagForm.svelte';
    import TagsSuggestions from './TagsSuggestions.svelte';

    export { className as class }; let className: string = '';
    const { addTagFx }: TagsHolderStore = getContext(TAGS_HOLDER_STORE_CONTEXT_KEY);
    let search: string = '';
    let opened: boolean = false;
</script>

<div class="{className}">
    <CreateTagForm
        on:createTag="{({ detail }) => addTagFx(detail)}"
        on:change="{({ detail }) => (search = detail)}"
        on:changeOpenState="{({ detail }) => (opened = detail)}"
    />
    <TagsSuggestions {opened} {search} on:selectTag={({ detail }) => addTagFx(detail)}></TagsSuggestions>
</div>
