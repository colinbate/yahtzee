<script>
export let white = false;
export let active = false;
</script>
<button type="button" on:click|preventDefault|stopPropagation class="cursor-pointer focus:outline-none border-4 border-white rounded-full px-4 py-2 text-white" class:border-svelte={!white} class:text-svelte={!white} class:border={!active}><slot /></button>
