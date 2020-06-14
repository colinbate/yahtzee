<script>
import { createEventDispatcher } from 'svelte';
import ScoreRow from './ScoreRow.svelte';
export let data;

const dispatch = createEventDispatcher();

const setScore = category => () => dispatch('chosen', category);

</script>
<div class="border-svelte border w-full max-w-xs mx-auto md:ml-4 rounded mb-4">
  <h2 class="text-svelte font-light uppercase text-3xl text-center px-4">Scorecard</h2>
  <table class="w-full ">
    <thead>
      <tr>
        <th class="border-t border-svelte text-left px-2">Category</th>
        {#each data.names as name}
        <th class="border-t border-l border-svelte">{name}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      <ScoreRow data={data} label="Ones" field="ones" on:click={setScore('ones')} />
      <ScoreRow data={data} label="Twos" field="twos" on:click={setScore('twos')} />
      <ScoreRow data={data} label="Threes" field="threes" on:click={setScore('threes')} />
      <ScoreRow data={data} label="Fours" field="fours" on:click={setScore('fours')} />
      <ScoreRow data={data} label="Fives" field="fives" on:click={setScore('fives')} />
      <ScoreRow data={data} label="Sixes" field="sixes" on:click={setScore('sixes')} />
      <ScoreRow data={data} label="Sum" field="subtotal" extraTop={true} fixed={true} />
      <ScoreRow data={data} label="Bonus" field="bonus" fixed={true} />
      <ScoreRow data={data} label="Three of a kind" field="threeoak" on:click={setScore('threeoak')} extraTop={true} />
      <ScoreRow data={data} label="Four of a kind" field="fouroak" on:click={setScore('fouroak')} />
      <ScoreRow data={data} label="Full House" field="full" on:click={setScore('full')} />
      <ScoreRow data={data} label="Small straight" field="small" on:click={setScore('small')} />
      <ScoreRow data={data} label="Large straight" field="large" on:click={setScore('large')} />
      <ScoreRow data={data} label="Chance" field="chance" on:click={setScore('chance')} />
      <ScoreRow data={data} label="YAHTZEE" field="yahtzee" on:click={setScore('yahtzee')} />
      <ScoreRow data={data} label="TOTAL" field="total" extraTop={true} bottom={true} fixed={true} />
    </tbody>
  </table>
</div>
