import * as types from '../types'

const initialTimerState = {
    lastUpdate: 0,
    light: false,
  }

export const timerReducer = (state = initialTimerState, { type, payload }) => {
    switch (type) {
      case types.TICK:
        return {
          lastUpdate: payload.ts,
          light: !!payload.light,
        }
      default:
        return state
    }
  }