<script>
  import { Table, D6 } from 'svelte-dice';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { state, send, event } from './logic';
  import Button from './Button.svelte';

  let table;

  $: {
    if (table) {
      if ($state.matches('game.playing.rolling')) {
        table.roll();
      } else if ($state.matches('game.playing.newturn') || $state.matches('game.new') || $state.matches('game.playing.finished')) {
        table.clear();
      }
    }
  }

  function roll() {
    send(event.ROLL);
  }

  function rolled({detail}) {
    const {values} = detail;
    send(event.ROLLED, { dice: values });
  }

  function dclick({detail: {node, value}}) {
    node.style.opacity = 0;
    node.style.visibility = 'hidden';
    send(event.SET_ASIDE, { die: value });
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
    send(event.PUT_BACK, { die });
  } 

  function playAgain(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    send(event.START_OVER);
  }

  function handleKey(ev) {
    if (ev.code === 'Space') {
      roll();
    }
  }
</script>
<style>
.fulltable {
  background-color: #e8cd97;
  background-image: url(https://dice.cbate.com/wood.jpg);
}
@screen md {
  .fulltable {
    width: calc(100vw - 320px - 2rem);
  }
}

:global(.dark) .fulltable {
  background-color: #3d3d3d;
  background-image: url(../black-orchid.png);
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
    --dice-size: calc((100vmin - 25rem) / 7.1);
    --dice-size: min((100vw - 25rem) / 7.1, (100vh - 7rem) / 4.25);
    --die-margin: calc(var(--dice-size) * 0.20711);
    --die-margin: min((100vw - 25rem - (3 * var(--dice-size))) / 6, max(var(--dice-size) * 0.20711, (100vh - 4.1rem - (3 * var(--dice-size))) / 4));
    height: calc(100% - var(--dice-size) - 2rem - 1px);
  }

  .traysize {
    --die-size: calc((100vmin - 25rem) / 7.1);
    --die-size: min((100vw - 25rem) / 7.1, (100vh - 7rem) / 4.25);
    --die-margin: 1rem;
    height: calc(var(--die-size) + 2rem);
  }
}

:global(.dark) .tablesize {
  --dot-color: #fff;
  --dice-color: #555;
}
:global(.dark) .traysize {
  --dot-color: #fff;
  --dice-color: #555;
}
</style>
<svelte:window on:keydown={handleKey} />
<div class="text-center md:h-full fulltable flex-grow md:fixed box-border p-4" on:click={roll}>
  <h1 class="uppercase leading-none absolute text-6xl font-thin text-svelte left-0 w-full md:left-auto md:w-auto">Yahtzee!</h1>
  <div class="flex md:h-full flex-col md:flex-row">
    <div class="flex-grow flex flex-col relative">
      <div class="flex-grow w-full tablesize relative">
        {#if $state.matches('game.welcome')}
        <div out:fade class="absolute box-border p-6 flex h-full w-full text-darken-500 align-center justify-center flex-col top-0 left-0">
          <div class="text-xl md:text-3xl mx-auto" style="max-width: 20em">Tap on the page <span class="notmobile">or the spacebar</span> to roll dice. Tap on a die to set aside. You have three rolls for each score. Clicking a possible score will record it.</div>
        </div>
        {/if}
        <Table bind:this={table} autoDiceSize={false} transparent={true} tapToRoll={false} numberOfDice={$state.context.dice} fixedSizeFor={5} captureDiceClick={true} on:rolled={rolled} on:diceclick={dclick} />
        <div class="bottom-0 right-0 p-4 absolute text-svelte font-light uppercase text-2xl">{$state.context.names[$state.context.currentPlayer]}</div>
      </div>
      <div class="border-t p-1 border-svelte flex justify-evenly traysize">
        {#each $state.context.trayDice as die, i (die.id)}
          <div in:fade style="transform: scale(1.001);"><D6 value={die} noToss={true} on:click={ev => trayClick(ev, i, die)} /></div>
        {/each}
      </div>
    </div>
    
  </div>
  {#if $state.matches('game.playing.finished')}
  <div class="fixed flex h-full w-full bg-darken-600 items-center justify-center flex-col top-0 left-0">
    {#if $state.context.winner.length > 1}
    <div class="text-2xl text-white">TIE</div>
    {:else}
    <div class="text-2xl text-white">WINNER</div>
    {/if}
    <div class="text-4xl md:text-6xl mb-6 text-white">{$state.context.winner.map(w => $state.context.names[w]).join(', ')}</div>
    <Button on:click={playAgain} white={true}>Play Again</Button>
  </div>
  {/if}
</div>