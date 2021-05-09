<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import OctionIcon from '../../common/OctionIcon.svelte';

    export let value: string = '';
    export { className as class }; let className: string = '';
    const dispatcher = createEventDispatcher();
    let opened: boolean = false;

    const emitCreateTag: () => void
        = () => {
            if (value) {
                dispatcher('createTag', value);
                value = '';
            }
        };
    const handleKeydown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'Enter':
                emitCreateTag();
                break;
            case 'Escape':
                opened = false;
                break;
        }
    };

    $: value = opened ? value : '';
    $: dispatcher('change', value);
    $: dispatcher('changeOpenState', opened);
</script>

<style lang="scss">
    .create-tag {
        --input-width: 150px;

        border-radius: 2px;
        overflow: hidden;
        display: flex;
        height: var(--ghst-tag-height);
        border: 1px solid var(--ghst-color-border-primary);
        color: var(--ghst-color-text-primary);

        &--opened {
            .create-tag__input-wrapper {
                width: var(--input-width);
            }

            .create-tag__add-icon {
                transform: rotate(45deg);
            }

            .create-tag__done-icon {
                border-left: 1px solid var(--ghst-color-border-primary);
            }
        }

        &__input-wrapper {
            position: relative;
            transition: width 0.2s ease-out;
            width: 0;
            overflow: hidden;
        }

        &__input {
            outline: none;
            background-color: transparent;
            border: none;
            padding: var(--ghst-tag-padding);
            width: var(--input-width);
            height: 100%;
            text-transform: uppercase;
        }

        &__icon-container {
            height: 100%;
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--ghst-tag-height);
            color: var(--ghst-color-icon-primary);
        }
    }
</style>

<div class="create-tag {className}" class:create-tag--opened="{opened}">
    <div class="create-tag__input-wrapper">
        <input type="text" class="create-tag__input" bind:value on:keydown="{handleKeydown}" />
    </div>
    {#if opened}
        <div class="create-tag__icon-container create-tag__done-icon" on:click="{emitCreateTag}">
            <OctionIcon icon="check" />
        </div>
    {/if}
    <div class="create-tag__icon-container create-tag__add-icon" on:click="{() => (opened = !opened)}">
        <OctionIcon icon="plus" />
    </div>
</div>
