import {
    SET_INFO, 
    GET_INFO, 
    GET_USER,
    } from './types';
import axios from 'axios'
import store from '../store';

export const getUser = () => (dispatch) => {
    axios.get('/api/users/user/' + store.getState().auth.id)
    
        .then(res => dispatch({
            type: GET_USER,
            payload: res.data.user
        }))
        .catch(err => console.error(err))
        
}

//GET USER INFO
export const getUserInfo = (id) => (dispatch) => {
    axios.get('/api/users/userdata/' + id)
        .then(res => dispatch({
            type: GET_INFO,
            payload: res.data
        }))
        .catch(err => console.error(err))
}

//SET USER INFO
export const setUserInfo = (id, data) => dispatch => {
    axios.post('/api/users/setuserdata/' + id, {data: data})
        .then(() => dispatch({
            type: SET_INFO,
            payload: data
        }))
        .catch(err => console.error(err))
}