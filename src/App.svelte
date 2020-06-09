<script>
  import Tailwindcss from "./Tailwindcss.svelte";
  import { Table, D6 } from 'svelte-dice';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import ScoreCard from './ScoreCard.svelte';
  import Button from './Button.svelte';

  let total = 0;
  $: name = total === 0 ? 'Dice' : total;

  let table;
  let scorecard;
  let isGameOver = false;
  let tray = [];
  let diceRemaining = 5;
  let tableDice = [];
  let allDice = [];
  let rollsRemaining = 3;
  let finalScore = 0;
  let firstLoad = true;
  let startOver = false;
  $: canRoll = rollsRemaining > 0;

  function roll() {
    firstLoad = false;
    if (canRoll) {
      table.roll();
    }
  }

  function getDiceVals() {
    return tray.map(x => x.value).concat(tableDice.map(x => x.value));
  }

  function rolled({detail}) {
    const {sum, values} = detail;
    total = sum;
    tableDice = values;
    allDice = getDiceVals();
    rollsRemaining -= 1;
  }

  function dclick({detail: {node, value}}) {
    node.style.opacity = 0;
    node.style.visibility = 'hidden';
    tableDice.splice(tableDice.findIndex(x => x === value), 1);
    tray = [...tray, value].sort((a, b) => a.value - b.value);
    allDice = getDiceVals();
    diceRemaining -= 1;
  }

  function trayClick(ev, which, die) {
    ev.preventDefault();
    ev.stopPropagation();
    const tableDie = table.getById(die.id);
    if (!tableDie) {
      table.add(die);
    } else {
      tableDie.node.style.visibility = 'visible';
      tableDie.node.style.opacity = 1;
    }
    tray = tray.filter(x => x.id !== die.id);
    tableDice = [...tableDice, die];
    diceRemaining += 1;
  }

  function roundOver() {
    table.clear();
    rollsRemaining = 3;
    tray = [];
    tableDice = [];
    allDice = [];
    diceRemaining = 5;
    startOver = true;
  }

  function gameOver({detail}) {
    // Do something fancy
    isGameOver = true;
    rollsRemaining = 0;
    finalScore = detail;
  }

  function playAgain(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    isGameOver = false;
    roundOver();
    startOver = false;
    scorecard.newGame();
  }
</script>
<style>
:global(body) {
  background-color: #e8cd97;
  background-image: url(https://dice.cbate.com/wood.jpg);
}

.tablesize {
  --dice-size: calc((100vmin - 2rem) / 7.1);
  --dice-size: min((100vw - 2rem) / 7.1, (100vh - 4rem) / 4.25);
  --die-margin: calc(var(--dice-size) * 0.42);
}

.traysize {
  --die-size: calc((100vmin - 2rem) / 7.1);
  --die-size: min((100vw - 2rem) / 7.1, (100vh - 4rem) / 4.25);
  --die-margin: 1rem;
  height: calc(var(--die-size) + 2rem);
}

@screen md {
  .tablesize {
    --dice-size: calc((100vmin - 21rem) / 7.1);
    --dice-size: min((100vw - 21rem) / 7.1, (100vh - 7rem) / 4.25);
    --die-margin: calc(var(--dice-size) * 0.20711);
    --die-margin: min((100vw - 21rem - (3 * var(--dice-size))) / 6, max(var(--dice-size) * 0.20711, (100vh - 4.1rem - (3 * var(--dice-size))) / 4));
  }

  .traysize {
    --die-size: calc((100vmin - 21rem) / 7.1);
    --die-size: min((100vw - 21rem) / 7.1, (100vh - 7rem) / 4.25);
    --die-margin: 1rem;
    height: calc(var(--die-size) + 2rem);
  }
}
</style>
<Tailwindcss />
<svelte:body on:click={roll} />
<main class="p-4 mx-auto text-center h-full">
  <h1 class="uppercase leading-none absolute text-6xl font-hairline text-svelte left-0 w-full md:left-auto md:w-auto">Yahtzee!</h1>
  <div class="flex md:h-full flex-col md:flex-row">
    <div class="flex-grow flex flex-col relative">
      <div class="flex-grow w-full tablesize relative">
        {#if firstLoad}
        <div out:fade class="absolute box-border p-6 flex h-full w-full text-darken-500 align-center justify-center flex-col top-0 left-0">
          <div class="text-xl md:text-3xl mx-auto" style="max-width: 20em">Tap on the page to roll dice. Tap on a die to set aside. You have three rolls for each score. Clicking a possible score will record it.</div>
        </div>
        {/if}
        <Table bind:this={table} autoDiceSize={false} transparent={true} tapToRoll={false} numberOfDice={diceRemaining} fixedSizeFor={5} captureDiceClick={true} on:rolled={rolled} on:diceclick={dclick} />
      </div>
      <div class="border-t p-1 border-svelte flex justify-evenly traysize">
        {#each tray as die, i (die.id)}
          <div in:fade style="transform: scale(1.001);"><D6 value={die} noToss={true} on:click={ev => trayClick(ev, i, die)} /></div>
        {/each}
      </div>
    </div>
    <div class:mb-4={startOver}>
      <ScoreCard bind:this={scorecard} currentDice={allDice} on:chosen={roundOver} on:gameover={gameOver} />
      {#if startOver}<Button on:click={playAgain}>Start Over</Button>{/if}
    </div>
  </div>
</main>
{#if isGameOver}
<div class="fixed flex h-full w-full bg-darken-600 items-center justify-center flex-col top-0 left-0">
  <div class="text-2xl text-white">SCORE</div>
  <div class="text-6xl mb-6 text-white">{finalScore}</div>
  <Button on:click={playAgain}>Play Again</Button>
</div>
{/if}
