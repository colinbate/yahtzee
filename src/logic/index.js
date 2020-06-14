import { yahtzeeMachine } from './yahtzeeMachine';
import { useMachine } from './useMachine';
import { options } from './actions';

const names = JSON.parse((window && window.localStorage.getItem('YAHTZEE_NAMES')) || 'null');
const { state, send } = useMachine(yahtzeeMachine.withConfig(options).withContext({
  ...yahtzeeMachine.context,
  names: names || yahtzeeMachine.context.names
}));

const event = {
  ROLL: 'ROLL',
  ROLLED: 'ROLLED',
  START_OVER: 'START_OVER',
  SET_SCORE: 'SET_SCORE',
  SET_NAME: 'SET_NAME',
  SET_ASIDE: 'SET_ASIDE',
  PUT_BACK: 'PUT_BACK',
  VIEW_SCORE: 'VIEW_SCORE',
  VIEW_RULES: 'VIEW_RULES',
};

export { state, send, event };
