import React from 'react'
import globalHook from 'use-global-hook'
import axios from 'axios'
 
const initialState = {
    username: '',
    notes: [],
    jwt: '',
    authError: ''
};

 
const actions = {

    login: (store, u, p) => {
        axios.post('http://localhost:3100/auth/signin', { "username": u, "password": p })
        .then(res => {
            store.setState({ jwt: res.data.token, authError: ''}) // store it in state
            localStorage.setItem('token', res.data.token)         // store it in localStorage
        })
        .catch(err => store.setState({authError: err.response.data.msg}))
    },

    logout: (store) => {
        store.setState({jwt: ''})
        localStorage.removeItem('token')
    },

    isLoggedIn: (store) => {
        return localStorage.getItem('token') === null ? false : true
    },

    getToken: (store) => store.setState({jwt: localStorage.getItem('token')}),

    getProfile: (store) => {
        axios.get('http://localhost:3100/auth/profile', {headers: {Authorization: store.state.jwt}})
        .then(res => store.setState({username: res.data.username, notes: res.data.notes}))
    },

    getNote: (store, id) => {
        let note;
        axios.get('http://localhost:3100/notes/note/' + id, {headers: {Authorization: store.state.jwt}})
        .then(res => console.log(res))
    }

};
 
const useGlobal = globalHook(React, initialState, actions)

export default useGlobal