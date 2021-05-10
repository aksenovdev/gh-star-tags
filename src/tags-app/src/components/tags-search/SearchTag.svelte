<script lang="ts">
    import TagComponent from '../common/tag/Tag.svelte';

    export let active: boolean = false;
    export { className as class }; let className: string = '';
</script>

<style lang="scss">
    :global(.search-tag--active) {
        color: var(--color-topic-tag-text) !important;
        border-color: var(--color-topic-tag-bg) !important;
        background-color: var(--color-topic-tag-bg) !important;
    }
</style>

<TagComponent class="cursor-pointer {className} {active ? 'search-tag--active' : ''}" on:click>
    <slot></slot>
</TagComponent>
