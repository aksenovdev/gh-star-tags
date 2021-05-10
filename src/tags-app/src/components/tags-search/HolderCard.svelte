<script lang="ts">
    import type { TagsHolder } from '@tags-api/interfaces';
    import TagComponent from '../common/tag/Tag.svelte';

    export let holder: TagsHolder;
    export { className as class }; let className: string = '';
    const title: string = holder.link.replace('/', '');
</script>

<style lang="scss">
    .tags-section {
        margin-left: -4px;
        display: flex;
        flex-wrap: wrap;
    }
</style>

<div class="border p-2 {className}">
    <h3 class="h4 lh-default">
        <a href={holder.link}>{ title }</a>
    </h3>
    <div>{ holder.description }</div>
    {#if holder.lang}
        <div class="mt-2">
            <span class="repo-language-color" style={`background-color: ${holder.lang.color}`}></span>
            <span>{holder.lang.name}</span>
        </div>
    {/if}
    <div class="tags-section mt-2">
        {#each holder.tags as tag (tag)}
            <TagComponent class="m-1">{ tag }</TagComponent>
        {/each}
    </div>
</div>
