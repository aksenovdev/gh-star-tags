<script lang="ts">
    import type { Readable } from 'svelte/store';
    import type { StorageProviderOptions } from '../../../tags-api/providers/storage.provider';
    import { STORAGE_PROVIDER_KEY } from '../../../tags-api/providers/storage.provider';
    import { activeProvider$, setActiveProvider } from '../current-provider.store';
    import { setProviderOptions, getOptionsForProvider } from '../providers-options.store';
    import Card from '../Card.svelte';
    import Button from '../Button.svelte';
    import { onMount } from 'svelte';

    const options$: Readable<StorageProviderOptions> = getOptionsForProvider(STORAGE_PROVIDER_KEY);
    let prefix: string;
    onMount(() =>
        options$.subscribe((options: StorageProviderOptions = {}) => {
            prefix = options.storageKeyPrefix;
        })
    );

    $: active = $activeProvider$ === STORAGE_PROVIDER_KEY;
    $: storageProviderOptions = {
        storageKeyPrefix: prefix
    };
</script>

<style lang="scss">

</style>

<Card>
    Storage provider
    <br/>
    prefix: <input type="text" bind:value={prefix} />
    <div slot="actions-end">
        <button on:click="{() => setProviderOptions(STORAGE_PROVIDER_KEY, storageProviderOptions)}">Save</button>
        <Button
            {active}
            on:click="{() => setActiveProvider(STORAGE_PROVIDER_KEY)}"
        ></Button>
    </div>
</Card>
