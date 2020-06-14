import { Machine } from 'xstate';

export const yahtzeeMachine = Machine({
  id: 'yahtzee',
  context: {
    tableDice: [],
    trayDice: [],
    possibleScores: {},
    names: ['Player 1', 'Player 2'],
    scores: [{}, {}],
    currentPlayer: 0,
    rolls: 3,
    dice: 5,
    winner: null,
  },
  type: 'parallel',
  on: {
    SET_NAME: {
      actions: ['rename', 'saveNames']
    }
  },
  states: {
    game: {
      initial: 'welcome',
      states: {
        'welcome': {
          on: {
            ROLL: 'playing.rolling',
          }
        },
        'new': {
          entry: ['resetGame'],
          on: {
            ROLL: 'playing.rolling',
          }
        },
        playing: {
          initial: 'newturn',
          states: {
            newturn: {
              entry: ['tallyScore'],
              on: {
                ROLL: 'rolling',
              }
            },
            rolling: {
              on: {
                ROLLED: {
                  target: 'deciding',
                  actions: ['setRolledDice', 'decRolls', 'getPossible', 'addBonus']
                },
              }
            },
            deciding: {
              on: {
                ROLL: {
                  target: 'rolling',
                  cond: 'canRoll'
                },
                SET_SCORE: {
                  target: 'checkScore',
                  actions: ['setScore'],
                },
                SET_ASIDE: {
                  actions: ['moveToTray']
                },
                PUT_BACK: {
                  actions: ['moveToTable']
                },
              }
            },
            checkScore: {
              on: {
                '': [
                  {
                    target: 'finished',
                    cond: 'isGameOver',
                  },
                  {
                    target: 'newturn',
                    actions: ['nextPlayer']
                  }
                ]
              }
            },
            finished: {
              type: 'final',
              entry: ['tallyScore', 'determineWinner'],
            }
          },
          on: {
            START_OVER: 'new'
          }
        }
      }
    },
    sidebar: {
      initial: 'showScore',
      states: {
        showScore: {
          on: {
            VIEW_RULES: 'showRules',
          }
        },
        showRules: {
          on: {
            VIEW_SCORE: 'showScore',
          }
        }
      }
    }
  }
});
