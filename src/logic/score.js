
export function newScores(init = null) {
  return {
    ones: init,
    twos: init,
    threes: init,
    fours: init,
    fives: init,
    sixes: init,
    subtotal: init,
    bonus: init,
    small: init,
    large: init,
    full: init,
    threeoak: init,
    fouroak: init,
    yahtzee: init,
    chance: init,
    total: init,
  };
}

function hasStraight(dice) {
  let run = [0,0];
  let maxrun = 0;
  for (const die of dice) {
    if (die === run[1] + 1) {
      run[0] += 1;
      run[1] = die;
    } else if (die !== run[1]) {
      run = [1, die];
    }
    if (maxrun < run[0]) {
      maxrun = run[0];
    }
  }
  return maxrun;
}

function hasMultiple(dice) {
  let run = [0,0];
  let maxrun = 0;
  for (const die of dice) {
    if (die === run[1]) {
      run[0] += 1;
    } else {
      run = [1, die];
    }
    if (maxrun < run[0]) {
      maxrun = run[0];
    }
  }
  return maxrun;
}

function isFull(dice) {
  return dice[0] === dice[1] && dice[3] === dice[4] && (dice[2] === dice[1] || dice[2] === dice[3]);
}

function sumValues(dice, val) {
  return dice.reduce((p, c) => p + (c === val ? c : 0), 0);
}

const valueFieldMap = ['_', 'ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];

export function getPossibleScores(current, dice) {
  const possible = newScores(0);
  if (!dice.length) {
    return newScores();
  }
  dice.sort();
  const diceSum = dice.reduce((p, c) => p + c, 0);
  const maybeSet = (field, value) => {
    if (current[field] == null) {
      possible[field] = value;
    }
  }
  maybeSet('chance', diceSum);
  maybeSet('ones', sumValues(dice, 1));
  maybeSet('twos', sumValues(dice, 2));
  maybeSet('threes', sumValues(dice, 3));
  maybeSet('fours', sumValues(dice, 4));
  maybeSet('fives', sumValues(dice, 5));
  maybeSet('sixes', sumValues(dice, 6));
  if (isFull(dice)) {
    maybeSet('full', 25);
  }
  const run = hasMultiple(dice);
  if (run >= 3) {
    maybeSet('threeoak', diceSum);
  }
  if (run >= 4) {
    maybeSet('fouroak', diceSum);
  }
  if (run === 5) {
    // Fun Yahtzee rules.
    if (current.yahtzee == null) {
      possible.yahtzee = 50;
    } else {
      if (current.yahtzee > 0) {
        possible.yahtzeebonus = current.yahtzee + 100;
      }
      if (current[valueFieldMap[dice[0]]] == null) {
        const onlyOption = newScores();
        onlyOption[valueFieldMap[dice[0]]] = diceSum;
        if (current.yahtzee > 0) {
          onlyOption.yahtzeebonus = current.yahtzee + 100;
        }
        return onlyOption;
      } else {
        // Joker rules allow to select these.
        maybeSet('small', 30);
        maybeSet('large', 40);
      }
    }
  }
  const straight = hasStraight(dice);
  if (straight >= 4) {
    maybeSet('small', 30);
  }
  if (straight === 5) {
    maybeSet('large', 40);
  }
  return possible;
}

function isSinglesDone(scores) {
  return (
    scores.ones != null &&
    scores.twos != null &&
    scores.threes != null &&
    scores.fours != null &&
    scores.fives != null &&
    scores.sixes != null
  );
}

export function isGameOver(scores) {
  return (
    isSinglesDone(scores) &&
    scores.threeoak != null &&
    scores.fouroak != null &&
    scores.full != null &&
    scores.small != null &&
    scores.large != null &&
    scores.chance != null &&
    scores.yahtzee != null
  );
}

export function totalScore(scores) {
  if (isSinglesDone(scores) && scores.subtotal == null) {
    let bonus = 0;
    const subtotal = scores.ones + scores.twos + scores.threes + scores.fours + scores.fives + scores.sixes;
    if (subtotal > 63) {
      bonus = 35;
    }
    scores = { ...scores, subtotal, bonus };
  }

  if (isGameOver(scores)) {
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
  }
  return scores;
}