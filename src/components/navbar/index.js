import React from 'react';
import userGlobal from '../../state/userState';
import bgimage from '../../images/bg.svg';


import './style.scss'

const NavBar = () => {

    const [userState, userActions] = userGlobal();

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-item" href="https://bulma.io">
                    <h1 className="title is-5"><b>Notekeeper</b>
                        <h2 className="title is-6">{userState.currentNote.title}</h2>
                    </h1>
                </div>

                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="navbar-menu">

                {/* <Menu /> */}

                <div className="navbar-item has-dropdown is-hoverable navbar-end">
                    <div className="navbar-link" id='account'>{userState.username.charAt(0).toUpperCase() + userState.username.slice(1)}</div>

                    <div className="navbar-dropdown is-right">
                        <div className="navbar-item">
                            <button className="navbar-item button" onClick={userActions.logout}> Log out </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

const Menu = () => {

    const [userState, userActions] = userGlobal();


    if (!userState.currentNote.id) {
        return <div></div>
    }

    return (
        <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                    File
                </a>

                <div className="navbar-dropdown">
                    <a className="navbar-item" onClick={() => userActions.deleteNote(userState.currentNote.id).then(r => userActions.getProfile())}>
                        Delete
                    </a>
                    <hr className="navbar-divider" />
                </div>
            </div>
        </div>
    )
}

export default NavBar;
