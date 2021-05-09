<script lang="ts">
    export let active: boolean = false;
</script>

<style lang="scss">
    .button {
        --defaultAnimation: 0.2s ease-out;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border-radius: 4px;
        box-shadow:
            inset 1px 1px 0px 0px rgb(0 0 0 / 35%),
            inset -1px -1px 3px 0px rgb(0 0 0 / 25%);
        cursor: pointer;
        transition: box-shadow var(--defaultAnimation);

        &.active {
            box-shadow: inset 2.5px 2.5px 0px 0px rgb(0 0 0 / 35%);

            .button__indicator {
                transform: translate(1px, 1px);
                background-color: green;
            }
        }

        &__indicator {
            transition: transform var(--defaultAnimation), background-color var(--defaultAnimation);
            background-color: black;
            width: 40%;
            height: 40%;
            border-radius: 100%;
        }
    }
</style>

<div class="button" class:active on:click>
    <div class="button__indicator"></div>
</div>
