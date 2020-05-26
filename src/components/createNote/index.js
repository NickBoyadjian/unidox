import React, { useState } from "react"
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
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Create New Note</p>
                    <button className="delete" aria-label="close" onClick={hideModal} />
                </header>
                <section className="modal-card-body">
                    <input 
                        className='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={createNote}>Create</button>
                    <button className="button" onClick={hideModal}>Cancel</button>
                </footer>
            </div>
        </div>
    );
}

export default CreateNote;
