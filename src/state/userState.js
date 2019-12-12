import React from 'react'
import globalHook from 'use-global-hook'
import axios from 'axios'
 
const initialState = {
    username: '',
    notes: [],
    jwt: ''
};
 
const actions = {

    login: (store, u, p) => {
        axios.post('http://localhost:3100/auth/signin', { "username": u, "password": p })
        .then(res => store.setState({ jwt: res.data.token }))
        .catch(err => console.error(err))
    },

    getProfile: (store) => {
        axios.get('http://localhost:3100/auth/profile', {headers: {Authorization: store.state.jwt}})
        .then(res => store.setState({username: res.data.username, notes: res.data.notes}))
    },

};
 
const useGlobal = globalHook(React, initialState, actions)

export default useGlobal