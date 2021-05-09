<script lang="ts">
    export let title = '';
    export { className as class }; let className: string = '';
    let tagTextEl: HTMLElement;

    $: tagTextTitle = title || tagTextEl?.textContent || '';
</script>

<style lang="scss">
    .tag {
        font-size: 12px;
        border-radius: 2px;
        cursor: pointer;
        display: flex;
        align-items: stretch;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        border: 1px solid var(--ghst-color-border-primary);
        height: var(--ghst-tag-height);
        color: var(--ghst-color-text-primary);

        &__text {
            text-transform: uppercase;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
            padding: var(--ghst-tag-padding);
        }
    }
</style>

<div class="tag {className}" on:click>
    <div
        class="tag__text"
        on:click
        bind:this="{tagTextEl}"
        title="{tagTextTitle}"
    >
        <slot></slot>
    </div>
    <slot name="actions"></slot>
</div>
