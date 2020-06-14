import { yahtzeeMachine } from './yahtzeeMachine';
import { useMachine } from './useMachine';
import { options } from './actions';

const { state, send } = useMachine(yahtzeeMachine.withConfig(options));

const event = {
  ROLL: 'ROLL',
  ROLLED: 'ROLLED',
  START_OVER: 'START_OVER',
  SET_SCORE: 'SET_SCORE',
  SET_ASIDE: 'SET_ASIDE',
  PUT_BACK: 'PUT_BACK',
  VIEW_SCORE: 'VIEW_SCORE',
  VIEW_RULES: 'VIEW_RULES',
};

export { state, send, event };
