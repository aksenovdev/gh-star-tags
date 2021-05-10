<script lang="ts">
    import { getContext } from 'svelte';
    import type { Readable} from 'svelte/store';
    import { someKeyPressed } from '../../../stores/some-key-pressed.store';
    import type { TagsHolderStore } from '../../../stores/tags-holder.store';
    import { TAGS_HOLDER_STORE_CONTEXT_KEY } from '../tags-section.constants';
    import CreateTagForm from './CreateTagForm.svelte';
    import TagsSuggestions from './TagsSuggestions.svelte';

    export { className as class }; let className: string = '';
    const { addTagFx }: TagsHolderStore = getContext(TAGS_HOLDER_STORE_CONTEXT_KEY);
    let search: string = '';
    let opened: boolean = false;

    const shiftPressed$: Readable<boolean> = someKeyPressed('Shift');
    const addTag: (event: CustomEvent) => void
        = ({ detail }: CustomEvent) => {
            addTagFx(detail);
            if (!$shiftPressed$) {
                opened = false;
            }
        };
</script>

<div class="{className}">
    <CreateTagForm
        bind:opened
        on:createTag="{addTag}"
        on:change="{({ detail }) => (search = detail)}"
    />
    <TagsSuggestions {opened} {search} on:selectTag={addTag}></TagsSuggestions>
</div>
