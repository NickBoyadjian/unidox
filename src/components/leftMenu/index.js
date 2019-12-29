import React, { useState, useEffect } from "react"
import userGlobal from '../../state/userState'
import Resizable from 'react-resizable-box'

import './style.scss'

const LeftMenu = (props) => {

    const [userState, userActions] = userGlobal();

    const height = window.innerHeight

    useEffect(() => {
        if (userState.jwt === '') {
            userActions.getToken()
        }
        if (userState.username === '') {
            userActions.getProfile()
        }
    });

    return (
            <div className='left-menu'>
                <div className='greeter'>
                    {userState.username}'s notes
                </div>
                <div className='notes'>
                    {
                        userState.notes.map(note => props.activeNote == note.id
                                                        ? <li className='active' key={note.id}> {note.title} </li> 
                                                        : <li onClick={() => props.setActiveNote(note.id)} key={note.id}> {note.title} </li> 
                        )
                    }
                </div>
            </div>
    );
}

export default LeftMenu;
