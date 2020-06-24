import React, { useState } from 'react';
import userGlobal from '../../state/userState';
import bgimage from '../../images/bg.svg';

import './style.scss';

const CreateNote = () => {

    const [title, setTitle] = useState('');
    const [userState, userActions] = userGlobal();

    const hideModal = () => { document.getElementById('create-note').className = 'modal' }

    const createNote = async () => {
        await userActions.createNote(title)
        hideModal()
        userActions.getProfile()
    }

    return (
        <div className="modal" id="create-note" style={{ 'background': '#fff' }}>
            <img src={bgimage} className="bgimage" />
            <div className="modal-card" id="create-note">
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
