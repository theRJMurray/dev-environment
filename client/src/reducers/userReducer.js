import {
    SET_INFO, 
    GET_INFO, 
    GET_USER,
    } from '../actions/types';

const initialState = {
    bio: ''
}

export default function userReducer(state = initialState, action, payload){
    switch(action.type){
        case GET_INFO:
            return {
                ...state,
                wins: action.payload.wins,
                losses: action.payload.losses,
                draws: action.payload.draws
            }
        case SET_INFO:
            switch(action.payload){
                case 'wins':
                    return {
                        ...state,
                        wins: state.wins + 1
                    }
                case 'losses':
                    return {
                        ...state,
                        losses: state.losses + 1
                    }
                case 'draws': 
                    return {
                        ...state,
                        draws: state.draws + 1
                    }
                default:
                    return state
            }
        case GET_USER:
            return{
                ...state,
            }
        default:
            return state;
    }
}