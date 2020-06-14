<script>
import Button from './Button.svelte';
import RulesPage from './RulesPage.svelte';
import ScoreCard from './ScoreCard.svelte';
import { state, send, event } from './logic';

function startOver() {
  send(event.START_OVER);
}

function selectScore(ev) {
  send(event.SET_SCORE, { category: ev.detail });
}

function rename(ev) {
  const name = window.prompt('Enter your name', $state.context.names[ev.detail]);
  send(event.SET_NAME, { index: ev.detail, name });
}

$: scoreData = {
  names: $state.context.names,
  scores: $state.context.scores,
  currentPlayer: $state.context.currentPlayer,
  possibleScores: $state.context.possibleScores,
};

$: isPlaying = $state.matches('game.playing');
</script>
<style>
@screen md {
  .sidebar {
    margin-left: calc(100vw - 320px - 2rem);
  }
}
</style>
<div class="sidebar w-full">
  <div class="flex p-4 items-center justify-evenly">
    <Button active={$state.matches('sidebar.showScore')} on:click={() => send(event.VIEW_SCORE)}>Score</Button>
    <Button active={$state.matches('sidebar.showRules')} on:click={() => send(event.VIEW_RULES)}>Rules</Button>
  </div>
  <div class:mb-4={isPlaying}>
    {#if $state.matches('sidebar.showScore')}
    <ScoreCard data={scoreData} on:chosen={selectScore} on:rename={rename} />
    {#if isPlaying}<div class="text-center"><Button on:click={startOver}>Start Over</Button></div>{/if}
    {:else}
    <RulesPage />
    {/if}
  </div>
</div>