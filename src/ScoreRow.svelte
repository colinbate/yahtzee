<script>
export let label;
export let field;
export let data;
export let extraTop = false;
export let bottom = false;
export let fixed = false;

$: displayScores = data.scores.map((s, ind) => s[field] == null ? (ind !== data.currentPlayer || fixed ? '' : (data.possibleScores[field] != null ? data.possibleScores[field] : '')) : s[field])
//$: display = value == null ? (possible == null || fixed ? '' : possible) : value;
$: noButton = fixed || displayScores[data.currentPlayer] === '' || data.scores[data.currentPlayer][field] != null;

</script>
<tr class:border-t-4={extraTop} class="border-svelte">
  <td class="border-t border-svelte text-left px-2" class:border-b={!bottom}>{label}</td>
  {#each displayScores as score, i}
  <td class="border-t border-l border-svelte text-center p-0" class:hover:bg-darken-300={!noButton} class:px-2={noButton} class:border-b={!bottom} class:text-svelte={i === data.currentPlayer && !noButton}>
  {#if i !== data.currentPlayer || noButton}
    {score}
  {:else}
    <button on:click class="cursor-pointer w-full h-full px-2 focus:outline-none" type="button">{score}</button>
  {/if}
  </td>
  {/each}
</tr>