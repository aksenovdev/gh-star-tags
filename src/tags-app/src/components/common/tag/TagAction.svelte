<script lang="ts">
    export let title = '';
    export { className as class }; let className: string = '';
</script>

<style lang="scss">
    .tag-action {
        min-width: calc(var(--ghst-tag-height) - 1px); // - borders;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-left: 1px solid var(--ghst-color-border-primary);
    }
</style>

<div class="tag-action {className}" {title} on:click>
    <slot></slot>
</div>
