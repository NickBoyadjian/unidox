import React, { useState, useEffect } from "react"
import userGlobal from '../../state/userState'

import CreateNote from '../createNote'
import './style.scss'

const LeftMenu = (props) => {

    const [userState, userActions] = userGlobal();
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");

    const height = window.innerHeight

    useEffect(() => {
        if (userState.jwt === '') {
            userActions.getToken()
        }
        if (userState.username === '') {
            userActions.getProfile()
        }
    });

    useEffect(() => {
        setNotes(userState.notes)
    }, [userState.notes]);

    const showModal = () => {
        const modal = document.getElementById('create-note');
        modal.className = 'modal is-active';
    }

    const handleSearch = (value) => {
        setSearch(value);
        setNotes(userState.notes);
        setNotes(notes.filter(note => note.title.includes(value)));

    }


    return (
        <div className='left-menu'>
            <nav className="panel is-link">
                <h1 className="panel-heading">
                    Notes
                    </h1>
                <div className="panel-block">
                    <button className="button is-link is-outlined is-fullwidth" onClick={showModal}>
                        Create new note
                        </button>
                </div>
                <CreateNote />
                {/* <div className="panel-block">
                    <p className="control has-icons-left">
                        <input className="input" type="text" placeholder="Search" value={search} onChange={(e) => handleSearch(e.target.value)} />
                        <span className="icon is-left">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </span>
                    </p>
                </div> */}

                {
                    notes.filter(note => note.title.includes(search)).map(note => userState.currentNote.id == note.id
                        ? <div className="panel-block is-active note" key={note.id}>
                            <span className="panel-icon">
                                <i className="fa fa-book" aria-hidden="true"></i>
                            </span>
                            {note.title}
                            <span
                                onClick={() => userActions.deleteNote(userState.currentNote.id).then(r => userActions.getProfile())}
                                className="delete-icon">
                                <i className="fa fa-remove" aria-hidden="true"></i>
                            </span>
                        </div>
                        : <div className="panel-block note" onClick={() => userActions.getNote(note.id)} key={note.id}>
                            <span className="panel-icon">
                                <i className="fa fa-book" aria-hidden="true"></i>
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
