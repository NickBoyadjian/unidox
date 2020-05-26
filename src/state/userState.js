import React from 'react'
import globalHook from 'use-global-hook'
import axios from 'axios'
import {
    EditorState,
    convertToRaw,
  } from 'draft-js';
 
const initialState = {
    username: '',
    notes: [],
    jwt: '',
    authError: '',
    currentNote: {
        id: undefined,
        title: undefined,
        body: undefined
    }
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

    getNote: async (store, id) => {
        await axios.get('http://localhost:3100/notes/note/' + id, {headers: {Authorization: store.state.jwt}})
        .then(res => {
            store.setState({currentNote: {id: res.data.id, title: res.data.title, body: res.data.body}})
        })
    },

    deleteNote: async (store, id) => {
        return await axios.delete('http://localhost:3100/notes/note/' + id, {headers: {Authorization: store.state.jwt}})
        .then(res => store.setState({ currentNote: { id: undefined, title: undefined, body: undefined }}))
    },

    createNote: async (store, title) => {
        return axios.post('http://localhost:3100/notes/createnote', {title: title, body: (convertToRaw(EditorState.createEmpty().getCurrentContent()))}, {headers: {Authorization: store.state.jwt}})
        .then(res => {
            store.setState({ currentNote: {id: res.id, title: res.title, body: res.body}}) // store it in state
        })
        .catch(err => store.setState({authError: err.response.data.msg}))
    },

    updateNote: (store, body) => {
        axios.put(
            "http://localhost:3100/notes/note/" + store.state.currentNote.id, 
            {body: convertToRaw(body.getCurrentContent())}, 
            {headers: {Authorization: store.state.jwt}}
        )
    }
};
 
const useGlobal = globalHook(React, initialState, actions)

export default useGlobal