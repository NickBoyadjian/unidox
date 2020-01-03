import React, { useState, useEffect } from "react"
import userGlobal from '../../state/userState'

import CreateNote from '../createNote'
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

    const showModal = () => {
        const modal = document.getElementById('create-note')
        modal.className = 'modal is-active'
    }


    return (
            <div className='left-menu'>
                <nav class="panel is-link">
                    <h1 class="panel-heading">
                        Notes
                    </h1>
                    <div class="panel-block">
                        <button class="button is-link is-outlined is-fullwidth" onClick={showModal}>
                        Create new note
                        </button>
                    </div>
                    <CreateNote />
                    <div class="panel-block">
                        <p class="control has-icons-left">
                        <input class="input" type="text" placeholder="Search" />
                        <span class="icon is-left">
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </span>
                        </p>
                    </div>

                    {
                        userState.notes.map(note => userState.currentNote.id == note.id
                                    ? <div class="panel-block is-active note">
                                        <span class="panel-icon">
                                        <i class="fa fa-book" aria-hidden="true"></i>
                                        </span>
                                        {note.title}
                                    </div>
                                    : <div class="panel-block note" onClick={() => userActions.getNote(note.id)}>
                                        <span class="panel-icon">
                                        <i class="fa fa-book" aria-hidden="true"></i>
                                        </span>
                                        {note.title}
                                    </div>
                        )
                    }
                    
                    
                </nav>
            </div>
    );
}

export default LeftMenu;
