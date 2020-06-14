import { assign } from 'xstate';
import { getPossibleScores, isGameOver, totalScore } from './score';

const rename = assign({
  names: (ctx, ev) => {
    const n = [...ctx.names];
    n[ev.index] = ev.name;
    return n;
  }
});

const saveNames = ctx => {
  window && window.localStorage.setItem('YAHTZEE_NAMES', JSON.stringify(ctx.names));
};

const setRolledDice = assign({
  tableDice: (_, ev) => ev.dice,
});

const moveToTray = assign({
  tableDice: (ctx, ev) => ctx.tableDice.filter(d => d.id !== ev.die.id),
  trayDice: (ctx, ev) => [...ctx.trayDice, ev.die].sort((a, b) => a.value - b.value),
  dice: ctx => ctx.dice - 1,
});

const moveToTable = assign({
  trayDice: (ctx, ev) => ctx.trayDice.filter(d => d.id !== ev.die.id),
  tableDice: (ctx, ev) => [...ctx.tableDice, ev.die],
  dice: ctx => ctx.dice + 1,
});

const decRolls = assign({
  rolls: ctx => ctx.rolls - 1
});

const canRoll = (ctx) => !!ctx.rolls && !!ctx.dice;

const nextPlayer = assign({
  currentPlayer: ctx => (ctx.currentPlayer + 1) % ctx.scores.length,
  possibleScores: {},
  tableDice: [],
  trayDice: [],
  rolls: 3,
  dice: 5,
});

const addBonus = assign({
  scores: ctx => {
    const s = [...ctx.scores];
    s[ctx.currentPlayer] = {
      ...s[ctx.currentPlayer],
      yahtzee: ctx.possibleScores.yahtzeebonus ? ctx.possibleScores.yahtzeebonus : s[ctx.currentPlayer].yahtzee
    };
    return s;
  }
});

const setScore = assign({
  scores: (ctx, ev) => {
    const s = [...ctx.scores];
    s[ctx.currentPlayer] = {
      ...s[ctx.currentPlayer],
      [ev.category]: ctx.possibleScores[ev.category],
    };
    return s;
  }
});

function getDiceVals(tray, table) {
  return tray.map(x => x.value).concat(table.map(x => x.value));
}

const getPossible = assign({
  possibleScores: ctx => getPossibleScores(ctx.scores[ctx.currentPlayer], getDiceVals(ctx.trayDice, ctx.tableDice))
});

const tallyScore = assign({
  scores: ctx => ctx.scores.map(totalScore),
});

const resetGame = assign({
  currentPlayer: 0,
  possibleScores: {},
  tableDice: [],
  trayDice: [],
  rolls: 3,
  dice: 5,
  winner: null,
  scores: ctx => ctx.scores.map(() => ({}))
});

const determineWinner = assign({
  trayDice: [],
  winner: ctx => ctx.scores.reduce((p, c, i) => (p.length === 0 || c.total > ctx.scores[p[0]].total) ? [i] : (c.total === ctx.scores[p[0]].total ? [...p, i] : p), [])
});

const isGameOverGuard = (ctx) => ctx.scores.every(isGameOver);

export const options = {
  actions: {
    rename,
    saveNames,
    setRolledDice,
    moveToTable,
    moveToTray,
    decRolls,
    nextPlayer,
    setScore,
    addBonus,
    getPossible,
    tallyScore,
    resetGame,
    determineWinner,
  },
  guards: {
    canRoll,
    isGameOver: isGameOverGuard,
  }
};
