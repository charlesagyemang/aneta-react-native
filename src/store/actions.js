import { ADDITION, SUBTRACTION, ADD_REQUEST, SET_REQUESTS , SET_INDIVIDUAL_STATISTICS} from './actionTypes';

export const addition = () => ({
  type: ADDITION,
})

export const subtraction = () => ({
  type: SUBTRACTION,
})

export const addRequest = request => ({
  type: ADD_REQUEST,
  payload: request,
})

export const setRequests = requests => ({
  type: SET_REQUESTS,
  payload: requests,
})


export const setIndividualStatistics = individualStatistics => ({
  type: SET_INDIVIDUAL_STATISTICS,
  payload: individualStatistics,
})
