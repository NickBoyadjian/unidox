import React from 'react'
import globalHook from 'use-global-hook'
import axios from 'axios'
import {
    EditorState,
    convertToRaw,
} from 'draft-js';

const url = 'https://noteshareapi.herokuapp.com';

const initialState = {
    username: '',
    notes: [],
    jwt: '',
    authError: '',
    signupError: '',
    currentNote: {
        id: undefined,
        title: undefined,
        body: undefined
    }
};


const actions = {

    login: (store, u, p) => {
        axios.post(`${url}/auth/signin`, { "username": u, "password": p })
            .then(res => {
                store.setState({ jwt: res.data.token, authError: '' }) // store it in state
                localStorage.setItem('token', res.data.token)         // store it in localStorage
            })
            .catch(err => store.setState({ authError: err.response.data.msg }))
    },

    signup: (store, u, p, cp) => {
        if (p !== cp) {
            store.setState({ signupError: "passwords must match" })
            return;
        }

        axios.post(`${url}/auth/signup`, { "username": u, "password": p })
            .then(res => {
                store.setState({ jwt: res.data.token, signupError: '' }) // store it in state
                localStorage.setItem('token', res.data.token)            // store it in localStorage
            })
            .catch(err => {
                store.setState({ signupError: err.response.data.msg })
            })
    },

    logout: (store) => {
        store.setState(initialState)
        localStorage.removeItem('token')
    },

    isLoggedIn: (store) => {
        return localStorage.getItem('token') === null ? false : true
    },

    getToken: (store) => store.setState({ jwt: localStorage.getItem('token') }),

    getProfile: (store) => {
        store.setState({ jwt: localStorage.getItem('token') })
        axios.get(`${url}/auth/profile`, { headers: { Authorization: store.state.jwt } })
            .then(res => {
                console.log(res.data)
                store.setState({ username: res.data.username, notes: res.data.notes.reverse() })
            })
    },

    getNote: async (store, id) => {
        await axios.get(`${url}/notes/note/${id}`, { headers: { Authorization: store.state.jwt } })
            .then(res => {
                console.log(res.data)
                store.setState({ currentNote: { id: res.data.id, title: res.data.title, body: res.data.body } })
            })
    },

    setNoNote: async (store) => {
        store.setState({
            currentNote: {
                id: undefined,
                title: undefined,
                body: undefined
            }
        })
    },

    deleteNote: async (store, id) => {
        return await axios.delete(`${url}/notes/note/${id}`, { headers: { Authorization: store.state.jwt } })
            .then(res => store.setState({ currentNote: { id: undefined, title: undefined, body: undefined } }))
    },

    createNote: async (store, title) => {
        return axios.post(`${url}/notes/createnote`, { title: title, body: (convertToRaw(EditorState.createEmpty().getCurrentContent())) }, { headers: { Authorization: store.state.jwt } })
            .then(res => {
                store.setState({ currentNote: { id: res.id, title: res.title, body: res.body } }) // store it in state
            })
            .catch(err => store.setState({ authError: err.response.data.msg }))
    },

    updateNote: (store, body) => {
        axios.put(
            `${url}/notes/note/${store.state.currentNote.id}`,
            { body: convertToRaw(body.getCurrentContent()) },
            { headers: { Authorization: store.state.jwt } }
        )
    }
};

const useGlobal = globalHook(React, initialState, actions)

export default useGlobal