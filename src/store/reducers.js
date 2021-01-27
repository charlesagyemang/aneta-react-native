import {ADDITION, SUBTRACTION, SET_REQUESTS, ADD_REQUEST} from './actionTypes'


const initialState = {
  counter: 0,
  allRequests: [],
}

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDITION:
      return { ...state, counter: state.counter + 1 }
      break;
    case SUBTRACTION:
      return { ...state, counter: state.counter - 1 }
      break;
    case SET_REQUESTS:
      return {
        ...state,
        allRequests: state.allRequests = action.payload
      }
      break;
    case ADD_REQUEST:
      return {
        ...state,
        allRequests: [action.payload, ...state.allRequests]
      }
      break;
    default:
      return state;
  }
}
