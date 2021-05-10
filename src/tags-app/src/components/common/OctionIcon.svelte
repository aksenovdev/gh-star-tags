<script lang="ts" context="module">
    /**
     * https://primer.style/css/support/color-system#icons
     */
    export type OctionIconColor = 'primary' | 'secondary' | 'tertiary'
        | 'info' | 'danger' | 'success' | 'warning';
</script>

<script lang="ts">
    import { beforeUpdate } from 'svelte';
    import octions from '@primer/octicons';

    export let icon: string;
    export let color: OctionIconColor = null;
    export let ariaLabel: string = '';
    export let width: number = 16;
    export let height: number = 16;
    export { className as class }; let className : string = '';
    let prevClassName = '';

    beforeUpdate(() => (prevClassName = className));

    let iconSvg: SVGElement;
    $: {
        const template: HTMLTemplateElement = document.createElement('template');
        template.innerHTML = octions[icon].toSVG({ width, height }).trim();
        iconSvg = template.content.firstChild as any;
    }
    $: iconSvg.setAttribute(
        'class',
        `${iconSvg.getAttribute('class').replace(prevClassName, '')} ${className || ''}`
    );
    $: ariaLabel
        ? iconSvg.setAttribute('aria-label', ariaLabel)
        : iconSvg.removeAttribute('aria-label');
    $: iconSvg.style.color = color
        ? `var(--ghst-color-icon-${color})`
        : null;
</script>

{@html iconSvg.outerHTML}
