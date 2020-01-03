import React, { useState, useEffect } from "react"
import userGlobal from '../../state/userState'

import './style.scss'

const CreateNote = () => {

    const [ title, setTitle ] = useState('');
    const [userState, userActions] = userGlobal();

    const hideModal = () => { document.getElementById('create-note').className = 'modal' } 

    const createNote = async () => {
        await userActions.createNote(title)
        hideModal()
        userActions.getProfile()
    }

    return (
        <div className="modal" id="create-note">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Create New Note</p>
                    <button class="delete" aria-label="close" onClick={hideModal} />
                </header>
                <section class="modal-card-body">
                    <input 
                        className='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" onClick={createNote}>Create</button>
                    <button class="button" onClick={hideModal}>Cancel</button>
                </footer>
            </div>
        </div>
    );
}

export default CreateNote;
