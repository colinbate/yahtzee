<script>
import { createEventDispatcher } from 'svelte';
import ScoreRow from './ScoreRow.svelte';
import { newScores, getPossibleScores } from './score';
export let currentDice = [];

const dispatch = createEventDispatcher();

let scores = newScores();
$: possibleScores = getPossibleScores(scores, currentDice);

export function newGame() {
  scores = newScores();
}

function isSinglesDone() {
  return (
    scores.ones != null &&
    scores.twos != null &&
    scores.threes != null &&
    scores.fours != null &&
    scores.fives != null &&
    scores.sixes != null
  );
}

function isGameOver() {
  return (
    isSinglesDone() &&
    scores.threeoak != null &&
    scores.fouroak != null &&
    scores.full != null &&
    scores.small != null &&
    scores.large != null &&
    scores.chance != null &&
    scores.yahtzee != null
  );
}

function setScore(field) {
  return function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (scores[field] == null) {
      scores = { ...scores, [field]: possibleScores[field] };
      dispatch('chosen', possibleScores[field]);
    }

    if (isSinglesDone() && scores.subtotal == null) {
      let bonus = 0;
      const subtotal = scores.ones + scores.twos + scores.threes + scores.fours + scores.fives + scores.sixes;
      if (subtotal > 63) {
        bonus = 35;
      }
      scores = { ...scores, subtotal, bonus };
    }

    if (isGameOver()) {
      let total = scores.subtotal;
      total += scores.bonus;
      total += scores.threeoak;
      total += scores.fouroak;
      total += scores.full;
      total += scores.small;
      total += scores.large;
      total += scores.yahtzee;
      total += scores.chance;
      scores = { ...scores, total };
      dispatch('gameover', total);
    }
  }
}
</script>
<div class="border-svelte border w-full max-w-xs sm:w-56 mx-auto md:ml-4 rounded mb-4">
  <h2 class="text-svelte font-hairline uppercase text-3xl text-center px-4">Scorecard</h2>
  <table class="w-full ">
    <thead>
      <tr><th class="border-t border-r border-svelte text-left px-2">Category</th><th class="border-t border-svelte">Score</th></tr>
    </thead>
    <tbody>
      <ScoreRow label="Ones" value={scores.ones} possible={possibleScores.ones} on:click={setScore('ones')} />
      <ScoreRow label="Twos" value={scores.twos} possible={possibleScores.twos} on:click={setScore('twos')} />
      <ScoreRow label="Threes" value={scores.threes} possible={possibleScores.threes} on:click={setScore('threes')} />
      <ScoreRow label="Fours" value={scores.fours} possible={possibleScores.fours} on:click={setScore('fours')} />
      <ScoreRow label="Fives" value={scores.fives} possible={possibleScores.fives} on:click={setScore('fives')} />
      <ScoreRow label="Sixes" value={scores.sixes} possible={possibleScores.sixes} on:click={setScore('sixes')} />
      <ScoreRow label="Sum" value={scores.subtotal} possible={possibleScores.subtotal} extraTop={true} fixed={true} />
      <ScoreRow label="Bonus" value={scores.bonus} possible={possibleScores.bonus} fixed={true} />
      <ScoreRow label="Three of a kind" value={scores.threeoak} possible={possibleScores.threeoak} on:click={setScore('threeoak')} extraTop={true} />
      <ScoreRow label="Four of a kind" value={scores.fouroak} possible={possibleScores.fouroak} on:click={setScore('fouroak')} />
      <ScoreRow label="Full House" value={scores.full} possible={possibleScores.full} on:click={setScore('full')} />
      <ScoreRow label="Small straight" value={scores.small} possible={possibleScores.small} on:click={setScore('small')} />
      <ScoreRow label="Large straight" value={scores.large} possible={possibleScores.large} on:click={setScore('large')} />
      <ScoreRow label="Chance" value={scores.chance} possible={possibleScores.chance} on:click={setScore('chance')} />
      <ScoreRow label="YAHTZEE" value={scores.yahtzee} possible={possibleScores.yahtzee} on:click={setScore('yahtzee')} />
      <ScoreRow label="TOTAL" value={scores.total} possible={possibleScores.total} extraTop={true} bottom={true} fixed={true} />
    </tbody>
  </table>
</div>