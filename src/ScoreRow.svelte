<script>
export let label;
export let value;
export let possible;
export let extraTop = false;
export let bottom = false;
export let fixed = false;

$: display = value == null ? (possible == null || fixed ? '' : possible) : value;
$: noButton = fixed || display === '' || value != null;

</script>
<tr class:border-t-4={extraTop} class="border-svelte">
  <td class="border-t border-r border-svelte text-left px-2" class:border-b={!bottom}>{label}</td>
  <td class="border-t border-svelte p-0" class:hover:bg-darken-300={!noButton} class:px-2={noButton} class:border-b={!bottom} class:text-svelte={value == null && !fixed}>
  {#if noButton}
    {display}
  {:else}
    <button on:click class="cursor-pointer w-full h-full px-2 focus:outline-none" type="button">{display}</button>
  {/if}
  </td>
</tr>