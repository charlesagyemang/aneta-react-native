import {ADDITION, SUBTRACTION, SET_REQUESTS, ADD_REQUEST, SET_INDIVIDUAL_STATISTICS} from './actionTypes'


const initialState = {
  counter: 0,
  allRequests: [],
  individualStat: { todaysRequest: [], thisWeeksRequest: [], thisMonthsRequest: [], requests: [{id: "none"}]},
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
        allRequests: [action.payload, ...state.allRequests],
        individualStat: {
          todaysRequest: [action.payload, ...state.individualStat.todaysRequest],
          thisWeeksRequest: [action.payload, ...state.individualStat.thisWeeksRequest],
          thisMonthsRequest: [action.payload, ...state.individualStat.thisMonthsRequest],
          requests: [action.payload, ...state.individualStat.requests],
        }
      }
      break;
    case SET_INDIVIDUAL_STATISTICS:
      return {
        ...state,
        individualStat: state.individualStat = action.payload
      }
      break;
  default:
      return state;
  }
}
