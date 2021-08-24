<script>
export let white = false;
export let active = false;

$: border = active ? 'border-4' : 'border';
$: colors = white ? 'text-white border-white' : 'text-svelte-dark border-svelte-dark dark:text-svelte-light dark:border-svelte-light';
</script>
<button type="button" on:click|preventDefault|stopPropagation class="cursor-pointer focus:outline-none rounded-full px-4 py-2 {colors} {border}"><slot /></button>
