import axios from 'axios';
import {returnErrors} from './errorActions';
// import store from '../store';
import{
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS
} from './types';

//Set config/headers and token
export const tokenConfig = getState => {
    //Get token from local storage
    const token = getState().auth.token;
    //Headers
    const config = {
        headers:{
            "Content-type": "application/json"
        }
    }

    //If token exists add to headers
    if(token){
        config.headers['x-auth-token'] = token;
    }
    return config;
}

//Check token and load user
export const loadUser = () => (dispatch, getState) => {
    //User loading
    dispatch({type: USER_LOADING});
    //Fetch the user
    axios.get('http://localhost:5000/api/auth', tokenConfig(getState))
        .then(res => 
            dispatch({
            type: USER_LOADED,
            payload: res.data
            
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

//Register User
export const register = (username, email, password, confirmPassword) => dispatch => {
    //Headers
    console.log('registering')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request body
    const body = {username, email, password, confirmPassword};

    console.log(body)

    axios.post('http://localhost:5000/api/register', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });

};

//Login User
export const login = (username, password) => dispatch => {
    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request body
    const body = {username, password};

    axios.post('http://localhost:5000/api/login', body, config)
        //dispatch to the authReducer
        .then(res => 
            dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }),
        
        dispatch({type: CLEAR_ERRORS})

        ).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });

};

//Logout User
export const logout = () => {
    return{
        type: LOGOUT_SUCCESS
    }
}